const cheerio = require('cheerio');

const MAX_RESPONSE_SIZE = 2 * 1024 * 1024; // 2MB
const FETCH_TIMEOUT_MS = 10000; // 10 seconds
const MAX_EXTRACTED_TEXT_LENGTH = 8000;

function validateUrl(urlString) {
  let parsed;
  try {
    parsed = new URL(urlString);
  } catch {
    return { valid: false, error: 'Invalid URL format.' };
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return { valid: false, error: 'Only HTTP and HTTPS URLs are supported.' };
  }

  const hostname = parsed.hostname.toLowerCase();

  // Block internal/private IPs (SSRF prevention)
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname === '0.0.0.0' ||
    hostname.startsWith('10.') ||
    hostname.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(hostname) ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal')
  ) {
    return { valid: false, error: 'Internal URLs are not allowed.' };
  }

  return { valid: true };
}

// --- GitHub API handler ---

function isGitHubProfileUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    const hostname = parsed.hostname.toLowerCase();
    if (hostname !== 'github.com' && hostname !== 'www.github.com') return null;
    // Match /username but not /username/repo or /orgs etc.
    const parts = parsed.pathname.replace(/^\/|\/$/g, '').split('/');
    if (parts.length === 1 && parts[0].length > 0) {
      return parts[0];
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchGitHubProfile(username) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    // Fetch user profile and repos in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        signal: controller.signal,
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'PortfolioCreator/1.0',
        },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`, {
        signal: controller.signal,
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'PortfolioCreator/1.0',
        },
      }),
    ]);

    if (!userRes.ok) {
      throw new Error(
        `GitHub user "${username}" not found. Please check the URL and try again.`,
      );
    }

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    // Build a text description from the GitHub data
    const lines = [];

    if (user.name) lines.push(`Name: ${user.name}`);
    else lines.push(`GitHub username: ${username}`);

    if (user.bio) lines.push(`Bio: ${user.bio}`);
    if (user.company) lines.push(`Company: ${user.company}`);
    if (user.location) lines.push(`Location: ${user.location}`);
    if (user.blog) lines.push(`Website: ${user.blog}`);
    if (user.email) lines.push(`Email: ${user.email}`);
    if (user.twitter_username) lines.push(`Twitter: @${user.twitter_username}`);
    lines.push(`GitHub: https://github.com/${username}`);
    if (user.public_repos) lines.push(`Public repositories: ${user.public_repos}`);
    if (user.followers) lines.push(`Followers: ${user.followers}`);

    if (Array.isArray(repos) && repos.length > 0) {
      lines.push('\nNotable projects:');
      for (const repo of repos) {
        if (repo.fork) continue;
        const lang = repo.language ? ` [${repo.language}]` : '';
        const stars = repo.stargazers_count ? ` (${repo.stargazers_count} stars)` : '';
        const desc = repo.description ? ` - ${repo.description}` : '';
        lines.push(`- ${repo.name}${lang}${stars}${desc}`);
        if (repo.homepage) lines.push(`  Live: ${repo.homepage}`);
      }

      // Extract unique languages as skills
      const languages = [...new Set(repos.filter((r) => r.language && !r.fork).map((r) => r.language))];
      if (languages.length > 0) {
        lines.push(`\nProgramming languages used: ${languages.join(', ')}`);
      }

      // Extract topics/tags
      const allTopics = repos.flatMap((r) => r.topics || []);
      const uniqueTopics = [...new Set(allTopics)];
      if (uniqueTopics.length > 0) {
        lines.push(`Technologies/topics: ${uniqueTopics.join(', ')}`);
      }
    }

    return lines.join('\n');
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('GitHub took too long to respond. Please try again.');
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

// --- LinkedIn handler (extract from meta tags) ---

function isLinkedInUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    const hostname = parsed.hostname.toLowerCase();
    return hostname === 'linkedin.com' || hostname === 'www.linkedin.com' || hostname.endsWith('.linkedin.com');
  } catch {
    return false;
  }
}

async function fetchLinkedInProfile(urlString) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(urlString, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('LinkedIn took too long to respond. Please try again.');
    }
    throw new Error(
      'Could not reach LinkedIn. Please copy-paste your profile text into the description box instead.',
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(
      'Could not access this LinkedIn profile. Please copy-paste your profile text into the description box instead.',
    );
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const lines = [];

  // Extract from Open Graph meta tags
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDescription = $('meta[property="og:description"]').attr('content');
  const metaDescription = $('meta[name="description"]').attr('content');
  const title = $('title').text();

  if (ogTitle) lines.push(`Name/Title: ${ogTitle}`);
  else if (title) lines.push(`Title: ${title}`);

  if (ogDescription) lines.push(`Summary: ${ogDescription}`);
  else if (metaDescription) lines.push(`Summary: ${metaDescription}`);

  // Try to extract JSON-LD structured data
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html());
      if (data['@type'] === 'Person' || data['@type'] === 'ProfilePage') {
        if (data.name) lines.push(`Name: ${data.name}`);
        if (data.jobTitle) lines.push(`Job title: ${data.jobTitle}`);
        if (data.description) lines.push(`About: ${data.description}`);
        if (data.worksFor?.name) lines.push(`Company: ${data.worksFor.name}`);
        if (data.alumniOf) {
          const schools = Array.isArray(data.alumniOf) ? data.alumniOf : [data.alumniOf];
          for (const s of schools) {
            if (s.name) lines.push(`Education: ${s.name}`);
          }
        }
        if (data.knowsAbout) {
          const skills = Array.isArray(data.knowsAbout) ? data.knowsAbout : [data.knowsAbout];
          lines.push(`Skills: ${skills.join(', ')}`);
        }
      }
    } catch {
      // Ignore JSON parse errors
    }
  });

  if (lines.length < 2) {
    throw new Error(
      'Could not extract enough information from this LinkedIn profile. LinkedIn limits access to public data. Please copy-paste your profile text into the description box instead.',
    );
  }

  return lines.join('\n');
}

// --- Generic HTML scraper ---

async function fetchGenericPage(urlString) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(urlString, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PortfolioCreator/1.0)',
        Accept: 'text/html',
      },
      redirect: 'follow',
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(
        'The URL took too long to respond. Please try a different URL or paste your info manually.',
      );
    }
    throw new Error('Could not fetch the URL. Please check that it is accessible.');
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(
      `The URL returned an error (status ${response.status}). Please check the URL and try again.`,
    );
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html') && !contentType.includes('text/plain')) {
    throw new Error(
      'The URL does not appear to be a webpage. Please provide a link to an HTML page.',
    );
  }

  // Read body with size limit
  const reader = response.body.getReader();
  const chunks = [];
  let totalSize = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalSize += value.length;
    if (totalSize > MAX_RESPONSE_SIZE) {
      reader.cancel();
      break;
    }
    chunks.push(value);
  }

  const html = Buffer.concat(chunks).toString('utf-8');
  const $ = cheerio.load(html);

  // Remove non-content elements
  $(
    'script, style, nav, footer, header, iframe, noscript, svg, [role="navigation"], [role="banner"]',
  ).remove();

  // Prefer main content areas
  let text = '';
  const mainSelectors = ['main', 'article', '[role="main"]', '.content', '#content'];
  for (const sel of mainSelectors) {
    if ($(sel).length) {
      text = $(sel).text();
      break;
    }
  }

  // Fallback to body
  if (!text.trim()) {
    text = $('body').text();
  }

  // Clean up whitespace
  text = text
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();

  if (text.length < 20) {
    throw new Error(
      'Could not extract enough text from this URL. The page may require JavaScript to load. Please paste your information manually.',
    );
  }

  if (text.length > MAX_EXTRACTED_TEXT_LENGTH) {
    text = text.substring(0, MAX_EXTRACTED_TEXT_LENGTH);
  }

  return text;
}

// --- Main entry point ---

async function extractTextFromUrl(urlString) {
  const validation = validateUrl(urlString);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // GitHub profile → use API
  const githubUsername = isGitHubProfileUrl(urlString);
  if (githubUsername) {
    return fetchGitHubProfile(githubUsername);
  }

  // LinkedIn → extract from meta tags
  if (isLinkedInUrl(urlString)) {
    return fetchLinkedInProfile(urlString);
  }

  // Everything else → generic HTML scraper
  return fetchGenericPage(urlString);
}

module.exports = { extractTextFromUrl, validateUrl };

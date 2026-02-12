const { GoogleGenerativeAI } = require('@google/generative-ai');

const MOCK_MODE = !process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are a portfolio content writer. The user will describe themselves — their name, job title, skills, experience, education, projects, and contact info. Your job is to generate professional, polished portfolio content based on EVERYTHING the user tells you.

CRITICAL RULES:
- The hero "name" field must be ONLY the person's name (e.g. "Sarah Chen"), never a sentence like "My name is Sarah".
- Use ALL the information the user provides. Do not ignore any details.
- Fill EVERY section with meaningful content, even if the user didn't explicitly mention it — infer from context.
- Skills should be comprehensive. If the user mentions technologies, frameworks, languages, or tools, include them ALL as skills. Add related/complementary skills too. Aim for at least 6-10 skills.
- Skill levels must be integers 1-5 (1=beginner, 5=expert). Infer the level from context (main focus = 5, mentioned = 3-4, related = 2-3).
- If the user mentions specific projects, expand them with professional descriptions. If they mention none, generate 3-4 plausible projects based on their skills and experience.
- Write the about bio in first person, 2-3 paragraphs. Make it detailed and personal, using the specific details the user provided.
- For the tagline, be creative but professional — reflect the user's actual specialty.
- Experience entries: if the user mentions ANY work or roles, include them. If not, infer 1-2 plausible roles from their skills.
- Education entries: if the user mentions ANY education, include it. If not, leave empty array.
- Extract any URLs (GitHub, LinkedIn, email, etc.) and place them in the contact section.
- Dates should use YYYY-MM format. Use "Present" for current roles.

Return a JSON object with these exact keys (include ALL keys):

{
  "hero": {
    "name": "First Last",
    "tagline": "A short punchy headline reflecting their specialty",
    "subtitle": "1-2 sentence summary of who they are and what they do",
    "ctaText": "View My Work",
    "ctaLink": "#projects"
  },
  "about": {
    "bio": "2-3 paragraphs about the person in first person. Use specific details they provided."
  },
  "projects": {
    "projects": [
      {
        "title": "Project Name",
        "description": "2-3 sentence description",
        "tags": ["Tech1", "Tech2"],
        "liveUrl": "",
        "sourceUrl": ""
      }
    ]
  },
  "skills": {
    "skills": [
      { "name": "SkillName", "level": 4 }
    ]
  },
  "experience": {
    "entries": [
      {
        "title": "Job Title",
        "company": "Company Name",
        "startDate": "2022-01",
        "endDate": "Present",
        "description": "2-3 sentences about responsibilities and achievements."
      }
    ]
  },
  "education": {
    "entries": [
      {
        "degree": "Degree Name",
        "school": "University Name",
        "startDate": "2018-09",
        "endDate": "2022-06",
        "description": "Brief description or notable achievements."
      }
    ]
  },
  "contact": {
    "email": "",
    "github": "",
    "linkedin": "",
    "twitter": "",
    "website": "",
    "showContactForm": true
  }
}

Return ONLY the JSON object, no markdown fences, no commentary.`;

async function generatePortfolioContent(userDescription, existingSectionTypes) {
  if (MOCK_MODE) {
    console.log('[AI Service] MOCK MODE — no GEMINI_API_KEY set, generating content from description');
    return getMockContent(userDescription);
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
    },
  });

  const prompt = `${SYSTEM_PROMPT}

The portfolio currently has these section types: ${existingSectionTypes.join(', ')}
Only generate content for sections that exist in the portfolio.

User's description:
${userDescription}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const parsed = JSON.parse(text);
  return parsed;
}

// --- Smart mock content generator ---

function extractName(text) {
  // Pattern: "My name is X", "I'm X", "I am X", "name is X"
  const patterns = [
    /(?:my name is|i'm|i am|name is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/m,
  ];
  for (const pat of patterns) {
    const match = text.match(pat);
    if (match) return match[1].trim();
  }
  return 'Your Name';
}

function extractSkills(text) {
  const knownSkills = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C\\+\\+', 'C',
    'Ruby', 'Go', 'Rust', 'PHP', 'Swift', 'Kotlin', 'Dart', 'Lua',
    'React', 'Angular', 'Vue', 'Svelte', 'Next\\.js', 'Nuxt',
    'Node\\.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Spring Boot',
    'ASP\\.NET', '\\.NET', 'Ruby on Rails', 'Laravel',
    'Unity', 'Unreal Engine', 'Godot', 'Blender',
    'HTML', 'CSS', 'SASS', 'Tailwind', 'Bootstrap',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    'Git', 'Linux', 'REST', 'GraphQL', 'SQL',
    'Figma', 'Photoshop', 'Illustrator',
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
    'Object-Oriented Programming', 'OOP',
    'Data Structures', 'Algorithms',
  ];

  const found = [];
  const textLower = text.toLowerCase();
  const seenLower = new Set();

  for (const skill of knownSkills) {
    const regex = new RegExp(`\\b${skill}\\b`, 'i');
    const match = text.match(regex);
    if (match && !seenLower.has(match[0].toLowerCase())) {
      seenLower.add(match[0].toLowerCase());
      found.push(match[0]);
    }
  }

  // Also pick up "X development" patterns
  const devPatterns = text.match(/(\w+)\s+develop(?:ment|er)/gi) || [];
  for (const pat of devPatterns) {
    const word = pat.replace(/\s+develop(?:ment|er)/i, '').trim();
    if (word.length > 1 && !seenLower.has(word.toLowerCase())) {
      seenLower.add(word.toLowerCase());
      found.push(word);
    }
  }

  return found;
}

function inferJobTitle(text, skills) {
  const lower = text.toLowerCase();
  if (lower.includes('game dev')) return 'Game Developer';
  if (lower.includes('full-stack') || lower.includes('full stack') || lower.includes('fullstack')) return 'Full-Stack Developer';
  if (lower.includes('front-end') || lower.includes('frontend')) return 'Front-End Developer';
  if (lower.includes('back-end') || lower.includes('backend')) return 'Back-End Developer';
  if (lower.includes('mobile dev')) return 'Mobile Developer';
  if (lower.includes('data scien')) return 'Data Scientist';
  if (lower.includes('machine learning') || lower.includes('ml engineer')) return 'ML Engineer';
  if (lower.includes('designer')) return 'Designer';
  if (lower.includes('unity') || lower.includes('unreal') || lower.includes('godot')) return 'Game Developer';
  if (skills.some(s => ['React', 'Vue', 'Angular', 'Svelte'].includes(s))) return 'Front-End Developer';
  if (skills.some(s => ['Node.js', 'Express', 'Django', 'Flask'].includes(s))) return 'Back-End Developer';
  return 'Software Developer';
}

function extractEmail(text) {
  const match = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  return match ? match[0] : '';
}

function extractUrl(text, domain) {
  const regex = new RegExp(`(?:https?://)?(?:www\\.)?${domain}\\.com/[\\w.-/]+`, 'i');
  const match = text.match(regex);
  return match ? (match[0].startsWith('http') ? match[0] : `https://${match[0]}`) : '';
}

function getMockContent(userDescription) {
  const name = extractName(userDescription);
  const skills = extractSkills(userDescription);
  const jobTitle = inferJobTitle(userDescription, skills);
  const email = extractEmail(userDescription);
  const github = extractUrl(userDescription, 'github');
  const linkedin = extractUrl(userDescription, 'linkedin');

  // Build skill objects with inferred levels
  const mainFocusTerms = [];
  const focusMatch = userDescription.match(/(?:main focus|speciali[sz]e|focus(?:ed)? (?:on|in)|expert in|proficient in)\s+(?:is\s+)?(.+?)(?:\.|,|$)/i);
  if (focusMatch) mainFocusTerms.push(...focusMatch[1].toLowerCase().split(/\s+/));

  const skillObjects = skills.map((s) => {
    const isMainFocus = mainFocusTerms.some((t) => s.toLowerCase().includes(t)) ||
      userDescription.toLowerCase().includes(`main focus is ${s.toLowerCase()}`);
    const isStrong = userDescription.toLowerCase().includes(`strong foundation in ${s.toLowerCase()}`) ||
      userDescription.toLowerCase().includes(`experienced in ${s.toLowerCase()}`);
    return {
      name: s,
      level: isMainFocus ? 5 : isStrong ? 4 : 3,
    };
  });

  // If very few skills detected, add some generic ones based on job title
  if (skillObjects.length < 4) {
    const defaults = {
      'Game Developer': [
        { name: 'Game Design', level: 3 },
        { name: 'Problem Solving', level: 4 },
        { name: '3D Math', level: 3 },
      ],
      'Full-Stack Developer': [
        { name: 'JavaScript', level: 4 },
        { name: 'React', level: 3 },
        { name: 'Node.js', level: 3 },
      ],
      'Front-End Developer': [
        { name: 'HTML', level: 4 },
        { name: 'CSS', level: 4 },
        { name: 'JavaScript', level: 4 },
      ],
      'Software Developer': [
        { name: 'Problem Solving', level: 4 },
        { name: 'Git', level: 3 },
        { name: 'Algorithms', level: 3 },
      ],
    };
    const extras = defaults[jobTitle] || defaults['Software Developer'];
    const existingNames = new Set(skillObjects.map((s) => s.name.toLowerCase()));
    for (const e of extras) {
      if (!existingNames.has(e.name.toLowerCase())) skillObjects.push(e);
    }
  }

  // Generate projects based on skills
  const projects = [];
  if (skills.includes('Unity') || skills.includes('C#') || jobTitle === 'Game Developer') {
    projects.push({
      title: '2D Platformer Game',
      description: `A polished 2D platformer built with Unity and C#, featuring smooth character controls, multiple levels, and enemy AI. Demonstrates strong understanding of game mechanics and physics.`,
      tags: ['Unity', 'C#', 'Game Design'],
      liveUrl: '',
      sourceUrl: '',
    });
    projects.push({
      title: 'Multiplayer Card Game',
      description: `A real-time multiplayer card game with lobby system, matchmaking, and turn-based gameplay. Built with Unity networking and custom server logic.`,
      tags: ['Unity', 'C#', 'Networking'],
      liveUrl: '',
      sourceUrl: '',
    });
  }
  if (skills.some((s) => ['React', 'Vue', 'Angular', 'JavaScript'].includes(s))) {
    projects.push({
      title: 'Interactive Web Dashboard',
      description: `A responsive web dashboard with real-time data visualization, filtering, and user authentication. Features clean UI design and optimized performance.`,
      tags: skills.filter((s) => ['React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'CSS', 'Tailwind'].includes(s)).slice(0, 3),
      liveUrl: '',
      sourceUrl: '',
    });
  }
  if (skills.some((s) => ['Python', 'Django', 'Flask', 'FastAPI'].includes(s))) {
    projects.push({
      title: 'REST API Service',
      description: `A scalable REST API with authentication, rate limiting, and comprehensive documentation. Includes automated testing and CI/CD pipeline.`,
      tags: skills.filter((s) => ['Python', 'Django', 'Flask', 'FastAPI', 'PostgreSQL', 'Docker'].includes(s)).slice(0, 3),
      liveUrl: '',
      sourceUrl: '',
    });
  }
  // Ensure at least 2 projects
  if (projects.length < 2) {
    projects.push({
      title: 'Portfolio Website',
      description: `A personal portfolio website showcasing projects and skills with a clean, modern design and smooth animations.`,
      tags: skills.slice(0, 3).length > 0 ? skills.slice(0, 3) : ['HTML', 'CSS', 'JavaScript'],
      liveUrl: '',
      sourceUrl: '',
    });
    if (projects.length < 2) {
      projects.push({
        title: 'Task Management App',
        description: `A productivity application with task creation, categorization, and progress tracking. Features drag-and-drop reordering and local data persistence.`,
        tags: skills.slice(0, 2).length > 0 ? skills.slice(0, 2) : ['JavaScript'],
        liveUrl: '',
        sourceUrl: '',
      });
    }
  }

  // Build bio from description
  const bio = buildBio(name, jobTitle, skills, userDescription);

  return {
    hero: {
      name,
      tagline: `${jobTitle} & Problem Solver`,
      subtitle: buildSubtitle(userDescription, jobTitle, skills),
      ctaText: 'View My Work',
      ctaLink: '#projects',
    },
    about: { bio },
    projects: { projects },
    skills: { skills: skillObjects },
    experience: { entries: extractExperience(userDescription) },
    education: { entries: extractEducation(userDescription) },
    contact: {
      email,
      github,
      linkedin,
      twitter: '',
      website: '',
      showContactForm: true,
    },
  };
}

function buildSubtitle(text, jobTitle, skills) {
  const topSkills = skills.slice(0, 3).join(', ');
  if (topSkills) {
    return `${jobTitle} specializing in ${topSkills}. Passionate about building impactful solutions.`;
  }
  return `${jobTitle} passionate about crafting elegant solutions to complex problems.`;
}

function buildBio(name, jobTitle, skills, description) {
  const topSkills = skills.slice(0, 5).join(', ');
  const paragraphs = [];

  // First paragraph: who they are
  paragraphs.push(
    `Hi, I'm ${name}. I'm a ${jobTitle.toLowerCase()} who loves turning ideas into reality through clean, efficient code.` +
    (topSkills ? ` My core toolkit includes ${topSkills}, and I'm always eager to learn new technologies.` : '')
  );

  // Second paragraph: extract passion/approach from their description
  const passionMatch = description.match(/(?:passionate about|i love|i enjoy|my goal is|i believe|i thrive|my approach)(.+?)(?:\.|$)/i);
  if (passionMatch) {
    paragraphs.push(
      `I'm passionate about${passionMatch[1].trim().startsWith('solving') || passionMatch[1].trim().startsWith('build') ? ' ' : ' '}${passionMatch[1].trim()}. I believe in writing maintainable, well-structured code and continuously improving my craft.`
    );
  } else {
    paragraphs.push(
      `I'm driven by a desire to solve real-world problems and create meaningful experiences. Whether working independently or as part of a team, I focus on delivering quality work that makes a difference.`
    );
  }

  // Third paragraph: forward-looking
  paragraphs.push(
    `When I'm not coding, I'm exploring new tools, contributing to open-source projects, or learning about the latest industry trends. I'm always open to new opportunities and collaborations.`
  );

  return paragraphs.join('\n\n');
}

function extractExperience(text) {
  // Try to find work/role mentions
  const entries = [];
  const workPatterns = [
    /(?:work(?:ed|ing)?\s+(?:at|for|with)|employed at|senior|junior|lead|intern)\s+(.+?)(?:\.|,|$)/gi,
    /(?:currently|previously)\s+(?:a\s+)?(\w+\s+\w+)\s+(?:at|for)\s+(.+?)(?:\.|,|$)/gi,
  ];

  for (const pattern of workPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (entries.length >= 3) break;
      entries.push({
        title: 'Developer',
        company: match[1].trim().substring(0, 50),
        startDate: '',
        endDate: 'Present',
        description: 'Contributed to development projects and collaborated with the team to deliver quality software.',
      });
    }
  }

  return entries;
}

function extractEducation(text) {
  const entries = [];
  const eduPatterns = [
    /(?:stud(?:y|ied|ying)|degree|graduated|diploma|bachelor|master|phd|university|college)\s+(?:in\s+|at\s+|from\s+)?(.+?)(?:\.|,|$)/gi,
  ];

  for (const pattern of eduPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (entries.length >= 2) break;
      entries.push({
        degree: match[1].trim().substring(0, 60),
        school: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  }

  return entries;
}

module.exports = { generatePortfolioContent };

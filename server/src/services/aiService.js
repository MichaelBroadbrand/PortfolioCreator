const { GoogleGenerativeAI } = require('@google/generative-ai');

const MOCK_MODE = !process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are a portfolio content writer. The user will describe themselves — their name, job title, skills, experience, education, projects, and contact info. Your job is to generate professional, polished portfolio content.

Return a JSON object with these exact keys (include ALL keys, using empty strings/arrays if no info was provided):

{
  "hero": {
    "name": "Full Name",
    "tagline": "A short punchy headline (e.g., 'Full-Stack Developer & UI Enthusiast')",
    "subtitle": "1-2 sentence summary of who they are",
    "ctaText": "Get In Touch",
    "ctaLink": "#contact"
  },
  "about": {
    "bio": "2-3 paragraphs about the person, written in first person. Professional but personable tone."
  },
  "projects": {
    "projects": [
      {
        "title": "Project Name",
        "description": "2-3 sentence description of the project, its purpose, and what technologies were used.",
        "tags": ["React", "Node.js"],
        "liveUrl": "",
        "sourceUrl": ""
      }
    ]
  },
  "skills": {
    "skills": [
      { "name": "JavaScript", "level": 4 }
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

Rules:
- Skill levels must be integers 1-5 (1=beginner, 5=expert). Infer the level from context.
- Dates should use YYYY-MM format. Use "Present" for current roles.
- If the user mentions specific projects, expand them with professional descriptions. If they mention none, generate 2-3 plausible projects based on their skills.
- Write the bio in first person.
- For the tagline, be creative but professional.
- Extract any URLs (GitHub, LinkedIn, etc.) the user mentions and place them in the contact section.
- Return ONLY the JSON object, no markdown fences, no commentary.`;

async function generatePortfolioContent(userDescription, existingSectionTypes) {
  if (MOCK_MODE) {
    console.log('[AI Service] MOCK MODE — no GEMINI_API_KEY set, returning placeholder content');
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

function getMockContent(userDescription) {
  const name = userDescription.split(/[,.\n]/)[0].trim().substring(0, 30) || 'John Doe';
  return {
    hero: {
      name,
      tagline: 'Full-Stack Developer & Problem Solver',
      subtitle: 'Passionate about building great software.',
      ctaText: 'Get In Touch',
      ctaLink: '#contact',
    },
    about: {
      bio: `Hi, I'm ${name}. This is mock AI-generated content. Connect your Gemini API key to get real results.`,
    },
    projects: {
      projects: [
        { title: 'Sample Project', description: 'A sample project generated in mock mode.', tags: ['React'], liveUrl: '', sourceUrl: '' },
      ],
    },
    skills: {
      skills: [
        { name: 'JavaScript', level: 4 },
        { name: 'React', level: 3 },
      ],
    },
    experience: { entries: [] },
    education: { entries: [] },
    contact: { email: '', github: '', linkedin: '', twitter: '', website: '', showContactForm: true },
  };
}

module.exports = { generatePortfolioContent };

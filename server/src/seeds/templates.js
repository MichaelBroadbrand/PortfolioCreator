require('dotenv').config();
const mongoose = require('mongoose');
const Template = require('../models/Template');
const connectDB = require('../config/db');

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with cart, checkout, and payment integration.',
    image: '',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    liveUrl: 'https://example.com',
    sourceUrl: 'https://github.com/example/ecommerce',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task manager with real-time updates and team features.',
    image: '',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    sourceUrl: 'https://github.com/example/tasks',
  },
  {
    title: 'Weather Dashboard',
    description: 'Interactive weather visualization with 7-day forecasts and location search.',
    image: '',
    tags: ['Vue.js', 'D3.js', 'OpenWeather API'],
    liveUrl: 'https://example.com',
    sourceUrl: 'https://github.com/example/weather',
  },
  {
    title: 'Social Media Analytics',
    description: 'Dashboard for tracking social media engagement across multiple platforms.',
    image: '',
    tags: ['React', 'Python', 'FastAPI', 'Charts'],
    liveUrl: 'https://example.com',
    sourceUrl: '',
  },
];

const sampleSkills = [
  { name: 'JavaScript', proficiency: 5 },
  { name: 'React', proficiency: 5 },
  { name: 'Node.js', proficiency: 4 },
  { name: 'TypeScript', proficiency: 4 },
  { name: 'Python', proficiency: 3 },
  { name: 'PostgreSQL', proficiency: 4 },
  { name: 'MongoDB', proficiency: 4 },
  { name: 'Docker', proficiency: 3 },
  { name: 'AWS', proficiency: 3 },
  { name: 'Git', proficiency: 5 },
];

const sampleExperience = [
  {
    company: 'TechCorp Inc.',
    role: 'Senior Frontend Developer',
    startDate: '2022-01',
    endDate: '',
    current: true,
    description: 'Leading the frontend team in building a SaaS platform serving 50K+ users. Architected the component library and design system.',
  },
  {
    company: 'StartupXYZ',
    role: 'Full-Stack Developer',
    startDate: '2020-03',
    endDate: '2021-12',
    current: false,
    description: 'Built and maintained multiple web applications using React and Node.js. Improved page load times by 40%.',
  },
  {
    company: 'Digital Agency',
    role: 'Junior Developer',
    startDate: '2018-06',
    endDate: '2020-02',
    current: false,
    description: 'Developed client websites and internal tools. Collaborated with designers to implement pixel-perfect UIs.',
  },
];

const sampleEducation = [
  {
    institution: 'University of Technology',
    degree: 'B.S. Computer Science',
    startYear: '2014',
    endYear: '2018',
    current: false,
    description: 'Graduated with honors. Focus on software engineering and data structures.',
  },
];

const sampleTestimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager at TechCorp',
    quote: 'One of the most talented developers I\'ve worked with. Consistently delivers high-quality work ahead of schedule.',
    avatar: '',
  },
  {
    name: 'Mike Chen',
    role: 'CTO at StartupXYZ',
    quote: 'An exceptional problem solver who brings both technical expertise and creative thinking to every project.',
    avatar: '',
  },
  {
    name: 'Emily Davis',
    role: 'Design Lead at Agency',
    quote: 'A pleasure to collaborate with. Translates designs into code flawlessly and always suggests improvements.',
    avatar: '',
  },
];

const templates = [
  {
    name: 'Developer',
    category: 'developer',
    layout: 'sidebar',
    thumbnail: '',
    popularity: 150,
    previewData: { name: 'Alex Chen', tagline: 'Full-Stack Developer' },
    defaultTheme: {
      colorScheme: {
        primary: '#10b981',
        secondary: '#059669',
        accent: '#34d399',
        background: '#0f172a',
        text: '#f8fafc',
      },
      fontPairing: 'Space Grotesk + Inter',
      mode: 'dark',
      spacing: 'normal',
    },
    sections: [
      {
        type: 'hero',
        order: 0,
        defaultContent: {
          name: 'Alex Chen',
          tagline: 'Full-Stack Developer',
          subtitle: 'I build robust, scalable web applications with modern technologies. Currently working on open-source developer tools.',
          ctaText: 'View My Work',
          ctaLink: '#projects',
          secondaryCtaText: 'Get In Touch',
          secondaryCtaLink: '#contact',
          profileImage: '',
        },
      },
      {
        type: 'about',
        order: 1,
        defaultContent: {
          bio: "I'm a full-stack developer with 6+ years of experience building web applications. I'm passionate about clean code, great user experiences, and open-source software. When I'm not coding, you'll find me hiking or experimenting with new technologies.",
          profileImage: '',
        },
      },
      {
        type: 'projects',
        order: 2,
        defaultContent: { projects: sampleProjects },
      },
      {
        type: 'skills',
        order: 3,
        defaultContent: { skills: sampleSkills },
      },
      {
        type: 'experience',
        order: 4,
        defaultContent: { entries: sampleExperience },
      },
      {
        type: 'contact',
        order: 5,
        defaultContent: {
          email: 'alex@example.com',
          github: 'https://github.com/alexchen',
          linkedin: 'https://linkedin.com/in/alexchen',
          twitter: '',
          website: '',
          showContactForm: true,
        },
      },
    ],
  },
  {
    name: 'Designer',
    category: 'designer',
    layout: 'split',
    thumbnail: '',
    popularity: 120,
    previewData: { name: 'Alex Chen', tagline: 'Product Designer' },
    defaultTheme: {
      colorScheme: {
        primary: '#dc6843',
        secondary: '#c05a38',
        accent: '#dc6843',
        background: '#faf8f5',
        text: '#1a1a1a',
      },
      fontPairing: 'Playfair Display + Source Sans 3',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      {
        type: 'hero',
        order: 0,
        defaultContent: {
          name: 'Alex Chen',
          tagline: 'Product Designer',
          subtitle: 'Creating thoughtful digital experiences that put people first.',
          ctaText: 'See My Work',
          ctaLink: '#projects',
          secondaryCtaText: '',
          secondaryCtaLink: '',
          profileImage: '',
        },
      },
      {
        type: 'about',
        order: 1,
        defaultContent: {
          bio: "I'm a product designer with a passion for creating beautiful, functional digital experiences. With 5+ years of experience in UI/UX design, I focus on understanding user needs and translating them into elegant solutions.",
          profileImage: '',
        },
      },
      {
        type: 'projects',
        order: 2,
        defaultContent: { projects: sampleProjects.slice(0, 3) },
      },
      {
        type: 'testimonials',
        order: 3,
        defaultContent: { testimonials: sampleTestimonials },
      },
      {
        type: 'contact',
        order: 4,
        defaultContent: {
          email: 'alex@example.com',
          github: '',
          linkedin: 'https://linkedin.com/in/alexchen',
          twitter: 'https://twitter.com/alexchen',
          website: 'https://alexchen.design',
          showContactForm: true,
        },
      },
    ],
  },
  {
    name: 'Freelancer',
    category: 'freelancer',
    layout: 'standard',
    thumbnail: '',
    popularity: 100,
    previewData: { name: 'Alex Chen', tagline: 'Freelance Developer & Consultant' },
    defaultTheme: {
      colorScheme: {
        primary: '#2563eb',
        secondary: '#1d4ed8',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#111827',
      },
      fontPairing: 'Poppins + Nunito',
      mode: 'light',
      spacing: 'normal',
    },
    sections: [
      {
        type: 'hero',
        order: 0,
        defaultContent: {
          name: 'Alex Chen',
          tagline: 'Freelance Developer & Consultant',
          subtitle: 'I help startups and businesses build exceptional web applications. Available for new projects.',
          ctaText: 'Hire Me',
          ctaLink: '#contact',
          secondaryCtaText: 'View Portfolio',
          secondaryCtaLink: '#projects',
          profileImage: '',
        },
      },
      {
        type: 'about',
        order: 1,
        defaultContent: {
          bio: "I'm a freelance developer with a track record of delivering high-quality web applications for startups and established businesses. I specialise in React, Node.js, and cloud architecture.",
          profileImage: '',
        },
      },
      {
        type: 'projects',
        order: 2,
        defaultContent: { projects: sampleProjects },
      },
      {
        type: 'testimonials',
        order: 3,
        defaultContent: { testimonials: sampleTestimonials },
      },
      {
        type: 'skills',
        order: 4,
        defaultContent: { skills: sampleSkills },
      },
      {
        type: 'contact',
        order: 5,
        defaultContent: {
          email: 'alex@example.com',
          github: 'https://github.com/alexchen',
          linkedin: 'https://linkedin.com/in/alexchen',
          twitter: '',
          website: '',
          showContactForm: true,
        },
      },
    ],
  },
  {
    name: 'Minimal',
    category: 'minimal',
    layout: 'standard',
    thumbnail: '',
    popularity: 90,
    previewData: { name: 'Alex Chen', tagline: 'Software Engineer' },
    defaultTheme: {
      colorScheme: {
        primary: '#64748b',
        secondary: '#475569',
        accent: '#64748b',
        background: '#ffffff',
        text: '#0f172a',
      },
      fontPairing: 'Inter + DM Sans',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      {
        type: 'hero',
        order: 0,
        defaultContent: {
          name: 'Alex Chen',
          tagline: 'Software Engineer',
          subtitle: 'Building thoughtful software with care and precision.',
          ctaText: 'About Me',
          ctaLink: '#about',
          secondaryCtaText: '',
          secondaryCtaLink: '',
          profileImage: '',
        },
      },
      {
        type: 'about',
        order: 1,
        defaultContent: {
          bio: "I'm a software engineer focused on building clean, maintainable applications. I value simplicity, thoughtful design, and code that speaks for itself.",
          profileImage: '',
        },
      },
      {
        type: 'experience',
        order: 2,
        defaultContent: { entries: sampleExperience },
      },
      {
        type: 'projects',
        order: 3,
        defaultContent: { projects: sampleProjects.slice(0, 3) },
      },
      {
        type: 'education',
        order: 4,
        defaultContent: { entries: sampleEducation },
      },
      {
        type: 'contact',
        order: 5,
        defaultContent: {
          email: 'alex@example.com',
          github: 'https://github.com/alexchen',
          linkedin: 'https://linkedin.com/in/alexchen',
          twitter: '',
          website: '',
          showContactForm: false,
        },
      },
    ],
  },
  {
    name: 'Creative',
    category: 'creative',
    layout: 'showcase',
    thumbnail: '',
    popularity: 80,
    previewData: { name: 'Alex Chen', tagline: 'Creative Developer' },
    defaultTheme: {
      colorScheme: {
        primary: '#8b5cf6',
        secondary: '#7c3aed',
        accent: '#ec4899',
        background: '#0f0f1a',
        text: '#f8fafc',
      },
      fontPairing: 'Space Grotesk + Inter',
      mode: 'dark',
      spacing: 'normal',
    },
    sections: [
      {
        type: 'hero',
        order: 0,
        defaultContent: {
          name: 'Alex Chen',
          tagline: 'Creative Developer',
          subtitle: 'I blend code and creativity to build memorable digital experiences that push boundaries.',
          ctaText: 'Explore My Work',
          ctaLink: '#projects',
          secondaryCtaText: 'Say Hello',
          secondaryCtaLink: '#contact',
          profileImage: '',
        },
      },
      {
        type: 'about',
        order: 1,
        defaultContent: {
          bio: "I'm a creative developer who lives at the intersection of design and technology. I build interactive experiences, generative art, and experimental web projects that challenge conventions.",
          profileImage: '',
        },
      },
      {
        type: 'projects',
        order: 2,
        defaultContent: { projects: sampleProjects },
      },
      {
        type: 'skills',
        order: 3,
        defaultContent: { skills: sampleSkills },
      },
      {
        type: 'testimonials',
        order: 4,
        defaultContent: { testimonials: sampleTestimonials },
      },
      {
        type: 'contact',
        order: 5,
        defaultContent: {
          email: 'alex@example.com',
          github: 'https://github.com/alexchen',
          linkedin: '',
          twitter: 'https://twitter.com/alexchen',
          website: 'https://alexchen.dev',
          showContactForm: true,
        },
      },
    ],
  },

  // ── New Templates ──

  {
    name: 'Neon',
    category: 'neon',
    layout: 'immersive',
    thumbnail: '',
    popularity: 110,
    previewData: { name: 'Kai Tanaka', tagline: 'Systems Engineer' },
    defaultTheme: {
      colorScheme: {
        primary: '#00d4ff',
        secondary: '#0070f3',
        accent: '#00ff88',
        background: '#0a0e1a',
        text: '#e0f0ff',
      },
      fontPairing: 'JetBrains Mono + Inter',
      mode: 'dark',
      spacing: 'compact',
    },
    sections: [
      {
        type: 'hero',
        order: 0,
        defaultContent: {
          name: 'Kai Tanaka',
          tagline: 'Systems Engineer',
          subtitle: 'I architect high-performance distributed systems and cloud infrastructure at scale.',
          ctaText: 'See What I Build',
          ctaLink: '#projects',
          secondaryCtaText: 'Connect',
          secondaryCtaLink: '#contact',
          profileImage: '',
        },
      },
      {
        type: 'skills',
        order: 1,
        defaultContent: { skills: sampleSkills },
      },
      {
        type: 'projects',
        order: 2,
        defaultContent: { projects: sampleProjects },
      },
      {
        type: 'experience',
        order: 3,
        defaultContent: { entries: sampleExperience },
      },
      {
        type: 'contact',
        order: 4,
        defaultContent: {
          email: 'kai@example.com',
          github: 'https://github.com/kaitanaka',
          linkedin: 'https://linkedin.com/in/kaitanaka',
          twitter: '',
          website: '',
          showContactForm: true,
        },
      },
    ],
  },
  {
    name: 'Sunset',
    category: 'sunset',
    layout: 'split',
    thumbnail: '',
    popularity: 105,
    previewData: { name: 'Maya Rivera', tagline: 'Content Strategist' },
    defaultTheme: {
      colorScheme: {
        primary: '#e8553d',
        secondary: '#d97706',
        accent: '#f43f5e',
        background: '#fffaf5',
        text: '#2d1b0e',
      },
      fontPairing: 'Outfit + Nunito',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      {
        type: 'hero',
        order: 0,
        defaultContent: {
          name: 'Maya Rivera',
          tagline: 'Content Strategist',
          subtitle: 'I help brands find their voice and connect with audiences through compelling storytelling.',
          ctaText: 'Learn More',
          ctaLink: '#about',
          secondaryCtaText: 'Work With Me',
          secondaryCtaLink: '#contact',
          profileImage: '',
        },
      },
      {
        type: 'about',
        order: 1,
        defaultContent: {
          bio: "I'm a content strategist with 7+ years of experience helping brands craft narratives that resonate. From startups to Fortune 500s, I bring warmth, clarity, and purpose to every project.",
          profileImage: '',
        },
      },
      {
        type: 'projects',
        order: 2,
        defaultContent: { projects: sampleProjects.slice(0, 3) },
      },
      {
        type: 'testimonials',
        order: 3,
        defaultContent: { testimonials: sampleTestimonials },
      },
      {
        type: 'skills',
        order: 4,
        defaultContent: { skills: sampleSkills },
      },
      {
        type: 'contact',
        order: 5,
        defaultContent: {
          email: 'maya@example.com',
          github: '',
          linkedin: 'https://linkedin.com/in/mayarivera',
          twitter: 'https://twitter.com/mayarivera',
          website: 'https://mayarivera.com',
          showContactForm: true,
        },
      },
    ],
  },
  {
    name: 'Brutalist',
    category: 'brutalist',
    layout: 'grid',
    thumbnail: '',
    popularity: 95,
    previewData: { name: 'Ren Okamoto', tagline: 'Digital Artist' },
    defaultTheme: {
      colorScheme: {
        primary: '#1a1a1a',
        secondary: '#000000',
        accent: '#ff3333',
        background: '#ffffff',
        text: '#0a0a0a',
      },
      fontPairing: 'Space Mono + Work Sans',
      mode: 'light',
      spacing: 'compact',
    },
    sections: [
      {
        type: 'hero',
        order: 0,
        defaultContent: {
          name: 'Ren Okamoto',
          tagline: 'Digital Artist',
          subtitle: 'Experimental interfaces. Generative visuals. Code as a medium.',
          ctaText: 'View Work',
          ctaLink: '#projects',
          secondaryCtaText: '',
          secondaryCtaLink: '',
          profileImage: '',
        },
      },
      {
        type: 'projects',
        order: 1,
        defaultContent: { projects: sampleProjects },
      },
      {
        type: 'about',
        order: 2,
        defaultContent: {
          bio: "I make things on the internet. My work sits somewhere between art and engineering — generative visuals, experimental interfaces, and tools that challenge how we interact with screens.",
          profileImage: '',
        },
      },
      {
        type: 'skills',
        order: 3,
        defaultContent: { skills: sampleSkills },
      },
      {
        type: 'contact',
        order: 4,
        defaultContent: {
          email: 'ren@example.com',
          github: 'https://github.com/renokamoto',
          linkedin: '',
          twitter: 'https://twitter.com/renokamoto',
          website: 'https://renokamoto.art',
          showContactForm: false,
        },
      },
    ],
  },
  {
    name: 'Ocean',
    category: 'ocean',
    layout: 'immersive',
    thumbnail: '',
    popularity: 85,
    previewData: { name: 'Priya Sharma', tagline: 'Data Scientist' },
    defaultTheme: {
      colorScheme: {
        primary: '#0ea5e9',
        secondary: '#6366f1',
        accent: '#38bdf8',
        background: '#0b1929',
        text: '#f0f9ff',
      },
      fontPairing: 'Sora + DM Sans',
      mode: 'dark',
      spacing: 'normal',
    },
    sections: [
      {
        type: 'hero',
        order: 0,
        defaultContent: {
          name: 'Priya Sharma',
          tagline: 'Data Scientist',
          subtitle: 'I turn complex datasets into clear insights that drive real business decisions.',
          ctaText: 'View Resume',
          ctaLink: '#experience',
          secondaryCtaText: 'Get In Touch',
          secondaryCtaLink: '#contact',
          profileImage: '',
        },
      },
      {
        type: 'about',
        order: 1,
        defaultContent: {
          bio: "I'm a data scientist with a background in statistics and machine learning. I specialise in building predictive models and translating data into actionable insights for product and engineering teams.",
          profileImage: '',
        },
      },
      {
        type: 'experience',
        order: 2,
        defaultContent: { entries: sampleExperience },
      },
      {
        type: 'projects',
        order: 3,
        defaultContent: { projects: sampleProjects },
      },
      {
        type: 'education',
        order: 4,
        defaultContent: { entries: sampleEducation },
      },
      {
        type: 'skills',
        order: 5,
        defaultContent: { skills: sampleSkills },
      },
      {
        type: 'contact',
        order: 6,
        defaultContent: {
          email: 'priya@example.com',
          github: 'https://github.com/priyasharma',
          linkedin: 'https://linkedin.com/in/priyasharma',
          twitter: '',
          website: '',
          showContactForm: true,
        },
      },
    ],
  },
  {
    name: 'Pastel',
    category: 'pastel',
    layout: 'showcase',
    thumbnail: '',
    popularity: 75,
    previewData: { name: 'Lily Fontaine', tagline: 'Photographer & Writer' },
    defaultTheme: {
      colorScheme: {
        primary: '#d946ef',
        secondary: '#a855f7',
        accent: '#eab308',
        background: '#f8f5ff',
        text: '#1e1033',
      },
      fontPairing: 'DM Serif Display + Lato',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      {
        type: 'hero',
        order: 0,
        defaultContent: {
          name: 'Lily Fontaine',
          tagline: 'Photographer & Writer',
          subtitle: 'Capturing stories through the lens and on the page. Based in Paris, working worldwide.',
          ctaText: 'View My Portfolio',
          ctaLink: '#projects',
          secondaryCtaText: '',
          secondaryCtaLink: '',
          profileImage: '',
        },
      },
      {
        type: 'about',
        order: 1,
        defaultContent: {
          bio: "I'm a photographer and writer drawn to quiet moments and honest light. My work has appeared in galleries and publications across Europe, and I'm always looking for new stories to tell.",
          profileImage: '',
        },
      },
      {
        type: 'projects',
        order: 2,
        defaultContent: { projects: sampleProjects.slice(0, 3) },
      },
      {
        type: 'testimonials',
        order: 3,
        defaultContent: { testimonials: sampleTestimonials },
      },
      {
        type: 'contact',
        order: 4,
        defaultContent: {
          email: 'lily@example.com',
          github: '',
          linkedin: '',
          twitter: 'https://twitter.com/lilyfontaine',
          website: 'https://lilyfontaine.com',
          showContactForm: true,
        },
      },
    ],
  },
];

async function seedTemplates() {
  try {
    await connectDB();
    await Template.deleteMany({});
    await Template.insertMany(templates);
    console.log('Templates seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

// Also export for use without MongoDB
module.exports = { templates, seedTemplates };

if (require.main === module) {
  seedTemplates();
}

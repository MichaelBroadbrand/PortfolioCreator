import api from './api';

// Fallback seed data for when API isn't available
const fallbackTemplates = [
  {
    _id: '0',
    name: 'Developer',
    category: 'developer',
    layout: 'sidebar',
    thumbnail: '',
    popularity: 150,
    defaultTheme: {
      colorScheme: { primary: '#10b981', secondary: '#059669', accent: '#34d399', background: '#0f172a', text: '#f8fafc' },
      fontPairing: 'Space Grotesk + Inter',
      mode: 'dark',
      spacing: 'normal',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Alex Chen', tagline: 'Full-Stack Developer', subtitle: 'I build robust, scalable web applications with modern technologies.', ctaText: 'View My Work', ctaLink: '#projects' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a full-stack developer with 6+ years of experience building web applications." } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'skills', order: 3, defaultContent: { skills: [] } },
      { type: 'experience', order: 4, defaultContent: { entries: [] } },
      { type: 'contact', order: 5, defaultContent: { email: 'alex@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '1',
    name: 'Designer',
    category: 'designer',
    layout: 'split',
    thumbnail: '',
    popularity: 120,
    defaultTheme: {
      colorScheme: { primary: '#dc6843', secondary: '#c05a38', accent: '#dc6843', background: '#faf8f5', text: '#1a1a1a' },
      fontPairing: 'Playfair Display + Source Sans 3',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Alex Chen', tagline: 'Product Designer', subtitle: 'Creating thoughtful digital experiences that put people first.' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a product designer with a passion for beautiful, functional digital experiences." } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'testimonials', order: 3, defaultContent: { testimonials: [] } },
      { type: 'contact', order: 4, defaultContent: { email: 'alex@example.com' } },
    ],
  },
  {
    _id: '2',
    name: 'Freelancer',
    category: 'freelancer',
    layout: 'standard',
    thumbnail: '',
    popularity: 100,
    defaultTheme: {
      colorScheme: { primary: '#2563eb', secondary: '#1d4ed8', accent: '#f59e0b', background: '#ffffff', text: '#111827' },
      fontPairing: 'Poppins + Nunito',
      mode: 'light',
      spacing: 'normal',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Alex Chen', tagline: 'Freelance Developer & Consultant' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a freelance developer with a track record of delivering high-quality web applications." } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'testimonials', order: 3, defaultContent: { testimonials: [] } },
      { type: 'skills', order: 4, defaultContent: { skills: [] } },
      { type: 'contact', order: 5, defaultContent: { email: 'alex@example.com' } },
    ],
  },
  {
    _id: '3',
    name: 'Minimal',
    category: 'minimal',
    layout: 'standard',
    thumbnail: '',
    popularity: 90,
    defaultTheme: {
      colorScheme: { primary: '#64748b', secondary: '#475569', accent: '#64748b', background: '#ffffff', text: '#0f172a' },
      fontPairing: 'Inter + DM Sans',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Alex Chen', tagline: 'Software Engineer' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a software engineer focused on clean, maintainable applications." } },
      { type: 'experience', order: 2, defaultContent: { entries: [] } },
      { type: 'projects', order: 3, defaultContent: { projects: [] } },
      { type: 'education', order: 4, defaultContent: { entries: [] } },
      { type: 'contact', order: 5, defaultContent: { email: 'alex@example.com' } },
    ],
  },
  {
    _id: '4',
    name: 'Creative',
    category: 'creative',
    layout: 'showcase',
    thumbnail: '',
    popularity: 80,
    defaultTheme: {
      colorScheme: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#ec4899', background: '#0f0f1a', text: '#f8fafc' },
      fontPairing: 'Space Grotesk + Inter',
      mode: 'dark',
      spacing: 'normal',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Alex Chen', tagline: 'Creative Developer' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a creative developer who lives at the intersection of design and technology." } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'skills', order: 3, defaultContent: { skills: [] } },
      { type: 'testimonials', order: 4, defaultContent: { testimonials: [] } },
      { type: 'contact', order: 5, defaultContent: { email: 'alex@example.com' } },
    ],
  },
  {
    _id: '5',
    name: 'Neon',
    category: 'neon',
    layout: 'immersive',
    thumbnail: '',
    popularity: 110,
    defaultTheme: {
      colorScheme: { primary: '#00d4ff', secondary: '#0070f3', accent: '#00ff88', background: '#0a0e1a', text: '#e0f0ff' },
      fontPairing: 'JetBrains Mono + Inter',
      mode: 'dark',
      spacing: 'compact',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Kai Tanaka', tagline: 'Systems Engineer', subtitle: 'I architect high-performance distributed systems and cloud infrastructure at scale.', ctaText: 'See What I Build', ctaLink: '#projects', secondaryCtaText: 'Connect', secondaryCtaLink: '#contact' } },
      { type: 'skills', order: 1, defaultContent: { skills: [] } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'experience', order: 3, defaultContent: { entries: [] } },
      { type: 'contact', order: 4, defaultContent: { email: 'kai@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '6',
    name: 'Sunset',
    category: 'sunset',
    layout: 'split',
    thumbnail: '',
    popularity: 105,
    defaultTheme: {
      colorScheme: { primary: '#e8553d', secondary: '#d97706', accent: '#f43f5e', background: '#fffaf5', text: '#2d1b0e' },
      fontPairing: 'Outfit + Nunito',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Maya Rivera', tagline: 'Content Strategist', subtitle: 'I help brands find their voice and connect with audiences through compelling storytelling.', ctaText: 'Learn More', ctaLink: '#about', secondaryCtaText: 'Work With Me', secondaryCtaLink: '#contact' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a content strategist with 7+ years of experience helping brands craft narratives that resonate." } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'testimonials', order: 3, defaultContent: { testimonials: [] } },
      { type: 'skills', order: 4, defaultContent: { skills: [] } },
      { type: 'contact', order: 5, defaultContent: { email: 'maya@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '7',
    name: 'Brutalist',
    category: 'brutalist',
    layout: 'grid',
    thumbnail: '',
    popularity: 95,
    defaultTheme: {
      colorScheme: { primary: '#1a1a1a', secondary: '#000000', accent: '#ff3333', background: '#ffffff', text: '#0a0a0a' },
      fontPairing: 'Space Mono + Work Sans',
      mode: 'light',
      spacing: 'compact',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Ren Okamoto', tagline: 'Digital Artist', subtitle: 'Experimental interfaces. Generative visuals. Code as a medium.', ctaText: 'View Work', ctaLink: '#projects' } },
      { type: 'projects', order: 1, defaultContent: { projects: [] } },
      { type: 'about', order: 2, defaultContent: { bio: "I make things on the internet. My work sits somewhere between art and engineering." } },
      { type: 'skills', order: 3, defaultContent: { skills: [] } },
      { type: 'contact', order: 4, defaultContent: { email: 'ren@example.com' } },
    ],
  },
  {
    _id: '8',
    name: 'Ocean',
    category: 'ocean',
    layout: 'immersive',
    thumbnail: '',
    popularity: 85,
    defaultTheme: {
      colorScheme: { primary: '#0ea5e9', secondary: '#6366f1', accent: '#38bdf8', background: '#0b1929', text: '#f0f9ff' },
      fontPairing: 'Sora + DM Sans',
      mode: 'dark',
      spacing: 'normal',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Priya Sharma', tagline: 'Data Scientist', subtitle: 'I turn complex datasets into clear insights that drive real business decisions.', ctaText: 'View Resume', ctaLink: '#experience', secondaryCtaText: 'Get In Touch', secondaryCtaLink: '#contact' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a data scientist with a background in statistics and machine learning." } },
      { type: 'experience', order: 2, defaultContent: { entries: [] } },
      { type: 'projects', order: 3, defaultContent: { projects: [] } },
      { type: 'education', order: 4, defaultContent: { entries: [] } },
      { type: 'skills', order: 5, defaultContent: { skills: [] } },
      { type: 'contact', order: 6, defaultContent: { email: 'priya@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '9',
    name: 'Pastel',
    category: 'pastel',
    layout: 'showcase',
    thumbnail: '',
    popularity: 75,
    defaultTheme: {
      colorScheme: { primary: '#d946ef', secondary: '#a855f7', accent: '#eab308', background: '#f8f5ff', text: '#1e1033' },
      fontPairing: 'DM Serif Display + Lato',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Lily Fontaine', tagline: 'Photographer & Writer', subtitle: 'Capturing stories through the lens and on the page. Based in Paris, working worldwide.', ctaText: 'View My Portfolio', ctaLink: '#projects' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a photographer and writer drawn to quiet moments and honest light." } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'testimonials', order: 3, defaultContent: { testimonials: [] } },
      { type: 'contact', order: 4, defaultContent: { email: 'lily@example.com', showContactForm: true } },
    ],
  },
];

export async function getTemplates(category, sort) {
  try {
    const params = {};
    if (category && category !== 'All') params.category = category.toLowerCase();
    if (sort) params.sort = sort;

    const res = await api.get('/templates', { params });
    return res.data.data;
  } catch {
    // Fallback to local data
    let templates = [...fallbackTemplates];
    if (category && category !== 'All') {
      templates = templates.filter((t) => t.category === category.toLowerCase());
    }
    if (sort === 'newest') {
      templates.reverse();
    }
    return templates;
  }
}

export async function getTemplate(id) {
  try {
    const res = await api.get(`/templates/${id}`);
    return res.data.data;
  } catch {
    return fallbackTemplates.find((t) => t._id === id) || fallbackTemplates[parseInt(id)] || null;
  }
}

export { fallbackTemplates };

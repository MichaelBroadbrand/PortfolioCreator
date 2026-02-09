import api from './api';

// Fallback seed data for when API isn't available
const fallbackTemplates = [
  {
    _id: '0',
    name: 'Developer',
    category: 'developer',
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

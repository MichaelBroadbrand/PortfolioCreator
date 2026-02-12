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

  // ── 10 New Templates ──

  {
    _id: '10',
    name: 'Noir',
    category: 'noir',
    layout: 'sidebar',
    thumbnail: '',
    popularity: 130,
    defaultTheme: {
      colorScheme: { primary: '#c9a84c', secondary: '#8b7330', accent: '#f0d78c', background: '#121212', text: '#e8e0d0' },
      fontPairing: 'Bebas Neue + Karla',
      mode: 'dark',
      spacing: 'spacious',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Dominique Voss', tagline: 'Photographer & Filmmaker', subtitle: 'I tell visual stories through light, shadow, and movement. Available for editorial and commercial work.', ctaText: 'View Gallery', ctaLink: '#projects' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a photographer and filmmaker based in Berlin, drawn to the drama of natural light and the stories that unfold in quiet spaces." } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'testimonials', order: 3, defaultContent: { testimonials: [] } },
      { type: 'contact', order: 4, defaultContent: { email: 'dominique@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '11',
    name: 'Ember',
    category: 'ember',
    layout: 'cards',
    thumbnail: '',
    popularity: 115,
    defaultTheme: {
      colorScheme: { primary: '#e07a3b', secondary: '#b85a24', accent: '#f0a868', background: '#1a1008', text: '#f5e6d3' },
      fontPairing: 'Bitter + Rubik',
      mode: 'dark',
      spacing: 'normal',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Rohan Mehta', tagline: 'Backend Engineer', subtitle: 'I design resilient server architectures and data pipelines that power products at scale.', ctaText: 'See My Stack', ctaLink: '#skills' } },
      { type: 'skills', order: 1, defaultContent: { skills: [] } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'experience', order: 3, defaultContent: { entries: [] } },
      { type: 'contact', order: 4, defaultContent: { email: 'rohan@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '12',
    name: 'Architect',
    category: 'architect',
    layout: 'blueprint',
    thumbnail: '',
    popularity: 100,
    defaultTheme: {
      colorScheme: { primary: '#2c2c2c', secondary: '#1a1a1a', accent: '#e63946', background: '#fefefe', text: '#1a1a1a' },
      fontPairing: 'Libre Franklin + IBM Plex Sans',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Clara Henriksen', tagline: 'Architect & Spatial Designer', subtitle: 'Designing spaces where structure meets human experience. Based in Copenhagen.', ctaText: 'View Projects', ctaLink: '#projects' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm an architect with a focus on sustainable residential and public spaces. My practice combines Scandinavian minimalism with biophilic design principles." } },
      { type: 'experience', order: 2, defaultContent: { entries: [] } },
      { type: 'projects', order: 3, defaultContent: { projects: [] } },
      { type: 'education', order: 4, defaultContent: { entries: [] } },
      { type: 'contact', order: 5, defaultContent: { email: 'clara@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '13',
    name: 'Candy',
    category: 'candy',
    layout: 'showcase',
    thumbnail: '',
    popularity: 90,
    defaultTheme: {
      colorScheme: { primary: '#ff6b9d', secondary: '#c44dff', accent: '#00d2d3', background: '#fff5f7', text: '#2d1b34' },
      fontPairing: 'Fredoka + Quicksand',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Zuri Okafor', tagline: 'Illustrator & Animator', subtitle: 'I bring characters and worlds to life with colour, motion, and a lot of heart.', ctaText: 'See My Work', ctaLink: '#projects' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm an illustrator and animator who loves bold colours and playful storytelling. From children's books to brand mascots, I create art that makes people smile." } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'skills', order: 3, defaultContent: { skills: [] } },
      { type: 'testimonials', order: 4, defaultContent: { testimonials: [] } },
      { type: 'contact', order: 5, defaultContent: { email: 'zuri@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '14',
    name: 'Midnight',
    category: 'midnight',
    layout: 'split',
    thumbnail: '',
    popularity: 120,
    defaultTheme: {
      colorScheme: { primary: '#3b82f6', secondary: '#1e40af', accent: '#60a5fa', background: '#0c1222', text: '#dbeafe' },
      fontPairing: 'Cormorant Garamond + Fira Sans',
      mode: 'dark',
      spacing: 'normal',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'James Whitfield', tagline: 'Product Manager', subtitle: 'I ship products that users love, bridging strategy, design, and engineering.', ctaText: 'My Experience', ctaLink: '#experience' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a product manager with 8+ years leading cross-functional teams at high-growth startups." } },
      { type: 'experience', order: 2, defaultContent: { entries: [] } },
      { type: 'projects', order: 3, defaultContent: { projects: [] } },
      { type: 'skills', order: 4, defaultContent: { skills: [] } },
      { type: 'contact', order: 5, defaultContent: { email: 'james@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '15',
    name: 'Terracotta',
    category: 'terracotta',
    layout: 'magazine',
    thumbnail: '',
    popularity: 95,
    defaultTheme: {
      colorScheme: { primary: '#c67a4b', secondary: '#a0603a', accent: '#7c9a5e', background: '#f5efe6', text: '#3d2b1f' },
      fontPairing: 'Lora + Cabin',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Amara Nwosu', tagline: 'Writer & Essayist', subtitle: 'I write about culture, identity, and the spaces between. Essays, features, and long-form storytelling.', ctaText: 'Read My Work', ctaLink: '#projects' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a writer and essayist exploring themes of belonging, displacement, and everyday beauty." } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'testimonials', order: 3, defaultContent: { testimonials: [] } },
      { type: 'contact', order: 4, defaultContent: { email: 'amara@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '16',
    name: 'Graphite',
    category: 'graphite',
    layout: 'technical',
    thumbnail: '',
    popularity: 105,
    defaultTheme: {
      colorScheme: { primary: '#6b7280', secondary: '#4b5563', accent: '#22d3ee', background: '#1a1a1e', text: '#e5e7eb' },
      fontPairing: 'Rajdhani + Barlow',
      mode: 'dark',
      spacing: 'compact',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Viktor Andersen', tagline: 'Systems Engineer', subtitle: 'Infrastructure. Automation. Reliability. I build the foundations that products depend on.', ctaText: 'View Projects', ctaLink: '#projects' } },
      { type: 'projects', order: 1, defaultContent: { projects: [] } },
      { type: 'skills', order: 2, defaultContent: { skills: [] } },
      { type: 'experience', order: 3, defaultContent: { entries: [] } },
      { type: 'about', order: 4, defaultContent: { bio: "I'm a systems engineer who thrives in the command line. I design and maintain the infrastructure behind high-traffic applications." } },
      { type: 'contact', order: 5, defaultContent: { email: 'viktor@example.com', showContactForm: false } },
    ],
  },
  {
    _id: '17',
    name: 'Aurora',
    category: 'aurora',
    layout: 'cards',
    thumbnail: '',
    popularity: 125,
    defaultTheme: {
      colorScheme: { primary: '#06b6d4', secondary: '#a855f7', accent: '#10b981', background: '#0a0a1a', text: '#e0f2fe' },
      fontPairing: 'Geologica + Lexend',
      mode: 'dark',
      spacing: 'normal',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Suki Yamamoto', tagline: 'Creative Technologist', subtitle: 'I build at the intersection of art and technology — generative visuals, interactive installations, and experimental interfaces.', ctaText: 'Explore Work', ctaLink: '#projects' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a creative technologist based in Tokyo. My practice spans generative art, WebGL experiments, interactive installations, and creative coding workshops." } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'skills', order: 3, defaultContent: { skills: [] } },
      { type: 'testimonials', order: 4, defaultContent: { testimonials: [] } },
      { type: 'contact', order: 5, defaultContent: { email: 'suki@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '18',
    name: 'Ivory',
    category: 'ivory',
    layout: 'magazine',
    thumbnail: '',
    popularity: 110,
    defaultTheme: {
      colorScheme: { primary: '#8b7355', secondary: '#6b5940', accent: '#c9a84c', background: '#faf7f2', text: '#2c2418' },
      fontPairing: 'Cormorant + Jost',
      mode: 'light',
      spacing: 'spacious',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Isabelle Laurent', tagline: 'Strategy Consultant', subtitle: 'I help organisations navigate complexity and unlock sustainable growth through clear-eyed strategy.', ctaText: 'My Background', ctaLink: '#experience' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a strategy consultant with 12+ years advising C-suite leaders across fintech, healthcare, and sustainability." } },
      { type: 'experience', order: 2, defaultContent: { entries: [] } },
      { type: 'testimonials', order: 3, defaultContent: { testimonials: [] } },
      { type: 'contact', order: 4, defaultContent: { email: 'isabelle@example.com', showContactForm: true } },
    ],
  },
  {
    _id: '19',
    name: 'Volt',
    category: 'volt',
    layout: 'showcase',
    thumbnail: '',
    popularity: 118,
    defaultTheme: {
      colorScheme: { primary: '#eab308', secondary: '#ca8a04', accent: '#fbbf24', background: '#0a0a0a', text: '#fefce8' },
      fontPairing: 'Anton + Archivo',
      mode: 'dark',
      spacing: 'normal',
    },
    sections: [
      { type: 'hero', order: 0, defaultContent: { name: 'Marcus Cole', tagline: 'Growth Marketer', subtitle: 'I turn startups into household names. Data-driven campaigns, viral loops, and conversion machines.', ctaText: 'See Results', ctaLink: '#projects' } },
      { type: 'about', order: 1, defaultContent: { bio: "I'm a growth marketer who has scaled three startups from zero to seven figures in revenue." } },
      { type: 'projects', order: 2, defaultContent: { projects: [] } },
      { type: 'skills', order: 3, defaultContent: { skills: [] } },
      { type: 'experience', order: 4, defaultContent: { entries: [] } },
      { type: 'contact', order: 5, defaultContent: { email: 'marcus@example.com', showContactForm: true } },
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

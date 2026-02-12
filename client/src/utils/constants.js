export const SECTION_TYPES = {
  HERO: 'hero',
  ABOUT: 'about',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  CONTACT: 'contact',
  TESTIMONIALS: 'testimonials',
  CUSTOM: 'custom',
};

export const PORTFOLIO_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

export const TEMPLATE_CATEGORIES = [
  'All',
  'Developer',
  'Designer',
  'Freelancer',
  'Minimal',
  'Creative',
  'Neon',
  'Sunset',
  'Brutalist',
  'Ocean',
  'Pastel',
  'Noir',
  'Ember',
  'Architect',
  'Candy',
  'Midnight',
  'Terracotta',
  'Graphite',
  'Aurora',
  'Ivory',
  'Volt',
];

export const MAX_SECTIONS = 15;
export const MAX_PORTFOLIOS_FREE = 5;

export const PLANS = {
  FREE: 'free',
  PRO: 'pro',
};

export const PLAN_FEATURES = {
  free: {
    name: 'Free',
    price: '$0',
    portfolios: MAX_PORTFOLIOS_FREE,
    ai: false,
    premiumTemplates: false,
  },
  pro: {
    name: 'Pro',
    price: '$9/mo',
    portfolios: 'Unlimited',
    ai: true,
    premiumTemplates: true,
  },
};
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const AUTO_SAVE_INTERVAL = 3000; // 3 seconds

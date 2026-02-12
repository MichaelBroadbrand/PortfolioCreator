import { Github, Linkedin, Twitter, Globe, Mail, ExternalLink } from 'lucide-react';
import ContactForm from '../ContactForm';

/**
 * Parse a font pairing into separate font families.
 * Accepts either an object { heading, body } or a "HeadingFont + BodyFont" string.
 */
export function parseFontPairing(fontPairing) {
  if (!fontPairing) return { heading: 'sans-serif', body: 'sans-serif' };
  if (typeof fontPairing === 'object') {
    return {
      heading: fontPairing.heading || 'sans-serif',
      body: fontPairing.body || 'sans-serif',
    };
  }
  const parts = fontPairing.split('+').map((s) => s.trim());
  return {
    heading: parts[0] || 'sans-serif',
    body: parts[1] || parts[0] || 'sans-serif',
  };
}

/**
 * Injects a Google Fonts <link> into the document head.
 * Deduplicates by checking existing links.
 */
export function useGoogleFonts(fontPairing) {
  const fonts = parseFontPairing(fontPairing);
  const allFonts = [...new Set([fonts.heading, fonts.body])];
  const families = allFonts
    .map((f) => f.replace(/ /g, '+') + ':wght@300;400;500;600;700;800')
    .join('&family=');
  const href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;

  // Check if already injected
  if (typeof document !== 'undefined') {
    const existing = document.querySelector(`link[href="${href}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }

  return fonts;
}

/**
 * Social link icons shared across layouts.
 */
const socialDefs = [
  { key: 'github', icon: Github, label: 'GitHub' },
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  { key: 'twitter', icon: Twitter, label: 'Twitter' },
  { key: 'website', icon: Globe, label: 'Website' },
];

export function SocialLinks({ content, colorScheme, className = '' }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {socialDefs.map(({ key, icon: Icon, label }) =>
        content[key] ? (
          <a
            key={key}
            href={content[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full transition-colors"
            style={{ backgroundColor: `${colorScheme.primary}15`, color: colorScheme.primary }}
            title={label}
          >
            <Icon className="w-5 h-5" />
          </a>
        ) : null
      )}
    </div>
  );
}

export function ContactSection({ content, theme, slug }) {
  const cs = theme.colorScheme || {};
  return (
    <div className="text-center">
      {content.email && (
        <a
          href={`mailto:${content.email}`}
          className="inline-flex items-center gap-2 text-lg mb-6"
          style={{ color: cs.primary }}
        >
          <Mail className="w-5 h-5" /> {content.email}
        </a>
      )}
      <SocialLinks content={content} colorScheme={cs} className="justify-center mb-8" />
      {content.showContactForm && <ContactForm slug={slug} theme={theme} />}
    </div>
  );
}

export { ExternalLink, Github, Mail };

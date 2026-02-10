import { useState, useEffect } from 'react';
import { parseFontPairing, useGoogleFonts, SocialLinks, ContactSection, ExternalLink, Github } from './shared';

const spacingMap = {
  compact: 'py-8 px-6',
  normal: 'py-16 px-8',
  spacious: 'py-24 px-8',
};

/* ── Section Renderers ───────────────────────────────────────────────── */

function Hero({ content, cs, fonts }) {
  return (
    <section
      className="min-h-[60vh] flex items-center justify-center text-center"
      style={{ backgroundColor: cs.background, color: cs.text }}
    >
      <div className="max-w-3xl mx-auto px-6 py-20">
        {content.profileImage && (
          <img
            src={content.profileImage}
            alt={content.name}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4"
            style={{ borderColor: cs.primary }}
          />
        )}
        <h1 className="text-5xl md:text-6xl font-bold mb-3" style={{ fontFamily: fonts.heading }}>
          {content.name || 'Your Name'}
        </h1>
        <p className="text-xl md:text-2xl mb-2 font-medium" style={{ color: cs.primary }}>
          {content.tagline || 'Your Tagline'}
        </p>
        {content.subtitle && (
          <p className="text-lg opacity-70 max-w-xl mx-auto mb-8">{content.subtitle}</p>
        )}
        <div className="flex gap-4 justify-center flex-wrap">
          {content.ctaText && (
            <a
              href={content.ctaLink || '#'}
              className="inline-block px-8 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: cs.primary }}
            >
              {content.ctaText}
            </a>
          )}
          {content.ctaTextSecondary && (
            <a
              href={content.ctaLinkSecondary || '#'}
              className="inline-block px-8 py-3 rounded-lg font-medium border-2 transition-opacity hover:opacity-80"
              style={{ borderColor: cs.primary, color: cs.primary }}
            >
              {content.ctaTextSecondary}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function About({ content, cs, fonts }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: fonts.heading, color: cs.text }}>About</h2>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {content.profileImage && (
          <img src={content.profileImage} alt="Profile" className="w-48 h-48 rounded-xl object-cover shrink-0" />
        )}
        <p className="leading-relaxed text-lg" style={{ fontFamily: fonts.body, color: cs.text, opacity: 0.8 }}>
          {content.bio}
        </p>
      </div>
    </div>
  );
}

function Projects({ content, cs, fonts, isDark }) {
  const projects = content.projects || [];
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: fonts.heading, color: cs.text }}>Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: isDark ? `${cs.background}` : '#fff',
              border: isDark ? `1px solid ${cs.text}15` : 'none',
              boxShadow: isDark ? 'none' : '0 0 0 1px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)',
            }}
          >
            {p.image && <img src={p.image} alt={p.title} className="w-full aspect-video object-cover" />}
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2" style={{ color: cs.text }}>{p.title}</h3>
              <p className="text-sm mb-3" style={{ color: cs.text, opacity: 0.6 }}>{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(p.tags || []).map((tag, j) => (
                  <span key={j} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${cs.primary}20`, color: cs.primary }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium" style={{ color: cs.primary }}>
                    <ExternalLink className="w-3.5 h-3.5" /> Live
                  </a>
                )}
                {p.sourceUrl && (
                  <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium" style={{ color: cs.primary }}>
                    <Github className="w-3.5 h-3.5" /> Source
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Skills({ content, cs, fonts }) {
  const skills = content.skills || [];
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: fonts.heading, color: cs.text }}>Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((s, i) => {
          const name = typeof s === 'string' ? s : s.name;
          return (
            <span key={i} className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: `${cs.primary}15`, color: cs.primary }}>
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Experience({ content, cs, fonts }) {
  const entries = content.entries || [];
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: fonts.heading, color: cs.text }}>Experience</h2>
      <div className="space-y-8">
        {entries.map((e, i) => (
          <div key={i} className="relative pl-6 border-l-2" style={{ borderColor: cs.primary }}>
            <div
              className="absolute -left-[7px] top-1 w-3 h-3 rounded-full"
              style={{ backgroundColor: cs.primary }}
            />
            <h3 className="font-semibold text-lg" style={{ color: cs.text }}>{e.role}</h3>
            <p className="font-medium" style={{ color: cs.primary }}>{e.company}</p>
            <p className="text-sm mt-0.5" style={{ color: cs.text, opacity: 0.5 }}>
              {e.startDate} — {e.current ? 'Present' : e.endDate}
            </p>
            {e.description && <p className="mt-2" style={{ color: cs.text, opacity: 0.7 }}>{e.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Education({ content, cs, fonts }) {
  const entries = content.entries || [];
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: fonts.heading, color: cs.text }}>Education</h2>
      <div className="space-y-6">
        {entries.map((e, i) => (
          <div key={i}>
            <h3 className="font-semibold text-lg" style={{ color: cs.text }}>{e.degree}</h3>
            <p className="font-medium" style={{ color: cs.primary }}>{e.institution}</p>
            <p className="text-sm" style={{ color: cs.text, opacity: 0.5 }}>
              {e.startYear} — {e.current ? 'Present' : e.endYear}
            </p>
            {e.description && <p className="mt-1" style={{ color: cs.text, opacity: 0.7 }}>{e.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials({ content, cs, fonts, isDark }) {
  const testimonials = content.testimonials || [];
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: fonts.heading, color: cs.text }}>Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-6 rounded-xl"
            style={{
              backgroundColor: isDark ? `${cs.text}08` : `${cs.primary}06`,
              border: isDark ? `1px solid ${cs.text}10` : 'none',
            }}
          >
            <p className="text-base italic mb-4" style={{ color: cs.text, opacity: 0.8 }}>"{t.quote}"</p>
            <div className="flex items-center gap-3">
              {t.avatar && <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
              <div>
                <p className="font-semibold text-sm" style={{ color: cs.text }}>{t.name}</p>
                <p className="text-xs" style={{ color: cs.text, opacity: 0.5 }}>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Custom({ content, cs, fonts }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: fonts.heading, color: cs.text }}>
        {content.title || 'Custom Section'}
      </h2>
      <div
        className="prose prose-lg max-w-none"
        style={{ color: cs.text, opacity: 0.8 }}
        dangerouslySetInnerHTML={{ __html: content.body || '' }}
      />
    </div>
  );
}

const sectionRenderers = {
  hero: Hero,
  about: About,
  projects: Projects,
  skills: Skills,
  experience: Experience,
  education: Education,
  testimonials: Testimonials,
  custom: Custom,
};

/* ── Main Layout ─────────────────────────────────────────────────────── */

export default function StandardLayout({ portfolio }) {
  const theme = portfolio.theme || {};
  const cs = theme.colorScheme || {};
  const isDark = theme.mode === 'dark';
  const fonts = parseFontPairing(theme.fontPairing);
  const spacing = spacingMap[theme.spacing] || spacingMap.normal;

  useGoogleFonts(theme.fontPairing);

  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visibleSections = [...(portfolio.sections || [])]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  const navSections = visibleSections.filter((s) => s.type !== 'hero');

  const cardBg = isDark ? cs.background : '#ffffff';
  const cardBorder = isDark ? `1px solid ${cs.text}12` : 'none';
  const cardShadow = isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)';

  return (
    <div style={{ backgroundColor: isDark ? '#0a0a0a' : cs.background, fontFamily: fonts.body, minHeight: '100vh' }}>
      {/* Sticky nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
        style={{
          transform: showNav ? 'translateY(0)' : 'translateY(-100%)',
          backgroundColor: isDark ? `${cs.background}ee` : '#ffffffee',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${isDark ? cs.text + '10' : 'rgba(0,0,0,0.06)'}`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-semibold text-sm" style={{ color: cs.text, fontFamily: fonts.heading }}>
            {portfolio.name}
          </span>
          <div className="flex gap-4">
            {navSections.map((s) => (
              <a
                key={s._id}
                href={`#${s.type}`}
                className="text-xs font-medium capitalize transition-colors hover:opacity-80"
                style={{ color: cs.text, opacity: 0.6 }}
              >
                {s.type}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Card container */}
      <div className="max-w-4xl mx-auto" style={{ maxWidth: '56rem' }}>
        <div
          className="rounded-none md:rounded-2xl md:my-8 overflow-hidden"
          style={{ backgroundColor: cardBg, border: cardBorder, boxShadow: cardShadow }}
        >
          {visibleSections.map((section) => {
            const isHero = section.type === 'hero';
            const isContact = section.type === 'contact';

            if (isContact) {
              return (
                <section key={section._id} id={section.type} className={spacing}>
                  <ContactSection content={section.content || {}} theme={theme} slug={portfolio.slug} />
                </section>
              );
            }

            const Renderer = sectionRenderers[section.type];
            if (!Renderer) return null;

            return (
              <section key={section._id} id={section.type} className={isHero ? '' : spacing}>
                <Renderer
                  content={section.content || {}}
                  cs={cs}
                  fonts={fonts}
                  isDark={isDark}
                />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

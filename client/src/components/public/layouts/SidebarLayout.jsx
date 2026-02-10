import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { parseFontPairing, useGoogleFonts, SocialLinks, ContactSection, ExternalLink, Github } from './shared';

const spacingMap = {
  compact: { py: '2rem', gap: '2rem' },
  normal: { py: '4rem', gap: '3rem' },
  spacious: { py: '6rem', gap: '4rem' },
};

const sectionLabels = {
  about: 'About',
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  testimonials: 'Testimonials',
  contact: 'Contact',
  custom: 'More',
};

function getSidebarBg(theme) {
  const cs = theme.colorScheme || {};
  if (theme.mode === 'dark') {
    return `linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05)), ${cs.background}`;
  }
  return `linear-gradient(0deg, rgba(0,0,0,0.03), rgba(0,0,0,0.03)), ${cs.background}`;
}

/* ── Section Renderers ───────────────────────────────────────────── */

function AboutSection({ content, theme, fonts }) {
  const cs = theme.colorScheme || {};
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: fonts.heading, color: cs.text }}>
        About
      </h2>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {content.profileImage && (
          <img
            src={content.profileImage}
            alt="Profile"
            className="w-44 h-44 rounded-xl object-cover shrink-0"
          />
        )}
        <p className="leading-relaxed text-base" style={{ fontFamily: fonts.body, color: cs.text, opacity: 0.85 }}>
          {content.bio}
        </p>
      </div>
    </div>
  );
}

function ProjectsSection({ content, theme, fonts }) {
  const cs = theme.colorScheme || {};
  const projects = content.projects || [];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: fonts.heading, color: cs.text }}>
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden"
            style={{
              backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
            }}
          >
            {p.image && (
              <img src={p.image} alt={p.title} className="w-full aspect-video object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-base font-semibold mb-1" style={{ color: cs.text }}>
                {p.title}
              </h3>
              <p className="text-sm mb-3" style={{ color: cs.text, opacity: 0.6 }}>
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(p.tags || []).map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${cs.primary}20`, color: cs.primary }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium"
                    style={{ color: cs.primary }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live
                  </a>
                )}
                {p.sourceUrl && (
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium"
                    style={{ color: cs.primary }}
                  >
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

function SkillsSection({ content, theme, fonts }) {
  const cs = theme.colorScheme || {};
  const skills = content.skills || [];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: fonts.heading, color: cs.text }}>
        Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => {
          const name = typeof s === 'string' ? s : s.name;
          return (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full text-sm font-medium"
              style={{ backgroundColor: `${cs.primary}15`, color: cs.primary }}
            >
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function ExperienceSection({ content, theme, fonts }) {
  const cs = theme.colorScheme || {};
  const entries = content.entries || [];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: fonts.heading, color: cs.text }}>
        Experience
      </h2>
      <div className="space-y-6">
        {entries.map((e, i) => (
          <div key={i} className="relative pl-6 border-l-2" style={{ borderColor: cs.primary }}>
            <div
              className="absolute -left-[7px] top-1 w-3 h-3 rounded-full"
              style={{ backgroundColor: cs.primary }}
            />
            <h3 className="font-semibold text-base" style={{ color: cs.text }}>{e.role}</h3>
            <p className="font-medium text-sm" style={{ color: cs.primary }}>{e.company}</p>
            <p className="text-xs mt-0.5" style={{ color: cs.text, opacity: 0.5 }}>
              {e.startDate} — {e.current ? 'Present' : e.endDate}
            </p>
            <p className="mt-2 text-sm" style={{ color: cs.text, opacity: 0.75 }}>{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationSection({ content, theme, fonts }) {
  const cs = theme.colorScheme || {};
  const entries = content.entries || [];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: fonts.heading, color: cs.text }}>
        Education
      </h2>
      <div className="space-y-5">
        {entries.map((e, i) => (
          <div key={i}>
            <h3 className="font-semibold text-base" style={{ color: cs.text }}>{e.degree}</h3>
            <p className="font-medium text-sm" style={{ color: cs.primary }}>{e.institution}</p>
            <p className="text-xs" style={{ color: cs.text, opacity: 0.5 }}>
              {e.startYear} — {e.current ? 'Present' : e.endYear}
            </p>
            {e.description && (
              <p className="mt-1 text-sm" style={{ color: cs.text, opacity: 0.75 }}>{e.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection({ content, theme, fonts }) {
  const cs = theme.colorScheme || {};
  const testimonials = content.testimonials || [];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: fonts.heading, color: cs.text }}>
        Testimonials
      </h2>
      <div className="space-y-5">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-5 rounded-lg"
            style={{
              backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
            }}
          >
            <p className="text-sm italic mb-3" style={{ color: cs.text, opacity: 0.8 }}>
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              {t.avatar && (
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
              )}
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

function CustomSection({ content, theme, fonts }) {
  const cs = theme.colorScheme || {};
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: fonts.heading, color: cs.text }}>
        {content.title || 'Custom Section'}
      </h2>
      <div
        className="prose prose-sm max-w-none"
        style={{ color: cs.text, opacity: 0.85 }}
        dangerouslySetInnerHTML={{ __html: content.body || '' }}
      />
    </div>
  );
}

const renderers = {
  about: AboutSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  education: EducationSection,
  testimonials: TestimonialsSection,
  custom: CustomSection,
};

/* ── Main Layout ─────────────────────────────────────────────────── */

export default function SidebarLayout({ portfolio }) {
  const theme = portfolio.theme || {};
  const cs = theme.colorScheme || {};
  const fonts = useGoogleFonts(theme.fontPairing);
  const spacing = spacingMap[theme.spacing] || spacingMap.normal;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const visibleSections = [...(portfolio.sections || [])]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  const heroSection = visibleSections.find((s) => s.type === 'hero');
  const heroContent = heroSection?.content || {};
  const contentSections = visibleSections.filter((s) => s.type !== 'hero');
  const contactSection = visibleSections.find((s) => s.type === 'contact');
  const contactContent = contactSection?.content || {};

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offsets = contentSections.map((s) => {
        const el = document.getElementById(s.type);
        if (!el) return { type: s.type, top: Infinity };
        return { type: s.type, top: el.getBoundingClientRect().top };
      });
      const current = offsets.reduce((closest, item) => {
        if (item.top <= 120 && item.top > closest.top) return item;
        return closest;
      }, { type: contentSections[0]?.type || '', top: -Infinity });
      setActiveSection(current.type);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentSections.length]);

  const scrollTo = (sectionType) => {
    const el = document.getElementById(sectionType);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const sidebarBg = getSidebarBg(theme);

  return (
    <div style={{ backgroundColor: cs.background, color: cs.text, fontFamily: fonts.body, minHeight: '100vh' }}>
      {/* Smooth scroll style */}
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* ── Desktop Sidebar ──────────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-screen z-30"
        style={{
          width: 280,
          background: sidebarBg,
          borderRight: `1px solid ${cs.text}10`,
        }}
      >
        <div className="flex-1 flex flex-col px-6 py-8 overflow-y-auto">
          {/* Profile */}
          <div className="mb-8">
            {heroContent.profileImage && (
              <img
                src={heroContent.profileImage}
                alt={heroContent.name || portfolio.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-2"
                style={{ borderColor: cs.primary }}
              />
            )}
            <h1
              className="text-xl font-bold leading-tight"
              style={{ fontFamily: fonts.heading, color: cs.text }}
            >
              {heroContent.name || portfolio.name || 'Portfolio'}
            </h1>
            {heroContent.tagline && (
              <p className="text-sm mt-1 font-medium" style={{ color: cs.primary }}>
                {heroContent.tagline}
              </p>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {contentSections.map((section) => {
                const isActive = activeSection === section.type;
                const label = section.type === 'custom'
                  ? (section.content?.title || sectionLabels.custom)
                  : (sectionLabels[section.type] || section.type);
                return (
                  <li key={section._id}>
                    <button
                      onClick={() => scrollTo(section.type)}
                      className="w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                      style={{
                        color: isActive ? cs.primary : cs.text,
                        opacity: isActive ? 1 : 0.6,
                        backgroundColor: isActive ? `${cs.primary}10` : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.opacity = '0.85';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.opacity = '0.6';
                      }}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social Links at bottom */}
          <div className="mt-auto pt-6">
            <SocialLinks content={contactContent} colorScheme={cs} />
          </div>
        </div>
      </aside>

      {/* ── Mobile Top Bar ───────────────────────────────────────── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4"
        style={{
          height: 60,
          background: sidebarBg,
          borderBottom: `1px solid ${cs.text}10`,
        }}
      >
        <div className="flex items-center gap-3">
          {heroContent.profileImage && (
            <img
              src={heroContent.profileImage}
              alt={heroContent.name || portfolio.name}
              className="w-8 h-8 rounded-full object-cover border"
              style={{ borderColor: cs.primary }}
            />
          )}
          <span className="font-semibold text-sm" style={{ fontFamily: fonts.heading, color: cs.text }}>
            {heroContent.name || portfolio.name || 'Portfolio'}
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md transition-colors"
          style={{ color: cs.text }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* ── Mobile Drawer ────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30"
          style={{ top: 60, background: sidebarBg }}
        >
          <nav className="px-6 py-6">
            <ul className="space-y-1">
              {contentSections.map((section) => {
                const label = section.type === 'custom'
                  ? (section.content?.title || sectionLabels.custom)
                  : (sectionLabels[section.type] || section.type);
                return (
                  <li key={section._id}>
                    <button
                      onClick={() => scrollTo(section.type)}
                      className="w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors"
                      style={{
                        color: activeSection === section.type ? cs.primary : cs.text,
                        opacity: activeSection === section.type ? 1 : 0.7,
                      }}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 px-4">
              <SocialLinks content={contactContent} colorScheme={cs} />
            </div>
          </nav>
        </div>
      )}

      {/* ── Main Content Area ────────────────────────────────────── */}
      <main
        className="min-h-screen"
        style={{
          marginLeft: 'var(--sidebar-offset, 0px)',
          paddingTop: 'var(--content-top, 60px)',
        }}
      >
        {/* CSS custom properties for responsive sidebar offset */}
        <style>{`
          @media (min-width: 768px) {
            main { --sidebar-offset: 280px; --content-top: 0px; }
          }
          @media (max-width: 767px) {
            main { --sidebar-offset: 0px; --content-top: 60px; }
          }
        `}</style>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: `${spacing.py} 1.5rem` }}>
          {/* Hero subtitle as intro text */}
          {heroContent.subtitle && (
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: cs.text, opacity: 0.7, fontFamily: fonts.body, maxWidth: 640 }}
            >
              {heroContent.subtitle}
            </p>
          )}

          {/* Content Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.gap }}>
            {contentSections.map((section) => {
              if (section.type === 'contact') {
                return (
                  <section key={section._id} id={section.type} style={{ paddingTop: spacing.py }}>
                    <h2
                      className="text-2xl font-bold mb-6"
                      style={{ fontFamily: fonts.heading, color: cs.text }}
                    >
                      Contact
                    </h2>
                    <ContactSection
                      content={section.content || {}}
                      theme={theme}
                      slug={portfolio.slug}
                    />
                  </section>
                );
              }

              const Renderer = renderers[section.type];
              if (!Renderer) return null;

              return (
                <section key={section._id} id={section.type} style={{ paddingTop: spacing.py }}>
                  <Renderer
                    content={section.content || {}}
                    theme={theme}
                    fonts={fonts}
                  />
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

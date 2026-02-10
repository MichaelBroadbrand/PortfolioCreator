import { parseFontPairing, useGoogleFonts, SocialLinks, ContactSection, ExternalLink, Github } from './shared';

const spacingMap = {
  compact: { section: '3rem', inner: '2rem' },
  normal: { section: '5rem', inner: '3rem' },
  spacious: { section: '7rem', inner: '4rem' },
};

/* ── Decorative Heading ──────────────────────────────────────────────── */

function SectionHeading({ title, align, cs, fonts }) {
  const isLeft = align === 'left';
  return (
    <div className="flex items-center gap-4 mb-8" style={{ flexDirection: isLeft ? 'row' : 'row-reverse' }}>
      <h2
        className="text-3xl md:text-4xl font-normal shrink-0"
        style={{ fontFamily: fonts.heading, color: cs.text }}
      >
        {title}
      </h2>
      <div className="flex-1" style={{ height: 2, backgroundColor: cs.primary, opacity: 0.25 }} />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */

function Hero({ content, cs, fonts }) {
  return (
    <section className="min-h-screen flex flex-col md:flex-row" id="hero">
      {/* Left half — text */}
      <div
        className="flex-1 flex items-center justify-center px-8 md:px-16 py-20 md:py-0"
        style={{ backgroundColor: cs.background }}
      >
        <div className="max-w-lg">
          <h1
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
            style={{ fontFamily: fonts.heading, color: cs.text }}
          >
            {content.name || 'Your Name'}
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-3" style={{ color: cs.primary }}>
            {content.tagline || 'Your Tagline'}
          </p>
          {content.subtitle && (
            <p className="text-lg mb-8 leading-relaxed" style={{ color: cs.text, opacity: 0.65 }}>
              {content.subtitle}
            </p>
          )}
          <div className="flex gap-4 flex-wrap">
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
      </div>
      {/* Right half — image or decorative */}
      <div className="flex-1 relative min-h-[40vh] md:min-h-0 overflow-hidden" style={{ backgroundColor: cs.background }}>
        {content.profileImage ? (
          <img
            src={content.profileImage}
            alt={content.name || 'Profile'}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full"
              style={{
                width: '70%',
                paddingBottom: '70%',
                backgroundColor: `${cs.primary}1A`,
                position: 'relative',
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: '40%',
                  height: '40%',
                  bottom: '10%',
                  right: '10%',
                  backgroundColor: `${cs.accent || cs.primary}30`,
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  width: '20%',
                  height: '20%',
                  top: '15%',
                  left: '20%',
                  backgroundColor: `${cs.accent || cs.primary}20`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Section Renderers ────────────────────────────────────────────────── */

function About({ content, cs, fonts, align }) {
  const bio = content.bio || '';
  const firstSentence = bio.split(/(?<=[.!?])\s+/)[0] || '';
  const rest = bio.slice(firstSentence.length).trim();
  const isLeft = align === 'left';

  return (
    <div className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-start`}>
      <div className="flex-1">
        {firstSentence && (
          <p className="text-2xl leading-relaxed mb-4 font-light" style={{ color: cs.primary, fontFamily: fonts.heading }}>
            {firstSentence}
          </p>
        )}
        {rest && (
          <p className="text-lg leading-relaxed" style={{ color: cs.text, opacity: 0.75, fontFamily: fonts.body }}>
            {rest}
          </p>
        )}
      </div>
      {content.profileImage && (
        <img
          src={content.profileImage}
          alt="Profile"
          className="w-48 h-48 rounded-xl object-cover shrink-0"
        />
      )}
    </div>
  );
}

function Projects({ content, cs, fonts, isDark }) {
  const projects = content.projects || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden"
          style={{
            border: `1px solid ${isDark ? `${cs.text}15` : `${cs.text}10`}`,
          }}
        >
          {p.image && <img src={p.image} alt={p.title} className="w-full aspect-video object-cover" />}
          <div className="p-5">
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: fonts.heading, color: cs.text }}>
              {p.title}
            </h3>
            <p className="text-sm mb-3 leading-relaxed" style={{ color: cs.text, opacity: 0.6 }}>
              {p.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {(p.tags || []).map((tag, j) => (
                <span key={j} className="text-xs font-medium" style={{ color: cs.primary }}>
                  {tag}{j < p.tags.length - 1 ? ' /' : ''}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70"
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
                  className="flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70"
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
  );
}

function Skills({ content, cs, fonts }) {
  const skills = content.skills || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
      {skills.map((s, i) => {
        const name = typeof s === 'string' ? s : s.name;
        const level = typeof s === 'object' ? (s.level || 70) : 70;
        return (
          <div key={i} className="flex items-center gap-4">
            <span className="text-sm font-medium w-28 shrink-0" style={{ color: cs.text, fontFamily: fonts.heading }}>
              {name}
            </span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `${cs.primary}15` }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${level}%`, backgroundColor: cs.primary, opacity: 0.7 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Experience({ content, cs, fonts, isDark }) {
  const entries = content.entries || [];
  return (
    <div className="space-y-6">
      {entries.map((e, i) => {
        const isEven = i % 2 === 0;
        return (
          <div
            key={i}
            className={`md:w-4/5 ${isEven ? '' : 'md:ml-auto'}`}
          >
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: isDark ? `${cs.text}06` : `${cs.primary}04`,
                border: `1px solid ${isDark ? `${cs.text}10` : `${cs.primary}10`}`,
              }}
            >
              <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: fonts.heading, color: cs.text }}>
                {e.company}
              </h3>
              <p className="font-medium mb-2" style={{ color: cs.primary }}>{e.role}</p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm" style={{ color: cs.text, opacity: 0.5 }}>
                  {e.startDate} — {e.current ? 'Present' : e.endDate}
                </span>
                <div className="flex-1" style={{ height: 1, backgroundColor: cs.text, opacity: 0.1 }} />
              </div>
              {e.description && (
                <p className="text-sm leading-relaxed" style={{ color: cs.text, opacity: 0.7 }}>
                  {e.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Education({ content, cs, fonts, isDark }) {
  const entries = content.entries || [];
  return (
    <div className="space-y-5">
      {entries.map((e, i) => (
        <div
          key={i}
          className="p-5 rounded-xl"
          style={{
            backgroundColor: isDark ? `${cs.text}06` : `${cs.primary}04`,
            border: `1px solid ${isDark ? `${cs.text}10` : `${cs.primary}10`}`,
          }}
        >
          <h3 className="text-lg font-semibold" style={{ fontFamily: fonts.heading, color: cs.text }}>
            {e.degree}
          </h3>
          <p className="font-medium text-sm" style={{ color: cs.primary }}>{e.institution}</p>
          <p className="text-sm mt-1" style={{ color: cs.text, opacity: 0.5 }}>
            {e.startYear} — {e.current ? 'Present' : e.endYear}
          </p>
          {e.description && (
            <p className="mt-2 text-sm leading-relaxed" style={{ color: cs.text, opacity: 0.7 }}>
              {e.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function Testimonials({ content, cs, fonts }) {
  const testimonials = content.testimonials || [];
  return (
    <div className="space-y-10">
      {testimonials.map((t, i) => (
        <div key={i} className="relative" style={{ paddingLeft: '2rem' }}>
          {/* Giant quotation mark */}
          <span
            className="absolute top-0 left-0 text-7xl leading-none font-serif select-none"
            style={{ color: cs.primary, opacity: 0.3 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p
            className="text-xl md:text-2xl italic leading-relaxed mb-4"
            style={{ color: cs.text, opacity: 0.85, fontFamily: fonts.body }}
          >
            {t.quote}
          </p>
          <div className="flex items-center justify-end gap-3">
            {t.avatar && (
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
            )}
            <div className="text-right">
              <p className="font-semibold text-sm" style={{ color: cs.text }}>{t.name}</p>
              <p className="text-xs" style={{ color: cs.text, opacity: 0.5 }}>{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Custom({ content, cs, fonts }) {
  return (
    <div>
      <div
        className="prose prose-lg max-w-none"
        style={{ color: cs.text, opacity: 0.85 }}
        dangerouslySetInnerHTML={{ __html: content.body || '' }}
      />
    </div>
  );
}

const sectionRenderers = {
  about: About,
  projects: Projects,
  skills: Skills,
  experience: Experience,
  education: Education,
  testimonials: Testimonials,
  custom: Custom,
};

const sectionLabels = {
  about: 'About',
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  testimonials: 'Testimonials',
  contact: 'Contact',
  custom: 'Custom',
};

/* ── Main Layout ──────────────────────────────────────────────────────── */

export default function SplitLayout({ portfolio }) {
  const theme = portfolio.theme || {};
  const cs = theme.colorScheme || {};
  const isDark = theme.mode === 'dark';
  const fonts = useGoogleFonts(theme.fontPairing);
  const spacing = spacingMap[theme.spacing] || spacingMap.normal;

  const visibleSections = [...(portfolio.sections || [])]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  const heroSection = visibleSections.find((s) => s.type === 'hero');
  const heroContent = heroSection?.content || {};
  const contentSections = visibleSections.filter((s) => s.type !== 'hero');

  /* Alternating index tracks only non-hero, non-contact sections */
  let altIndex = 0;

  return (
    <div style={{ backgroundColor: cs.background, color: cs.text, fontFamily: fonts.body, minHeight: '100vh' }}>
      {/* Hero */}
      {heroSection && <Hero content={heroContent} cs={cs} fonts={fonts} />}

      {/* Content sections */}
      {contentSections.map((section) => {
        const content = section.content || {};

        /* Contact — full-width centered */
        if (section.type === 'contact') {
          return (
            <section
              key={section._id}
              id={section.type}
              style={{ padding: `${spacing.section} 1.5rem` }}
            >
              <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
                <SectionHeading title="Contact" align="left" cs={cs} fonts={fonts} />
                <ContactSection content={content} theme={theme} slug={portfolio.slug} />
              </div>
            </section>
          );
        }

        const Renderer = sectionRenderers[section.type];
        if (!Renderer) return null;

        const align = altIndex % 2 === 0 ? 'left' : 'right';
        const label = section.type === 'custom'
          ? (content.title || sectionLabels.custom)
          : (sectionLabels[section.type] || section.type);

        altIndex++;

        return (
          <section
            key={section._id}
            id={section.type}
            className="relative"
            style={{ padding: `${spacing.section} 1.5rem` }}
          >
            {/* Decorative circle for alternating sides */}
            <div
              className="hidden md:block absolute rounded-full pointer-events-none"
              style={{
                width: 200,
                height: 200,
                [align === 'left' ? 'right' : 'left']: '-60px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: `${cs.primary}08`,
              }}
            />
            <div style={{ maxWidth: '64rem', margin: '0 auto', position: 'relative' }}>
              <SectionHeading title={label} align={align} cs={cs} fonts={fonts} />
              <Renderer
                content={content}
                cs={cs}
                fonts={fonts}
                isDark={isDark}
                align={align}
              />
            </div>
          </section>
        );
      })}

      {/* Footer accent line */}
      <div style={{ height: 2, backgroundColor: cs.primary, opacity: 0.2, margin: '0 auto', maxWidth: '64rem' }} />
      <footer className="text-center py-8" style={{ color: cs.text, opacity: 0.4, fontSize: '0.875rem' }}>
        {portfolio.name}
      </footer>
    </div>
  );
}

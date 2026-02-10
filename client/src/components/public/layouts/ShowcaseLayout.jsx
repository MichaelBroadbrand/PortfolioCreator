import { parseFontPairing, useGoogleFonts, SocialLinks, ContactSection, ExternalLink, Github } from './shared';

const spacingMap = {
  compact: { py: 'py-12', px: 'px-6' },
  normal: { py: 'py-20', px: 'px-8' },
  spacious: { py: 'py-32', px: 'px-10' },
};

/* ── Decorative heading with colored dot ──────────────────────────── */

function SectionHeading({ text, primary, fonts }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span
        className="w-3 h-3 rounded-full shrink-0"
        style={{ backgroundColor: primary }}
      />
      <h2
        className="text-3xl md:text-4xl font-bold"
        style={{ fontFamily: fonts.heading, color: 'inherit' }}
      >
        {text}
      </h2>
    </div>
  );
}

/* ── Card style helper ────────────────────────────────────────────── */

function cardStyle(isDark, primary) {
  return isDark
    ? {
        backgroundColor: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
      }
    : {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        boxShadow: `0 2px 8px rgba(0,0,0,0.06), 0 8px 32px ${primary}0d`,
      };
}

/* ── Section Renderers ────────────────────────────────────────────── */

function Hero({ content, cs, fonts }) {
  const primary = cs.primary;
  const accent = cs.accent || cs.secondary || primary;

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden"
      style={{ color: cs.text }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${primary}18 0%, ${cs.background} 40%, ${cs.background} 60%, ${accent}12 100%)`,
          backgroundColor: cs.background,
        }}
      />

      {/* Decorative floating shapes */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300,
          height: 300,
          top: '10%',
          left: '-5%',
          backgroundColor: `${primary}0a`,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
          top: '60%',
          right: '5%',
          backgroundColor: `${primary}0d`,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 120,
          height: 120,
          bottom: '15%',
          left: '20%',
          backgroundColor: `${accent}0a`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        {content.profileImage && (
          <img
            src={content.profileImage}
            alt={content.name}
            className="w-40 h-40 rounded-full object-cover mx-auto mb-8"
            style={{
              border: `4px solid ${accent}`,
              boxShadow: `0 0 0 8px ${accent}15, 0 8px 32px ${primary}20`,
            }}
          />
        )}
        <h1
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          style={{
            fontFamily: fonts.heading,
            textShadow: `0 2px 20px ${primary}18`,
          }}
        >
          {content.name || 'Your Name'}
        </h1>
        <p
          className="text-xl md:text-2xl font-medium mb-3"
          style={{ color: primary }}
        >
          {content.tagline || 'Your Tagline'}
        </p>
        {content.subtitle && (
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ opacity: 0.6 }}>
            {content.subtitle}
          </p>
        )}
        <div className="flex gap-4 justify-center flex-wrap">
          {content.ctaText && (
            <a
              href={content.ctaLink || '#'}
              className="inline-block px-8 py-3 rounded-full text-white font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: primary, boxShadow: `0 4px 20px ${primary}40` }}
            >
              {content.ctaText}
            </a>
          )}
          {content.ctaTextSecondary && (
            <a
              href={content.ctaLinkSecondary || '#'}
              className="inline-block px-8 py-3 rounded-full font-semibold border-2 transition-all hover:scale-105"
              style={{ borderColor: primary, color: primary }}
            >
              {content.ctaTextSecondary}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function About({ content, cs, fonts, isDark }) {
  const primary = cs.primary;
  const hasImage = !!content.profileImage;

  return (
    <div>
      <SectionHeading text="About" primary={primary} fonts={fonts} />
      <div className={`flex flex-col ${hasImage ? 'md:flex-row' : ''} gap-10 items-center`}>
        {hasImage && (
          <img
            src={content.profileImage}
            alt="Profile"
            className="w-64 h-64 rounded-2xl object-cover shrink-0"
            style={{
              boxShadow: isDark
                ? `0 8px 32px ${primary}20`
                : `8px 8px 0 ${primary}20, 0 4px 24px rgba(0,0,0,0.08)`,
            }}
          />
        )}
        <p
          className={`text-lg leading-relaxed ${hasImage ? '' : 'text-center max-w-3xl mx-auto'}`}
          style={{ fontFamily: fonts.body, opacity: 0.8 }}
        >
          {content.bio}
        </p>
      </div>
    </div>
  );
}

function Projects({ content, cs, fonts, isDark }) {
  const projects = content.projects || [];
  const primary = cs.primary;

  return (
    <div>
      <SectionHeading text="Projects" primary={primary} fonts={fonts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className="overflow-hidden transition-all duration-300 group"
            style={{
              ...cardStyle(isDark, primary),
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = isDark
                ? `0 8px 30px ${primary}20`
                : `0 8px 40px ${primary}18, 0 2px 8px rgba(0,0,0,0.06)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = isDark
                ? 'none'
                : `0 2px 8px rgba(0,0,0,0.06), 0 8px 32px ${primary}0d`;
            }}
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="w-full aspect-video object-cover rounded-t-xl"
              />
            )}
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm mb-3 leading-relaxed" style={{ opacity: 0.6 }}>
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(p.tags || []).map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: `${primary}15`, color: primary }}
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
                    className="flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ color: primary }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live
                  </a>
                )}
                {p.sourceUrl && (
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ color: primary }}
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

function Skills({ content, cs, fonts }) {
  const skills = content.skills || [];
  const primary = cs.primary;

  return (
    <div>
      <SectionHeading text="Skills" primary={primary} fonts={fonts} />
      <div className="flex flex-wrap gap-3 justify-center">
        {skills.map((s, i) => {
          const name = typeof s === 'string' ? s : s.name;
          const opacity = 10 + (i % 5) * 5; // cycles 10, 15, 20, 25, 30
          const opHex = opacity.toString(16).padStart(2, '0');
          return (
            <span
              key={i}
              className="px-6 py-3 rounded-full text-sm font-semibold cursor-default transition-all duration-200"
              style={{ backgroundColor: `${primary}${opHex}`, color: primary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Experience({ content, cs, fonts, isDark }) {
  const entries = content.entries || [];
  const primary = cs.primary;

  return (
    <div>
      <SectionHeading text="Experience" primary={primary} fonts={fonts} />
      <div className="max-w-3xl mx-auto space-y-6">
        {entries.map((e, i) => (
          <div
            key={i}
            className="p-6"
            style={{
              ...cardStyle(isDark, primary),
              borderLeft: `4px solid ${primary}`,
            }}
          >
            <h3 className="font-bold text-lg">{e.role}</h3>
            <p className="font-medium" style={{ color: primary }}>{e.company}</p>
            <p className="text-sm mt-1" style={{ opacity: 0.5 }}>
              {e.startDate} — {e.current ? 'Present' : e.endDate}
            </p>
            {e.description && (
              <p className="mt-3 leading-relaxed" style={{ opacity: 0.7 }}>
                {e.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Education({ content, cs, fonts, isDark }) {
  const entries = content.entries || [];
  const primary = cs.primary;

  return (
    <div>
      <SectionHeading text="Education" primary={primary} fonts={fonts} />
      <div className="max-w-3xl mx-auto space-y-5">
        {entries.map((e, i) => (
          <div
            key={i}
            className="p-5"
            style={{
              ...cardStyle(isDark, primary),
              borderLeft: `4px solid ${primary}`,
            }}
          >
            <h3 className="font-semibold text-lg">{e.degree}</h3>
            <p className="font-medium" style={{ color: primary }}>{e.institution}</p>
            <p className="text-sm mt-1" style={{ opacity: 0.5 }}>
              {e.startYear} — {e.current ? 'Present' : e.endYear}
            </p>
            {e.description && (
              <p className="mt-2 leading-relaxed" style={{ opacity: 0.7 }}>
                {e.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials({ content, cs, fonts, isDark }) {
  const testimonials = content.testimonials || [];
  const primary = cs.primary;
  const accent = cs.accent || primary;

  return (
    <div>
      <SectionHeading text="Testimonials" primary={primary} fonts={fonts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-8 relative"
            style={{
              ...cardStyle(isDark, primary),
              boxShadow: isDark
                ? `0 4px 24px ${primary}10`
                : `0 4px 24px ${primary}12, 0 2px 8px rgba(0,0,0,0.04)`,
            }}
          >
            <span
              className="absolute top-4 left-6 text-7xl font-serif leading-none select-none pointer-events-none"
              style={{ color: accent, opacity: 0.25 }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <div className="relative pt-10">
              <p
                className="text-base italic mb-6 leading-relaxed"
                style={{ opacity: 0.8 }}
              >
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                {t.avatar && (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs" style={{ opacity: 0.5 }}>{t.role}</p>
                </div>
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
      <SectionHeading
        text={content.title || 'Custom Section'}
        primary={cs.primary}
        fonts={fonts}
      />
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

export default function ShowcaseLayout({ portfolio, editorProps }) {
  const theme = portfolio.theme || {};
  const cs = theme.colorScheme || {};
  const isDark = theme.mode === 'dark';
  const fonts = parseFontPairing(theme.fontPairing);
  const sp = spacingMap[theme.spacing] || spacingMap.normal;
  const SectionWrap = editorProps?.SectionWrapper;

  useGoogleFonts(theme.fontPairing);

  const allSorted = [...(portfolio.sections || [])].sort((a, b) => a.order - b.order);
  const visibleSections = editorProps?.showHidden
    ? allSorted
    : allSorted.filter((s) => s.visible);

  return (
    <div
      style={{
        backgroundColor: cs.background,
        color: cs.text,
        fontFamily: fonts.body,
        minHeight: '100vh',
      }}
    >
      {visibleSections.map((section) => {
        const isHero = section.type === 'hero';
        const isContact = section.type === 'contact';

        let sectionEl;
        if (isContact) {
          sectionEl = (
            <section
              key={SectionWrap ? undefined : section._id}
              id={section.type}
              className={`${sp.py} ${sp.px}`}
            >
              <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
                <SectionHeading
                  text="Contact"
                  primary={cs.primary}
                  fonts={fonts}
                />
                <ContactSection
                  content={section.content || {}}
                  theme={theme}
                  slug={portfolio.slug}
                />
              </div>
            </section>
          );
        } else {
          const Renderer = sectionRenderers[section.type];
          if (!Renderer) return null;

          sectionEl = (
            <section
              key={SectionWrap ? undefined : section._id}
              id={section.type}
              className={isHero ? '' : `${sp.py} ${sp.px}`}
            >
              {isHero ? (
                <Renderer content={section.content || {}} cs={cs} fonts={fonts} isDark={isDark} />
              ) : (
                <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
                  <Renderer content={section.content || {}} cs={cs} fonts={fonts} isDark={isDark} />
                </div>
              )}
            </section>
          );
        }

        return SectionWrap
          ? <SectionWrap key={section._id} section={section}>{sectionEl}</SectionWrap>
          : sectionEl;
      })}
    </div>
  );
}

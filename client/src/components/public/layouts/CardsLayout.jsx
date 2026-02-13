import { parseFontPairing, useGoogleFonts, SocialLinks, ContactSection, ExternalLink, Github } from './shared';

const spacingMap = {
  compact: { gap: '0.75rem', pad: '1.5rem' },
  normal: { gap: '1rem', pad: '2rem' },
  spacious: { gap: '1.25rem', pad: '2.5rem' },
};

/* ── Card wrapper ─────────────────────────────────────────────────── */

function Card({ children, cs, isDark, span, className = '', style = {} }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        gridColumn: span || 'auto',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Section heading ──────────────────────────────────────────────── */

function Heading({ text, cs, fonts }) {
  return (
    <h2
      className="text-2xl font-bold mb-5"
      style={{ fontFamily: fonts.heading, color: cs.text }}
    >
      <span style={{ color: cs.primary, marginRight: 6 }}>/</span>
      {text}
    </h2>
  );
}

/* ── Hero card ────────────────────────────────────────────────────── */

function Hero({ content, cs, fonts, isDark, sp }) {
  return (
    <section id="hero" style={{ gridColumn: '1 / -1' }}>
      <div
        className="rounded-2xl overflow-hidden relative min-h-[50vh] flex items-center"
        style={{
          background: `linear-gradient(135deg, ${cs.primary}20 0%, ${cs.background} 50%, ${cs.accent || cs.secondary}15 100%)`,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        }}
      >
        {/* Decorative gradient orbs */}
        <div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{ width: 300, height: 300, top: '-20%', right: '-5%', backgroundColor: `${cs.primary}15` }}
        />
        <div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{ width: 200, height: 200, bottom: '-10%', left: '10%', backgroundColor: `${cs.accent || cs.primary}10` }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 w-full" style={{ padding: sp.pad }}>
          {content.profileImage && (
            <img
              src={content.profileImage}
              alt={content.name}
              className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover shrink-0"
              style={{ border: `2px solid ${cs.primary}30` }}
            />
          )}
          <div className={content.profileImage ? '' : 'max-w-2xl mx-auto text-center md:text-left'}>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-3"
              style={{ fontFamily: fonts.heading, color: cs.text }}
            >
              {content.name || 'Your Name'}
            </h1>
            <p className="text-xl font-medium mb-2" style={{ color: cs.primary }}>
              {content.tagline || 'Your Tagline'}
            </p>
            {content.subtitle && (
              <p className="text-base mb-6 leading-relaxed" style={{ color: `${cs.text}88` }}>
                {content.subtitle}
              </p>
            )}
            <div className="flex gap-3 flex-wrap">
              {content.ctaText && (
                <a
                  href={content.ctaLink || '#'}
                  className="inline-block px-6 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: cs.primary, color: cs.background }}
                >
                  {content.ctaText}
                </a>
              )}
              {content.secondaryCtaText && (
                <a
                  href={content.secondaryCtaLink || '#'}
                  className="inline-block px-6 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ border: `1.5px solid ${cs.primary}40`, color: cs.primary }}
                >
                  {content.secondaryCtaText}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── About card ───────────────────────────────────────────────────── */

function About({ content, cs, fonts, isDark, sp }) {
  return (
    <Card cs={cs} isDark={isDark} span="1 / -1">
      <div style={{ padding: sp.pad }}>
        <Heading text="About" cs={cs} fonts={fonts} />
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {content.profileImage && (
            <img src={content.profileImage} alt="Profile" className="w-32 h-32 rounded-xl object-cover shrink-0" />
          )}
          <p className="text-base leading-relaxed" style={{ color: `${cs.text}cc` }}>{content.bio}</p>
        </div>
      </div>
    </Card>
  );
}

/* ── Projects cards ───────────────────────────────────────────────── */

function Projects({ content, cs, fonts, isDark, sp }) {
  const projects = content.projects || [];
  return (
    <div style={{ gridColumn: '1 / -1', display: 'contents' }}>
      {projects.length > 0 && (
        <div style={{ gridColumn: '1 / -1', padding: `${sp.pad} 0 0 0` }}>
          <Heading text="Projects" cs={cs} fonts={fonts} />
        </div>
      )}
      {projects.map((p, i) => (
        <Card key={i} cs={cs} isDark={isDark} span={i === 0 ? '1 / -1' : undefined}>
          {p.image && (
            <img src={p.image} alt={p.title} className="w-full aspect-video object-cover" />
          )}
          <div style={{ padding: sp.pad }}>
            <h3 className="text-lg font-semibold mb-1.5" style={{ fontFamily: fonts.heading, color: cs.text }}>{p.title}</h3>
            <p className="text-sm mb-3 leading-relaxed" style={{ color: `${cs.text}88` }}>{p.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {(p.tags || []).map((tag, j) => (
                <span
                  key={j}
                  className="text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={{ backgroundColor: `${cs.primary}15`, color: cs.primary }}
                >
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
        </Card>
      ))}
    </div>
  );
}

/* ── Skills as metric cards ───────────────────────────────────────── */

function Skills({ content, cs, fonts, isDark, sp }) {
  const skills = content.skills || [];
  return (
    <div style={{ gridColumn: '1 / -1', display: 'contents' }}>
      <div style={{ gridColumn: '1 / -1', padding: `${sp.pad} 0 0 0` }}>
        <Heading text="Skills" cs={cs} fonts={fonts} />
      </div>
      <Card cs={cs} isDark={isDark} span="1 / -1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}>
          {skills.map((s, i) => {
            const name = typeof s === 'string' ? s : s.name;
            const level = typeof s === 'object' ? s.level : null;
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center"
                style={{
                  padding: sp.pad,
                  backgroundColor: cs.background,
                }}
              >
                {level != null && (
                  <span className="text-2xl font-bold mb-1" style={{ fontFamily: fonts.heading, color: cs.primary }}>
                    {level}%
                  </span>
                )}
                <span className="text-sm font-medium" style={{ color: cs.text }}>{name}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ── Experience timeline cards ────────────────────────────────────── */

function Experience({ content, cs, fonts, isDark, sp }) {
  const entries = content.entries || [];
  return (
    <div style={{ gridColumn: '1 / -1', display: 'contents' }}>
      <div style={{ gridColumn: '1 / -1', padding: `${sp.pad} 0 0 0` }}>
        <Heading text="Experience" cs={cs} fonts={fonts} />
      </div>
      {entries.map((e, i) => (
        <Card key={i} cs={cs} isDark={isDark}>
          <div style={{ padding: sp.pad }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-base" style={{ fontFamily: fonts.heading, color: cs.text }}>{e.role}</h3>
                <p className="text-sm font-medium" style={{ color: cs.primary }}>{e.company}</p>
              </div>
              <span
                className="text-xs px-2.5 py-1 rounded-lg shrink-0 ml-2"
                style={{ backgroundColor: `${cs.primary}12`, color: cs.primary }}
              >
                {e.startDate} — {e.current ? 'Now' : e.endDate}
              </span>
            </div>
            {e.description && <p className="text-sm leading-relaxed" style={{ color: `${cs.text}88` }}>{e.description}</p>}
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ── Education ────────────────────────────────────────────────────── */

function Education({ content, cs, fonts, isDark, sp }) {
  const entries = content.entries || [];
  return (
    <div style={{ gridColumn: '1 / -1', display: 'contents' }}>
      <div style={{ gridColumn: '1 / -1', padding: `${sp.pad} 0 0 0` }}>
        <Heading text="Education" cs={cs} fonts={fonts} />
      </div>
      {entries.map((e, i) => (
        <Card key={i} cs={cs} isDark={isDark}>
          <div style={{ padding: sp.pad }}>
            <h3 className="font-semibold" style={{ fontFamily: fonts.heading, color: cs.text }}>{e.degree}</h3>
            <p className="text-sm font-medium" style={{ color: cs.primary }}>{e.institution}</p>
            <p className="text-xs mt-0.5" style={{ color: `${cs.text}66` }}>{e.startYear} — {e.current ? 'Present' : e.endYear}</p>
            {e.description && <p className="text-sm mt-1" style={{ color: `${cs.text}99` }}>{e.description}</p>}
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ── Testimonials ─────────────────────────────────────────────────── */

function Testimonials({ content, cs, fonts, isDark, sp }) {
  const testimonials = content.testimonials || [];
  return (
    <div style={{ gridColumn: '1 / -1', display: 'contents' }}>
      <div style={{ gridColumn: '1 / -1', padding: `${sp.pad} 0 0 0` }}>
        <Heading text="Testimonials" cs={cs} fonts={fonts} />
      </div>
      {testimonials.map((t, i) => (
        <Card key={i} cs={cs} isDark={isDark}>
          <div style={{ padding: sp.pad }}>
            <div className="text-3xl leading-none mb-2" style={{ color: `${cs.primary}40` }}>&ldquo;</div>
            <p className="text-sm italic mb-4 leading-relaxed" style={{ color: `${cs.text}cc` }}>{t.quote}</p>
            <div className="flex items-center gap-3">
              {t.avatar && <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />}
              <div>
                <p className="font-semibold text-sm" style={{ color: cs.text }}>{t.name}</p>
                {t.role && <p className="text-xs" style={{ color: `${cs.text}66` }}>{t.role}</p>}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ── Contact ──────────────────────────────────────────────────────── */

function Contact({ content, cs, fonts, isDark, sp, slug }) {
  return (
    <Card cs={cs} isDark={isDark} span="1 / -1">
      <div style={{ padding: sp.pad }}>
        <Heading text="Contact" cs={cs} fonts={fonts} />
        <ContactSection content={content} theme={{ colorScheme: cs, fontPairing: { heading: fonts.heading, body: fonts.body } }} slug={slug} />
      </div>
    </Card>
  );
}

/* ── Section map ──────────────────────────────────────────────────── */

const sectionRenderers = { hero: Hero, about: About, projects: Projects, skills: Skills, experience: Experience, education: Education, testimonials: Testimonials, contact: Contact };

/* ── Main layout ──────────────────────────────────────────────────── */

export default function CardsLayout({ portfolio, editorProps }) {
  const { theme = {}, sections = [], slug } = portfolio;
  const { colorScheme: cs = {}, fontPairing, mode, spacing = 'normal' } = theme;
  const fonts = useGoogleFonts(fontPairing);
  const isDark = mode === 'dark';
  const sp = spacingMap[spacing] || spacingMap.normal;
  const SectionWrap = editorProps?.SectionWrapper;

  const allSorted = [...sections].sort((a, b) => a.order - b.order);
  const sorted = editorProps?.showHidden
    ? allSorted
    : allSorted.filter((s) => s.visible);

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: fonts.body, backgroundColor: cs.background, color: cs.text }}
    >
      {/* Compact top nav */}
      <nav
        className="flex items-center justify-between px-6 py-3"
        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}
      >
        <span className="text-sm font-bold" style={{ fontFamily: fonts.heading, color: cs.text }}>
          {portfolio.title || sections.find(s => s.type === 'hero')?.content?.name || ''}
        </span>
        <div className="flex gap-4">
          {sorted.filter(s => s.type !== 'hero').map(s => (
            <a
              key={s.type}
              href={`#${s.type}`}
              className="text-xs font-medium transition-colors hover:opacity-80"
              style={{ color: `${cs.text}66` }}
            >
              {s.type.charAt(0).toUpperCase() + s.type.slice(1)}
            </a>
          ))}
        </div>
      </nav>

      {/* Bento grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: sp.gap, padding: sp.gap, maxWidth: '80rem', margin: '0 auto' }}
      >
        {sorted.map((section, idx) => {
          const Renderer = sectionRenderers[section.type];
          if (!Renderer) return null;

          const sectionEl = (
            <Renderer
              key={SectionWrap ? undefined : section._id || idx}
              content={section.content || {}}
              cs={cs}
              fonts={fonts}
              isDark={isDark}
              sp={sp}
              slug={slug}
            />
          );

          return SectionWrap
            ? <SectionWrap key={section._id || idx} section={section}>{sectionEl}</SectionWrap>
            : sectionEl;
        })}
      </div>
    </div>
  );
}

import { parseFontPairing, useGoogleFonts, SocialLinks, ContactSection, ExternalLink, Github } from './shared';

const spacingMap = {
  compact: { section: '2.5rem', inner: '1.5rem' },
  normal: { section: '4rem', inner: '2rem' },
  spacious: { section: '5.5rem', inner: '2.5rem' },
};

/* ── Registration mark (cross-hair) ─────────────────────────────── */

function RegMark({ cs, size = 12, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" style={style}>
      <line x1="6" y1="0" x2="6" y2="12" stroke={cs.accent || '#e63946'} strokeWidth="0.75" />
      <line x1="0" y1="6" x2="12" y2="6" stroke={cs.accent || '#e63946'} strokeWidth="0.75" />
      <circle cx="6" cy="6" r="4" fill="none" stroke={cs.accent || '#e63946'} strokeWidth="0.75" />
    </svg>
  );
}

/* ── Section number label ────────────────────────────────────────── */

function SectionLabel({ number, text, cs, fonts }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="text-xs font-mono tracking-widest"
        style={{ color: cs.accent || '#e63946' }}
      >
        {String(number).padStart(2, '0')}
      </span>
      <div style={{ width: 24, height: 1, backgroundColor: cs.accent || '#e63946' }} />
      <span
        className="text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ fontFamily: fonts.heading, color: cs.text }}
      >
        {text}
      </span>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */

function Hero({ content, cs, fonts, sp }) {
  return (
    <section
      id="hero"
      className="relative"
      style={{
        padding: `${sp.section} ${sp.inner}`,
        borderBottom: `1px solid ${cs.text}15`,
      }}
    >
      {/* Corner registration marks */}
      <RegMark cs={cs} style={{ position: 'absolute', top: 16, left: 16 }} />
      <RegMark cs={cs} style={{ position: 'absolute', top: 16, right: 16 }} />

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-10">
          {content.profileImage && (
            <div className="shrink-0 relative">
              <img
                src={content.profileImage}
                alt={content.name}
                className="w-32 h-40 object-cover"
                style={{ border: `1px solid ${cs.text}20` }}
              />
              {/* Photo crop marks */}
              <div className="absolute -top-2 -left-2 w-3 h-3" style={{ borderTop: `1px solid ${cs.accent || '#e63946'}`, borderLeft: `1px solid ${cs.accent || '#e63946'}` }} />
              <div className="absolute -top-2 -right-2 w-3 h-3" style={{ borderTop: `1px solid ${cs.accent || '#e63946'}`, borderRight: `1px solid ${cs.accent || '#e63946'}` }} />
              <div className="absolute -bottom-2 -left-2 w-3 h-3" style={{ borderBottom: `1px solid ${cs.accent || '#e63946'}`, borderLeft: `1px solid ${cs.accent || '#e63946'}` }} />
              <div className="absolute -bottom-2 -right-2 w-3 h-3" style={{ borderBottom: `1px solid ${cs.accent || '#e63946'}`, borderRight: `1px solid ${cs.accent || '#e63946'}` }} />
            </div>
          )}
          <div className="flex-1">
            <h1
              className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-3"
              style={{ fontFamily: fonts.heading, color: cs.text }}
            >
              {content.name || 'Your Name'}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 32, height: 2, backgroundColor: cs.accent || '#e63946' }} />
              <p
                className="text-sm font-semibold uppercase tracking-[0.15em]"
                style={{ color: cs.accent || '#e63946' }}
              >
                {content.tagline || 'Your Tagline'}
              </p>
            </div>
            {content.subtitle && (
              <p
                className="text-base leading-relaxed max-w-xl mb-8"
                style={{ fontFamily: fonts.body, color: `${cs.text}88` }}
              >
                {content.subtitle}
              </p>
            )}
            <div className="flex gap-3">
              {content.ctaText && (
                <a
                  href={content.ctaLink || '#'}
                  className="inline-block px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{
                    backgroundColor: cs.text,
                    color: cs.background,
                  }}
                >
                  {content.ctaText}
                </a>
              )}
              {content.secondaryCtaText && (
                <a
                  href={content.secondaryCtaLink || '#'}
                  className="inline-block px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{
                    border: `1px solid ${cs.text}`,
                    color: cs.text,
                  }}
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

/* ── About ────────────────────────────────────────────────────────── */

function About({ content, cs, fonts, sp }) {
  return (
    <section id="about" style={{ padding: `${sp.section} ${sp.inner}`, borderBottom: `1px solid ${cs.text}15` }}>
      <div className="max-w-4xl mx-auto">
        <SectionLabel number={1} text="About" cs={cs} fonts={fonts} />
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
          <p
            className="text-base leading-[1.8]"
            style={{ fontFamily: fonts.body, color: `${cs.text}cc` }}
          >
            {content.bio}
          </p>
          {content.profileImage && (
            <div className="relative">
              <img
                src={content.profileImage}
                alt="Profile"
                className="w-full aspect-[3/4] object-cover"
                style={{ border: `1px solid ${cs.text}15` }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Projects ─────────────────────────────────────────────────────── */

function Projects({ content, cs, fonts, sp }) {
  const projects = content.projects || [];
  return (
    <section id="projects" style={{ padding: `${sp.section} ${sp.inner}`, borderBottom: `1px solid ${cs.text}15` }}>
      <div className="max-w-4xl mx-auto">
        <SectionLabel number={2} text="Projects" cs={cs} fonts={fonts} />
        <div className="space-y-0">
          {projects.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6"
              style={{
                padding: `${sp.inner} 0`,
                borderBottom: i < projects.length - 1 ? `1px solid ${cs.text}10` : 'none',
              }}
            >
              <div>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full aspect-video object-cover"
                    style={{ border: `1px solid ${cs.text}10` }}
                  />
                ) : (
                  <div
                    className="w-full aspect-video flex items-center justify-center"
                    style={{ border: `1px dashed ${cs.text}20` }}
                  >
                    <span className="text-xs font-mono" style={{ color: `${cs.text}30` }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ fontFamily: fonts.heading, color: cs.text }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: `${cs.text}88` }}>
                  {p.description}
                </p>
                {(p.tags || []).length > 0 && (
                  <p className="text-xs font-mono tracking-wider mb-3" style={{ color: cs.accent || '#e63946' }}>
                    {p.tags.join(' / ')}
                  </p>
                )}
                <div className="flex gap-4">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: cs.text }}>
                      <ExternalLink className="w-3 h-3" /> View
                    </a>
                  )}
                  {p.sourceUrl && (
                    <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: cs.text }}>
                      <Github className="w-3 h-3" /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Skills ────────────────────────────────────────────────────────── */

function Skills({ content, cs, fonts, sp }) {
  const skills = content.skills || [];
  return (
    <section id="skills" style={{ padding: `${sp.section} ${sp.inner}`, borderBottom: `1px solid ${cs.text}15` }}>
      <div className="max-w-4xl mx-auto">
        <SectionLabel number={3} text="Skills" cs={cs} fonts={fonts} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0">
          {skills.map((s, i) => {
            const name = typeof s === 'string' ? s : s.name;
            const level = typeof s === 'object' ? s.level : null;
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-3"
                style={{ border: `1px solid ${cs.text}10` }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: cs.accent || '#e63946' }}
                />
                <span className="text-xs font-medium" style={{ color: cs.text }}>
                  {name}
                </span>
                {level != null && (
                  <span className="text-[10px] font-mono ml-auto" style={{ color: `${cs.text}44` }}>
                    {level}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Experience ────────────────────────────────────────────────────── */

function Experience({ content, cs, fonts, sp }) {
  const entries = content.entries || [];
  return (
    <section id="experience" style={{ padding: `${sp.section} ${sp.inner}`, borderBottom: `1px solid ${cs.text}15` }}>
      <div className="max-w-4xl mx-auto">
        <SectionLabel number={4} text="Experience" cs={cs} fonts={fonts} />
        <div className="space-y-0">
          {entries.map((e, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4"
              style={{
                padding: `${sp.inner} 0`,
                borderBottom: i < entries.length - 1 ? `1px solid ${cs.text}10` : 'none',
              }}
            >
              <div>
                <span className="text-xs font-mono" style={{ color: `${cs.text}55` }}>
                  {e.startDate} — {e.current ? 'Present' : e.endDate}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base mb-0.5" style={{ fontFamily: fonts.heading, color: cs.text }}>
                  {e.role}
                </h3>
                <p className="text-sm font-medium mb-2" style={{ color: cs.accent || '#e63946' }}>
                  {e.company}
                </p>
                {e.description && (
                  <p className="text-sm leading-relaxed" style={{ color: `${cs.text}88` }}>
                    {e.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Education ─────────────────────────────────────────────────────── */

function Education({ content, cs, fonts, sp }) {
  const entries = content.entries || [];
  return (
    <section id="education" style={{ padding: `${sp.section} ${sp.inner}`, borderBottom: `1px solid ${cs.text}15` }}>
      <div className="max-w-4xl mx-auto">
        <SectionLabel number={5} text="Education" cs={cs} fonts={fonts} />
        <div className="space-y-0">
          {entries.map((e, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4"
              style={{
                padding: `${sp.inner} 0`,
                borderBottom: i < entries.length - 1 ? `1px solid ${cs.text}10` : 'none',
              }}
            >
              <div>
                <span className="text-xs font-mono" style={{ color: `${cs.text}55` }}>
                  {e.startYear} — {e.current ? 'Present' : e.endYear}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base mb-0.5" style={{ fontFamily: fonts.heading, color: cs.text }}>
                  {e.degree}
                </h3>
                <p className="text-sm font-medium" style={{ color: cs.accent || '#e63946' }}>
                  {e.institution}
                </p>
                {e.description && (
                  <p className="text-sm leading-relaxed mt-1" style={{ color: `${cs.text}88` }}>
                    {e.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────────────────────── */

function Testimonials({ content, cs, fonts, sp }) {
  const testimonials = content.testimonials || [];
  return (
    <section id="testimonials" style={{ padding: `${sp.section} ${sp.inner}`, borderBottom: `1px solid ${cs.text}15` }}>
      <div className="max-w-4xl mx-auto">
        <SectionLabel number={6} text="Testimonials" cs={cs} fonts={fonts} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6"
              style={{ border: `1px solid ${cs.text}10` }}
            >
              <p className="text-sm italic leading-relaxed mb-4" style={{ color: `${cs.text}cc` }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {t.avatar && (
                  <img src={t.avatar} alt={t.name} className="w-8 h-8 object-cover"
                    style={{ border: `1px solid ${cs.text}15` }} />
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: cs.text }}>
                    {t.name}
                  </p>
                  {t.role && (
                    <p className="text-xs" style={{ color: `${cs.text}66` }}>{t.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ───────────────────────────────────────────────────────── */

function Contact({ content, cs, fonts, sp, slug }) {
  return (
    <section id="contact" style={{ padding: `${sp.section} ${sp.inner}` }}>
      <div className="max-w-4xl mx-auto">
        <SectionLabel number={7} text="Contact" cs={cs} fonts={fonts} />
        <ContactSection content={content} theme={{ colorScheme: cs, fontPairing: { heading: fonts.heading, body: fonts.body } }} slug={slug} />
      </div>
    </section>
  );
}

/* ── Section map ───────────────────────────────────────────────────── */

const sectionRenderers = { hero: Hero, about: About, projects: Projects, skills: Skills, experience: Experience, education: Education, testimonials: Testimonials, contact: Contact };

/* ── Main layout ───────────────────────────────────────────────────── */

export default function BlueprintLayout({ portfolio, editorProps }) {
  const { theme = {}, sections = [], slug } = portfolio;
  const { colorScheme: cs = {}, fontPairing, spacing = 'normal' } = theme;
  const fonts = useGoogleFonts(fontPairing);
  const sp = spacingMap[spacing] || spacingMap.normal;
  const SectionWrap = editorProps?.SectionWrapper;

  const allSorted = [...sections].sort((a, b) => a.order - b.order);
  const sorted = editorProps?.showHidden
    ? allSorted
    : allSorted.filter((s) => s.visible);

  return (
    <div
      className="min-h-screen relative"
      style={{ fontFamily: fonts.body, backgroundColor: cs.background, color: cs.text }}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${cs.text}06 1px, transparent 1px), linear-gradient(90deg, ${cs.text}06 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Minimal top bar */}
      <nav
        className="relative z-10 flex items-center justify-between"
        style={{
          padding: `0.75rem ${sp.inner}`,
          borderBottom: `1px solid ${cs.text}15`,
        }}
      >
        <div className="flex items-center gap-2">
          <RegMark cs={cs} size={10} />
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: fonts.heading, color: cs.text }}
          >
            {portfolio.title || sections.find(s => s.type === 'hero')?.content?.name || ''}
          </span>
        </div>
        <div className="flex gap-5">
          {sorted.filter(s => s.type !== 'hero').map(s => (
            <a
              key={s.type}
              href={`#${s.type}`}
              className="text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors hover:opacity-70"
              style={{ color: `${cs.text}66` }}
            >
              {s.type}
            </a>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <div className="relative z-10">
        {sorted.map((section, idx) => {
          const Renderer = sectionRenderers[section.type];
          if (!Renderer) return null;

          const sectionEl = (
            <Renderer
              key={SectionWrap ? undefined : section._id || idx}
              content={section.content || {}}
              cs={cs}
              fonts={fonts}
              sp={sp}
              slug={slug}
            />
          );

          return SectionWrap
            ? <SectionWrap key={section._id || idx} section={section}>{sectionEl}</SectionWrap>
            : sectionEl;
        })}
      </div>

      {/* Footer with crop marks */}
      <footer
        className="relative z-10 flex items-center justify-between"
        style={{
          padding: `1rem ${sp.inner}`,
          borderTop: `1px solid ${cs.text}15`,
        }}
      >
        <p className="text-[10px] font-mono" style={{ color: `${cs.text}33` }}>
          &copy; {new Date().getFullYear()}
        </p>
        <RegMark cs={cs} size={10} />
      </footer>
    </div>
  );
}

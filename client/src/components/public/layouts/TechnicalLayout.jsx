import { parseFontPairing, useGoogleFonts, SocialLinks, ContactSection, ExternalLink, Github } from './shared';

const spacingMap = {
  compact: { section: '1.5rem', inner: '1.25rem' },
  normal: { section: '2rem', inner: '1.5rem' },
  spacious: { section: '3rem', inner: '2rem' },
};

/* ── Panel header (terminal-style) ───────────────────────────────── */

function PanelHeader({ title, cs, fonts, status = 'active' }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-2"
      style={{ borderBottom: `1px solid ${cs.accent || '#22d3ee'}20` }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: status === 'active' ? (cs.accent || '#22d3ee') : `${cs.text}30` }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: fonts.heading, color: cs.text }}
        >
          {title}
        </span>
      </div>
      <span className="text-[9px] font-mono" style={{ color: `${cs.text}33` }}>
        [{title.slice(0, 3).toUpperCase()}]
      </span>
    </div>
  );
}

/* ── Panel wrapper ───────────────────────────────────────────────── */

function Panel({ children, cs, className = '', style = {} }) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: `${cs.text}05`,
        border: `1px solid ${cs.text}12`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */

function Hero({ content, cs, fonts, sp }) {
  return (
    <section id="hero" style={{ padding: sp.section }}>
      <Panel cs={cs}>
        <div className="px-5 py-8 md:px-8 md:py-12">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {content.profileImage && (
              <div className="shrink-0 relative">
                <img
                  src={content.profileImage}
                  alt={content.name}
                  className="w-24 h-24 object-cover"
                  style={{ border: `1px solid ${cs.accent || '#22d3ee'}30` }}
                />
                {/* Scan line effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${cs.background}15 2px, ${cs.background}15 3px)`,
                  }}
                />
              </div>
            )}
            <div className="flex-1">
              {/* Status line */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cs.accent || '#22d3ee' }} />
                <span className="text-[10px] font-mono tracking-wider" style={{ color: cs.accent || '#22d3ee' }}>
                  ONLINE
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold leading-tight mb-2"
                style={{ fontFamily: fonts.heading, color: cs.text }}
              >
                {content.name || 'Your Name'}
              </h1>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-3"
                style={{ color: cs.accent || '#22d3ee' }}>
                {content.tagline || 'Your Tagline'}
              </p>
              {content.subtitle && (
                <p className="text-sm leading-relaxed mb-6 max-w-lg"
                  style={{ fontFamily: fonts.body, color: `${cs.text}77` }}>
                  {content.subtitle}
                </p>
              )}
              <div className="flex gap-3">
                {content.ctaText && (
                  <a
                    href={content.ctaLink || '#'}
                    className="inline-block px-5 py-2 text-xs font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: cs.accent || '#22d3ee',
                      color: cs.background,
                    }}
                  >
                    {content.ctaText}
                  </a>
                )}
                {content.secondaryCtaText && (
                  <a
                    href={content.secondaryCtaLink || '#'}
                    className="inline-block px-5 py-2 text-xs font-bold uppercase tracking-wider"
                    style={{
                      border: `1px solid ${cs.accent || '#22d3ee'}50`,
                      color: cs.accent || '#22d3ee',
                    }}
                  >
                    {content.secondaryCtaText}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </section>
  );
}

/* ── About ────────────────────────────────────────────────────────── */

function About({ content, cs, fonts, sp }) {
  return (
    <section id="about" style={{ padding: `0 ${sp.section} ${sp.section}` }}>
      <Panel cs={cs}>
        <PanelHeader title="About" cs={cs} fonts={fonts} />
        <div className="p-5 md:p-6">
          <div className="flex gap-6 items-start">
            {content.profileImage && (
              <img src={content.profileImage} alt="Profile"
                className="w-28 h-28 object-cover shrink-0 hidden md:block"
                style={{ border: `1px solid ${cs.text}15` }} />
            )}
            <p className="text-sm leading-[1.8]" style={{ fontFamily: fonts.body, color: `${cs.text}bb` }}>
              {content.bio}
            </p>
          </div>
        </div>
      </Panel>
    </section>
  );
}

/* ── Projects ─────────────────────────────────────────────────────── */

function Projects({ content, cs, fonts, sp }) {
  const projects = content.projects || [];
  return (
    <section id="projects" style={{ padding: `0 ${sp.section} ${sp.section}` }}>
      <Panel cs={cs}>
        <PanelHeader title="Projects" cs={cs} fonts={fonts} />
        <div className="grid grid-cols-1 md:grid-cols-2">
          {projects.map((p, i) => (
            <div
              key={i}
              className="p-5"
              style={{ borderBottom: `1px solid ${cs.text}08`, borderRight: i % 2 === 0 ? `1px solid ${cs.text}08` : 'none' }}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full aspect-video object-cover mb-3"
                  style={{ border: `1px solid ${cs.text}10` }}
                />
              )}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: cs.accent || '#22d3ee' }} />
                <h3 className="text-sm font-bold" style={{ fontFamily: fonts.heading, color: cs.text }}>
                  {p.title}
                </h3>
              </div>
              <p className="text-xs leading-relaxed mb-2" style={{ color: `${cs.text}77` }}>
                {p.description}
              </p>
              {(p.tags || []).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {p.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-mono px-1.5 py-0.5"
                      style={{ backgroundColor: `${cs.accent || '#22d3ee'}12`, color: cs.accent || '#22d3ee' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-3">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: cs.accent || '#22d3ee' }}>
                    <ExternalLink className="w-3 h-3" /> Live
                  </a>
                )}
                {p.sourceUrl && (
                  <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: cs.accent || '#22d3ee' }}>
                    <Github className="w-3 h-3" /> Source
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

/* ── Skills (data readout style) ──────────────────────────────────── */

function Skills({ content, cs, fonts, sp }) {
  const skills = content.skills || [];
  return (
    <section id="skills" style={{ padding: `0 ${sp.section} ${sp.section}` }}>
      <Panel cs={cs}>
        <PanelHeader title="Skills" cs={cs} fonts={fonts} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((s, i) => {
            const name = typeof s === 'string' ? s : s.name;
            const level = typeof s === 'object' ? s.level : null;
            return (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: `1px solid ${cs.text}08`, borderRight: (i % 3 !== 2) ? `1px solid ${cs.text}08` : 'none' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: cs.accent || '#22d3ee' }} />
                  <span className="text-xs font-medium" style={{ color: cs.text }}>{name}</span>
                </div>
                {level != null && (
                  <div className="flex items-center gap-1.5">
                    <div
                      className="h-0.5 rounded-full"
                      style={{ width: `${Math.max(level * 0.4, 8)}px`, backgroundColor: cs.accent || '#22d3ee' }}
                    />
                    <span className="text-[9px] font-mono" style={{ color: `${cs.text}44` }}>
                      {level}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Panel>
    </section>
  );
}

/* ── Experience ────────────────────────────────────────────────────── */

function Experience({ content, cs, fonts, sp }) {
  const entries = content.entries || [];
  return (
    <section id="experience" style={{ padding: `0 ${sp.section} ${sp.section}` }}>
      <Panel cs={cs}>
        <PanelHeader title="Experience" cs={cs} fonts={fonts} />
        <div>
          {entries.map((e, i) => (
            <div
              key={i}
              className="flex gap-4 p-5"
              style={{ borderBottom: i < entries.length - 1 ? `1px solid ${cs.text}08` : 'none' }}
            >
              {/* Vertical trace line */}
              <div className="flex flex-col items-center shrink-0 pt-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cs.accent || '#22d3ee', border: `2px solid ${cs.background}` }} />
                {i < entries.length - 1 && (
                  <div className="w-px flex-1 mt-1" style={{ backgroundColor: `${cs.accent || '#22d3ee'}30` }} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm" style={{ fontFamily: fonts.heading, color: cs.text }}>
                  {e.role}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: cs.accent || '#22d3ee' }}>
                  {e.company}
                </p>
                <p className="text-[10px] font-mono mb-2" style={{ color: `${cs.text}44` }}>
                  {e.startDate} — {e.current ? 'PRESENT' : e.endDate}
                </p>
                {e.description && (
                  <p className="text-xs leading-relaxed" style={{ color: `${cs.text}77` }}>
                    {e.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

/* ── Education ─────────────────────────────────────────────────────── */

function Education({ content, cs, fonts, sp }) {
  const entries = content.entries || [];
  return (
    <section id="education" style={{ padding: `0 ${sp.section} ${sp.section}` }}>
      <Panel cs={cs}>
        <PanelHeader title="Education" cs={cs} fonts={fonts} />
        <div>
          {entries.map((e, i) => (
            <div
              key={i}
              className="p-5"
              style={{ borderBottom: i < entries.length - 1 ? `1px solid ${cs.text}08` : 'none' }}
            >
              <h3 className="font-bold text-sm" style={{ fontFamily: fonts.heading, color: cs.text }}>
                {e.degree}
              </h3>
              <p className="text-xs font-semibold" style={{ color: cs.accent || '#22d3ee' }}>
                {e.institution}
              </p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: `${cs.text}44` }}>
                {e.startYear} — {e.current ? 'PRESENT' : e.endYear}
              </p>
              {e.description && (
                <p className="text-xs leading-relaxed mt-1" style={{ color: `${cs.text}77` }}>
                  {e.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────────────────────── */

function Testimonials({ content, cs, fonts, sp }) {
  const testimonials = content.testimonials || [];
  return (
    <section id="testimonials" style={{ padding: `0 ${sp.section} ${sp.section}` }}>
      <Panel cs={cs}>
        <PanelHeader title="Testimonials" cs={cs} fonts={fonts} />
        <div>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-5"
              style={{ borderBottom: i < testimonials.length - 1 ? `1px solid ${cs.text}08` : 'none' }}
            >
              <p className="text-sm italic leading-relaxed mb-3" style={{ color: `${cs.text}bb` }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                {t.avatar && (
                  <img src={t.avatar} alt={t.name}
                    className="w-7 h-7 object-cover"
                    style={{ border: `1px solid ${cs.text}15` }} />
                )}
                <div>
                  <p className="text-xs font-semibold" style={{ color: cs.text }}>{t.name}</p>
                  {t.role && <p className="text-[10px] font-mono" style={{ color: `${cs.text}44` }}>{t.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

/* ── Contact ───────────────────────────────────────────────────────── */

function Contact({ content, cs, fonts, sp, slug }) {
  return (
    <section id="contact" style={{ padding: `0 ${sp.section} ${sp.section}` }}>
      <Panel cs={cs}>
        <PanelHeader title="Contact" cs={cs} fonts={fonts} />
        <div className="p-5 md:p-6">
          <ContactSection content={content} theme={{ colorScheme: cs, fontPairing: { heading: fonts.heading, body: fonts.body } }} slug={slug} />
        </div>
      </Panel>
    </section>
  );
}

/* ── Section map ───────────────────────────────────────────────────── */

const sectionRenderers = { hero: Hero, about: About, projects: Projects, skills: Skills, experience: Experience, education: Education, testimonials: Testimonials, contact: Contact };

/* ── Main layout ───────────────────────────────────────────────────── */

export default function TechnicalLayout({ portfolio, editorProps }) {
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
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${cs.text}08 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top system bar */}
      <nav
        className="relative z-10 flex items-center justify-between"
        style={{
          padding: `0.5rem ${sp.section}`,
          borderBottom: `1px solid ${cs.text}12`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cs.accent || '#22d3ee' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${cs.text}25` }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${cs.text}15` }} />
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: fonts.heading, color: cs.text }}
          >
            {portfolio.title || sections.find(s => s.type === 'hero')?.content?.name || ''}
          </span>
        </div>
        <div className="flex gap-4">
          {sorted.filter(s => s.type !== 'hero').map(s => (
            <a
              key={s.type}
              href={`#${s.type}`}
              className="text-[10px] font-mono uppercase tracking-wider transition-colors hover:opacity-70"
              style={{ color: `${cs.text}55` }}
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

      {/* Footer */}
      <footer
        className="relative z-10 flex items-center justify-between"
        style={{
          padding: `0.75rem ${sp.section}`,
          borderTop: `1px solid ${cs.text}12`,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${cs.text}25` }} />
          <p className="text-[9px] font-mono" style={{ color: `${cs.text}33` }}>
            SYS.{new Date().getFullYear()}
          </p>
        </div>
        <p className="text-[9px] font-mono" style={{ color: `${cs.text}22` }}>
          {portfolio.title || ''}
        </p>
      </footer>
    </div>
  );
}

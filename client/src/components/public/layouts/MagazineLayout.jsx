import { parseFontPairing, useGoogleFonts, SocialLinks, ContactSection, ExternalLink, Github } from './shared';

const spacingMap = {
  compact: { section: '3rem', gap: '2rem' },
  normal: { section: '5rem', gap: '3rem' },
  spacious: { section: '7rem', gap: '4rem' },
};

/* ── Ornamental divider ────────────────────────────────────────────── */

function Divider({ cs, width = '100%' }) {
  return (
    <div className="flex items-center justify-center" style={{ padding: '1.5rem 0' }}>
      <div style={{ width, height: 1, backgroundColor: `${cs.primary}30` }} />
    </div>
  );
}

/* ── Section heading with editorial flair ───────────────────────────── */

function Heading({ text, cs, fonts, center }) {
  return (
    <div className={center ? 'text-center' : ''} style={{ marginBottom: '2rem' }}>
      <span
        className="text-xs font-semibold uppercase tracking-[0.25em]"
        style={{ color: cs.primary, letterSpacing: '0.25em' }}
      >
        {text}
      </span>
      <div
        style={{
          width: center ? 40 : 40,
          height: 2,
          backgroundColor: cs.primary,
          margin: center ? '0.75rem auto 0' : '0.75rem 0 0',
        }}
      />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */

function Hero({ content, cs, fonts, sp }) {
  return (
    <section id="hero" style={{ paddingTop: sp.section, paddingBottom: sp.section }}>
      <div className="max-w-4xl mx-auto px-8 text-center">
        {content.profileImage && (
          <img
            src={content.profileImage}
            alt={content.name}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
            style={{ border: `2px solid ${cs.primary}40` }}
          />
        )}
        <h1
          className="text-5xl md:text-7xl font-normal leading-tight mb-4"
          style={{ fontFamily: fonts.heading, color: cs.text }}
        >
          {content.name || 'Your Name'}
        </h1>
        <Divider cs={cs} width="120px" />
        <p
          className="text-xl md:text-2xl font-light mb-3"
          style={{ fontFamily: fonts.heading, color: cs.primary }}
        >
          {content.tagline || 'Your Tagline'}
        </p>
        {content.subtitle && (
          <p
            className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ fontFamily: fonts.body, color: `${cs.text}99` }}
          >
            {content.subtitle}
          </p>
        )}
        <div className="flex gap-4 justify-center flex-wrap">
          {content.ctaText && (
            <a
              href={content.ctaLink || '#'}
              className="inline-block px-8 py-3 font-medium text-sm uppercase tracking-wider transition-opacity hover:opacity-90"
              style={{
                backgroundColor: cs.primary,
                color: cs.background,
                letterSpacing: '0.1em',
              }}
            >
              {content.ctaText}
            </a>
          )}
          {content.secondaryCtaText && (
            <a
              href={content.secondaryCtaLink || '#'}
              className="inline-block px-8 py-3 font-medium text-sm uppercase tracking-wider transition-opacity hover:opacity-80"
              style={{
                border: `1.5px solid ${cs.primary}`,
                color: cs.primary,
                letterSpacing: '0.1em',
              }}
            >
              {content.secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── About with drop cap ──────────────────────────────────────────── */

function About({ content, cs, fonts, sp }) {
  const bio = content.bio || '';
  const firstLetter = bio.charAt(0);
  const restOfBio = bio.slice(1);

  return (
    <section id="about" className="px-8" style={{ paddingTop: sp.section, paddingBottom: sp.section }}>
      <div className="max-w-3xl mx-auto">
        <Heading text="About" cs={cs} fonts={fonts} />
        <div className="flex gap-8 items-start">
          {content.profileImage && (
            <img
              src={content.profileImage}
              alt="Profile"
              className="w-40 h-52 object-cover shrink-0 hidden md:block"
              style={{ border: `1px solid ${cs.primary}20` }}
            />
          )}
          <div>
            <p className="text-lg leading-relaxed" style={{ fontFamily: fonts.body, color: `${cs.text}dd` }}>
              {firstLetter && (
                <span
                  className="float-left mr-3 text-6xl leading-none font-bold"
                  style={{ fontFamily: fonts.heading, color: cs.primary, marginTop: '0.05em' }}
                >
                  {firstLetter}
                </span>
              )}
              {restOfBio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Projects ─────────────────────────────────────────────────────── */

function Projects({ content, cs, fonts, sp }) {
  const projects = content.projects || [];
  return (
    <section id="projects" className="px-8" style={{ paddingTop: sp.section, paddingBottom: sp.section }}>
      <div className="max-w-4xl mx-auto">
        <Heading text="Selected Work" cs={cs} fonts={fonts} />
        <div className="space-y-12">
          {projects.map((p, i) => (
            <div key={i}>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full md:w-64 aspect-video object-cover shrink-0"
                    style={{ border: `1px solid ${cs.primary}15` }}
                  />
                )}
                <div className="flex-1">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: fonts.heading, color: cs.text }}
                  >
                    {p.title}
                  </h3>
                  <p className="mb-3 leading-relaxed" style={{ color: `${cs.text}99` }}>{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(p.tags || []).map((tag, j) => (
                      <span
                        key={j}
                        className="text-xs px-2.5 py-0.5 font-medium uppercase tracking-wider"
                        style={{ backgroundColor: `${cs.primary}12`, color: cs.primary, letterSpacing: '0.05em' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium" style={{ color: cs.primary }}>
                        <ExternalLink className="w-3.5 h-3.5" /> View
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
              {i < projects.length - 1 && <Divider cs={cs} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Skills ───────────────────────────────────────────────────────── */

function Skills({ content, cs, fonts, sp }) {
  const skills = content.skills || [];
  return (
    <section id="skills" className="px-8" style={{ paddingTop: sp.section, paddingBottom: sp.section }}>
      <div className="max-w-3xl mx-auto">
        <Heading text="Expertise" cs={cs} fonts={fonts} />
        <div className="flex flex-wrap gap-3">
          {skills.map((s, i) => {
            const name = typeof s === 'string' ? s : s.name;
            return (
              <span
                key={i}
                className="px-4 py-2 text-sm font-medium"
                style={{
                  border: `1px solid ${cs.primary}25`,
                  color: cs.text,
                  letterSpacing: '0.03em',
                }}
              >
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Experience ───────────────────────────────────────────────────── */

function Experience({ content, cs, fonts, sp }) {
  const entries = content.entries || [];
  return (
    <section id="experience" className="px-8" style={{ paddingTop: sp.section, paddingBottom: sp.section }}>
      <div className="max-w-3xl mx-auto">
        <Heading text="Experience" cs={cs} fonts={fonts} />
        <div className="space-y-10">
          {entries.map((e, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-24 shrink-0 text-right hidden md:block">
                <span className="text-xs font-medium" style={{ color: `${cs.text}66` }}>
                  {e.startDate} — {e.current ? 'Present' : e.endDate}
                </span>
              </div>
              <div className="flex-1" style={{ borderLeft: `2px solid ${cs.primary}20`, paddingLeft: '1.5rem' }}>
                <h3 className="font-semibold text-lg" style={{ fontFamily: fonts.heading, color: cs.text }}>{e.role}</h3>
                <p className="font-medium text-sm mb-1" style={{ color: cs.primary }}>{e.company}</p>
                <p className="text-sm md:hidden mb-1" style={{ color: `${cs.text}66` }}>
                  {e.startDate} — {e.current ? 'Present' : e.endDate}
                </p>
                {e.description && <p className="leading-relaxed" style={{ color: `${cs.text}99` }}>{e.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Education ────────────────────────────────────────────────────── */

function Education({ content, cs, fonts, sp }) {
  const entries = content.entries || [];
  return (
    <section id="education" className="px-8" style={{ paddingTop: sp.section, paddingBottom: sp.section }}>
      <div className="max-w-3xl mx-auto">
        <Heading text="Education" cs={cs} fonts={fonts} />
        <div className="space-y-6">
          {entries.map((e, i) => (
            <div key={i}>
              <h3 className="font-semibold text-lg" style={{ fontFamily: fonts.heading, color: cs.text }}>{e.degree}</h3>
              <p className="font-medium text-sm" style={{ color: cs.primary }}>{e.institution}</p>
              <p className="text-xs mt-0.5" style={{ color: `${cs.text}66` }}>{e.startYear} — {e.current ? 'Present' : e.endYear}</p>
              {e.description && <p className="mt-1 leading-relaxed" style={{ color: `${cs.text}99` }}>{e.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials (pull quotes) ───────────────────────────────────── */

function Testimonials({ content, cs, fonts, sp }) {
  const testimonials = content.testimonials || [];
  return (
    <section id="testimonials" className="px-8" style={{ paddingTop: sp.section, paddingBottom: sp.section }}>
      <div className="max-w-3xl mx-auto">
        <Heading text="Testimonials" cs={cs} fonts={fonts} center />
        <div className="space-y-10">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="text-center" style={{ borderTop: `1px solid ${cs.primary}15`, borderBottom: `1px solid ${cs.primary}15`, padding: '2rem 1rem' }}>
              <span className="text-5xl leading-none font-serif" style={{ color: `${cs.primary}40` }}>&ldquo;</span>
              <p
                className="text-xl md:text-2xl font-light italic leading-relaxed mt-2 mb-4"
                style={{ fontFamily: fonts.heading, color: cs.text }}
              >
                {t.quote}
              </p>
              <footer className="flex items-center justify-center gap-3">
                {t.avatar && <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
                <div className="text-left">
                  <cite className="not-italic font-semibold text-sm" style={{ color: cs.text }}>{t.name}</cite>
                  {t.role && <p className="text-xs" style={{ color: `${cs.text}66` }}>{t.role}</p>}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────────────────── */

function Contact({ content, cs, fonts, sp, slug }) {
  return (
    <section id="contact" className="px-8" style={{ paddingTop: sp.section, paddingBottom: sp.section }}>
      <div className="max-w-3xl mx-auto">
        <Heading text="Contact" cs={cs} fonts={fonts} center />
        <ContactSection content={content} theme={{ colorScheme: cs, fontPairing: { heading: fonts.heading, body: fonts.body } }} slug={slug} />
      </div>
    </section>
  );
}

/* ── Section map ──────────────────────────────────────────────────── */

const sectionRenderers = { hero: Hero, about: About, projects: Projects, skills: Skills, experience: Experience, education: Education, testimonials: Testimonials, contact: Contact };

/* ── Main layout ──────────────────────────────────────────────────── */

export default function MagazineLayout({ portfolio, editorProps }) {
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
      className="min-h-screen"
      style={{ fontFamily: fonts.body, backgroundColor: cs.background, color: cs.text }}
    >
      {/* Elegant top bar */}
      <nav className="flex items-center justify-between px-8 py-4" style={{ borderBottom: `1px solid ${cs.primary}15` }}>
        <span className="text-sm font-semibold tracking-widest uppercase" style={{ fontFamily: fonts.heading, color: cs.text }}>
          {portfolio.title || sections.find(s => s.type === 'hero')?.content?.name || ''}
        </span>
        <div className="flex gap-6">
          {sorted.filter(s => s.type !== 'hero').map(s => (
            <a
              key={s.type}
              href={`#${s.type}`}
              className="text-xs uppercase tracking-wider transition-colors hover:opacity-80"
              style={{ color: `${cs.text}88`, letterSpacing: '0.1em' }}
            >
              {s.type}
            </a>
          ))}
        </div>
      </nav>

      {sorted.map((section, idx) => {
        const isHero = section.type === 'hero';
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

        if (!isHero) {
          const wrappedEl = (
            <div key={SectionWrap ? undefined : section._id || idx}>
              <Divider cs={cs} />
              {sectionEl}
            </div>
          );
          return SectionWrap
            ? <SectionWrap key={section._id || idx} section={section}>{wrappedEl}</SectionWrap>
            : wrappedEl;
        }

        return SectionWrap
          ? <SectionWrap key={section._id || idx} section={section}>{sectionEl}</SectionWrap>
          : sectionEl;
      })}

      {/* Footer */}
      <footer className="px-8 py-8 text-center" style={{ borderTop: `1px solid ${cs.primary}15` }}>
        <p className="text-xs" style={{ color: `${cs.text}44` }}>
          &copy; {new Date().getFullYear()} {portfolio.title || ''}
        </p>
      </footer>
    </div>
  );
}

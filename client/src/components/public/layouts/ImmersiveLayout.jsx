import { parseFontPairing, useGoogleFonts, SocialLinks, ContactSection, ExternalLink, Github } from './shared';

const spacingMap = {
  compact: { py: 'py-12', px: 'px-6' },
  normal: { py: 'py-20', px: 'px-8' },
  spacious: { py: 'py-32', px: 'px-8' },
};

/* ── Neon heading helper ────────────────────────────────────────────── */

function NeonHeading({ text, primary, fonts }) {
  return (
    <div className="text-center mb-12">
      <h2
        className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4"
        style={{
          fontFamily: fonts.heading,
          color: primary,
          textShadow: `0 0 10px ${primary}80, 0 0 40px ${primary}40, 0 0 80px ${primary}20`,
        }}
      >
        {text}
      </h2>
      <div
        className="mx-auto"
        style={{
          width: 100,
          height: 3,
          backgroundColor: primary,
          boxShadow: `0 0 10px ${primary}80, 0 0 40px ${primary}40, 0 0 80px ${primary}20`,
          borderRadius: 2,
        }}
      />
    </div>
  );
}

/* ── Glass card style helper ────────────────────────────────────────── */

const glassCard = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
};

/* ── Section Renderers ──────────────────────────────────────────────── */

function Hero({ content, cs, fonts }) {
  const primary = cs.primary;

  return (
    <section
      className="min-h-screen flex items-center justify-center text-center relative overflow-hidden"
      style={{ backgroundColor: cs.background, color: cs.text }}
    >
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${primary}15 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {content.profileImage && (
          <img
            src={content.profileImage}
            alt={content.name}
            className="w-36 h-36 rounded-full object-cover mx-auto mb-8 border-4"
            style={{ borderColor: primary, boxShadow: `0 0 30px ${primary}40` }}
          />
        )}
        <h1
          className="text-6xl md:text-8xl font-bold uppercase mb-4 tracking-tight"
          style={{
            fontFamily: fonts.heading,
            textShadow: `0 0 10px ${primary}80, 0 0 40px ${primary}40, 0 0 80px ${primary}20`,
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
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ opacity: 0.5 }}>
            {content.subtitle}
          </p>
        )}
        <div className="flex gap-4 justify-center flex-wrap">
          {content.ctaText && (
            <a
              href={content.ctaLink || '#'}
              className="inline-block px-8 py-3 rounded-full text-white font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: primary,
                boxShadow: `0 0 20px ${primary}50`,
              }}
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

function About({ content, cs, fonts }) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <NeonHeading text="About" primary={cs.primary} fonts={fonts} />
      {content.profileImage && (
        <img
          src={content.profileImage}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover mx-auto mb-8"
          style={{
            border: `3px solid ${cs.primary}40`,
            boxShadow: `0 0 20px ${cs.primary}20`,
          }}
        />
      )}
      <p
        className="text-lg leading-relaxed"
        style={{ fontFamily: fonts.body, color: cs.text, opacity: 0.8 }}
      >
        {content.bio}
      </p>
    </div>
  );
}

function Projects({ content, cs, fonts }) {
  const projects = content.projects || [];
  const primary = cs.primary;

  return (
    <div>
      <NeonHeading text="Projects" primary={primary} fonts={fonts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className="overflow-hidden transition-all duration-300 group"
            style={{
              ...glassCard,
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${primary}40`;
              e.currentTarget.style.boxShadow = `0 0 20px ${primary}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="w-full aspect-video object-cover"
              />
            )}
            <div className="p-5">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: cs.text }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm mb-3 leading-relaxed"
                style={{ color: cs.text, opacity: 0.6 }}
              >
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(p.tags || []).map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: primary,
                    }}
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
      <NeonHeading text="Skills" primary={primary} fonts={fonts} />
      <div className="flex flex-wrap gap-3 justify-center">
        {skills.map((s, i) => {
          const name = typeof s === 'string' ? s : s.name;
          return (
            <span
              key={i}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-default"
              style={{
                ...glassCard,
                borderRadius: 9999,
                color: primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 15px ${primary}30`;
                e.currentTarget.style.borderColor = `${primary}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
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

function Experience({ content, cs, fonts }) {
  const entries = content.entries || [];
  const primary = cs.primary;

  return (
    <div>
      <NeonHeading text="Experience" primary={primary} fonts={fonts} />
      <div className="max-w-3xl mx-auto space-y-10 relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px"
          style={{ backgroundColor: `${primary}30` }}
        />

        {entries.map((e, i) => (
          <div key={i} className="relative pl-10">
            {/* Glowing dot */}
            <div
              className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full"
              style={{
                backgroundColor: primary,
                boxShadow: `0 0 10px ${primary}80, 0 0 20px ${primary}40`,
              }}
            />
            <h3
              className="font-semibold text-lg"
              style={{ color: cs.text }}
            >
              {e.role}
            </h3>
            <p className="font-medium" style={{ color: primary }}>
              {e.company}
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: cs.text, opacity: 0.5 }}
            >
              {e.startDate} — {e.current ? 'Present' : e.endDate}
            </p>
            {e.description && (
              <p
                className="mt-2 leading-relaxed"
                style={{ color: cs.text, opacity: 0.7 }}
              >
                {e.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Education({ content, cs, fonts }) {
  const entries = content.entries || [];
  const primary = cs.primary;

  return (
    <div>
      <NeonHeading text="Education" primary={primary} fonts={fonts} />
      <div className="max-w-3xl mx-auto space-y-8">
        {entries.map((e, i) => (
          <div key={i} className="text-center">
            <h3
              className="font-semibold text-lg"
              style={{ color: cs.text }}
            >
              {e.degree}
            </h3>
            <p className="font-medium" style={{ color: primary }}>
              {e.institution}
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: cs.text, opacity: 0.5 }}
            >
              {e.startYear} — {e.current ? 'Present' : e.endYear}
            </p>
            {e.description && (
              <p
                className="mt-2 leading-relaxed"
                style={{ color: cs.text, opacity: 0.7 }}
              >
                {e.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials({ content, cs, fonts }) {
  const testimonials = content.testimonials || [];
  const primary = cs.primary;

  return (
    <div>
      <NeonHeading text="Testimonials" primary={primary} fonts={fonts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-6 relative"
            style={{ ...glassCard }}
          >
            {/* Large decorative quotation mark */}
            <span
              className="absolute top-4 left-5 text-6xl font-serif leading-none select-none pointer-events-none"
              style={{ color: `${primary}30` }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <div className="relative pt-8">
              <p
                className="text-base italic mb-6 leading-relaxed"
                style={{ color: cs.text, opacity: 0.8 }}
              >
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                {t.avatar && (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: cs.text }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: cs.text, opacity: 0.5 }}
                  >
                    {t.role}
                  </p>
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
      <NeonHeading
        text={content.title || 'Custom Section'}
        primary={cs.primary}
        fonts={fonts}
      />
      <div
        className="prose prose-lg max-w-none prose-invert"
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

export default function ImmersiveLayout({ portfolio, editorProps }) {
  const theme = portfolio.theme || {};
  const cs = theme.colorScheme || {};
  const fonts = parseFontPairing(theme.fontPairing);
  const sp = spacingMap[theme.spacing] || spacingMap.normal;
  const SectionWrap = editorProps?.SectionWrapper;

  useGoogleFonts(theme.fontPairing);

  const allSorted = [...(portfolio.sections || [])].sort((a, b) => a.order - b.order);
  const visibleSections = editorProps?.showHidden
    ? allSorted
    : allSorted.filter((s) => s.visible);

  const navSections = visibleSections.filter((s) => s.type !== 'hero');

  return (
    <div
      style={{
        backgroundColor: cs.background,
        color: cs.text,
        fontFamily: fonts.body,
        minHeight: '100vh',
      }}
    >
      {/* Sticky navigation bar */}
      <nav
        className="sticky top-0 z-40"
        style={{
          backgroundColor: `${cs.background}cc`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <span
            className="font-semibold text-sm tracking-wide"
            style={{ fontFamily: fonts.heading, color: cs.text }}
          >
            {portfolio.name}
          </span>
          <div className="flex gap-5">
            {navSections.map((s) => (
              <a
                key={s._id}
                href={`#${s.type}`}
                className="text-xs font-medium uppercase tracking-wider transition-colors"
                style={{ color: cs.text, opacity: 0.5 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.color = cs.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.5';
                  e.currentTarget.style.color = cs.text;
                }}
              >
                {s.content?.title || s.type}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Sections */}
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
              style={{ backgroundColor: cs.background }}
            >
              <div className="max-w-4xl mx-auto">
                <NeonHeading
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
              style={{ backgroundColor: cs.background }}
            >
              {isHero ? (
                <Renderer content={section.content || {}} cs={cs} fonts={fonts} />
              ) : (
                <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
                  <Renderer content={section.content || {}} cs={cs} fonts={fonts} />
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

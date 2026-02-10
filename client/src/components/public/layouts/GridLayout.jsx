import { parseFontPairing, useGoogleFonts, SocialLinks, ContactSection, ExternalLink, Github } from './shared';
import { Github as GithubIcon, Linkedin, Twitter, Globe } from 'lucide-react';

/* ── Helpers ─────────────────────────────────────────────────────────── */

const border = (cs) => `2px solid ${cs.text}`;
const LABELS = { about: 'About', projects: 'Projects', skills: 'Skills', experience: 'Experience',
  education: 'Education', testimonials: 'Testimonials', contact: 'Contact', custom: 'Custom' };
const hoverIn = (cs) => (e) => { e.currentTarget.style.backgroundColor = cs.text; e.currentTarget.style.color = cs.background; };
const hoverOut = (cs) => (e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = cs.text; };

/* ── Section Renderers ───────────────────────────────────────────────── */

function Hero({ content, cs, fonts }) {
  return (
    <section id="hero" className="w-full px-6 md:px-10 py-12 md:py-20" style={{ borderBottom: border(cs) }}>
      <p className="text-xs md:text-sm font-bold tracking-[0.25em] mb-4"
        style={{ fontFamily: fonts.body, color: cs.text, opacity: 0.6, textTransform: 'uppercase' }}>
        {content.subtitle || 'NICE TO MEET YOU!'}
      </p>
      <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight"
        style={{ fontFamily: fonts.heading, color: cs.text, textTransform: 'uppercase' }}>
        {content.name || 'Your Name'}
      </h1>
      {content.tagline && (
        <p className="text-lg md:text-xl font-bold tracking-[0.15em] mt-4"
          style={{ fontFamily: fonts.body, color: cs.accent || cs.primary, textTransform: 'uppercase' }}>
          {content.tagline}
        </p>
      )}
      {content.ctaText && (
        <a href={content.ctaLink || '#'}
          className="inline-block mt-8 px-8 py-3 font-bold text-sm tracking-[0.15em] transition-colors"
          style={{ border: border(cs), color: cs.text, backgroundColor: 'transparent', textTransform: 'uppercase' }}
          onMouseEnter={hoverIn(cs)} onMouseLeave={hoverOut(cs)}>
          {content.ctaText}
        </a>
      )}
    </section>
  );
}

function About({ content, cs, fonts }) {
  return (
    <div className={`grid ${content.profileImage ? 'grid-cols-1 md:grid-cols-[280px_1fr]' : 'grid-cols-1'}`}>
      {content.profileImage && (
        <div className="border-b md:border-b-0 md:border-r" style={{ borderColor: cs.text, borderWidth: 2 }}>
          <img src={content.profileImage} alt="Profile" className="w-full h-64 md:h-full object-cover block" />
        </div>
      )}
      <div className="p-6 md:p-10">
        <p className="text-base md:text-lg leading-relaxed"
          style={{ fontFamily: fonts.body, color: cs.text, opacity: 0.85 }}>
          {content.bio}
        </p>
      </div>
    </div>
  );
}

function Projects({ content, cs, fonts }) {
  const projects = content.projects || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {projects.map((p, i) => (
        <div key={i} className="border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0"
          style={{ borderColor: cs.text, borderWidth: 2 }}>
          {p.image && <img src={p.image} alt={p.title} className="w-full aspect-video object-cover block" />}
          <div className="p-5">
            <h3 className="text-base font-bold tracking-[0.1em] mb-2"
              style={{ fontFamily: fonts.heading, color: cs.text, textTransform: 'uppercase' }}>
              {p.title}
            </h3>
            <p className="text-sm mb-3" style={{ fontFamily: fonts.body, color: cs.text, opacity: 0.65 }}>
              {p.description}
            </p>
            {(p.tags || []).length > 0 && (
              <p className="text-xs font-bold tracking-wider mb-3"
                style={{ color: cs.text, opacity: 0.5, textTransform: 'uppercase' }}>
                {p.tags.join(' / ')}
              </p>
            )}
            <div className="flex gap-4">
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold tracking-wider underline"
                  style={{ color: cs.accent || cs.primary, textTransform: 'uppercase' }}>
                  <ExternalLink className="w-3.5 h-3.5" /> Live
                </a>
              )}
              {p.sourceUrl && (
                <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold tracking-wider underline"
                  style={{ color: cs.accent || cs.primary, textTransform: 'uppercase' }}>
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {skills.map((s, i) => {
        const name = typeof s === 'string' ? s : s.name;
        const level = typeof s === 'object' ? s.level : null;
        return (
          <div key={i} className="flex flex-col items-center justify-center p-4 text-center"
            style={{ border: border(cs) }}>
            <span className="text-xs font-bold tracking-[0.15em]"
              style={{ fontFamily: fonts.heading, color: cs.text, textTransform: 'uppercase' }}>
              {name}
            </span>
            {level != null && (
              <span className="text-[10px] mt-1 tracking-widest" style={{ color: cs.text, opacity: 0.4 }}>
                {'●'.repeat(Math.min(level, 5))}{'○'.repeat(Math.max(5 - level, 0))}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Experience({ content, cs, fonts }) {
  const entries = content.entries || [];
  return (
    <div>
      {entries.map((e, i) => (
        <div key={i} className="px-6 md:px-10 py-6"
          style={{ borderBottom: i < entries.length - 1 ? border(cs) : 'none' }}>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight"
            style={{ fontFamily: fonts.heading, color: cs.text, textTransform: 'uppercase' }}>
            {e.role}
          </h3>
          <p className="text-sm font-bold mt-1"
            style={{ color: cs.accent || cs.primary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {e.company}
          </p>
          <p className="text-xs mt-1 tracking-widest" style={{ fontFamily: 'monospace', color: cs.text, opacity: 0.45 }}>
            {e.startDate} — {e.current ? 'PRESENT' : e.endDate}
          </p>
          {e.description && (
            <p className="text-sm mt-3 leading-relaxed" style={{ fontFamily: fonts.body, color: cs.text, opacity: 0.7 }}>
              {e.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function Education({ content, cs, fonts }) {
  const entries = content.entries || [];
  return (
    <div>
      {entries.map((e, i) => (
        <div key={i} className="px-6 md:px-10 py-6"
          style={{ borderBottom: i < entries.length - 1 ? border(cs) : 'none' }}>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight"
            style={{ fontFamily: fonts.heading, color: cs.text, textTransform: 'uppercase' }}>
            {e.degree}
          </h3>
          <p className="text-sm font-bold mt-1"
            style={{ color: cs.accent || cs.primary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {e.institution}
          </p>
          <p className="text-xs mt-1 tracking-widest" style={{ fontFamily: 'monospace', color: cs.text, opacity: 0.45 }}>
            {e.startYear} — {e.current ? 'PRESENT' : e.endYear}
          </p>
          {e.description && (
            <p className="text-sm mt-3 leading-relaxed" style={{ fontFamily: fonts.body, color: cs.text, opacity: 0.7 }}>
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
    <div>
      {testimonials.map((t, i) => (
        <div key={i} className="px-6 md:px-10 py-8"
          style={{ borderBottom: i < testimonials.length - 1 ? border(cs) : 'none' }}>
          <p className="text-lg md:text-xl font-bold leading-snug mb-4"
            style={{ fontFamily: fonts.heading, color: cs.text }}>
            "{t.quote}"
          </p>
          <div className="flex items-center gap-3">
            {t.avatar && (
              <img src={t.avatar} alt={t.name} className="w-10 h-10 object-cover"
                style={{ border: border(cs) }} />
            )}
            <div>
              <p className="text-xs font-bold tracking-[0.15em]"
                style={{ color: cs.text, textTransform: 'uppercase' }}>{t.name}</p>
              <p className="text-xs tracking-wider"
                style={{ color: cs.text, opacity: 0.5, fontVariant: 'small-caps' }}>{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const SOCIALS = [
  { key: 'github', icon: GithubIcon, label: 'GitHub' },
  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  { key: 'twitter', icon: Twitter, label: 'Twitter' },
  { key: 'website', icon: Globe, label: 'Website' },
];

function Contact({ content, cs, fonts, slug, theme }) {
  return (
    <div className="px-6 md:px-10 py-8">
      {content.email && (
        <a href={`mailto:${content.email}`}
          className="inline-block text-sm font-bold tracking-[0.15em] underline mb-6"
          style={{ color: cs.accent || cs.primary, textTransform: 'uppercase' }}>
          {content.email}
        </a>
      )}
      <div className="flex flex-wrap mb-8">
        {SOCIALS.map(({ key, icon: Icon, label }) =>
          content[key] ? (
            <a key={key} href={content[key]} target="_blank" rel="noopener noreferrer" title={label}
              className="flex items-center justify-center w-12 h-12 transition-colors"
              style={{ border: border(cs), color: cs.text }}
              onMouseEnter={hoverIn(cs)} onMouseLeave={hoverOut(cs)}>
              <Icon className="w-5 h-5" />
            </a>
          ) : null
        )}
      </div>
      {content.showContactForm && (
        <div style={{ maxWidth: 480 }}>
          <ContactSection content={content} theme={theme} slug={slug} />
        </div>
      )}
    </div>
  );
}

function Custom({ content, cs }) {
  return (
    <div className="px-6 md:px-10 py-8">
      <div className="prose prose-lg max-w-none" style={{ color: cs.text, opacity: 0.85 }}
        dangerouslySetInnerHTML={{ __html: content.body || '' }} />
    </div>
  );
}

const renderers = {
  about: About, projects: Projects, skills: Skills, experience: Experience,
  education: Education, testimonials: Testimonials, custom: Custom,
};

/* ── Main Layout ─────────────────────────────────────────────────────── */

export default function GridLayout({ portfolio }) {
  const theme = portfolio.theme || {};
  const cs = theme.colorScheme || {};
  const fonts = parseFontPairing(theme.fontPairing);
  useGoogleFonts(theme.fontPairing);

  const visible = [...(portfolio.sections || [])].filter((s) => s.visible).sort((a, b) => a.order - b.order);
  const navSections = visible.filter((s) => s.type !== 'hero');
  const heroSection = visible.find((s) => s.type === 'hero');

  return (
    <div style={{ backgroundColor: cs.background, color: cs.text, fontFamily: fonts.body, minHeight: '100vh' }}>
      {/* ── Navigation Grid ──────────────────────────────────────────── */}
      {navSections.length > 0 && (
        <nav style={{ borderBottom: border(cs) }}>
          <div className="hidden md:grid w-full"
            style={{ gridTemplateColumns: `repeat(${navSections.length}, 1fr)` }}>
            {navSections.map((s, i) => (
              <a key={s._id} href={`#${s.type}`}
                className="flex items-center justify-center py-3 text-xs font-bold tracking-[0.2em] transition-colors"
                style={{ fontFamily: fonts.heading, color: cs.text, textTransform: 'uppercase',
                  borderRight: i < navSections.length - 1 ? border(cs) : 'none' }}
                onMouseEnter={hoverIn(cs)} onMouseLeave={hoverOut(cs)}>
                {LABELS[s.type] || s.type}
              </a>
            ))}
          </div>
          <div className="grid grid-cols-2 md:hidden w-full">
            {navSections.map((s, i) => (
              <a key={s._id} href={`#${s.type}`}
                className="flex items-center justify-center py-3 text-xs font-bold tracking-[0.2em]"
                style={{ fontFamily: fonts.heading, color: cs.text, textTransform: 'uppercase',
                  borderRight: i % 2 === 0 ? border(cs) : 'none', borderBottom: border(cs) }}>
                {LABELS[s.type] || s.type}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      {heroSection && <Hero content={heroSection.content || {}} cs={cs} fonts={fonts} />}

      {/* ── Body Sections ────────────────────────────────────────────── */}
      {navSections.map((section) => {
        const Renderer = section.type === 'contact' ? null : renderers[section.type];
        return (
          <section key={section._id} id={section.type} style={{ borderTop: border(cs) }}>
            <div className="px-6 md:px-10 py-3" style={{ borderBottom: border(cs) }}>
              <h2 className="text-xs font-bold tracking-[0.2em]"
                style={{ fontFamily: fonts.heading, color: cs.text, textTransform: 'uppercase' }}>
                {section.content?.title || LABELS[section.type] || section.type}
              </h2>
            </div>
            {section.type === 'contact' ? (
              <Contact content={section.content || {}} cs={cs} fonts={fonts}
                slug={portfolio.slug} theme={theme} />
            ) : Renderer ? (
              <Renderer content={section.content || {}} cs={cs} fonts={fonts} />
            ) : null}
          </section>
        );
      })}

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: border(cs) }}>
        <p className="text-xs font-bold tracking-[0.15em]"
          style={{ color: cs.text, opacity: 0.4, textTransform: 'uppercase' }}>
          {portfolio.name} &copy; {new Date().getFullYear()}
        </p>
        <div className="flex">
          {SOCIALS.map(({ key, icon: Icon }) => {
            const url = visible.find((s) => s.type === 'contact')?.content?.[key];
            if (!url) return null;
            return (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 transition-colors"
                style={{ border: border(cs), color: cs.text }}
                onMouseEnter={hoverIn(cs)} onMouseLeave={hoverOut(cs)}>
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </footer>
    </div>
  );
}

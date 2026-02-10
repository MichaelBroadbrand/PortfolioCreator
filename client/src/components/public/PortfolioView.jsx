import { Github, Linkedin, Twitter, Globe, Mail, ExternalLink } from 'lucide-react';
import ContactForm from './ContactForm';

const spacingMap = {
  compact: 'py-8 px-6',
  normal: 'py-16 px-8',
  spacious: 'py-24 px-8',
};

function HeroView({ content, theme }) {
  const cs = theme.colorScheme || {};
  return (
    <section
      className="min-h-[70vh] flex items-center justify-center text-center"
      style={{ backgroundColor: cs.background, color: cs.text }}
    >
      <div className="max-w-3xl mx-auto px-6">
        {content.profileImage && (
          <img src={content.profileImage} alt={content.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-6 border-4" style={{ borderColor: cs.primary }} />
        )}
        <h1 className="text-5xl font-bold mb-3" style={{ fontFamily: theme.fontPairing?.heading }}>
          {content.name || 'Your Name'}
        </h1>
        <p className="text-xl mb-2" style={{ color: cs.primary }}>
          {content.tagline || 'Your Tagline'}
        </p>
        <p className="text-lg opacity-70 max-w-xl mx-auto mb-8">
          {content.subtitle}
        </p>
        {content.ctaText && (
          <a
            href={content.ctaLink || '#'}
            className="inline-block px-8 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: cs.primary }}
          >
            {content.ctaText}
          </a>
        )}
      </div>
    </section>
  );
}

function AboutView({ content, theme }) {
  const cs = theme.colorScheme || {};
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-surface-900" style={{ fontFamily: theme.fontPairing?.heading }}>About</h2>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {content.profileImage && (
          <img src={content.profileImage} alt="Profile" className="w-48 h-48 rounded-xl object-cover shrink-0" />
        )}
        <p className="leading-relaxed text-lg text-surface-600" style={{ fontFamily: theme.fontPairing?.body }}>
          {content.bio}
        </p>
      </div>
    </div>
  );
}

function ProjectsView({ content, theme }) {
  const cs = theme.colorScheme || {};
  const projects = content.projects || [];
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-surface-900" style={{ fontFamily: theme.fontPairing?.heading }}>Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{
              boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            {p.image && <img src={p.image} alt={p.title} className="w-full aspect-video object-cover" />}
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2 text-surface-900">{p.title}</h3>
              <p className="text-sm mb-3 text-surface-500">{p.description}</p>
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

function SkillsView({ content, theme }) {
  const cs = theme.colorScheme || {};
  const skills = content.skills || [];
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-surface-900" style={{ fontFamily: theme.fontPairing?.heading }}>Skills</h2>
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

function ExperienceView({ content, theme }) {
  const cs = theme.colorScheme || {};
  const entries = content.entries || [];
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-surface-900" style={{ fontFamily: theme.fontPairing?.heading }}>Experience</h2>
      <div className="space-y-8">
        {entries.map((e, i) => (
          <div key={i} className="relative pl-6 border-l-2" style={{ borderColor: cs.primary }}>
            <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full" style={{ backgroundColor: cs.primary }} />
            <h3 className="font-semibold text-lg text-surface-900">{e.role}</h3>
            <p className="font-medium" style={{ color: cs.primary }}>{e.company}</p>
            <p className="text-sm mt-0.5 text-surface-400">
              {e.startDate} — {e.current ? 'Present' : e.endDate}
            </p>
            <p className="mt-2 text-surface-600">{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationView({ content, theme }) {
  const cs = theme.colorScheme || {};
  const entries = content.entries || [];
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-surface-900" style={{ fontFamily: theme.fontPairing?.heading }}>Education</h2>
      <div className="space-y-6">
        {entries.map((e, i) => (
          <div key={i}>
            <h3 className="font-semibold text-lg text-surface-900">{e.degree}</h3>
            <p className="font-medium" style={{ color: cs.primary }}>{e.institution}</p>
            <p className="text-sm text-surface-400">
              {e.startYear} — {e.current ? 'Present' : e.endYear}
            </p>
            {e.description && <p className="mt-1 text-surface-600">{e.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactView({ content, theme, slug }) {
  const cs = theme.colorScheme || {};
  const socialLinks = [
    { key: 'github', icon: Github, label: 'GitHub' },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { key: 'twitter', icon: Twitter, label: 'Twitter' },
    { key: 'website', icon: Globe, label: 'Website' },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4 text-surface-900" style={{ fontFamily: theme.fontPairing?.heading }}>Get In Touch</h2>
      {content.email && (
        <a href={`mailto:${content.email}`} className="flex items-center justify-center gap-2 text-lg mb-6" style={{ color: cs.primary }}>
          <Mail className="w-5 h-5" /> {content.email}
        </a>
      )}
      <div className="flex justify-center gap-4 mb-8">
        {socialLinks.map(({ key, icon: Icon, label }) =>
          content[key] ? (
            <a key={key} href={content[key]} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full transition-colors" style={{ backgroundColor: `${cs.primary}15`, color: cs.primary }} title={label}>
              <Icon className="w-5 h-5" />
            </a>
          ) : null
        )}
      </div>
      {content.showContactForm && <ContactForm slug={slug} theme={theme} />}
    </div>
  );
}

function TestimonialsView({ content, theme }) {
  const cs = theme.colorScheme || {};
  const testimonials = content.testimonials || [];
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center text-surface-900" style={{ fontFamily: theme.fontPairing?.heading }}>Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="p-6 rounded-xl bg-surface-50">
            <p className="text-base italic mb-4 text-surface-600">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              {t.avatar && <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
              <div>
                <p className="font-semibold text-sm text-surface-900">{t.name}</p>
                <p className="text-xs text-surface-400">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomView({ content, theme }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-surface-900" style={{ fontFamily: theme.fontPairing?.heading }}>
        {content.title || 'Custom Section'}
      </h2>
      <div
        className="prose prose-lg max-w-none text-surface-600"
        dangerouslySetInnerHTML={{ __html: content.body || '' }}
      />
    </div>
  );
}

const sectionRenderers = {
  hero: HeroView,
  about: AboutView,
  projects: ProjectsView,
  skills: SkillsView,
  experience: ExperienceView,
  education: EducationView,
  contact: ContactView,
  testimonials: TestimonialsView,
  custom: CustomView,
};

export default function PortfolioView({ portfolio }) {
  const theme = portfolio.theme || {};
  const spacing = spacingMap[theme.spacing] || spacingMap.normal;

  const visibleSections = [...(portfolio.sections || [])]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div
      style={{
        fontFamily: theme.fontPairing?.body || 'DM Sans, sans-serif',
      }}
    >
      {visibleSections.map((section) => {
        const Renderer = sectionRenderers[section.type];
        if (!Renderer) return null;

        const isHero = section.type === 'hero';

        return (
          <section
            key={section._id}
            id={`section-${section._id}`}
            className={isHero ? '' : spacing}
          >
            <Renderer
              content={section.content || {}}
              theme={theme}
              slug={portfolio.slug}
            />
          </section>
        );
      })}
    </div>
  );
}

import { useEditor } from '../../context/EditorContext';

const sectionLabels = {
  hero: 'Hero',
  about: 'About',
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  contact: 'Contact',
  testimonials: 'Testimonials',
  custom: 'Custom',
};

function DefaultSectionPreview({ section, theme }) {
  const content = section.content || {};

  switch (section.type) {
    case 'hero':
      return (
        <div
          className="min-h-[300px] flex items-center justify-center p-12"
          style={{ backgroundColor: theme?.colorScheme?.background, color: theme?.colorScheme?.text }}
        >
          <div className="text-center">
            {content.profileImage && (
              <img src={content.profileImage} alt={content.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
            )}
            <h1 className="text-4xl font-bold mb-2">{content.name || 'Your Name'}</h1>
            <p className="text-xl opacity-70 mb-2">{content.tagline || 'Your Tagline'}</p>
            <p className="opacity-50 max-w-lg mx-auto">{content.subtitle || 'A brief description about yourself'}</p>
            {content.ctaText && (
              <div className="mt-6">
                <span
                  className="inline-block px-6 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: theme?.colorScheme?.primary }}
                >
                  {content.ctaText}
                </span>
              </div>
            )}
          </div>
        </div>
      );

    case 'about':
      return (
        <div className="py-12 px-8">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <div className="flex gap-6 items-start">
            {content.profileImage && (
              <img src={content.profileImage} alt="About" className="w-32 h-32 rounded-lg object-cover shrink-0" />
            )}
            <p className="text-surface-600 leading-relaxed">{content.bio || 'Tell visitors about yourself...'}</p>
          </div>
        </div>
      );

    case 'projects':
      return (
        <div className="py-12 px-8">
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(content.projects || []).slice(0, 4).map((p, i) => (
              <div key={i} className="border border-surface-200 rounded-lg overflow-hidden">
                {p.image && (
                  <img src={p.image} alt={p.title} className="w-full aspect-video object-cover" />
                )}
                <div className="p-4">
                  <h3 className="font-semibold">{p.title || `Project ${i + 1}`}</h3>
                  <p className="text-sm text-surface-500 mt-1">{p.description || 'Project description'}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(p.tags || []).map((tag, j) => (
                      <span key={j} className="text-xs bg-surface-100 text-surface-600 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {(!content.projects || content.projects.length === 0) && (
              <div className="col-span-2 text-center py-8 text-surface-400 border-2 border-dashed rounded-lg">
                Add your projects here
              </div>
            )}
          </div>
        </div>
      );

    case 'skills':
      return (
        <div className="py-12 px-8">
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {(content.skills || []).map((s, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${theme?.colorScheme?.primary}15`,
                  color: theme?.colorScheme?.primary,
                }}
              >
                {s.name || s}
              </span>
            ))}
            {(!content.skills || content.skills.length === 0) && (
              <p className="text-surface-400">Add your skills here</p>
            )}
          </div>
        </div>
      );

    case 'experience':
      return (
        <div className="py-12 px-8">
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          {(content.entries || []).map((e, i) => (
            <div key={i} className="mb-6 pb-6 border-b border-surface-100 last:border-0">
              <h3 className="font-semibold">{e.company || 'Company'}</h3>
              <p className="text-sm" style={{ color: theme?.colorScheme?.primary }}>{e.role || 'Role'}</p>
              <p className="text-xs text-surface-400 mt-1">{e.startDate} — {e.current ? 'Present' : e.endDate}</p>
              <p className="text-sm text-surface-600 mt-2">{e.description || 'Description'}</p>
            </div>
          ))}
          {(!content.entries || content.entries.length === 0) && (
            <p className="text-surface-400">Add your experience here</p>
          )}
        </div>
      );

    case 'education':
      return (
        <div className="py-12 px-8">
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          {(content.entries || []).map((e, i) => (
            <div key={i} className="mb-4">
              <h3 className="font-semibold">{e.institution || 'Institution'}</h3>
              <p className="text-sm text-surface-600">{e.degree || 'Degree'}</p>
              <p className="text-xs text-surface-400">{e.startYear} — {e.current ? 'Present' : e.endYear}</p>
            </div>
          ))}
          {(!content.entries || content.entries.length === 0) && (
            <p className="text-surface-400">Add your education here</p>
          )}
        </div>
      );

    case 'contact':
      return (
        <div className="py-12 px-8 max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
          <p className="text-surface-500 mb-4">{content.email || 'your@email.com'}</p>
          {(content.github || content.linkedin || content.twitter || content.website) && (
            <div className="flex justify-center gap-4 mb-4">
              {content.github && (
                <a href={content.github} target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-surface-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              )}
              {content.linkedin && (
                <a href={content.linkedin} target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-surface-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {content.twitter && (
                <a href={content.twitter} target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-surface-800 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              )}
              {content.website && (
                <a href={content.website} target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-surface-800 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </a>
              )}
            </div>
          )}
          <div
            className="inline-block px-6 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: theme?.colorScheme?.primary }}
          >
            Send Message
          </div>
        </div>
      );

    case 'testimonials':
      return (
        <div className="py-12 px-8">
          <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(content.testimonials || []).map((t, i) => (
              <div key={i} className="bg-surface-50 p-6 rounded-xl">
                <p className="text-sm italic text-surface-600 mb-3">"{t.quote || 'Testimonial quote'}"</p>
                <div className="flex items-center gap-2">
                  {t.avatar && (
                    <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                  )}
                  <div>
                    <p className="text-sm font-semibold">{t.name || 'Name'}</p>
                    <p className="text-xs text-surface-400">{t.role || 'Role'}</p>
                  </div>
                </div>
              </div>
            ))}
            {(!content.testimonials || content.testimonials.length === 0) && (
              <p className="text-surface-400">Add testimonials here</p>
            )}
          </div>
        </div>
      );

    case 'custom':
      return (
        <div className="py-12 px-8">
          <h2 className="text-2xl font-bold mb-4">{content.title || 'Custom Section'}</h2>
          <div className="text-surface-600" dangerouslySetInnerHTML={{ __html: content.body || '<p>Add your content here</p>' }} />
        </div>
      );

    default:
      return (
        <div className="py-8 px-8 text-center text-surface-400">
          {sectionLabels[section.type] || 'Unknown'} section
        </div>
      );
  }
}

export default function SectionRenderer({ section }) {
  const { selectedSectionId, selectSection, portfolio } = useEditor();
  const isSelected = selectedSectionId === section._id;
  const theme = portfolio?.theme;

  return (
    <div
      className={`
        relative cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-brand-500' : 'hover:outline hover:outline-dashed hover:outline-2 hover:outline-surface-300'}
        ${!section.visible ? 'opacity-40' : ''}
      `}
      onClick={() => selectSection(section._id)}
    >
      <DefaultSectionPreview section={section} theme={theme} />

      {/* Section type label on hover */}
      <div className="absolute top-2 left-2 opacity-0 hover:opacity-100 transition-opacity">
        <span className="bg-surface-900/80 text-white text-xs px-2 py-1 rounded">
          {sectionLabels[section.type]}
        </span>
      </div>
    </div>
  );
}

export { sectionLabels, DefaultSectionPreview };

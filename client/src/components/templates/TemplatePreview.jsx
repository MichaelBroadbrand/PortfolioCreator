import { useState } from 'react';
import { ArrowLeft, Monitor, Tablet, Smartphone } from 'lucide-react';
import Button from '../common/Button';

const devices = [
  { id: 'desktop', icon: Monitor, width: '100%' },
  { id: 'tablet', icon: Tablet, width: '768px' },
  { id: 'mobile', icon: Smartphone, width: '375px' },
];

const gradients = {
  developer: 'from-slate-900 to-slate-800',
  designer: 'from-stone-50 to-stone-100',
  freelancer: 'from-blue-50 to-white',
  minimal: 'from-white to-gray-50',
  creative: 'from-violet-600 to-pink-500',
};

export default function TemplatePreview({ template, onBack, onUse, loading }) {
  const [device, setDevice] = useState('desktop');
  const activeDevice = devices.find((d) => d.id === device);
  const isLight = ['designer', 'freelancer', 'minimal'].includes(template.category);
  const hero = template.sections?.find((s) => s.type === 'hero');

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Top bar */}
      <div className="h-14 bg-white border-b shadow-sm flex items-center justify-between px-4 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-surface-600 hover:text-surface-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Templates
        </button>

        <div className="flex items-center gap-1">
          {devices.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setDevice(id)}
              className={`p-2 rounded-lg transition-colors ${
                device === id
                  ? 'bg-brand-100 text-brand-600'
                  : 'text-surface-400 hover:text-surface-600'
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        <Button onClick={onUse} loading={loading}>
          Use This Template
        </Button>
      </div>

      {/* Preview container */}
      <div className="flex-1 overflow-auto bg-surface-100 flex justify-center p-4">
        <div
          className="transition-all duration-300 bg-white shadow-lg rounded-lg overflow-auto"
          style={{
            width: activeDevice.width,
            maxWidth: '100%',
          }}
        >
          {/* Rendered preview */}
          <div className={`bg-gradient-to-br ${gradients[template.category] || gradients.minimal}`}>
            {/* Hero preview */}
            <div className="min-h-[60vh] flex items-center justify-center p-12">
              <div className={`text-center max-w-2xl ${isLight ? 'text-gray-900' : 'text-white'}`}>
                <h1 className="text-5xl font-bold mb-4">
                  {hero?.defaultContent?.name || 'Alex Chen'}
                </h1>
                <p className={`text-xl mb-2 ${isLight ? 'text-gray-600' : 'text-white/70'}`}>
                  {hero?.defaultContent?.tagline || template.name}
                </p>
                <p className={`text-base mb-8 max-w-lg mx-auto ${isLight ? 'text-gray-500' : 'text-white/50'}`}>
                  {hero?.defaultContent?.subtitle || 'Sample portfolio content will appear here.'}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="px-6 py-2.5 rounded-lg font-medium text-sm"
                    style={{ backgroundColor: template.defaultTheme?.colorScheme?.primary, color: 'white' }}
                  >
                    {hero?.defaultContent?.ctaText || 'View Work'}
                  </div>
                  {hero?.defaultContent?.secondaryCtaText && (
                    <div className={`px-6 py-2.5 rounded-lg font-medium text-sm border ${isLight ? 'border-gray-300' : 'border-white/30'}`}>
                      {hero.defaultContent.secondaryCtaText}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sample sections below hero */}
          <div className="bg-white">
            {/* Projects preview */}
            <div className="py-16 px-8 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-surface-200">
                    <div className="h-40 bg-surface-100" />
                    <div className="p-4">
                      <div className="h-5 bg-surface-200 rounded w-40 mb-2" />
                      <div className="h-3 bg-surface-100 rounded w-full mb-1" />
                      <div className="h-3 bg-surface-100 rounded w-3/4" />
                      <div className="flex gap-2 mt-3">
                        <div className="h-5 bg-surface-100 rounded-full w-14 text-xs" />
                        <div className="h-5 bg-surface-100 rounded-full w-16 text-xs" />
                        <div className="h-5 bg-surface-100 rounded-full w-12 text-xs" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills preview */}
            <div className="py-16 px-8 max-w-5xl mx-auto bg-surface-50">
              <h2 className="text-2xl font-bold mb-8 text-center">Skills</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'Docker', 'AWS'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${template.defaultTheme?.colorScheme?.primary}15`,
                      color: template.defaultTheme?.colorScheme?.primary,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact preview */}
            <div className="py-16 px-8 max-w-lg mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="text-surface-500 mb-6">Feel free to reach out for collaborations or just a friendly chat.</p>
              <div
                className="inline-block px-8 py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: template.defaultTheme?.colorScheme?.primary }}
              >
                Send Message
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

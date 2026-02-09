import { ArrowRight } from 'lucide-react';

const categoryColors = {
  developer: 'bg-emerald-100 text-emerald-700',
  designer: 'bg-rose-100 text-rose-700',
  freelancer: 'bg-blue-100 text-blue-700',
  minimal: 'bg-slate-100 text-slate-700',
  creative: 'bg-violet-100 text-violet-700',
};

const gradients = {
  developer: 'from-slate-900 to-slate-800',
  designer: 'from-stone-50 to-stone-100',
  freelancer: 'from-blue-50 to-white',
  minimal: 'from-white to-gray-50',
  creative: 'from-violet-600 to-pink-500',
};

const accents = {
  developer: 'bg-emerald-500',
  designer: 'bg-rose-400',
  freelancer: 'bg-blue-500',
  minimal: 'bg-slate-400',
  creative: 'bg-white',
};

export default function TemplateCard({ template, onPreview }) {
  const isLight = ['designer', 'freelancer', 'minimal'].includes(template.category);

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => onPreview(template)}
    >
      {/* Thumbnail */}
      <div className="aspect-video overflow-hidden relative">
        <div
          className={`w-full h-full bg-gradient-to-br ${gradients[template.category] || gradients.minimal} p-6 transform group-hover:scale-105 transition-transform duration-300`}
        >
          <div className={`w-8 h-8 rounded-full ${accents[template.category]} opacity-60 mb-3`} />
          <div className={`h-5 rounded w-32 mb-2 ${isLight ? 'bg-gray-900/80' : 'bg-white/80'}`} />
          <div className={`h-3 rounded w-48 ${isLight ? 'bg-gray-900/40' : 'bg-white/40'}`} />
          <div className={`h-3 rounded w-36 mt-1 ${isLight ? 'bg-gray-900/20' : 'bg-white/20'}`} />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-surface-900">{template.name}</h3>
            <span
              className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${
                categoryColors[template.category] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
            </span>
          </div>
          <span className="text-sm text-brand-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Preview <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

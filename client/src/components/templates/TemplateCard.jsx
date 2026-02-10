import { ArrowRight } from 'lucide-react';

const categoryColors = {
  developer: 'bg-emerald-500/10 text-emerald-400',
  designer: 'bg-rose-500/10 text-rose-400',
  freelancer: 'bg-blue-500/10 text-blue-400',
  minimal: 'bg-slate-500/10 text-slate-400',
  creative: 'bg-violet-500/10 text-violet-400',
  neon: 'bg-cyan-500/10 text-cyan-400',
  sunset: 'bg-orange-500/10 text-orange-400',
  brutalist: 'bg-gray-500/10 text-gray-400',
  ocean: 'bg-sky-500/10 text-sky-400',
  pastel: 'bg-purple-500/10 text-purple-400',
};

const gradients = {
  developer: 'from-slate-900 to-slate-800',
  designer: 'from-stone-50 to-stone-100',
  freelancer: 'from-blue-50 to-white',
  minimal: 'from-white to-gray-50',
  creative: 'from-violet-600 to-pink-500',
  neon: 'from-slate-950 to-cyan-950',
  sunset: 'from-orange-100 to-rose-100',
  brutalist: 'from-white to-gray-100',
  ocean: 'from-sky-950 to-indigo-950',
  pastel: 'from-purple-50 to-pink-50',
};

const accents = {
  developer: 'bg-emerald-500',
  designer: 'bg-rose-400',
  freelancer: 'bg-blue-500',
  minimal: 'bg-slate-400',
  creative: 'bg-white',
  neon: 'bg-cyan-400',
  sunset: 'bg-orange-400',
  brutalist: 'bg-red-500',
  ocean: 'bg-sky-400',
  pastel: 'bg-fuchsia-400',
};

function LayoutWireframe({ layout, accent, isLight }) {
  const fg = isLight ? 'bg-gray-900' : 'bg-white';
  const fgMd = isLight ? 'bg-gray-900/50' : 'bg-white/50';
  const fgLt = isLight ? 'bg-gray-900/20' : 'bg-white/20';

  switch (layout) {
    case 'sidebar':
      return (
        <div className="flex h-full gap-2">
          {/* Sidebar */}
          <div className="w-1/4 flex flex-col items-center pt-2 gap-2 rounded" style={{ backgroundColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
            <div className={`w-5 h-5 rounded-full ${accent} opacity-70`} />
            <div className={`h-1 rounded w-8 ${fgMd}`} />
            <div className={`h-0.5 rounded w-6 ${fgLt} mt-1`} />
            <div className={`h-0.5 rounded w-6 ${fgLt}`} />
            <div className={`h-0.5 rounded w-6 ${fgLt}`} />
          </div>
          {/* Content */}
          <div className="flex-1 flex flex-col gap-2 pt-2">
            <div className={`h-2 rounded w-20 ${fg} opacity-70`} />
            <div className={`h-1 rounded w-full ${fgLt}`} />
            <div className="flex gap-1.5 mt-1">
              <div className={`h-8 rounded flex-1 ${fgLt}`} />
              <div className={`h-8 rounded flex-1 ${fgLt}`} />
            </div>
          </div>
        </div>
      );

    case 'immersive':
      return (
        <div className="flex flex-col h-full gap-2">
          {/* Nav bar */}
          <div className="flex gap-2 items-center">
            <div className={`h-1 rounded w-10 ${fgMd}`} />
            <div className="flex-1" />
            <div className={`h-0.5 rounded w-4 ${fgLt}`} />
            <div className={`h-0.5 rounded w-4 ${fgLt}`} />
            <div className={`h-0.5 rounded w-4 ${fgLt}`} />
          </div>
          {/* Hero - centered huge text */}
          <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
            <div className={`h-4 rounded w-32 ${fg} opacity-80`} />
            <div className={`h-1.5 rounded w-20 ${accent} opacity-60`} />
            <div className={`h-4 w-14 rounded-sm mt-1 ${accent} opacity-40`} />
          </div>
          {/* Cards row */}
          <div className="flex gap-1.5">
            <div className="flex-1 h-6 rounded-lg" style={{ backgroundColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)', border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}` }} />
            <div className="flex-1 h-6 rounded-lg" style={{ backgroundColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)', border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}` }} />
            <div className="flex-1 h-6 rounded-lg" style={{ backgroundColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)', border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}` }} />
          </div>
        </div>
      );

    case 'split':
      return (
        <div className="flex flex-col h-full gap-2">
          {/* Split hero */}
          <div className="flex gap-2 flex-1">
            <div className="flex-1 flex flex-col justify-center gap-1.5 pl-1">
              <div className={`h-3 rounded w-20 ${fg} opacity-70`} />
              <div className={`h-1 rounded w-16 ${accent} opacity-50`} />
              <div className={`h-1 rounded w-12 ${fgLt}`} />
            </div>
            <div className={`flex-1 rounded-lg ${accent} opacity-20`} />
          </div>
          {/* Alternating sections */}
          <div className="flex gap-2">
            <div className={`h-5 rounded flex-[2] ${fgLt}`} />
            <div className={`h-5 rounded flex-1 ${fgLt} opacity-50`} />
          </div>
          <div className="flex gap-2">
            <div className={`h-5 rounded flex-1 ${fgLt} opacity-50`} />
            <div className={`h-5 rounded flex-[2] ${fgLt}`} />
          </div>
        </div>
      );

    case 'grid':
      return (
        <div className="flex flex-col h-full" style={{ border: `1.5px solid ${isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}` }}>
          {/* Nav grid */}
          <div className="flex" style={{ borderBottom: `1.5px solid ${isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}` }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 h-4 flex items-center justify-center" style={{ borderRight: i < 4 ? `1.5px solid ${isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}` : 'none' }}>
                <div className={`h-0.5 w-5 ${fg} opacity-50`} />
              </div>
            ))}
          </div>
          {/* Hero massive text */}
          <div className="flex-1 flex flex-col items-center justify-center gap-1" style={{ borderBottom: `1.5px solid ${isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}` }}>
            <div className={`h-0.5 w-10 ${fgMd}`} />
            <div className={`h-5 rounded-none w-28 ${fg} opacity-80`} />
            <div className={`h-1 w-14 ${accent} opacity-60`} />
          </div>
          {/* Grid cells */}
          <div className="flex">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-8 flex items-center justify-center" style={{ borderRight: i < 3 ? `1.5px solid ${isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}` : 'none' }}>
                <div className={`h-5 w-5 ${fgLt}`} />
              </div>
            ))}
          </div>
        </div>
      );

    case 'showcase':
      return (
        <div className="flex flex-col h-full gap-2">
          {/* Full-bleed hero */}
          <div className={`flex-1 rounded-xl flex flex-col items-center justify-center gap-1.5 ${accent} opacity-20 relative`}>
            <div className={`w-6 h-6 rounded-full ${accent} opacity-80 absolute`} style={{ top: '20%' }} />
            <div className={`h-3 rounded w-24 ${fg} opacity-70 mt-4`} />
            <div className={`h-1 rounded w-16 ${fgMd}`} />
          </div>
          {/* Gallery cards */}
          <div className="flex gap-1.5">
            <div className={`flex-1 h-7 rounded-xl ${fgLt}`} />
            <div className={`flex-1 h-7 rounded-xl ${fgLt} opacity-70`} />
            <div className={`flex-1 h-7 rounded-xl ${fgLt} opacity-50`} />
          </div>
        </div>
      );

    default: // standard
      return (
        <div className="flex flex-col items-center h-full gap-2 pt-2">
          <div className={`w-8 h-8 rounded-full ${accent} opacity-60`} />
          <div className={`h-2.5 rounded w-24 ${fg} opacity-70`} />
          <div className={`h-1 rounded w-32 ${fgMd}`} />
          <div className={`h-1 rounded w-28 ${fgLt}`} />
          <div className="flex gap-1.5 mt-1 w-full px-2">
            <div className={`h-6 rounded flex-1 ${fgLt}`} />
            <div className={`h-6 rounded flex-1 ${fgLt}`} />
          </div>
        </div>
      );
  }
}

export default function TemplateCard({ template, onPreview }) {
  const isLight = ['designer', 'freelancer', 'minimal', 'sunset', 'brutalist', 'pastel'].includes(template.category);

  return (
    <div
      className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(234,179,8,0.08)] transition-all duration-300 cursor-pointer group"
      onClick={() => onPreview(template)}
    >
      {/* Thumbnail — layout-specific wireframe */}
      <div className="aspect-video overflow-hidden relative">
        <div
          className={`w-full h-full bg-gradient-to-br ${gradients[template.category] || gradients.minimal} p-4 transform group-hover:scale-105 transition-transform duration-300`}
        >
          <LayoutWireframe layout={template.layout} accent={accents[template.category]} isLight={isLight} />
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-surface-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-surface-900">{template.name}</h3>
            <span
              className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${
                categoryColors[template.category] || 'bg-white/[0.06] text-surface-600'
              }`}
            >
              {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
            </span>
          </div>
          <span className="text-sm text-brand-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Preview <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}

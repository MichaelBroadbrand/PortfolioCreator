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
  noir: 'bg-yellow-500/10 text-yellow-400',
  ember: 'bg-red-500/10 text-red-400',
  architect: 'bg-red-600/10 text-red-500',
  candy: 'bg-pink-500/10 text-pink-400',
  midnight: 'bg-indigo-500/10 text-indigo-400',
  terracotta: 'bg-amber-500/10 text-amber-400',
  graphite: 'bg-teal-500/10 text-teal-400',
  aurora: 'bg-green-500/10 text-green-400',
  ivory: 'bg-yellow-700/10 text-yellow-600',
  volt: 'bg-lime-500/10 text-lime-400',
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
  noir: 'from-neutral-950 to-stone-900',
  ember: 'from-stone-950 to-orange-950',
  architect: 'from-gray-50 to-white',
  candy: 'from-pink-100 to-fuchsia-50',
  midnight: 'from-indigo-950 to-blue-950',
  terracotta: 'from-orange-50 to-amber-50',
  graphite: 'from-zinc-900 to-neutral-800',
  aurora: 'from-indigo-950 to-teal-950',
  ivory: 'from-amber-50 to-orange-50',
  volt: 'from-neutral-950 to-yellow-950',
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
  noir: 'bg-yellow-500',
  ember: 'bg-orange-500',
  architect: 'bg-red-500',
  candy: 'bg-pink-400',
  midnight: 'bg-indigo-400',
  terracotta: 'bg-amber-600',
  graphite: 'bg-teal-400',
  aurora: 'bg-green-400',
  ivory: 'bg-yellow-600',
  volt: 'bg-yellow-400',
};

/* ── Category-specific wireframes for the 10 new templates ── */

function NoirWireframe() {
  return (
    <div className="flex h-full gap-1.5">
      {/* Film strip sidebar */}
      <div className="w-1/5 flex flex-col items-center gap-1 py-1 rounded-sm" style={{ background: 'rgba(255,255,255,0.05)', borderRight: '2px solid rgba(201,168,76,0.3)' }}>
        {[0.4, 0.2, 0.4, 0.2, 0.4].map((op, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ background: `rgba(201,168,76,${op})` }} />
        ))}
      </div>
      {/* Gallery content */}
      <div className="flex-1 flex flex-col gap-1.5 pt-1">
        <div className="h-1.5 w-16 bg-yellow-500/60 rounded" />
        <div className="h-0.5 w-24 bg-white/20 rounded" />
        <div className="grid grid-cols-2 gap-1 mt-1 flex-1">
          <div className="bg-white/10 rounded" />
          <div className="bg-yellow-500/15 rounded" />
          <div className="bg-yellow-500/10 rounded" />
          <div className="bg-white/[0.08] rounded" />
        </div>
      </div>
    </div>
  );
}

function EmberWireframe() {
  return (
    <div className="flex flex-col h-full gap-1">
      {/* Hero card */}
      <div className="rounded-lg flex-1 flex items-center px-3" style={{ background: 'linear-gradient(135deg, rgba(224,122,59,0.15), transparent)' , border: '1px solid rgba(224,122,59,0.15)' }}>
        <div>
          <div className="h-2 w-16 bg-white/60 rounded mb-1" />
          <div className="h-1 w-12 bg-orange-400/50 rounded mb-1" />
          <div className="h-0.5 w-20 bg-white/20 rounded" />
        </div>
      </div>
      {/* Bento grid */}
      <div className="grid grid-cols-3 gap-1">
        <div className="h-7 rounded-lg col-span-2" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="p-1.5">
            <div className="h-0.5 w-6 bg-orange-400/40 rounded mb-1" />
            <div className="h-0.5 w-10 bg-white/15 rounded" />
          </div>
        </div>
        <div className="h-7 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="p-1.5 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="h-2 w-4 bg-orange-400/50 rounded mx-auto mb-0.5" />
              <div className="h-0.5 w-5 bg-white/20 rounded" />
            </div>
          </div>
        </div>
        <div className="h-7 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} />
        <div className="h-7 rounded-lg col-span-2" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} />
      </div>
    </div>
  );
}

function ArchitectWireframe() {
  return (
    <div className="flex flex-col h-full relative">
      {/* Blueprint grid */}
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
      {/* Title */}
      <div className="flex items-center gap-2 px-2 pt-2 relative z-10">
        <div className="h-2 w-20 bg-gray-900/70 rounded-sm" />
        <div className="flex-1" />
        <div className="h-3 w-0.5 bg-red-500/60" />
      </div>
      {/* Blueprint drawing */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-28 h-16 border border-gray-400/40 relative">
          <div className="absolute -top-1.5 left-2 h-0.5 w-6 bg-red-500/50" />
          <div className="absolute -left-1.5 top-2 w-0.5 h-4 bg-red-500/50" />
          <div className="absolute inset-2 border border-dashed border-gray-400/30" />
          <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-red-500/40" />
        </div>
      </div>
      {/* Title block */}
      <div className="flex gap-4 px-2 pb-1.5 relative z-10" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="h-0.5 w-12 bg-gray-900/30 rounded" />
        <div className="h-0.5 w-8 bg-gray-900/20 rounded" />
        <div className="flex-1" />
        <div className="h-0.5 w-6 bg-red-500/40 rounded" />
      </div>
    </div>
  );
}

function CandyWireframe() {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Floating bubbles */}
      <div className="absolute w-8 h-8 rounded-full bg-pink-400/20" style={{ top: '8%', right: '12%' }} />
      <div className="absolute w-5 h-5 rounded-full bg-teal-400/25" style={{ top: '30%', left: '8%' }} />
      <div className="absolute w-6 h-6 rounded-full bg-purple-400/15" style={{ bottom: '22%', right: '22%' }} />
      <div className="absolute w-4 h-4 rounded-full bg-pink-300/25" style={{ bottom: '12%', left: '18%' }} />
      <div className="absolute w-3 h-3 rounded-full bg-cyan-400/20" style={{ top: '55%', right: '35%' }} />
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2 relative z-10">
        <div className="w-10 h-10 rounded-full bg-pink-400/30 border-2 border-pink-400/20" />
        <div className="h-2.5 w-20 bg-gray-900/60 rounded-full" />
        <div className="h-1 w-16 bg-pink-500/40 rounded-full" />
      </div>
      {/* Bouncy cards */}
      <div className="flex gap-2 px-2 pb-1.5 relative z-10">
        <div className="flex-1 h-6 rounded-2xl bg-pink-400/15 border border-pink-300/20" />
        <div className="flex-1 h-6 rounded-2xl bg-cyan-400/15 border border-cyan-300/20" />
        <div className="flex-1 h-6 rounded-2xl bg-purple-400/15 border border-purple-300/20" />
      </div>
    </div>
  );
}

function MidnightWireframe() {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Stars */}
      <div className="absolute w-1 h-1 rounded-full bg-blue-400/60" style={{ top: '12%', left: '18%' }} />
      <div className="absolute w-0.5 h-0.5 rounded-full bg-blue-300/40" style={{ top: '22%', right: '28%' }} />
      <div className="absolute w-1 h-1 rounded-full bg-indigo-400/50" style={{ top: '42%', left: '62%' }} />
      <div className="absolute w-0.5 h-0.5 rounded-full bg-blue-200/30" style={{ bottom: '38%', left: '32%' }} />
      <div className="absolute w-1 h-1 rounded-full bg-blue-400/40" style={{ bottom: '22%', right: '12%' }} />
      <div className="absolute w-0.5 h-0.5 rounded-full bg-indigo-300/35" style={{ top: '55%', left: '12%' }} />
      {/* Split hero */}
      <div className="flex gap-2 flex-1 relative z-10 pt-2 px-1">
        <div className="flex-1 flex flex-col justify-center gap-1.5 pl-1">
          <div className="h-3 w-20 bg-white/70 rounded" />
          <div className="h-1 w-14 bg-indigo-400/50 rounded" />
          <div className="h-0.5 w-10 bg-white/20 rounded" />
        </div>
        {/* Moon */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, rgba(99,102,241,0.25), rgba(59,130,246,0.08))' }} />
        </div>
      </div>
      {/* Bottom sections */}
      <div className="flex gap-2 px-1.5 pb-1.5 relative z-10">
        <div className="h-5 flex-1 rounded bg-white/[0.04] border border-white/[0.08]" />
        <div className="h-5 flex-1 rounded bg-white/[0.04] border border-white/[0.08]" />
      </div>
    </div>
  );
}

function TerracottaWireframe() {
  return (
    <div className="flex flex-col h-full">
      {/* Magazine nav */}
      <div className="flex items-center justify-between px-2 pt-1.5">
        <div className="h-1 w-10 bg-gray-900/40" />
        <div className="flex gap-1.5">
          <div className="h-0.5 w-3 bg-gray-900/20" />
          <div className="h-0.5 w-3 bg-gray-900/20" />
          <div className="h-0.5 w-3 bg-gray-900/20" />
        </div>
      </div>
      {/* Divider */}
      <div className="mx-2 mt-1.5" style={{ height: '1px', background: 'rgba(198,122,75,0.2)' }} />
      {/* Large editorial title */}
      <div className="flex-1 flex flex-col items-center justify-center gap-1">
        <div className="h-4 w-28 bg-gray-900/50" />
        <div className="w-8 mt-0.5 mb-0.5" style={{ height: '1px', background: 'rgba(198,122,75,0.4)' }} />
        <div className="h-1 w-16 bg-amber-700/40" />
        <div className="h-0.5 w-24 bg-gray-900/15 mt-1" />
      </div>
      {/* Divider */}
      <div className="mx-2" style={{ height: '1px', background: 'rgba(198,122,75,0.15)' }} />
      {/* Two-column text */}
      <div className="flex gap-2 px-2 py-1.5">
        <div className="flex-1 flex flex-col gap-0.5">
          <div className="h-0.5 w-full bg-gray-900/10" />
          <div className="h-0.5 w-4/5 bg-gray-900/[0.08]" />
          <div className="h-0.5 w-full bg-gray-900/10" />
        </div>
        <div className="flex-1 flex flex-col gap-0.5">
          <div className="h-0.5 w-full bg-gray-900/10" />
          <div className="h-0.5 w-3/5 bg-gray-900/[0.08]" />
          <div className="h-0.5 w-full bg-gray-900/10" />
        </div>
      </div>
    </div>
  );
}

function GraphiteWireframe() {
  return (
    <div className="flex flex-col h-full p-1 relative">
      {/* Circuit traces */}
      <div className="absolute top-3 left-4 w-8 h-px bg-teal-400/30" />
      <div className="absolute top-3 left-12 w-px h-6 bg-teal-400/20" />
      <div className="absolute bottom-8 right-4 w-10 h-px bg-teal-400/20" />
      <div className="absolute bottom-8 right-14 w-px h-5 bg-teal-400/15" />
      {/* Node dots */}
      <div className="absolute w-1.5 h-1.5 rounded-full bg-teal-400/50" style={{ top: '10%', left: '12%' }} />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-teal-400/40" style={{ bottom: '26%', right: '12%' }} />
      <div className="absolute w-1 h-1 rounded-full bg-teal-400/25" style={{ top: '45%', right: '40%' }} />
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 relative z-10">
        <div className="h-0.5 w-10 bg-teal-400/40 rounded" />
        <div className="h-4 w-24 bg-white/70" />
        <div className="h-1 w-16 bg-white/30" />
      </div>
      {/* Bottom grid */}
      <div className="grid grid-cols-3 gap-px relative z-10" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
        {[0.2, 0.1, 0.15].map((op, i) => (
          <div key={i} className="h-6 flex items-center justify-center" style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
            <div className="w-3 h-3" style={{ background: `rgba(34,211,238,${op})` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AuroraWireframe() {
  return (
    <div className="flex flex-col h-full gap-1 relative overflow-hidden">
      {/* Aurora glow behind hero */}
      <div className="absolute top-0 inset-x-0 h-12 blur-md" style={{ background: 'linear-gradient(90deg, rgba(6,182,212,0.15), rgba(168,85,247,0.1), rgba(16,185,129,0.15))' }} />
      {/* Hero card */}
      <div className="rounded-lg flex-1 flex items-center px-3 relative z-10" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.12), transparent, rgba(16,185,129,0.08))', border: '1px solid rgba(6,182,212,0.15)' }}>
        <div>
          <div className="h-2.5 w-18 bg-white/60 rounded mb-1" />
          <div className="h-1 w-14 bg-teal-400/50 rounded mb-1" />
          <div className="h-0.5 w-20 bg-white/20 rounded" />
        </div>
      </div>
      {/* Bento grid */}
      <div className="grid grid-cols-3 gap-1 relative z-10">
        <div className="h-7 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(6,182,212,0.12)' }}>
          <div className="p-1.5 flex items-center justify-center h-full">
            <div className="h-2 w-4 rounded bg-teal-400/30" />
          </div>
        </div>
        <div className="h-7 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(168,85,247,0.1)' }}>
          <div className="p-1.5 flex items-center justify-center h-full">
            <div className="h-2 w-4 rounded bg-purple-400/25" />
          </div>
        </div>
        <div className="h-7 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(16,185,129,0.12)' }}>
          <div className="p-1.5 flex items-center justify-center h-full">
            <div className="h-2 w-4 rounded bg-green-400/25" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 relative z-10">
        <div className="h-5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
        <div className="h-5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
      </div>
    </div>
  );
}

function IvoryWireframe() {
  return (
    <div className="flex flex-col h-full">
      {/* Elegant nav */}
      <div className="flex items-center justify-between px-3 pt-1.5">
        <div className="h-1 w-12 bg-gray-900/40" />
        <div className="flex gap-1.5">
          <div className="h-0.5 w-3 bg-gray-900/20" />
          <div className="h-0.5 w-3 bg-gray-900/20" />
        </div>
      </div>
      <div className="mx-3 mt-1.5" style={{ height: '1px', background: 'rgba(139,115,85,0.25)' }} />
      {/* Centered editorial title */}
      <div className="flex-1 flex flex-col items-center justify-center gap-1">
        <div className="h-3.5 w-24 bg-gray-900/45" />
        <div className="w-6 mt-0.5 mb-0.5" style={{ height: '1px', background: 'rgba(201,168,76,0.5)' }} />
        <div className="h-1 w-14 bg-gray-900/25" />
        <div className="h-0.5 w-20 bg-gray-900/10 mt-1" />
      </div>
      <div className="mx-3" style={{ height: '1px', background: 'rgba(139,115,85,0.15)' }} />
      {/* Pull quote */}
      <div className="px-4 py-1.5 text-center">
        <div className="h-2 w-3 mx-auto mb-0.5" style={{ background: 'rgba(201,168,76,0.3)' }} />
        <div className="h-0.5 w-20 bg-gray-900/10 mx-auto mb-0.5" />
        <div className="h-0.5 w-16 bg-gray-900/[0.07] mx-auto" />
      </div>
      <div className="mx-3 mb-1" style={{ height: '1px', background: 'rgba(139,115,85,0.1)' }} />
    </div>
  );
}

function VoltWireframe() {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Diagonal slashes */}
      <div className="absolute w-40 h-1 bg-yellow-400/20 -rotate-45" style={{ top: '30%', left: '-10%' }} />
      <div className="absolute w-32 h-0.5 bg-yellow-400/10 -rotate-45" style={{ top: '50%', left: '5%' }} />
      {/* Bold header */}
      <div className="flex items-center gap-1.5 px-2 pt-2 relative z-10">
        <div className="h-3 w-3 bg-yellow-400/60" />
        <div className="h-2 w-16 bg-yellow-400/70" />
        <div className="flex-1" />
        <div className="h-0.5 w-4 bg-white/30" />
        <div className="h-0.5 w-4 bg-white/30" />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-2 relative z-10">
        <div className="h-5 w-32 bg-white/80 mb-1" />
        <div className="h-1 w-20 bg-yellow-400/50" />
      </div>
      {/* Cards */}
      <div className="flex gap-1 px-1.5 pb-1.5 relative z-10">
        <div className="flex-1 h-7 bg-yellow-400/10 border border-yellow-400/20" />
        <div className="flex-1 h-7 bg-yellow-400/[0.05] border border-yellow-400/15" />
        <div className="flex-1 h-7 bg-yellow-400/10 border border-yellow-400/20" />
      </div>
    </div>
  );
}

/* ── Generic layout wireframes for original templates ── */

function LayoutWireframe({ layout, accent, isLight, category }) {
  const fg = isLight ? 'bg-gray-900' : 'bg-white';
  const fgMd = isLight ? 'bg-gray-900/50' : 'bg-white/50';
  const fgLt = isLight ? 'bg-gray-900/20' : 'bg-white/20';

  // Category-specific wireframes for new templates
  const customWireframes = {
    noir: NoirWireframe,
    ember: EmberWireframe,
    architect: ArchitectWireframe,
    candy: CandyWireframe,
    midnight: MidnightWireframe,
    terracotta: TerracottaWireframe,
    graphite: GraphiteWireframe,
    aurora: AuroraWireframe,
    ivory: IvoryWireframe,
    volt: VoltWireframe,
  };

  if (customWireframes[category]) {
    const CustomWireframe = customWireframes[category];
    return <CustomWireframe />;
  }

  // Existing layout-based wireframes for original 10 templates
  switch (layout) {
    case 'sidebar':
      return (
        <div className="flex h-full gap-2">
          <div className="w-1/4 flex flex-col items-center pt-2 gap-2 rounded" style={{ backgroundColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
            <div className={`w-5 h-5 rounded-full ${accent} opacity-70`} />
            <div className={`h-1 rounded w-8 ${fgMd}`} />
            <div className={`h-0.5 rounded w-6 ${fgLt} mt-1`} />
            <div className={`h-0.5 rounded w-6 ${fgLt}`} />
            <div className={`h-0.5 rounded w-6 ${fgLt}`} />
          </div>
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
          <div className="flex gap-2 items-center">
            <div className={`h-1 rounded w-10 ${fgMd}`} />
            <div className="flex-1" />
            <div className={`h-0.5 rounded w-4 ${fgLt}`} />
            <div className={`h-0.5 rounded w-4 ${fgLt}`} />
            <div className={`h-0.5 rounded w-4 ${fgLt}`} />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
            <div className={`h-4 rounded w-32 ${fg} opacity-80`} />
            <div className={`h-1.5 rounded w-20 ${accent} opacity-60`} />
            <div className={`h-4 w-14 rounded-sm mt-1 ${accent} opacity-40`} />
          </div>
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
          <div className="flex gap-2 flex-1">
            <div className="flex-1 flex flex-col justify-center gap-1.5 pl-1">
              <div className={`h-3 rounded w-20 ${fg} opacity-70`} />
              <div className={`h-1 rounded w-16 ${accent} opacity-50`} />
              <div className={`h-1 rounded w-12 ${fgLt}`} />
            </div>
            <div className={`flex-1 rounded-lg ${accent} opacity-20`} />
          </div>
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
          <div className="flex" style={{ borderBottom: `1.5px solid ${isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}` }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 h-4 flex items-center justify-center" style={{ borderRight: i < 4 ? `1.5px solid ${isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}` : 'none' }}>
                <div className={`h-0.5 w-5 ${fg} opacity-50`} />
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-1" style={{ borderBottom: `1.5px solid ${isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}` }}>
            <div className={`h-0.5 w-10 ${fgMd}`} />
            <div className={`h-5 rounded-none w-28 ${fg} opacity-80`} />
            <div className={`h-1 w-14 ${accent} opacity-60`} />
          </div>
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
          <div className={`flex-1 rounded-xl flex flex-col items-center justify-center gap-1.5 ${accent} opacity-20 relative`}>
            <div className={`w-6 h-6 rounded-full ${accent} opacity-80 absolute`} style={{ top: '20%' }} />
            <div className={`h-3 rounded w-24 ${fg} opacity-70 mt-4`} />
            <div className={`h-1 rounded w-16 ${fgMd}`} />
          </div>
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
  const isLight = ['designer', 'freelancer', 'minimal', 'sunset', 'brutalist', 'pastel', 'architect', 'candy', 'terracotta', 'ivory'].includes(template.category);

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
          <LayoutWireframe layout={template.layout} accent={accents[template.category]} isLight={isLight} category={template.category} />
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

import { useState, useMemo } from 'react';
import { ArrowLeft, Monitor, Tablet, Smartphone } from 'lucide-react';
import Button from '../common/Button';
import PortfolioView from '../public/PortfolioView';

const devices = [
  { id: 'desktop', icon: Monitor, width: '100%' },
  { id: 'tablet', icon: Tablet, width: '768px' },
  { id: 'mobile', icon: Smartphone, width: '375px' },
];

export default function TemplatePreview({ template, onBack, onUse, loading }) {
  const [device, setDevice] = useState('desktop');
  const activeDevice = devices.find((d) => d.id === device);

  // Convert template to portfolio-like object for PortfolioView
  const previewPortfolio = useMemo(() => ({
    name: template.previewData?.name || template.name,
    slug: '',
    layout: template.layout || 'standard',
    theme: template.defaultTheme || {},
    sections: (template.sections || []).map((s, i) => ({
      _id: `preview-${i}`,
      type: s.type,
      order: s.order,
      content: s.defaultContent || {},
      visible: true,
    })),
  }), [template]);

  return (
    <div className="fixed inset-0 z-50 bg-surface-50 flex flex-col">
      {/* Top bar */}
      <div className="h-14 bg-surface-100 border-b border-white/[0.06] flex items-center justify-between px-4 shrink-0 relative z-40">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-surface-600 hover:text-surface-800 transition-colors"
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
                  ? 'bg-brand-500/10 text-brand-400'
                  : 'text-surface-500 hover:text-surface-700'
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

      {/* Preview container — transform creates a containing block so
           fixed-position elements (e.g. SidebarLayout) stay within this area */}
      <div
        className="flex-1 overflow-auto bg-surface-50 flex justify-center"
        style={{ transform: 'translateZ(0)' }}
      >
        <div
          className="transition-all duration-300 overflow-auto"
          style={{
            width: activeDevice.width,
            maxWidth: '100%',
          }}
        >
          <PortfolioView portfolio={previewPortfolio} />
        </div>
      </div>
    </div>
  );
}

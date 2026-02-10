import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { useEditor } from '../../context/EditorContext';
import PortfolioView from '../public/PortfolioView';

const deviceWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

const devices = [
  { id: 'desktop', icon: Monitor },
  { id: 'tablet', icon: Tablet },
  { id: 'mobile', icon: Smartphone },
];

export default function LivePreview({ onClose }) {
  const { portfolio, previewDevice, setPreviewDevice } = useEditor();

  if (!portfolio) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface-50 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-100 border-b border-white/[0.06]">
        <h3 className="text-surface-900 text-sm font-medium">Live Preview</h3>
        <div className="flex items-center gap-2">
          {devices.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPreviewDevice(id)}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === id
                  ? 'bg-brand-500 text-surface-50'
                  : 'text-surface-500 hover:text-surface-800'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
          <div className="w-px h-6 bg-white/[0.06] mx-2" />
          <button onClick={onClose} className="p-2 text-surface-500 hover:text-surface-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Preview area — renders the actual layout */}
      <div className="flex-1 overflow-auto">
        <div
          className="mx-auto overflow-hidden"
          style={{
            width: deviceWidths[previewDevice],
            maxWidth: '100%',
          }}
        >
          <PortfolioView portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}

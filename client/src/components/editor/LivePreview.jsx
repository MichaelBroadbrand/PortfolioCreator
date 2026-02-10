import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { useEditor } from '../../context/EditorContext';
import { DefaultSectionPreview } from './SectionRenderer';

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

  const theme = portfolio?.theme;
  const visibleSections = [...portfolio.sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="fixed inset-0 z-50 bg-surface-100 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-800">
        <h3 className="text-white text-sm font-medium">Live Preview</h3>
        <div className="flex items-center gap-2">
          {devices.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPreviewDevice(id)}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === id
                  ? 'bg-brand-500 text-white'
                  : 'text-surface-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
          <div className="w-px h-6 bg-surface-600 mx-2" />
          <button onClick={onClose} className="p-2 text-surface-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto p-4 lg:p-8">
        <div
          className="bg-white rounded-lg shadow-sm overflow-hidden mx-auto"
          style={{
            width: deviceWidths[previewDevice],
            maxWidth: previewDevice === 'desktop' ? '56rem' : '100%',
          }}
        >
          {visibleSections.map((section) => (
            <DefaultSectionPreview key={section._id} section={section} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  );
}

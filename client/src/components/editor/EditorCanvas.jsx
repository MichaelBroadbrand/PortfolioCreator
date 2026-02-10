import { useEditor } from '../../context/EditorContext';
import PortfolioView from '../public/PortfolioView';
import { sectionLabels } from './SectionRenderer';

function EditorSectionWrapper({ section, children }) {
  const { selectedSectionId, selectSection } = useEditor();
  const isSelected = selectedSectionId === section._id;

  return (
    <div
      className={`
        relative cursor-pointer transition-all duration-150 group/editor-section
        ${isSelected ? 'outline outline-2 outline-brand-500 outline-offset-2 z-10' : 'hover:outline hover:outline-2 hover:outline-brand-500/40 hover:outline-offset-2'}
        ${!section.visible ? 'opacity-40' : ''}
      `}
      onClick={(e) => {
        e.stopPropagation();
        selectSection(section._id);
      }}
    >
      {children}

      {/* Section type label on hover */}
      <div className="absolute top-2 left-2 opacity-0 group-hover/editor-section:opacity-100 transition-opacity z-20 pointer-events-none">
        <span className="bg-black/80 text-white text-xs px-2 py-1 rounded shadow-lg">
          {sectionLabels[section.type] || section.type}
        </span>
      </div>
    </div>
  );
}

export default function EditorCanvas() {
  const { portfolio, deselectSection } = useEditor();

  if (!portfolio) return null;

  return (
    <div
      className="flex-1 overflow-auto bg-surface-50"
      style={{ transform: 'translateZ(0)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          deselectSection();
        }
      }}
    >
      <PortfolioView
        portfolio={portfolio}
        editorProps={{
          SectionWrapper: EditorSectionWrapper,
          showHidden: true,
        }}
      />
    </div>
  );
}

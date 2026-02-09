import { useEditor } from '../../context/EditorContext';
import SectionRenderer from './SectionRenderer';

export default function EditorCanvas() {
  const { portfolio, deselectSection } = useEditor();

  if (!portfolio) return null;

  const visibleSections = portfolio.sections
    .sort((a, b) => a.order - b.order);

  return (
    <div
      className="flex-1 overflow-auto bg-surface-100 p-4 lg:p-8"
      onClick={(e) => {
        // Deselect when clicking the canvas background
        if (e.target === e.currentTarget) {
          deselectSection();
        }
      }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden min-h-full">
        {visibleSections.map((section) => (
          <SectionRenderer key={section._id} section={section} />
        ))}
      </div>
    </div>
  );
}

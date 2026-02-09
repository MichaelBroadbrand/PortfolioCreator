import {
  GripVertical,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Layout,
  User,
  FolderOpen,
  Zap,
  Briefcase,
  GraduationCap,
  Mail,
  MessageSquare,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useEditor } from '../../context/EditorContext';
import { sectionLabels } from './SectionRenderer';
import { MAX_SECTIONS } from '../../utils/constants';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ThemePanel from './ThemePanel';

const sectionIcons = {
  hero: Layout,
  about: User,
  projects: FolderOpen,
  skills: Zap,
  experience: Briefcase,
  education: GraduationCap,
  contact: Mail,
  testimonials: MessageSquare,
  custom: FileText,
};

const defaultContentMap = {
  hero: { name: '', tagline: '', subtitle: '', ctaText: 'Learn More', ctaLink: '#' },
  about: { bio: '', profileImage: '' },
  projects: { projects: [] },
  skills: { skills: [] },
  experience: { entries: [] },
  education: { entries: [] },
  contact: { email: '', github: '', linkedin: '', twitter: '', website: '', showContactForm: true },
  testimonials: { testimonials: [] },
  custom: { title: 'Custom Section', body: '' },
};

function SortableItem({ section }) {
  const { selectedSectionId, selectSection, toggleSectionVisibility, removeSection } = useEditor();
  const isHero = section.type === 'hero';
  const isSelected = selectedSectionId === section._id;
  const Icon = sectionIcons[section.type] || FileText;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm cursor-pointer
        transition-colors duration-150
        ${isSelected ? 'bg-brand-50 text-brand-700' : 'hover:bg-surface-100 text-surface-700'}
        ${!section.visible ? 'opacity-50' : ''}
      `}
      onClick={() => selectSection(section._id)}
    >
      <button
        className="cursor-grab active:cursor-grabbing text-surface-400 hover:text-surface-600"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4" />
      </button>

      <Icon className="w-4 h-4 shrink-0" />
      <span className="flex-1 truncate">{sectionLabels[section.type]}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleSectionVisibility(section._id);
        }}
        className="p-0.5 hover:bg-surface-200 rounded text-surface-400"
        title={section.visible ? 'Hide section' : 'Show section'}
      >
        {section.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
      </button>

      {!isHero && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeSection(section._id);
          }}
          className="p-0.5 hover:bg-red-100 rounded text-surface-300 hover:text-red-500"
          title="Remove section"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export default function SectionToolbar() {
  const {
    portfolio,
    sidebarTab,
    setSidebarTab,
    sidebarCollapsed,
    toggleSidebar,
    addSection,
    reorderSections,
  } = useEditor();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const sections = portfolio?.sections?.sort((a, b) => a.order - b.order) || [];

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s._id === active.id);
      const newIndex = sections.findIndex((s) => s._id === over.id);
      const reordered = arrayMove(sections, oldIndex, newIndex);
      reorderSections(reordered);
    }
  }

  const canAdd = sections.length < MAX_SECTIONS;
  const addableTypes = Object.keys(sectionIcons);

  if (sidebarCollapsed) {
    return (
      <div className="w-16 bg-surface-50 border-r flex flex-col items-center py-4 gap-3 shrink-0">
        <button onClick={toggleSidebar} className="p-2 hover:bg-surface-200 rounded-lg">
          <ChevronRight className="w-4 h-4" />
        </button>
        {sections.map((s) => {
          const Icon = sectionIcons[s.type] || FileText;
          return (
            <div key={s._id} className="p-2 rounded-lg hover:bg-surface-200 text-surface-500" title={sectionLabels[s.type]}>
              <Icon className="w-4 h-4" />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-64 bg-surface-50 border-r flex flex-col shrink-0 overflow-hidden">
      {/* Tab header */}
      <div className="flex items-center border-b">
        <button
          onClick={() => setSidebarTab('sections')}
          className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
            sidebarTab === 'sections' ? 'text-brand-600 border-b-2 border-brand-500' : 'text-surface-500 hover:text-surface-700'
          }`}
        >
          Sections
        </button>
        <button
          onClick={() => setSidebarTab('theme')}
          className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
            sidebarTab === 'theme' ? 'text-brand-600 border-b-2 border-brand-500' : 'text-surface-500 hover:text-surface-700'
          }`}
        >
          Theme
        </button>
        <button onClick={toggleSidebar} className="px-2 text-surface-400 hover:text-surface-600">
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {sidebarTab === 'sections' ? (
        <div className="flex-1 overflow-auto p-3">
          {/* Section list with drag-drop */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sections.map((s) => s._id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-1 mb-4">
                {sections.map((section) => (
                  <SortableItem key={section._id} section={section} />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Add section */}
          {canAdd && (
            <div>
              <p className="text-xs font-medium text-surface-500 uppercase mb-2">Add Section</p>
              <div className="grid grid-cols-3 gap-2">
                {addableTypes.map((type) => {
                  const Icon = sectionIcons[type];
                  return (
                    <button
                      key={type}
                      onClick={() => addSection(type, defaultContentMap[type])}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg border border-dashed border-surface-300 hover:border-brand-400 hover:bg-brand-50 text-surface-500 hover:text-brand-600 transition-colors"
                      title={`Add ${sectionLabels[type]}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px]">{sectionLabels[type]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-auto p-3">
          <ThemePanel />
        </div>
      )}
    </div>
  );
}

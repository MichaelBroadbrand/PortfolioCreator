import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useEditor } from '../../context/EditorContext';
import SectionRenderer from './SectionRenderer';

function SortableSection({ section }) {
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
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style} className="group/drag relative">
      <div
        className="absolute top-3 right-3 z-20 p-1.5 rounded-md bg-black/60 text-white cursor-grab active:cursor-grabbing opacity-0 group-hover/drag:opacity-100 transition-opacity"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4" />
      </div>
      <SectionRenderer section={section} />
    </div>
  );
}

export default function EditorCanvas() {
  const { portfolio, deselectSection, reorderSections } = useEditor();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (!portfolio) return null;

  const sortedSections = [...portfolio.sections].sort((a, b) => a.order - b.order);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sortedSections.findIndex((s) => s._id === active.id);
      const newIndex = sortedSections.findIndex((s) => s._id === over.id);
      const reordered = arrayMove(sortedSections, oldIndex, newIndex);
      reorderSections(reordered);
    }
  }

  return (
    <div
      className="flex-1 overflow-auto bg-surface-50 p-4 lg:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          deselectSection();
        }
      }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden min-h-full">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedSections.map((s) => s._id)}
            strategy={verticalListSortingStrategy}
          >
            {sortedSections.map((section) => (
              <SortableSection key={section._id} section={section} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

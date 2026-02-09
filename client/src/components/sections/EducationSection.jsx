import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2, GripVertical } from 'lucide-react';
import Input from '../common/Input';

function EducationEntry({ entry, index, isOpen, onToggle, onUpdate, onRemove }) {
  const updateField = (field, value) => {
    onUpdate(index, { ...entry, [field]: value });
  };

  return (
    <div className="border border-surface-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2.5 bg-surface-50 hover:bg-surface-100 transition-colors text-left"
      >
        <GripVertical className="w-4 h-4 text-surface-400 shrink-0" />
        {isOpen ? <ChevronDown className="w-4 h-4 text-surface-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-surface-500 shrink-0" />}
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-surface-800 truncate block">
            {entry.degree || entry.institution || `Education ${index + 1}`}
          </span>
          {entry.institution && entry.degree && (
            <span className="text-xs text-surface-500 truncate block">{entry.institution}</span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-3 space-y-3 border-t border-surface-200">
          <Input
            label="Institution"
            value={entry.institution || ''}
            onChange={(e) => updateField('institution', e.target.value)}
            placeholder="University or school name"
          />

          <Input
            label="Degree / Program"
            value={entry.degree || ''}
            onChange={(e) => updateField('degree', e.target.value)}
            placeholder="e.g. BSc Computer Science"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Start Year"
              value={entry.startYear || ''}
              onChange={(e) => updateField('startYear', e.target.value)}
              placeholder="2018"
            />
            <div>
              <Input
                label="End Year"
                value={entry.endYear || ''}
                onChange={(e) => updateField('endYear', e.target.value)}
                placeholder="2022"
                disabled={entry.current}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={entry.current || false}
              onChange={(e) => {
                updateField('current', e.target.checked);
                if (e.target.checked) updateField('endYear', '');
              }}
              className="w-4 h-4 rounded border-surface-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-sm text-surface-700">Currently studying here</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
            <textarea
              className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all resize-none"
              rows={2}
              value={entry.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Notable achievements, courses, etc."
            />
          </div>

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-sm text-error-600 hover:text-error-700 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5 inline mr-1" />
            Remove Education
          </button>
        </div>
      )}
    </div>
  );
}

export default function EducationSection({ content, onUpdate }) {
  const [openIndex, setOpenIndex] = useState(null);
  const entries = content.entries || [];

  const updateEntry = (index, updated) => {
    const newEntries = [...entries];
    newEntries[index] = updated;
    onUpdate({ entries: newEntries });
  };

  const addEntry = () => {
    const newEntry = { institution: '', degree: '', startYear: '', endYear: '', current: false, description: '' };
    onUpdate({ entries: [...entries, newEntry] });
    setOpenIndex(entries.length);
  };

  const removeEntry = (index) => {
    onUpdate({ entries: entries.filter((_, i) => i !== index) });
    setOpenIndex(null);
  };

  return (
    <div className="space-y-3">
      {entries.map((entry, i) => (
        <EducationEntry
          key={i}
          entry={entry}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          onUpdate={updateEntry}
          onRemove={removeEntry}
        />
      ))}

      <button
        type="button"
        onClick={addEntry}
        className="w-full py-3 border-2 border-dashed border-surface-300 rounded-lg text-sm text-surface-500 hover:border-brand-400 hover:text-brand-600 transition-colors flex items-center justify-center gap-1"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </div>
  );
}

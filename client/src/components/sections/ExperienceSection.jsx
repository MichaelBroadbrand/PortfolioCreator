import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2, GripVertical } from 'lucide-react';
import Input from '../common/Input';

function ExperienceEntry({ entry, index, isOpen, onToggle, onUpdate, onRemove }) {
  const updateField = (field, value) => {
    onUpdate(index, { ...entry, [field]: value });
  };

  return (
    <div className="border border-white/[0.08] rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2.5 bg-white/[0.04] hover:bg-white/[0.06] transition-colors text-left"
      >
        <GripVertical className="w-4 h-4 text-surface-500 shrink-0" />
        {isOpen ? <ChevronDown className="w-4 h-4 text-surface-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-surface-500 shrink-0" />}
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-surface-800 truncate block">
            {entry.role || entry.company || `Experience ${index + 1}`}
          </span>
          {entry.company && entry.role && (
            <span className="text-xs text-surface-500 truncate block">{entry.company}</span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-3 space-y-3 border-t border-white/[0.08]">
          <Input
            label="Company"
            value={entry.company || ''}
            onChange={(e) => updateField('company', e.target.value)}
            placeholder="Company name"
          />

          <Input
            label="Role / Title"
            value={entry.role || ''}
            onChange={(e) => updateField('role', e.target.value)}
            placeholder="e.g. Senior Developer"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Start Date</label>
              <input
                type="month"
                className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-sm text-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all"
                value={entry.startDate || ''}
                onChange={(e) => updateField('startDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">End Date</label>
              <input
                type="month"
                className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-sm text-surface-800 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all disabled:opacity-50 disabled:bg-white/[0.03]"
                value={entry.endDate || ''}
                onChange={(e) => updateField('endDate', e.target.value)}
                disabled={entry.current}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={entry.current || false}
              onChange={(e) => {
                const checked = e.target.checked;
                onUpdate(index, { ...entry, current: checked, ...(checked && { endDate: '' }) });
              }}
              className="w-4 h-4 rounded border-white/[0.1] bg-white/[0.06] text-brand-500 focus:ring-brand-500"
            />
            <span className="text-sm text-surface-700">I currently work here</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
            <textarea
              className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-sm text-surface-800 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all resize-none"
              rows={4}
              value={entry.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe your role and achievements..."
            />
          </div>

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-sm text-error-500 hover:text-error-400 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5 inline mr-1" />
            Remove Experience
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExperienceSection({ content, onUpdate }) {
  const [openIndex, setOpenIndex] = useState(null);
  const entries = content.entries || [];

  const updateEntry = (index, updated) => {
    const newEntries = [...entries];
    newEntries[index] = updated;
    onUpdate({ entries: newEntries });
  };

  const addEntry = () => {
    const newEntry = { company: '', role: '', startDate: '', endDate: '', current: false, description: '' };
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
        <ExperienceEntry
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
        className="w-full py-3 border-2 border-dashed border-white/[0.1] rounded-lg text-sm text-surface-500 hover:border-brand-500/50 hover:text-brand-400 transition-colors flex items-center justify-center gap-1"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </button>
    </div>
  );
}

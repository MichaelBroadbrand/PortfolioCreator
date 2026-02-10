import { useState } from 'react';
import { X, Star } from 'lucide-react';

function SkillPill({ skill, onRemove, onUpdateLevel }) {
  const [showPopover, setShowPopover] = useState(false);
  const name = typeof skill === 'string' ? skill : skill.name;
  const level = typeof skill === 'string' ? 0 : (skill.level || 0);

  return (
    <div className="relative">
      <span
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-500/10 text-brand-400 text-sm rounded-full cursor-pointer hover:bg-brand-500/20 transition-colors"
        onClick={() => setShowPopover(!showPopover)}
      >
        {name}
        {level > 0 && (
          <span className="flex ml-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`w-2.5 h-2.5 ${s <= level ? 'fill-brand-500 text-brand-500' : 'text-surface-500'}`} />
            ))}
          </span>
        )}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="ml-0.5 hover:text-brand-300"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </span>

      {/* Proficiency popover */}
      {showPopover && (
        <div className="absolute top-full left-0 mt-1 z-10 bg-surface-100 border border-white/[0.08] rounded-lg shadow-lg p-2 w-36">
          <p className="text-xs text-surface-500 mb-1.5">Proficiency</p>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { onUpdateLevel(s === level ? 0 : s); setShowPopover(false); }}
                className="p-0.5"
              >
                <Star className={`w-5 h-5 ${s <= level ? 'fill-brand-500 text-brand-500' : 'text-surface-500 hover:text-brand-400'}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SkillsSection({ content, onUpdate }) {
  const [input, setInput] = useState('');
  const skills = content.skills || [];

  const addSkill = (value) => {
    const name = value.trim();
    if (!name) return;
    // Prevent duplicates
    const existing = skills.map((s) => (typeof s === 'string' ? s : s.name).toLowerCase());
    if (existing.includes(name.toLowerCase())) return;
    onUpdate({ skills: [...skills, { name, level: 0 }] });
  };

  const removeSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    onUpdate({ skills: updated });
  };

  const updateSkillLevel = (index, level) => {
    const updated = [...skills];
    const skill = updated[index];
    updated[index] = typeof skill === 'string' ? { name: skill, level } : { ...skill, level };
    onUpdate({ skills: updated });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1">Add Skills</label>
        <input
          className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-sm text-surface-800 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill(input);
              setInput('');
            }
          }}
          placeholder="Add a skill and press Enter"
        />
      </div>

      {skills.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-surface-700 mb-2">
            Your Skills ({skills.length})
          </label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <SkillPill
                key={i}
                skill={skill}
                onRemove={() => removeSkill(i)}
                onUpdateLevel={(level) => updateSkillLevel(i, level)}
              />
            ))}
          </div>
          <p className="text-xs text-surface-500 mt-2">Click a skill to set proficiency level</p>
        </div>
      )}

      {skills.length === 0 && (
        <p className="text-sm text-surface-500 text-center py-4">
          No skills added yet. Type above and press Enter.
        </p>
      )}
    </div>
  );
}

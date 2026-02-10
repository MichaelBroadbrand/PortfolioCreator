import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2, GripVertical, X } from 'lucide-react';
import Input from '../common/Input';
import ImageUploadZone from '../common/ImageUploadZone';

function ProjectCard({ project, index, isOpen, onToggle, onUpdate, onRemove }) {
  const updateField = (field, value) => {
    onUpdate(index, { ...project, [field]: value });
  };

  const addTag = (tag) => {
    const tags = project.tags || [];
    if (tags.length >= 6 || !tag.trim() || tags.includes(tag.trim())) return;
    onUpdate(index, { ...project, tags: [...tags, tag.trim()] });
  };

  const removeTag = (tagIndex) => {
    const tags = [...(project.tags || [])];
    tags.splice(tagIndex, 1);
    onUpdate(index, { ...project, tags });
  };

  const [tagInput, setTagInput] = useState('');

  return (
    <div className="border border-white/[0.08] rounded-lg overflow-hidden">
      {/* Accordion header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2.5 bg-white/[0.04] hover:bg-white/[0.06] transition-colors text-left"
      >
        <GripVertical className="w-4 h-4 text-surface-500 shrink-0" />
        {isOpen ? <ChevronDown className="w-4 h-4 text-surface-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-surface-500 shrink-0" />}
        <span className="text-sm font-medium text-surface-800 truncate flex-1">
          {project.title || `Project ${index + 1}`}
        </span>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div className="p-3 space-y-3 border-t border-white/[0.08]">
          <Input
            label="Title"
            value={project.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Project name"
          />

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
            <textarea
              className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-sm text-surface-800 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all resize-none"
              rows={3}
              value={project.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Brief project description"
            />
          </div>

          {/* Image upload zone */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Image</label>
            <ImageUploadZone
              value={project.image || ''}
              onChange={(url) => updateField('image', url)}
              aspectRatio="16/9"
              folder="portfolio-builder/projects"
            />
          </div>

          {/* Tags input */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Tags (max 6)</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {(project.tags || []).map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-500/10 text-brand-400 text-xs rounded-full">
                  {tag}
                  <button type="button" onClick={() => removeTag(i)} className="hover:text-brand-300">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-sm text-surface-800 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(tagInput);
                  setTagInput('');
                }
              }}
              placeholder="Type a tag and press Enter"
              disabled={(project.tags || []).length >= 6}
            />
          </div>

          <Input
            label="Live URL"
            value={project.liveUrl || ''}
            onChange={(e) => updateField('liveUrl', e.target.value)}
            placeholder="https://myproject.com"
          />

          <Input
            label="Source Code URL"
            value={project.sourceUrl || ''}
            onChange={(e) => updateField('sourceUrl', e.target.value)}
            placeholder="https://github.com/..."
          />

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-sm text-error-500 hover:text-error-400 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5 inline mr-1" />
            Remove Project
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProjectsSection({ content, onUpdate }) {
  const [openIndex, setOpenIndex] = useState(null);
  const projects = content.projects || [];

  const updateProject = (index, updatedProject) => {
    const updated = [...projects];
    updated[index] = updatedProject;
    onUpdate({ projects: updated });
  };

  const addProject = () => {
    const newProject = { title: '', description: '', tags: [], image: '', liveUrl: '', sourceUrl: '' };
    onUpdate({ projects: [...projects, newProject] });
    setOpenIndex(projects.length);
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    onUpdate({ projects: updated });
    setOpenIndex(null);
  };

  return (
    <div className="space-y-3">
      {projects.map((project, i) => (
        <ProjectCard
          key={i}
          project={project}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          onUpdate={updateProject}
          onRemove={removeProject}
        />
      ))}

      <button
        type="button"
        onClick={addProject}
        className="w-full py-3 border-2 border-dashed border-white/[0.1] rounded-lg text-sm text-surface-500 hover:border-brand-500/50 hover:text-brand-400 transition-colors flex items-center justify-center gap-1"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
  );
}

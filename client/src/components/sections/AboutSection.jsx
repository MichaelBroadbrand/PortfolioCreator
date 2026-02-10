import { Bold, Italic, Link as LinkIcon } from 'lucide-react';
import ImageUploadZone from '../common/ImageUploadZone';

export default function AboutSection({ content, onUpdate }) {
  const updateField = (field, value) => onUpdate({ [field]: value });
  const bio = content.bio || '';

  const applyFormat = (tag) => {
    // Simple formatting hint — real rich text would use a library
    const textarea = document.getElementById('about-bio-textarea');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = bio.substring(start, end);
    if (!selected) return;

    const wrapped =
      tag === 'bold' ? `**${selected}**` :
      tag === 'italic' ? `*${selected}*` :
      tag === 'link' ? `[${selected}](url)` : selected;

    const newBio = bio.substring(0, start) + wrapped + bio.substring(end);
    updateField('bio', newBio);
  };

  return (
    <div className="space-y-4">
      {/* Profile image upload */}
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1">Profile Image</label>
        <div className="w-[200px] mx-auto">
          <ImageUploadZone
            value={content.profileImage || ''}
            onChange={(url) => updateField('profileImage', url)}
            aspectRatio="1/1"
            folder="portfolio-builder/avatars"
          />
        </div>
      </div>

      {/* Bio with rich text toolbar */}
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1">Bio</label>
        <div className="flex items-center gap-1 mb-1 border border-white/[0.08] rounded-t-lg px-2 py-1 bg-white/[0.04]">
          <button
            type="button"
            onClick={() => applyFormat('bold')}
            className="p-1 rounded hover:bg-white/[0.06] text-surface-600"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('italic')}
            className="p-1 rounded hover:bg-white/[0.06] text-surface-600"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('link')}
            className="p-1 rounded hover:bg-white/[0.06] text-surface-600"
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>
        <textarea
          id="about-bio-textarea"
          className="w-full rounded-b-lg border border-white/[0.1] border-t-0 bg-white/[0.06] px-3 py-2 text-sm text-surface-800 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all resize-none"
          rows={6}
          value={bio}
          onChange={(e) => updateField('bio', e.target.value)}
          placeholder="Tell visitors about yourself..."
          maxLength={500}
        />
        <p className="text-xs text-surface-500 mt-1 text-right">{bio.length}/500</p>
      </div>
    </div>
  );
}

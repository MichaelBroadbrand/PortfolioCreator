import { Bold, Italic, Underline, Link as LinkIcon, List, ListOrdered } from 'lucide-react';
import Input from '../common/Input';

export default function CustomSection({ content, onUpdate }) {
  const updateField = (field, value) => onUpdate({ [field]: value });
  const body = content.body || '';

  const applyFormat = (tag) => {
    const textarea = document.getElementById('custom-section-body');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = body.substring(start, end);

    let wrapped;
    switch (tag) {
      case 'bold':
        wrapped = selected ? `<strong>${selected}</strong>` : '<strong>bold text</strong>';
        break;
      case 'italic':
        wrapped = selected ? `<em>${selected}</em>` : '<em>italic text</em>';
        break;
      case 'underline':
        wrapped = selected ? `<u>${selected}</u>` : '<u>underlined text</u>';
        break;
      case 'link':
        wrapped = selected ? `<a href="url">${selected}</a>` : '<a href="url">link text</a>';
        break;
      case 'ul':
        wrapped = selected
          ? `<ul>\n${selected.split('\n').map((l) => `  <li>${l}</li>`).join('\n')}\n</ul>`
          : '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>';
        break;
      case 'ol':
        wrapped = selected
          ? `<ol>\n${selected.split('\n').map((l) => `  <li>${l}</li>`).join('\n')}\n</ol>`
          : '<ol>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ol>';
        break;
      default:
        wrapped = selected;
    }

    const newBody = body.substring(0, start) + wrapped + body.substring(end);
    updateField('body', newBody);
  };

  return (
    <div className="space-y-4">
      <Input
        label="Section Title"
        value={content.title || ''}
        onChange={(e) => updateField('title', e.target.value)}
        placeholder="Custom Section"
      />

      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1">Content</label>
        {/* Rich text toolbar */}
        <div className="flex items-center gap-0.5 border border-surface-200 rounded-t-lg px-2 py-1 bg-surface-50">
          <button
            type="button"
            onClick={() => applyFormat('bold')}
            className="p-1.5 rounded hover:bg-surface-200 text-surface-600"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('italic')}
            className="p-1.5 rounded hover:bg-surface-200 text-surface-600"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('underline')}
            className="p-1.5 rounded hover:bg-surface-200 text-surface-600"
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-surface-200 mx-1" />
          <button
            type="button"
            onClick={() => applyFormat('link')}
            className="p-1.5 rounded hover:bg-surface-200 text-surface-600"
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-surface-200 mx-1" />
          <button
            type="button"
            onClick={() => applyFormat('ul')}
            className="p-1.5 rounded hover:bg-surface-200 text-surface-600"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('ol')}
            className="p-1.5 rounded hover:bg-surface-200 text-surface-600"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>
        <textarea
          id="custom-section-body"
          className="w-full rounded-b-lg border border-surface-300 border-t-0 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all resize-none"
          rows={8}
          value={body}
          onChange={(e) => updateField('body', e.target.value)}
          placeholder="<p>Add your content here</p>"
        />
        <p className="text-xs text-surface-400 mt-1">Supports HTML. Use the toolbar for quick formatting.</p>
      </div>
    </div>
  );
}

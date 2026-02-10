import { Github, Linkedin, Twitter, Globe } from 'lucide-react';
import Input from '../common/Input';

export default function ContactSection({ content, onUpdate }) {
  const updateField = (field, value) => onUpdate({ [field]: value });

  return (
    <div className="space-y-4">
      <Input
        label="Email"
        value={content.email || ''}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="your@email.com"
        type="email"
      />

      <div>
        <label className="block text-sm font-medium text-surface-700 mb-2">Social Links</label>
        <div className="space-y-3">
          <Input
            leftIcon={Github}
            value={content.github || ''}
            onChange={(e) => updateField('github', e.target.value)}
            placeholder="https://github.com/username"
          />
          <Input
            leftIcon={Linkedin}
            value={content.linkedin || ''}
            onChange={(e) => updateField('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/username"
          />
          <Input
            leftIcon={Twitter}
            value={content.twitter || ''}
            onChange={(e) => updateField('twitter', e.target.value)}
            placeholder="https://x.com/username"
          />
          <Input
            leftIcon={Globe}
            value={content.website || ''}
            onChange={(e) => updateField('website', e.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      {/* Contact form toggle */}
      <div className="flex items-center justify-between py-2">
        <div>
          <span className="text-sm font-medium text-surface-700">Show contact form</span>
          <p className="text-xs text-surface-500 mt-0.5">Visitors can send you messages directly</p>
        </div>
        <button
          type="button"
          onClick={() => updateField('showContactForm', !content.showContactForm)}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            content.showContactForm ? 'bg-brand-500' : 'bg-surface-400'
          }`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
              content.showContactForm ? 'left-6' : 'left-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

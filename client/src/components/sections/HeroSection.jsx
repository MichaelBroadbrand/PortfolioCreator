import Input from '../common/Input';
import ImageUploadZone from '../common/ImageUploadZone';

export default function HeroSection({ content, onUpdate }) {
  const updateField = (field, value) => onUpdate({ [field]: value });

  return (
    <div className="space-y-4">
      {/* Profile image upload zone */}
      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1">Profile Image</label>
        <div className="flex justify-center">
          <ImageUploadZone
            value={content.profileImage || ''}
            onChange={(url) => updateField('profileImage', url)}
            shape="circle"
            className="w-24 h-24"
            folder="portfolio-builder/avatars"
          />
        </div>
      </div>

      <Input
        label="Display Name"
        value={content.name || ''}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder="Your name"
      />

      <Input
        label="Tagline"
        value={content.tagline || ''}
        onChange={(e) => updateField('tagline', e.target.value)}
        placeholder="e.g. Full-Stack Developer"
      />

      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1">Subtitle</label>
        <textarea
          className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
          rows={2}
          value={content.subtitle || ''}
          onChange={(e) => updateField('subtitle', e.target.value)}
          placeholder="A brief description about yourself"
        />
      </div>

      <Input
        label="CTA Button Text"
        value={content.ctaText || ''}
        onChange={(e) => updateField('ctaText', e.target.value)}
        placeholder="View My Work"
      />

      <Input
        label="CTA Button Link"
        value={content.ctaLink || ''}
        onChange={(e) => updateField('ctaLink', e.target.value)}
        placeholder="#projects"
      />
    </div>
  );
}

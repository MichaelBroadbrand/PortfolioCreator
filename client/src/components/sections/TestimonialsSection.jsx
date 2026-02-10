import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import Input from '../common/Input';
import ImageUploadZone from '../common/ImageUploadZone';

function TestimonialCard({ testimonial, index, isOpen, onToggle, onUpdate, onRemove }) {
  const updateField = (field, value) => {
    onUpdate(index, { ...testimonial, [field]: value });
  };

  return (
    <div className="border border-white/[0.08] rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2.5 bg-white/[0.04] hover:bg-white/[0.06] transition-colors text-left"
      >
        {isOpen ? <ChevronDown className="w-4 h-4 text-surface-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-surface-500 shrink-0" />}
        <span className="text-sm font-medium text-surface-800 truncate flex-1">
          {testimonial.name || `Testimonial ${index + 1}`}
        </span>
      </button>

      {isOpen && (
        <div className="p-3 space-y-3 border-t border-white/[0.08]">
          {/* Avatar upload */}
          <div className="flex items-center gap-3">
            <ImageUploadZone
              value={testimonial.avatar || ''}
              onChange={(url) => updateField('avatar', url)}
              shape="circle"
              className="w-12 h-12 shrink-0"
              folder="portfolio-builder/avatars"
            />
            <p className="text-xs text-surface-500">Upload avatar</p>
          </div>

          <Input
            label="Name"
            value={testimonial.name || ''}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Person's name"
          />

          <Input
            label="Role / Company"
            value={testimonial.role || ''}
            onChange={(e) => updateField('role', e.target.value)}
            placeholder="e.g. CEO at Company"
          />

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Quote</label>
            <textarea
              className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-sm text-surface-800 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all resize-none"
              rows={3}
              value={testimonial.quote || ''}
              onChange={(e) => updateField('quote', e.target.value)}
              placeholder="What did they say about you?"
            />
          </div>

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-sm text-error-500 hover:text-error-400 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5 inline mr-1" />
            Remove Testimonial
          </button>
        </div>
      )}
    </div>
  );
}

export default function TestimonialsSection({ content, onUpdate }) {
  const [openIndex, setOpenIndex] = useState(null);
  const testimonials = content.testimonials || [];

  const updateTestimonial = (index, updated) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = updated;
    onUpdate({ testimonials: newTestimonials });
  };

  const addTestimonial = () => {
    const newTestimonial = { name: '', role: '', quote: '', avatar: '' };
    onUpdate({ testimonials: [...testimonials, newTestimonial] });
    setOpenIndex(testimonials.length);
  };

  const removeTestimonial = (index) => {
    onUpdate({ testimonials: testimonials.filter((_, i) => i !== index) });
    setOpenIndex(null);
  };

  return (
    <div className="space-y-3">
      {testimonials.map((testimonial, i) => (
        <TestimonialCard
          key={i}
          testimonial={testimonial}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          onUpdate={updateTestimonial}
          onRemove={removeTestimonial}
        />
      ))}

      <button
        type="button"
        onClick={addTestimonial}
        className="w-full py-3 border-2 border-dashed border-white/[0.1] rounded-lg text-sm text-surface-500 hover:border-brand-500/50 hover:text-brand-400 transition-colors flex items-center justify-center gap-1"
      >
        <Plus className="w-4 h-4" />
        Add Testimonial
      </button>
    </div>
  );
}

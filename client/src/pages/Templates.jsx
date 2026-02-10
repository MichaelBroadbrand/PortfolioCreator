import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import TemplateGallery from '../components/templates/TemplateGallery';
import TemplatePreview from '../components/templates/TemplatePreview';
import { useToast } from '../context/ThemeContext';
import { createPortfolio } from '../services/portfolioService';

export default function Templates() {
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleUseTemplate = async () => {
    setCreating(true);
    try {
      toast.success(`Creating portfolio with ${previewTemplate.name} template...`);
      const portfolio = await createPortfolio(
        previewTemplate._id,
        previewTemplate.index,
        previewTemplate.name
      );
      navigate(`/editor/${portfolio._id}`);
    } catch (err) {
      console.error('[Templates] Failed to create portfolio:', err);
      toast.error(err.message || 'Failed to create portfolio');
    } finally {
      setCreating(false);
    }
  };

  if (previewTemplate) {
    return (
      <TemplatePreview
        template={previewTemplate}
        onBack={() => setPreviewTemplate(null)}
        onUse={handleUseTemplate}
        loading={creating}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-surface-900 font-heading">
            Choose a Template
          </h1>
          <p className="text-surface-600 mt-2">
            Pick a starting point — you can customise everything later
          </p>
        </div>

        {/* Gallery */}
        <TemplateGallery onPreview={setPreviewTemplate} />
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Check,
  Loader2,
  AlertCircle,
  X,
} from 'lucide-react';
import { EditorProvider, useEditor } from '../context/EditorContext';
import SectionToolbar from '../components/editor/SectionToolbar';
import EditorCanvas from '../components/editor/EditorCanvas';
import Button from '../components/common/Button';
import {
  HeroSection,
  AboutSection,
  ProjectsSection,
  SkillsSection,
  ExperienceSection,
  EducationSection,
  ContactSection,
  TestimonialsSection,
  CustomSection,
} from '../components/sections';
import LivePreview from '../components/editor/LivePreview';
import PublishModal from '../components/dashboard/PublishModal';
import useAutoSave from '../hooks/useAutoSave';
import usePortfolio from '../hooks/usePortfolio';
import { updatePortfolio, publishPortfolio } from '../services/portfolioService';
import { FullPageLoader } from '../components/common/Loader';

const devices = [
  { id: 'desktop', icon: Monitor },
  { id: 'tablet', icon: Tablet },
  { id: 'mobile', icon: Smartphone },
];

function SaveStatus({ status, onRetry }) {
  switch (status) {
    case 'saved':
      return (
        <span className="flex items-center gap-1 text-sm text-success-600">
          <Check className="w-4 h-4" /> Saved
        </span>
      );
    case 'saving':
      return (
        <span className="flex items-center gap-1 text-sm text-surface-500">
          <Loader2 className="w-4 h-4 animate-spin" /> Saving...
        </span>
      );
    case 'unsaved':
      return (
        <span className="flex items-center gap-1 text-sm text-accent-600">
          <div className="w-2 h-2 rounded-full bg-accent-500" /> Unsaved changes
        </span>
      );
    case 'error':
      return (
        <span className="flex items-center gap-1 text-sm text-error-600">
          <AlertCircle className="w-4 h-4" /> Save failed
          <button className="text-xs underline ml-1" onClick={onRetry}>Retry</button>
        </span>
      );
    default:
      return null;
  }
}

const sectionPanelMap = {
  hero: HeroSection,
  about: AboutSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  education: EducationSection,
  contact: ContactSection,
  testimonials: TestimonialsSection,
  custom: CustomSection,
};

function SectionEditPanel() {
  const { portfolio, selectedSectionId, deselectSection, updateSectionContent } = useEditor();

  const section = portfolio?.sections?.find((s) => s._id === selectedSectionId);
  if (!section) return null;

  const content = section.content || {};

  const onUpdate = (updates) => {
    updateSectionContent(section._id, updates);
  };

  const PanelComponent = sectionPanelMap[section.type];

  return (
    <div className="w-80 bg-surface-100 border-l border-white/[0.06] flex flex-col shrink-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <h3 className="text-sm font-semibold text-surface-900 capitalize">
          {section.type} Section
        </h3>
        <button onClick={deselectSection} className="p-1 hover:bg-white/[0.06] rounded text-surface-500">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto p-4">
        {PanelComponent ? (
          <PanelComponent content={content} onUpdate={onUpdate} layout={portfolio?.layout} />
        ) : (
          <p className="text-sm text-surface-500">
            No editing panel available for {section.type} sections.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.06]">
        <Button variant="ghost" className="w-full" onClick={deselectSection}>
          Done
        </Button>
      </div>
    </div>
  );
}

function EditorInner() {
  const {
    portfolio,
    saveStatus,
    previewDevice,
    setPreviewDevice,
    updateName,
    deselectSection,
    selectedSectionId,
    lastSavedAt,
    setPortfolio,
  } = useEditor();
  const { portfolioId } = useParams();
  const [editingName, setEditingName] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  // Load portfolio via hook
  const { loading, error: loadError, reload } = usePortfolio(portfolioId);

  // Auto-save integration
  const { save: manualSave } = useAutoSave();

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        manualSave();
      }
      if (e.key === 'Escape') {
        if (showPreview) setShowPreview(false);
        else deselectSection();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deselectSection, manualSave, showPreview]);

  const handlePublish = async ({ slug, seo }) => {
    // Force-save all content before publishing
    console.log('[Publish] Force-saving portfolio', portfolio._id);
    await updatePortfolio(portfolio._id, {
      name: portfolio.name,
      sections: portfolio.sections,
      theme: portfolio.theme,
      seo: portfolio.seo,
    });
    console.log('[Publish] Force-save done, now publishing with slug:', slug);
    // Then publish and update local state
    const published = await publishPortfolio(portfolio._id, { slug, seo });
    console.log('[Publish] Response status:', published?.status, 'slug:', published?.slug);
    if (published) {
      setPortfolio(published);
    }
  };

  if (loading) return <FullPageLoader />;

  if (loadError || !portfolio) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-surface-50">
        <AlertCircle className="w-12 h-12 text-error-400 mb-4" />
        <h2 className="text-xl font-semibold text-surface-800 mb-2">Failed to load portfolio</h2>
        <p className="text-surface-500 mb-6">{loadError || 'Portfolio not found'}</p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => window.history.back()}>Go Back</Button>
          <Button onClick={reload}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="h-14 bg-surface-100 border-b border-white/[0.06] flex items-center justify-between px-4 shrink-0">
        {/* Left: back + name */}
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 text-sm text-surface-500 hover:text-surface-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <div className="w-px h-6 bg-surface-400" />
          {editingName ? (
            <input
              autoFocus
              className="text-sm font-semibold text-surface-900 bg-transparent border-b border-brand-500 outline-none px-1"
              value={portfolio.name}
              onChange={(e) => updateName(e.target.value)}
              onBlur={() => setEditingName(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingName(false)}
            />
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="text-sm font-semibold text-surface-900 hover:text-brand-600"
            >
              {portfolio.name}
            </button>
          )}
        </div>

        {/* Centre: device toggles */}
        <div className="hidden md:flex items-center gap-1">
          {devices.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPreviewDevice(id)}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === id
                  ? 'bg-brand-500/10 text-brand-400'
                  : 'text-surface-500 hover:text-surface-700'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Right: save status + actions */}
        <div className="flex items-center gap-3">
          <div className="group relative">
            <SaveStatus status={saveStatus} onRetry={manualSave} />
            {lastSavedAt && saveStatus === 'saved' && (
              <div className="absolute top-full right-0 mt-1 hidden group-hover:block bg-surface-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                Last saved {new Date(lastSavedAt).toLocaleTimeString()}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowPreview(true)}>
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button size="sm" onClick={() => setShowPublishModal(true)}>
            Publish
          </Button>
        </div>
      </div>

      {/* Editor body */}
      <div className="flex-1 flex overflow-hidden">
        <SectionToolbar />
        <EditorCanvas />
        {selectedSectionId && <SectionEditPanel />}
      </div>

      {/* Live Preview overlay */}
      {showPreview && <LivePreview onClose={() => setShowPreview(false)} />}

      {/* Publish Modal */}
      <PublishModal
        portfolio={portfolio}
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onPublish={handlePublish}
      />
    </div>
  );
}

export default function Editor() {
  return (
    <EditorProvider>
      <EditorInner />
    </EditorProvider>
  );
}

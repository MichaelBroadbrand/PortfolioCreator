import { useState, useEffect } from 'react';
import { Check, Copy, ExternalLink, X } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';

export default function PublishModal({ portfolio, isOpen, onClose, onPublish }) {
  const [slug, setSlug] = useState(portfolio?.slug || '');
  const [seoTitle, setSeoTitle] = useState(portfolio?.seo?.title || portfolio?.name || '');
  const [seoDescription, setSeoDescription] = useState(portfolio?.seo?.description || '');
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset all state when modal opens — ensures fresh form every time
  useEffect(() => {
    if (isOpen) {
      setSlug(portfolio?.slug || '');
      setSeoTitle(portfolio?.seo?.title || portfolio?.name || '');
      setSeoDescription(portfolio?.seo?.description || '');
      setPublishing(false);
      setPublished(false);
      setError('');
      setCopied(false);
    }
  }, [isOpen, portfolio]);

  const publicUrl = `${window.location.origin}/p/${slug}`;

  const handlePublish = async () => {
    if (!slug.trim()) {
      setError('Slug is required');
      return;
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      setError('Slug can only contain lowercase letters, numbers, and hyphens');
      return;
    }
    setError('');
    setPublishing(true);
    try {
      await onPublish({
        slug,
        seo: { title: seoTitle, description: seoDescription },
      });
      // Navigate to the published portfolio
      window.open(`${window.location.origin}/p/${slug}`, '_blank');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to publish');
    } finally {
      setPublishing(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {published ? (
        /* Success state */
        <div className="text-center py-6 px-4">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 mb-2">Your portfolio is live!</h2>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline text-sm mb-6 block"
          >
            {publicUrl}
          </a>
          <div className="flex justify-center gap-3 mt-6">
            <Button variant="secondary" onClick={handleCopyLink}>
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            <Button onClick={() => window.open(publicUrl, '_blank')}>
              <ExternalLink className="w-4 h-4 mr-1" />
              View Live
            </Button>
          </div>
        </div>
      ) : (
        /* Publish form */
        <div className="px-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-surface-900">Publish Your Portfolio</h2>
            <button onClick={onClose} className="p-1 hover:bg-surface-100 rounded">
              <X className="w-5 h-5 text-surface-400" />
            </button>
          </div>

          <div className="space-y-4">
            {/* URL preview */}
            <div className="bg-surface-50 rounded-lg px-4 py-3">
              <p className="text-xs text-surface-500 mb-1">Public URL</p>
              <p className="text-sm text-brand-600 font-mono truncate">{publicUrl}</p>
            </div>

            {/* Slug input */}
            <Input
              label="URL Slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                setError('');
              }}
              placeholder="my-portfolio"
              error={error}
            />

            {/* SEO fields */}
            <Input
              label="SEO Title"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Portfolio title for search engines"
            />

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">SEO Description</label>
              <textarea
                className="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all resize-none"
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value.slice(0, 160))}
                placeholder="A brief description for search results..."
                maxLength={160}
              />
              <p className="text-xs text-surface-400 mt-1 text-right">{seoDescription.length}/160</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handlePublish} loading={publishing}>
              Publish
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

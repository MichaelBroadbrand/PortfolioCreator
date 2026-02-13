import { useState } from 'react';
import { Sparkles, Loader2, AlertCircle, CheckCircle2, Globe } from 'lucide-react';
import { useEditor } from '../../context/EditorContext';
import { generatePortfolioContent } from '../../services/aiService';

const PLACEHOLDER_TEXT = `Example: "I'm Sarah Chen, a full-stack developer with 5 years of experience. I work mainly with React, Node.js, and PostgreSQL. I graduated from MIT with a CS degree in 2019. Currently I'm a senior developer at TechCorp. My main projects include a real-time chat app and an e-commerce platform. You can reach me at sarah@example.com, and my GitHub is github.com/sarahchen."`;

function isLinkedInUrl(urlString) {
  try {
    const hostname = new URL(urlString).hostname.toLowerCase();
    return hostname === 'linkedin.com' || hostname === 'www.linkedin.com' || hostname.endsWith('.linkedin.com');
  } catch {
    return false;
  }
}

// TODO: Re-enable plan gating when billing is live
export default function AiPanel() {
  const { portfolio, updateSectionContent } = useEditor();
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [updatedCount, setUpdatedCount] = useState(0);

  const hasDescription = description.trim().length >= 10;
  const hasUrl = url.trim().length > 0;
  const urlIsLinkedIn = hasUrl && isLinkedInUrl(url.trim());
  const hasUsableUrl = hasUrl && !urlIsLinkedIn;
  const canGenerate = hasDescription || hasUsableUrl;

  const handleGenerate = async () => {
    if (!canGenerate) {
      setErrorMessage('Please provide a URL or write at least a couple of sentences about yourself.');
      setStatus('error');
      return;
    }

    if (hasUrl) {
      try {
        new URL(url.trim());
      } catch {
        setErrorMessage('Please enter a valid URL (e.g., https://github.com/username).');
        setStatus('error');
        return;
      }
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const content = await generatePortfolioContent(
        portfolio._id,
        hasDescription ? description : null,
        hasUsableUrl ? url.trim() : null,
      );

      let count = 0;
      const sections = portfolio.sections || [];

      for (const section of sections) {
        const sectionContent = content[section.type];
        if (sectionContent && typeof sectionContent === 'object') {
          updateSectionContent(section._id, sectionContent);
          count++;
        }
      }

      setUpdatedCount(count);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to generate content. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">
          AI Portfolio Fill
        </h4>
        <p className="text-xs text-surface-400">
          Paste a URL to your profile or describe yourself, and let AI fill all your portfolio sections at once.
        </p>
      </div>

      {/* URL input */}
      <div>
        <label className="block text-xs font-medium text-surface-500 mb-1">
          Import from URL
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (status !== 'idle') setStatus('idle');
            }}
            placeholder="https://github.com/username"
            className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] pl-9 pr-3 py-2 text-sm text-surface-800 placeholder:text-surface-400 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30"
          />
        </div>
        {urlIsLinkedIn ? (
          <p className="text-[10px] text-accent-500 mt-1">
            LinkedIn blocks automated access. Please copy your LinkedIn profile text and paste it in the description box below.
          </p>
        ) : (
          <p className="text-[10px] text-surface-400 mt-1">
            Works with GitHub, personal websites, and most public profiles.
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <div className="flex-1 border-t border-white/[0.06]" />
        <span className="text-[10px] text-surface-400 uppercase">or describe yourself</span>
        <div className="flex-1 border-t border-white/[0.06]" />
      </div>

      {/* Description textarea */}
      <div>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          placeholder={PLACEHOLDER_TEXT}
          rows={8}
          maxLength={5000}
          className="w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-sm text-surface-800 placeholder:text-surface-400 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 resize-none"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-surface-400">
            {description.length}/5000
          </span>
          {status === 'idle' && description.length > 0 && description.length < 10 && !hasUrl && (
            <span className="text-[10px] text-accent-500">
              Write a bit more for better results
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={status === 'loading' || !canGenerate}
        className={`
          w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium
          transition-all duration-200
          ${status === 'loading'
            ? 'bg-brand-500/50 text-surface-50 cursor-wait'
            : 'bg-brand-500 text-surface-50 hover:bg-brand-400 disabled:opacity-40 disabled:cursor-not-allowed'
          }
        `}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {hasUsableUrl ? 'Fetching & Generating...' : 'Generating...'}
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate Portfolio Content
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-success-500/10 border border-success-500/20">
          <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-success-600">Content generated!</p>
            <p className="text-xs text-surface-500 mt-0.5">
              Updated {updatedCount} section{updatedCount !== 1 ? 's' : ''}. Changes will auto-save.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && errorMessage && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-error-500/10 border border-error-500/20">
          <AlertCircle className="w-4 h-4 text-error-500 mt-0.5 shrink-0" />
          <p className="text-sm text-error-600">{errorMessage}</p>
        </div>
      )}

      <div className="pt-2 border-t border-white/[0.06]">
        <p className="text-[10px] font-semibold text-surface-500 uppercase tracking-wider mb-2">Tips for better results</p>
        <ul className="space-y-1.5 text-xs text-surface-400">
          <li>- Paste a GitHub or personal website URL for quick import</li>
          <li>- Include your full name and job title</li>
          <li>- List your key skills and technologies</li>
          <li>- Mention your work experience with company names</li>
          <li>- Add education details (degree, school)</li>
          <li>- Describe your notable projects</li>
        </ul>
      </div>
    </div>
  );
}

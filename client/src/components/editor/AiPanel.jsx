import { useState } from 'react';
import { Sparkles, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEditor } from '../../context/EditorContext';
import { generatePortfolioContent } from '../../services/aiService';

const PLACEHOLDER_TEXT = `Example: "I'm Sarah Chen, a full-stack developer with 5 years of experience. I work mainly with React, Node.js, and PostgreSQL. I graduated from MIT with a CS degree in 2019. Currently I'm a senior developer at TechCorp. My main projects include a real-time chat app and an e-commerce platform. You can reach me at sarah@example.com, and my GitHub is github.com/sarahchen."`;

// TODO: Re-enable plan gating when billing is live
export default function AiPanel() {
  const { portfolio, updateSectionContent } = useEditor();
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [updatedCount, setUpdatedCount] = useState(0);

  const handleGenerate = async () => {
    if (!description.trim() || description.trim().length < 10) {
      setErrorMessage('Please write at least a couple of sentences about yourself.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const content = await generatePortfolioContent(portfolio._id, description);

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
          Describe yourself and let AI fill all your portfolio sections at once.
        </p>
      </div>

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
          {status === 'idle' && description.length > 0 && description.length < 10 && (
            <span className="text-[10px] text-accent-500">
              Write a bit more for better results
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={status === 'loading' || description.trim().length < 10}
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
            Generating...
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
          <li>- Include your full name and job title</li>
          <li>- List your key skills and technologies</li>
          <li>- Mention your work experience with company names</li>
          <li>- Add education details (degree, school)</li>
          <li>- Include links to GitHub, LinkedIn, etc.</li>
          <li>- Describe your notable projects</li>
        </ul>
      </div>
    </div>
  );
}

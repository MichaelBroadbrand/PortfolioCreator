import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Edit3, Copy, Link as LinkIcon, Trash2, ExternalLink } from 'lucide-react';

function formatTimeAgo(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default function PortfolioCard({ portfolio, onDuplicate, onDelete }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const isPublished = portfolio.status === 'published';
  const gradientColors = [
    'from-brand-400 to-brand-600',
    'from-purple-400 to-purple-600',
    'from-emerald-400 to-emerald-600',
    'from-orange-400 to-orange-600',
    'from-cyan-400 to-cyan-600',
  ];
  const gradient = gradientColors[Math.abs(portfolio.name?.charCodeAt(0) || 0) % gradientColors.length];

  const copyLink = () => {
    const url = `${window.location.origin}/p/${portfolio.slug}`;
    navigator.clipboard.writeText(url);
    setMenuOpen(false);
  };

  return (
    <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(234,179,8,0.08)] transition-all group">
      {/* Thumbnail */}
      <div
        className={`aspect-video bg-gradient-to-br ${gradient} relative cursor-pointer`}
        onClick={() => navigate(`/editor/${portfolio._id}`)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <p className="text-white font-semibold text-lg">{portfolio.name?.[0] || 'P'}</p>
          </div>
        </div>

        {/* Kebab menu */}
        <div className="absolute top-2 right-2" ref={menuRef}>
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            className="p-1.5 bg-black/20 hover:bg-black/40 rounded-lg text-white transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-surface-100 border border-white/[0.08] rounded-lg shadow-lg py-1 z-10" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => { navigate(`/editor/${portfolio._id}`); setMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-700 hover:bg-white/[0.06]"
              >
                <Edit3 className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => { onDuplicate(portfolio._id); setMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-700 hover:bg-white/[0.06]"
              >
                <Copy className="w-4 h-4" /> Duplicate
              </button>
              {isPublished && (
                <>
                  <button
                    onClick={copyLink}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-700 hover:bg-white/[0.06]"
                  >
                    <LinkIcon className="w-4 h-4" /> Copy Link
                  </button>
                  <a
                    href={`/p/${portfolio.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-700 hover:bg-white/[0.06]"
                    onClick={() => setMenuOpen(false)}
                  >
                    <ExternalLink className="w-4 h-4" /> View Live
                  </a>
                </>
              )}
              <div className="border-t border-white/[0.06] my-1" />
              <button
                onClick={() => { onDelete(portfolio); setMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error-500 hover:bg-error-500/10"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-surface-100">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-semibold text-surface-900 truncate cursor-pointer hover:text-brand-400"
            onClick={() => navigate(`/editor/${portfolio._id}`)}
          >
            {portfolio.name}
          </h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
              isPublished
                ? 'bg-success-500/10 text-success-500'
                : 'bg-brand-500/10 text-brand-400'
            }`}
          >
            {isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
        <p className="text-xs text-surface-500 mt-1">
          Edited {formatTimeAgo(portfolio.updatedAt)}
        </p>
      </div>
    </div>
  );
}

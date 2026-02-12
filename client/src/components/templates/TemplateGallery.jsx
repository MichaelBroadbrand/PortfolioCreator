import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, ChevronDown, Check } from 'lucide-react';
import { TEMPLATE_CATEGORIES } from '../../utils/constants';
import { getTemplates } from '../../services/templateService';
import TemplateCard from './TemplateCard';

function SkeletonCard() {
  return (
    <div className="bg-white/[0.06] border border-white/[0.08] rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-white/[0.04]" />
      <div className="p-4">
        <div className="h-5 bg-white/[0.06] rounded w-24 mb-2" />
        <div className="h-4 bg-white/[0.04] rounded w-16" />
      </div>
    </div>
  );
}

const sortOptions = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
];

export default function TemplateGallery({ onPreview }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState('popular');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getTemplates(activeCategory, sort);
      setTemplates(data);
      setLoading(false);
    }
    load();
  }, [activeCategory, sort]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === cat
                  ? 'bg-brand-500 text-surface-50'
                  : 'bg-white/[0.06] text-surface-600 hover:bg-white/[0.1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.06] text-sm text-surface-800 hover:bg-white/[0.1] transition-colors"
          >
            {sortOptions.find((o) => o.value === sort)?.label}
            <ChevronDown className={`w-3.5 h-3.5 text-surface-500 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 mt-1 w-36 rounded-lg border border-white/[0.1] bg-surface-100 shadow-lg shadow-black/20 py-1 z-20">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setSortOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-white/[0.06] transition-colors"
                  style={{ color: sort === opt.value ? 'var(--color-brand-400)' : 'var(--color-surface-700)' }}
                >
                  {opt.label}
                  {sort === opt.value && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-16">
          <SearchIcon className="w-12 h-12 text-surface-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">No templates found</h3>
          <button
            onClick={() => setActiveCategory('All')}
            className="text-brand-400 hover:text-brand-300 text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template._id || template.name}
              template={template}
              onPreview={onPreview}
            />
          ))}
        </div>
      )}
    </div>
  );
}

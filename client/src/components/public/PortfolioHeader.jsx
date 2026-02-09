import { useState, useEffect } from 'react';

export default function PortfolioHeader({ portfolio }) {
  const [scrolled, setScrolled] = useState(false);
  const theme = portfolio?.theme || {};
  const colorScheme = theme.colorScheme || {};

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const visibleSections = (portfolio?.sections || [])
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  if (!scrolled) return null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md transition-all duration-300"
      style={{
        backgroundColor: `${colorScheme.background || '#ffffff'}ee`,
        boxShadow: `0 1px 0 0 ${colorScheme.text || '#000000'}10`,
      }}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-semibold text-sm" style={{ color: colorScheme.text }}>
          {portfolio.name}
        </span>
        <div className="flex items-center gap-4">
          {visibleSections.slice(0, 6).map((s) => (
            <a
              key={s._id}
              href={`#section-${s._id}`}
              className="text-xs font-medium hover:opacity-80 transition-opacity capitalize hidden md:block"
              style={{ color: colorScheme.primary }}
            >
              {s.type}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

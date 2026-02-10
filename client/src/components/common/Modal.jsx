import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, footer, className = '' }) {
  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />
      {/* Modal card */}
      <div
        className={`
          relative w-full max-w-lg bg-surface-100 border border-white/[0.08] rounded-xl shadow-2xl
          transform transition-all duration-200
          animate-in fade-in zoom-in-95
          ${className}
        `}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-lg font-semibold text-surface-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-surface-500 hover:text-surface-800 hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        {/* Body */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

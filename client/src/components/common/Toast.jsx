import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const iconColors = {
  success: 'text-success-500',
  error: 'text-error-500',
  info: 'text-brand-400',
};

const progressColors = {
  success: 'bg-success-500',
  error: 'bg-error-500',
  info: 'bg-brand-500',
};

function ToastItem({ toast, onRemove }) {
  const [progress, setProgress] = useState(100);
  const Icon = icons[toast.type] || icons.info;

  useEffect(() => {
    const duration = 4000;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onRemove(toast.id);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={`
        relative flex items-center gap-3 px-4 py-3 rounded-xl
        bg-surface-100 border border-white/[0.1] shadow-lg
        animate-in slide-in-from-right duration-300
      `}
    >
      <Icon className={`w-5 h-5 shrink-0 ${iconColors[toast.type] || iconColors.info}`} />
      <p className="text-sm font-medium flex-1 text-surface-800">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="p-0.5 rounded text-surface-500 hover:text-surface-700 hover:bg-white/[0.06] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl overflow-hidden">
        <div
          className={`h-full transition-all duration-50 ease-linear ${progressColors[toast.type] || progressColors.info}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function ToastContainer({ toasts, removeToast }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 w-80">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

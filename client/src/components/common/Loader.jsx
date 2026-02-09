import { Loader2 } from 'lucide-react';

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
    </div>
  );
}

export function InlineLoader({ text = 'Loading...' }) {
  return (
    <div className="flex items-center gap-2 text-surface-500">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="text-sm">{text}</span>
    </div>
  );
}

export default FullPageLoader;

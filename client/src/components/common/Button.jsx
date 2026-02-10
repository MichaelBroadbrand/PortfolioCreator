import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-brand-500 text-surface-50 hover:bg-brand-400 focus:ring-brand-500',
  secondary: 'border border-brand-500/30 text-brand-400 hover:bg-brand-500/10 focus:ring-brand-500',
  ghost: 'text-surface-700 hover:bg-white/[0.06] focus:ring-surface-400',
  danger: 'bg-error-600 text-white hover:bg-error-500 focus:ring-error-500',
  white: 'bg-white/[0.1] text-surface-900 backdrop-blur-sm border border-white/[0.1] hover:bg-white/[0.15] focus:ring-white',
  'outline-white': 'border border-white/20 text-white hover:bg-white/[0.08] focus:ring-white',
  gold: 'bg-gradient-to-r from-brand-500 to-brand-400 text-surface-50 hover:from-brand-400 hover:to-brand-300 focus:ring-brand-500 shadow-[0_0_20px_rgba(234,179,8,0.15)]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-50
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || loading ? 'opacity-50 pointer-events-none' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500',
  secondary: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-50 focus:ring-brand-500',
  ghost: 'text-surface-700 hover:bg-surface-100 focus:ring-surface-400',
  danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
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
        focus:outline-none focus:ring-2 focus:ring-offset-2
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

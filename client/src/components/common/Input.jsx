import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    label,
    error,
    disabled = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    className = '',
    ...props
  },
  ref
) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-surface-600 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full rounded-lg border bg-white/[0.06] px-3 py-2 text-sm text-surface-800
            placeholder:text-surface-500
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50
            ${LeftIcon ? 'pl-10' : ''}
            ${RightIcon ? 'pr-10' : ''}
            ${error ? 'border-error-500/60 focus:ring-error-500/50 focus:border-error-500/60' : 'border-white/[0.1]'}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-white/[0.03]' : ''}
          `}
          disabled={disabled}
          {...props}
        />
        {RightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500">
            <RightIcon className="w-4 h-4" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-error-500">{error}</p>
      )}
    </div>
  );
});

export default Input;

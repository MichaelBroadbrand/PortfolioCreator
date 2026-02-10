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
        <label className="block text-sm font-medium text-surface-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full rounded-lg border bg-white px-3 py-2 text-sm
            placeholder:text-surface-400
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500
            ${LeftIcon ? 'pl-10' : ''}
            ${RightIcon ? 'pr-10' : ''}
            ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : 'border-surface-300'}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-surface-50' : ''}
          `}
          disabled={disabled}
          {...props}
        />
        {RightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400">
            <RightIcon className="w-4 h-4" />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-error-600">{error}</p>
      )}
    </div>
  );
});

export default Input;

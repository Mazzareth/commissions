'use client';
import React from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'success' | 'danger' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-tr from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white',
  success:
    'bg-gradient-to-tr from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white',
  danger:
    'bg-gradient-to-tr from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 text-white',
  ghost:
    'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading,
  className,
  children,
  ...props
}) => (
  <button
    className={clsx(
      'px-3 py-1.5 rounded-lg font-semibold text-xs shadow transition-all duration-200 focus:outline-none focus:ring disabled:opacity-60 whitespace-nowrap flex items-center gap-1',
      variantClasses[variant],
      className
    )}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading && (
      <span className="mr-2 animate-spin material-icons" style={{ fontSize: 16 }}>
        autorenew
      </span>
    )}
    {children}
  </button>
);

export default Button;
import React from 'react';
import { clsx } from 'clsx';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  loading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  icon: Icon,
  loading,
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'primary' && 'text-white bg-primary hover:bg-primary/90 focus:ring-primary',
        variant === 'secondary' && 'text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500',
        loading && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={loading}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}
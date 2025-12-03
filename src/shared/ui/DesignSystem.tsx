import React from 'react';

// --- Colors & Theme ---
// Using Tailwind classes for theming. 
// Primary: blue-600, Secondary: purple-600, Accent: amber-500

// --- Components ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    icon?: React.ElementType; // Support for Lucide icons passed as component
    iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    leftIcon,
    rightIcon,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-300 shadow-md hover:shadow-lg shadow-primary-500/30",
        secondary: "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-300 shadow-md hover:shadow-lg shadow-secondary-500/30",
        outline: "border-2 border-surface-200 bg-white text-surface-700 hover:bg-surface-50 hover:border-surface-300 focus:ring-surface-200",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300 shadow-md shadow-red-500/30",
        ghost: "text-surface-600 hover:bg-surface-100 hover:text-surface-900 focus:ring-surface-200"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-3.5 text-base"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {!isLoading && (leftIcon || (Icon && iconPosition === 'left')) && (
                <span className="mr-2">{leftIcon || (Icon && <Icon size={size === 'lg' ? 20 : 16} />)}</span>
            )}
            {children}
            {!isLoading && (rightIcon || (Icon && iconPosition === 'right')) && (
                <span className="ml-2">{rightIcon || (Icon && <Icon size={size === 'lg' ? 20 : 16} />)}</span>
            )}
        </button>
    );
};

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    footer?: React.ReactNode;
    noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    title,
    subtitle,
    footer,
    noPadding = false
}) => {
    return (
        <div className={`bg-white rounded-3xl shadow-sm border border-surface-200/60 overflow-hidden transition-shadow hover:shadow-md ${className}`}>
            {(title || subtitle) && (
                <div className="px-8 py-6 border-b border-surface-100">
                    {title && <h3 className="text-xl font-bold text-surface-900 tracking-tight">{title}</h3>}
                    {subtitle && <p className="mt-1 text-sm text-surface-500 font-medium">{subtitle}</p>}
                </div>
            )}
            <div className={noPadding ? '' : 'p-8'}>
                {children}
            </div>
            {footer && (
                <div className="px-8 py-6 bg-surface-50/50 border-t border-surface-100">
                    {footer}
                </div>
            )}
        </div>
    );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    className = '',
    id,
    ...props
}) => {
    const inputId = id || props.name || Math.random().toString(36).substr(2, 9);

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-bold text-surface-700 mb-2 ml-1">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                dir="auto"
                className={`
                    block w-full rounded-2xl border-surface-200 shadow-sm bg-surface-50/50
                    focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 sm:text-sm py-3 px-4
                    disabled:bg-surface-100 disabled:text-surface-500 transition-all duration-200
                    ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500/10' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && <p className="mt-2 text-sm text-red-600 font-medium ml-1">{error}</p>}
            {helperText && !error && <p className="mt-2 text-sm text-surface-500 ml-1">{helperText}</p>}
        </div>
    );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
    label,
    error,
    helperText,
    className = '',
    id,
    rows = 4,
    ...props
}) => {
    const inputId = id || props.name || Math.random().toString(36).substr(2, 9);

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-bold text-surface-700 mb-2 ml-1">
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                rows={rows}
                dir="auto"
                className={`
                    block w-full rounded-2xl border-surface-200 shadow-sm bg-surface-50/50
                    focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 sm:text-sm py-3 px-4
                    disabled:bg-surface-100 disabled:text-surface-500 transition-all duration-200
                    ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500/10' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && <p className="mt-2 text-sm text-red-600 font-medium ml-1">{error}</p>}
            {helperText && !error && <p className="mt-2 text-sm text-surface-500 ml-1">{helperText}</p>}
        </div>
    );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray' }> = ({
    children,
    color = 'gray'
}) => {
    const colors = {
        blue: "bg-blue-100 text-blue-800",
        green: "bg-green-100 text-green-800",
        red: "bg-red-100 text-red-800",
        yellow: "bg-yellow-100 text-yellow-800",
        gray: "bg-gray-100 text-gray-800"
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
            {children}
        </span>
    );
};

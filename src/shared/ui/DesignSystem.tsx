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
}

export const Button: React.FC<ButtonProps> = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    leftIcon, 
    rightIcon, 
    className = '', 
    disabled,
    ...props 
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
        secondary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 shadow-sm",
        outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
        ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
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
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
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
        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
            {(title || subtitle) && (
                <div className="px-6 py-4 border-b border-gray-100">
                    {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
                    {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
                </div>
            )}
            <div className={noPadding ? '' : 'p-6'}>
                {children}
            </div>
            {footer && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
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
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`
                    block w-full rounded-md border-gray-300 shadow-sm 
                    focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                    disabled:bg-gray-100 disabled:text-gray-500
                    ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
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
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                rows={rows}
                className={`
                    block w-full rounded-md border-gray-300 shadow-sm 
                    focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                    disabled:bg-gray-100 disabled:text-gray-500
                    ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
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

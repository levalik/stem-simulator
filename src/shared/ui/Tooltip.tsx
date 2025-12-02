import React from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
    content: string;
    children?: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
    return (
        <div className="relative group inline-flex items-center">
            {children ? (
                children
            ) : (
                <HelpCircle size={16} className="text-surface-400 hover:text-primary-600 transition-colors cursor-help" />
            )}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-surface-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg pointer-events-none">
                {content}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-surface-900"></div>
            </div>
        </div>
    );
};

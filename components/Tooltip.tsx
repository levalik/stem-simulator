import React from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
    content: string;
    children?: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
    return (
        <div className="tooltip-container">
            {children ? (
                children
            ) : (
                <HelpCircle size={16} className="tooltip-trigger" />
            )}
            <div className="tooltip-content">
                {content}
            </div>
        </div>
    );
};

import React from 'react';

export const Logo = ({ className = "w-10 h-10", classNamePath = "fill-primary-600" }: { className?: string, classNamePath?: string }) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary-500" opacity="0.2" />
        <ellipse cx="50" cy="50" rx="20" ry="38" transform="rotate(45 50 50)" fill="none" stroke="currentColor" strokeWidth="6" className="text-secondary-500" />
        <ellipse cx="50" cy="50" rx="20" ry="38" transform="rotate(-45 50 50)" fill="none" stroke="currentColor" strokeWidth="6" className="text-primary-600" />
        <circle cx="50" cy="50" r="10" className="fill-primary-700" />
    </svg>
);

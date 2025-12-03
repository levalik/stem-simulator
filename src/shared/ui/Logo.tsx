import React from 'react';

export const Logo = ({ className = "w-10 h-10", classNamePath = "fill-primary-600", spin = false }: { className?: string, classNamePath?: string, spin?: boolean }) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="1" className="text-primary-600" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" className="text-primary-500" />
            </linearGradient>
        </defs>

        {/* Book Base (Education Context) */}
        <g transform="translate(0, 10)">
            <path
                d="M15 35 C15 35 30 35 48 45 V85 C30 75 15 75 15 75 V35 Z"
                fill="currentColor"
                className="text-primary-600"
            />
            <path
                d="M85 35 C85 35 70 35 52 45 V85 C70 75 85 75 85 75 V35 Z"
                fill="currentColor"
                className="text-primary-500"
            />
            {/* Pages Detail */}
            <path d="M20 40 C20 40 32 40 45 48" stroke="white" strokeWidth="2" strokeOpacity="0.3" fill="none" />
            <path d="M80 40 C80 40 68 40 55 48" stroke="white" strokeWidth="2" strokeOpacity="0.3" fill="none" />
        </g>

        {/* Science/STEM Overlay (Orbits) */}
        <g className={`${spin ? 'animate-spin-slow' : ''}`} style={{ transformOrigin: '50% 55%' }}>
            {/* Orbit 1 */}
            <ellipse cx="50" cy="55" rx="42" ry="12" transform="rotate(45 50 55)" fill="none" stroke="currentColor" strokeWidth="3" className="text-secondary-400" opacity="0.8" />
            <circle cx="20" cy="25" r="4" className="text-secondary-500" fill="currentColor" />

            {/* Orbit 2 */}
            <ellipse cx="50" cy="55" rx="42" ry="12" transform="rotate(-45 50 55)" fill="none" stroke="currentColor" strokeWidth="3" className="text-secondary-400" opacity="0.8" />
            <circle cx="80" cy="25" r="4" className="text-secondary-500" fill="currentColor" />
        </g>

        {/* Center Nucleus */}
        <circle cx="50" cy="55" r="5" className="text-white" fill="white" />
    </svg>
);

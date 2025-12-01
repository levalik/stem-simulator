import React from 'react';

export const Logo = ({ className = "w-10 h-10", classNamePath = "fill-violet-600" }: { className?: string, classNamePath?: string }) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
        </defs>

        {/* Abstract Brain/Circuit Shape */}
        <path
            d="M50 10 C30 10 15 25 15 45 C15 60 25 75 35 85 L50 95 L65 85 C75 75 85 60 85 45 C85 25 70 10 50 10 Z M50 20 C65 20 75 30 75 45 C75 55 68 65 60 72 L50 80 L40 72 C32 65 25 55 25 45 C25 30 35 20 50 20 Z"
            fill="url(#logoGradient)"
            className={classNamePath}
        />

        {/* Circuit Nodes */}
        <circle cx="50" cy="35" r="4" fill="white" />
        <circle cx="35" cy="50" r="4" fill="white" />
        <circle cx="65" cy="50" r="4" fill="white" />
        <circle cx="50" cy="65" r="4" fill="white" />

        {/* Connections */}
        <path
            d="M50 35 L35 50 L50 65 L65 50 Z"
            stroke="white"
            strokeWidth="2"
            fill="none"
        />
    </svg>
);

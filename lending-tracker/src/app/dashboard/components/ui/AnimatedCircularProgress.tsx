

import React from 'react';

type AnimatedCircularProgressProps = {
  percentage: number; // 0–100
  label?: string;
};

export const AnimatedCircularProgress: React.FC<AnimatedCircularProgressProps> = ({
  percentage,
  label = '',
}) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className=""
      >
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 1s ease-out',
          }}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          
          className="text-sm fill-black font-semibold"
        >
          {percentage}%
        </text>
      </svg>
      {label && (
        <span className="mt-1 text-xs text-black">{label}</span>
      )}
    </div>
  );
};

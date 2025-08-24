import React from 'react';

type AnimatedCircularProgressProps = {
  percentage: number; // 0–100
  label?: string;
};

export const AnimatedCircularProgress: React.FC<AnimatedCircularProgressProps> = ({
  percentage,
  label = '',
}) => {
  const size = 80; // base size for viewBox
  const stroke = 8;
  const radius = (size - stroke) / 2; // radius inside viewBox
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        height="100%"
        className="block"
      >
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          r={radius}
          cx={size / 2}
          cy={size / 2}
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
          className="fill-white font-semibold"
          style={{ fontSize: size * 0.25 }}
        >
          {percentage}%
        </text>
      </svg>
      {label && (
        <span
          className="mt-1 text-white"
          style={{ fontSize: size * 0.15 }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

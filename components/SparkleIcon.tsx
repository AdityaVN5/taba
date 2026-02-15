import React from 'react';

interface SparkleIconProps {
  className?: string;
}

export const SparkleIcon: React.FC<SparkleIconProps> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 0L26.5 18L42 21L26.5 24L24 42L21.5 24L6 21L21.5 18L24 0Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M12 8L13.5 17L21 18.5L13.5 20L12 29L10.5 20L3 18.5L10.5 17L12 8Z"
        fill="url(#paint1_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="24"
          y1="0"
          x2="24"
          y2="42"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D8D0F5" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="12"
          y1="8"
          x2="12"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCE57E" />
          <stop offset="1" stopColor="#FACC59" />
        </linearGradient>
      </defs>
    </svg>
  );
};
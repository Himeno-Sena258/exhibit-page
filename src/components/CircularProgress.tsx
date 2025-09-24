import React from 'react';

interface CircularProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  backgroundColor?: string;
  label: string;
  className?: string;
}

/**
 * 圆形进度条组件
 * @param value 当前值
 * @param maxValue 最大值，默认为100
 * @param size 圆形大小，默认为120
 * @param strokeWidth 线条宽度，默认为8
 * @param color 进度条颜色
 * @param backgroundColor 背景色，默认为rgba(255,255,255,0.2)
 * @param label 标签文字
 * @param className 额外的CSS类名
 */
const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  color,
  backgroundColor = 'rgba(255,255,255,0.2)',
  label,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {value}
          </span>
        </div>
      </div>

      <div className="mt-2 text-white text-sm font-medium">
        {label}
      </div>
    </div>
  );
};

export default CircularProgress;
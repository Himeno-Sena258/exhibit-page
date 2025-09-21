import React, { useState, useEffect } from 'react';

interface HeaderBarProps {
  title: string;
  className?: string;
}

/**
 * 顶部标题栏组件
 * @param title 标题文字
 * @param className 额外的CSS类名
 */
const HeaderBar: React.FC<HeaderBarProps> = ({ title, className = '' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  /**
   * 更新当前时间
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /**
   * 格式化日期时间
   * @param date 日期对象
   * @returns 格式化后的日期时间字符串
   */
  const formatDateTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={`w-full bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg ${className}`}>
      {/* 标题行 - 完全居中 */}
      <div className="w-full h-16 flex items-center justify-center px-6">
        <h1 className="text-white text-3xl font-bold">
          {title}
        </h1>
      </div>
      
      {/* 时间行 - 右对齐 */}
      <div className="w-full h-12 flex items-center justify-end px-6 bg-gradient-to-r from-blue-800 to-blue-900">
        <div className="text-white text-lg font-medium">
          {formatDateTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
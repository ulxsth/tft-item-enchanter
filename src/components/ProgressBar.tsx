'use client'

import React from 'react';

interface ProgressBarProps {
  currentTime: number; // 残り時間（ミリ秒）
  totalTime: number;   // 総時間（ミリ秒）
  isCorrect: boolean;  // 正解かどうか
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  totalTime,
  isCorrect,
}) => {
  const progressPercentage = Math.max(0, (currentTime / totalTime) * 100);
  // 表示用の秒数は1秒未満でも0秒は表示せず、プログレスバーは最後まで動かす
  const remainingSeconds = currentTime <= 0 ? 0 : Math.ceil(currentTime / 1000);
  
  return (
    <div className="w-full mb-3 sm:mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-gray-700">
          {isCorrect ? '正解！' : '不正解'} 次の問題まで...
        </span>
        <span className="text-xs sm:text-sm text-gray-600">
          {remainingSeconds > 0 ? `${remainingSeconds}秒` : '準備中...'}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-100 ease-linear ${
            isCorrect 
              ? 'bg-gradient-to-r from-green-500 to-green-600' 
              : 'bg-gradient-to-r from-red-500 to-red-600'
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="text-center mt-1 sm:mt-2">
        <p className="text-xs text-gray-500">
          自動で次の問題に進みます
        </p>
      </div>
    </div>
  );
};

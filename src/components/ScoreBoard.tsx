'use client'

import React, { useState } from 'react';
import { GameStats } from '@/types/game';

interface ScoreBoardProps {
  stats: GameStats;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ stats }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">スコア</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-green-600">{stats.correct}</span>
            <span className="text-xs text-gray-600">正解</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-red-600">{stats.incorrect}</span>
            <span className="text-xs text-gray-600">不正解</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-blue-600">{stats.accuracy}%</span>
            <span className="text-xs text-gray-600">正答率</span>
          </div>
        </div>
      )}
    </div>
  );
};

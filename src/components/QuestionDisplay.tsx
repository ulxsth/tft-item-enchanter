'use client'

import React from 'react';
import Image from 'next/image';
import { CompositeItem } from '@/types/game';

interface QuestionDisplayProps {
  targetItem: CompositeItem;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  targetItem,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="text-center mb-6">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-purple-400 rounded-xl bg-gradient-to-b from-purple-100 to-purple-200 flex flex-col items-center justify-center mb-3 p-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center mb-2 relative">
            <Image
              src={targetItem.image}
              alt={targetItem.name}
              width={64}
              height={64}
              className="w-full h-full object-cover rounded-lg"
              unoptimized
            />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          {targetItem.name}
        </h3>
      </div>
    </div>
  );
};

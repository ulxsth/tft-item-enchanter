'use client'

import React from 'react';
import { BaseItem } from '@/types/game';
import { getImagePath } from '@/utils/imagePath';

interface ItemCardProps {
  item: BaseItem;
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  isCorrect,
  isWrong,
  onClick,
  disabled = false,
}) => {
  const getCardStyles = () => {
    let baseStyles = "w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 border-2 rounded-lg transition-all duration-200 cursor-pointer flex flex-col items-center justify-center p-1 bg-gradient-to-b ";
    
    if (disabled) {
      baseStyles += "cursor-not-allowed opacity-60 ";
    } else {
      baseStyles += "hover:scale-105 ";
    }

    if (isCorrect) {
      baseStyles += "border-green-500 bg-green-100 ";
    } else if (isWrong) {
      baseStyles += "border-red-500 bg-red-100 ";
    } else {
      baseStyles += "border-gray-300 from-gray-50 to-gray-100 hover:border-gray-400 ";
    }

    return baseStyles;
  };

  return (
    <div
      className={getCardStyles()}
      onClick={!disabled ? onClick : undefined}
      title={`${item.name}\n${item.description}`}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded flex items-center justify-center mb-1 relative">
        <img
          src={getImagePath(item.image)}
          alt={item.name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      {/* アイテム名をスマホでは非表示 */}
      <div className="hidden sm:block text-xs text-center font-medium text-gray-700 leading-tight">
        {item.name}
      </div>
    </div>
  );
};

'use client'

import React from 'react';
import { useGameLogic } from '@/hooks/useGame';
import { ItemCard } from './ItemCard';
import { QuestionDisplay } from './QuestionDisplay';
import { ScoreBoard } from './ScoreBoard';
import { ProgressBar } from './ProgressBar';

export const GameBoard: React.FC = () => {
  const {
    gameState,
    currentQuestion,
    stats,
    isAnswerCorrect,
    startGame,
    selectItem,
    resetSelection,
  } = useGameLogic();

  // Game not started
  if (!gameState.isGameActive && gameState.currentQuestion === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-lg shadow-lg p-6 max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            TFT Item Enchanter
          </h1>
          <p className="text-gray-600 mb-6">
            TFTアイテムレシピを覚えよう！
          </p>
          <button
            onClick={() => startGame()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            ゲーム開始
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-white text-lg">問題を準備中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-2 sm:p-4">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Header with score */}
        <div className="bg-white rounded-lg shadow-lg p-3 mb-3">
          <ScoreBoard stats={stats} />
        </div>

        {/* Question Display */}
        <div className="bg-white rounded-lg shadow-lg p-3 mb-3 flex-shrink-0">
          <QuestionDisplay
            targetItem={currentQuestion.targetItem}
            questionNumber={gameState.questionsAnswered + 1}
            totalQuestions={gameState.totalQuestions}
          />
        </div>

        {/* Item Selection */}
        <div className="bg-white rounded-lg shadow-lg p-2 sm:p-3 mb-3 flex-1 min-h-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 text-center">
            必要な素材アイテムを選択してください:
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 sm:gap-2 justify-items-center mb-3 sm:mb-4">
            {currentQuestion.options.map((item, index) => {
              const isSelected = gameState.selectedItems.includes(item.id);
              const isCorrect = gameState.showResult && gameState.correctAnswer.includes(item.id);
              const isWrong = gameState.showResult && isSelected && !gameState.correctAnswer.includes(item.id);
              
              return (
                <ItemCard
                  key={`${item.id}-${index}`}
                  item={item}
                  isSelected={isSelected}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                  onClick={() => selectItem(item.id)}
                  disabled={gameState.showResult || gameState.selectedItems.length >= 2}
                />
              );
            })}
          </div>

          {/* 選択されたアイテムの表示 */}
          <div className="text-center mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              選択されたアイテム:
            </p>
            <div className="flex justify-center gap-1 sm:gap-2 min-h-[3rem] sm:min-h-[4rem]">
              {gameState.selectedItems.length === 0 ? (
                <p className="text-xs text-gray-500 self-center">アイテムを選択してください</p>
              ) : (
                gameState.selectedItems.map((itemId, index) => {
                  const item = currentQuestion.options.find(opt => opt.id === itemId);
                  if (!item) return null;
                  
                  return (
                    <div key={`selected-${itemId}-${index}`} className="flex flex-col items-center">
                      <ItemCard
                        item={item}
                        isSelected={true}
                        onClick={() => {}}
                        disabled={true}
                      />
                    </div>
                  );
                })
              )}
            </div>
            {gameState.selectedItems.length > 0 && !gameState.showResult && (
              <button
                onClick={resetSelection}
                className="mt-2 px-2 sm:px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs sm:text-sm transition-colors"
              >
                選択をリセット
              </button>
            )}
          </div>

          {/* Result Display */}
          {gameState.showResult && (
            <div className="p-2 sm:p-3 rounded-lg text-center">
              {isAnswerCorrect ? (
                <div className="bg-green-100 text-green-800 p-2 sm:p-3 rounded-lg">
                  <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3">正解！ ✅</h4>
                </div>
              ) : (
                <div className="bg-red-100 text-red-800 p-2 sm:p-3 rounded-lg">
                  <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-3">不正解 ❌</h4>
                  <p className="text-xs sm:text-sm mb-2 sm:mb-3">正解の素材が緑色で表示されています</p>
                </div>
              )}
              
              {/* プログレスバー */}
              {gameState.isTransitioning && (
                <ProgressBar
                  currentTime={gameState.progressTimer}
                  totalTime={2500}
                  isCorrect={isAnswerCorrect}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

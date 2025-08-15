'use client'

import { useState, useMemo, useCallback, useEffect } from 'react';
import { BaseItem, CompositeItem, GameState, Question, GameStats } from '../types/game';
import itemsData from '../data/items.json';
import recipesData from '../data/recipes.json';

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    totalQuestions: 10,
    isGameActive: false,
    selectedItems: [],
    correctAnswer: [],
    showResult: false,
    questions: [],
    autoNextTimer: null,
    questionsAnswered: 0,
    progressTimer: 0,
    isTransitioning: false,
  });

  const baseItems = useMemo(() => itemsData.baseItems as BaseItem[], []);
  
  // 動的にrecipes.jsonから合成アイテムを生成
  const compositeItems = useMemo(() => {
    const recipes = recipesData as Record<string, unknown>;
    const items: CompositeItem[] = [];
    
    // recipes.jsonが空の場合は空の配列を返す
    if (!recipes || typeof recipes !== 'object') {
      return [];
    }
    
    // problemsプロパティをチェック
    if (Array.isArray(recipes.problems)) {
      recipes.problems.forEach((problem: unknown) => {
        if (typeof problem === 'object' && problem !== null) {
          const item = problem as Record<string, unknown>;
          if (typeof item.id === 'string' &&
              typeof item.name === 'string' &&
              Array.isArray(item.recipe)) {
            items.push({
              id: item.id,
              name: item.name,
              description: typeof item.description === 'string' ? item.description : '',
              image: typeof item.image === 'string' ? item.image : `/items/${item.id}.avif`,
              tier: 'combined' as const,
              recipe: item.recipe as string[]
            });
          }
        }
      });
    }
    
    return items;
  }, []);

  // Generate random questions
  const generateQuestions = useCallback((count: number): Question[] => {
    const questions: Question[] = [];
    const usedItems = new Set<string>();
    
    // 合成アイテムが無い場合は空の配列を返す
    if (compositeItems.length === 0) {
      return [];
    }

    while (questions.length < count && usedItems.size < compositeItems.length) {
      const randomCompositeItem = compositeItems[Math.floor(Math.random() * compositeItems.length)];
      
      if (usedItems.has(randomCompositeItem.id)) continue;
      usedItems.add(randomCompositeItem.id);

      // 全ての基本素材を固定順序で選択肢として提供
      const allOptions = [...baseItems];

      questions.push({
        id: `q_${questions.length}_${randomCompositeItem.id}`,
        targetItem: randomCompositeItem,
        options: allOptions,
        correctItemIds: randomCompositeItem.recipe,
      });
    }

    return questions;
  }, [baseItems, compositeItems]);

  // Start new game (infinite mode)
  const startGame = useCallback(() => {
    const questions = generateQuestions(5); // 最初に5問生成
    setGameState({
      currentQuestion: 0,
      score: 0,
      totalQuestions: Infinity, // 無限モード
      isGameActive: true,
      selectedItems: [],
      correctAnswer: [],
      showResult: false,
      questions,
      autoNextTimer: null,
      questionsAnswered: 0,
      progressTimer: 0,
      isTransitioning: false,
    });
  }, [generateQuestions]);

  // Select an item (allows duplicates, max 2 items)
  const selectItem = useCallback((itemId: string) => {
    setGameState(prev => {
      // 最大2つまでしか選択できない
      if (prev.selectedItems.length >= 2) {
        return prev;
      }

      const newSelected = [...prev.selectedItems, itemId];
      
      // 2つ選択されたら自動的に採点
      if (newSelected.length === 2) {
        const currentQuestion = prev.questions[prev.currentQuestion];
        const correctIds = currentQuestion.correctItemIds;
        
        // レシピと選択されたアイテムを比較（順序を考慮しない）
        const selectedSorted = [...newSelected].sort();
        const correctSorted = [...correctIds].sort();
        
        const isCorrect = 
          selectedSorted.length === correctSorted.length &&
          selectedSorted.every((id, index) => id === correctSorted[index]);

        // プログレスバー用のタイマーを開始（2.5秒間のカウントダウン）
        const progressInterval = window.setInterval(() => {
          setGameState(current => {
            const newTime = current.progressTimer - 50;
            return {
              ...current,
              progressTimer: Math.max(0, newTime), // 0以下にならないようにする
            };
          });
        }, 50);

        // 2.5秒後に自動で次の問題へ
        const timerId = window.setTimeout(() => {
          clearInterval(progressInterval);
          setGameState(prevState => {
            // タイマーをクリア
            if (prevState.autoNextTimer) {
              clearTimeout(prevState.autoNextTimer);
            }

            // 残り問題が2問以下なら新しい問題を生成
            const remainingQuestions = prevState.questions.length - prevState.currentQuestion - 1;
            let newQuestions = prevState.questions;
            
            if (remainingQuestions <= 2) {
              const additionalQuestions = generateQuestions(5);
              newQuestions = [...prevState.questions, ...additionalQuestions];
            }

            return {
              ...prevState,
              currentQuestion: prevState.currentQuestion + 1,
              selectedItems: [],
              correctAnswer: [],
              showResult: false,
              questions: newQuestions,
              autoNextTimer: null,
              progressTimer: 0,
              isTransitioning: false,
            };
          });
        }, 2500);

        return {
          ...prev,
          selectedItems: newSelected,
          score: isCorrect ? prev.score + 1 : prev.score,
          correctAnswer: correctIds,
          showResult: true,
          autoNextTimer: timerId,
          questionsAnswered: prev.questionsAnswered + 1,
          progressTimer: 2500, // 2.5秒 = 2500ms
          isTransitioning: true,
        };
      }

      return {
        ...prev,
        selectedItems: newSelected,
      };
    });
  }, [generateQuestions]);

  // Reset current selections
  const resetSelection = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      selectedItems: [],
    }));
  }, []);

  // Submit answer (now only used for manual submission if needed)
  const submitAnswer = useCallback(() => {
    const currentQuestion = gameState.questions[gameState.currentQuestion];
    const correctIds = currentQuestion.correctItemIds;
    
    // レシピと選択されたアイテムを比較（順序を考慮しない）
    const selectedSorted = [...gameState.selectedItems].sort();
    const correctSorted = [...correctIds].sort();
    
    const isCorrect = 
      selectedSorted.length === correctSorted.length &&
      selectedSorted.every((id, index) => id === correctSorted[index]);

    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      correctAnswer: correctIds,
      showResult: true,
    }));
  }, [gameState.selectedItems, gameState.questions, gameState.currentQuestion]);

  // Next question logic (helper function)
  const nextQuestionLogic = useCallback((state: GameState): GameState => {
    // タイマーをクリア
    if (state.autoNextTimer) {
      clearTimeout(state.autoNextTimer);
    }

    // 残り問題が2問以下なら新しい問題を生成
    const remainingQuestions = state.questions.length - state.currentQuestion - 1;
    let newQuestions = state.questions;
    
    if (remainingQuestions <= 2) {
      const additionalQuestions = generateQuestions(5);
      newQuestions = [...state.questions, ...additionalQuestions];
    }

    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
      selectedItems: [],
      correctAnswer: [],
      showResult: false,
      questions: newQuestions,
      autoNextTimer: null,
      progressTimer: 0,
      isTransitioning: false,
    };
  }, [generateQuestions]);

  // Next question
  const nextQuestion = useCallback(() => {
    setGameState(nextQuestionLogic);
  }, [nextQuestionLogic]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      totalQuestions: Infinity,
      isGameActive: false,
      selectedItems: [],
      correctAnswer: [],
      showResult: false,
      questions: [],
      autoNextTimer: null,
      questionsAnswered: 0,
      progressTimer: 0,
      isTransitioning: false,
    });
  }, []);

  // Calculate stats
  const stats: GameStats = useMemo(() => {
    const incorrect = gameState.currentQuestion - gameState.score + (gameState.showResult && gameState.currentQuestion === gameState.totalQuestions - 1 ? 1 : 0);
    return {
      correct: gameState.score,
      incorrect: Math.max(0, incorrect),
      accuracy: gameState.currentQuestion > 0 ? Math.round((gameState.score / (gameState.currentQuestion + (gameState.showResult ? 1 : 0))) * 100) : 0,
    };
  }, [gameState.score, gameState.currentQuestion, gameState.showResult, gameState.totalQuestions]);

  const currentQuestion = gameState.questions[gameState.currentQuestion];
  const isAnswerCorrect = gameState.showResult && 
    gameState.selectedItems.length === gameState.correctAnswer.length &&
    gameState.selectedItems.every(id => gameState.correctAnswer.includes(id));

  return {
    gameState,
    currentQuestion,
    baseItems,
    compositeItems,
    stats,
    isAnswerCorrect,
    startGame,
    selectItem,
    resetSelection,
    submitAnswer,
    nextQuestion,
    resetGame,
  };
};

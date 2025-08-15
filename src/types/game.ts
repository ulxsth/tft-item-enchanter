export interface BaseItem {
  id: string;
  name: string;
  description: string;
  image: string;
  tier: 'basic' | 'combined' | 'radiant';
}

export interface CompositeItem extends BaseItem {
  recipe: string[]; // Array of base item IDs
  tier: 'combined' | 'radiant';
}

export interface RecipeData {
  name: string;
  description: string;
  image: string;
  recipe: string[];
}

export interface RecipeConfig {
  [itemId: string]: RecipeData | string | object;
}

export interface GameState {
  currentQuestion: number;
  score: number;
  totalQuestions: number;
  isGameActive: boolean;
  selectedItems: string[];
  correctAnswer: string[];
  showResult: boolean;
  questions: Question[];
  autoNextTimer: number | null;
  questionsAnswered: number;
  progressTimer: number; // プログレスバー用の残り時間
  isTransitioning: boolean; // 遷移中かどうか
}

export interface Question {
  id: string;
  targetItem: CompositeItem;
  options: BaseItem[];
  correctItemIds: string[];
}

export interface GameStats {
  correct: number;
  incorrect: number;
  accuracy: number;
}

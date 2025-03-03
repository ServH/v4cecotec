import { CategoryStats } from '@/services/api/types';

export interface CategoriesState {
  stats: CategoryStats;
  loading: boolean;
  analyzing: boolean;
  currentCategory: string;
  error: string | null;
}

export interface CategoriesActions {
  fetchCategories: (slugs: string[]) => Promise<void>;
  resetStats: () => void;
  clearCache: () => void;
  analyzeIndividualCategory: (slug: string) => Promise<void>;
}

export interface CategoriesStore extends CategoriesState, CategoriesActions {}
import { CategoryStats } from '@/services/api/types';

export interface CategoriesState {
  stats: CategoryStats;
  loading: boolean;
  error: string | null;
}

export interface CategoriesActions {
  fetchCategories: (slugs: string[]) => Promise<void>;
  resetStats: () => void;
}

export interface CategoriesStore extends CategoriesState, CategoriesActions {}
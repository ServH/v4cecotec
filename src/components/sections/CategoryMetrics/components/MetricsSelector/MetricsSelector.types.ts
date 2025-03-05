import { Category } from '@/types/category.types';

export interface MetricsSelectorProps {
  categoriesTree: Category[];
  slugs: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  comparisonList: string[];
  onAddToComparison: () => void;
  loading: boolean;
  compareMode: boolean;
}
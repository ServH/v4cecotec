import { Category } from '@/types/category.types';

export interface ComparisonPanelProps {
  comparisonList: string[];
  categoriesTree: Category[];
  onRemoveFromComparison: (slug: string) => void;
  onToggleCompareMode: () => void;
  onClearComparison: () => void;
  compareMode: boolean;
}
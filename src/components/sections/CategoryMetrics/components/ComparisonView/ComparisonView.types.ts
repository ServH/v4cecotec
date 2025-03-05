import { Category } from '@/types/category.types';
import { CategoryMetrics } from '@/types/metrics.types';

export interface ComparisonViewProps {
  comparisonList: string[];
  categoriesTree: Category[];
  metrics: Record<string, CategoryMetrics>;
  onRemoveFromComparison: (slug: string) => void;
  onToggleCompareMode: () => void;
  onResetSelection: () => void;
}
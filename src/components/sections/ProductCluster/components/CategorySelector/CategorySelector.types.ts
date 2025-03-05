import { Category } from '@/types/category.types';

export interface CategorySelectorProps {
  categoriesTree: Category[];
  slugs: string[];
  selectedCategories: string[];
  onSelectCategory: (slug: string) => void;
  onDeselectCategory: (slug: string) => void;
  disabled?: boolean;
}
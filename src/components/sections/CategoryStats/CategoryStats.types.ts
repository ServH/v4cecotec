import { Category } from '@/types/category.types';

export interface CategoryStatsProps {
  slugs: string[];
  categoriesTree: Category[]; // Añadimos esta propiedad
}
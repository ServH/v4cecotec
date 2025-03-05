export type ProductStructure = 'standalone' | 'bundle' | 'variant' | 'accessory' | 'other';

export interface CategoryMetrics {
  totalProducts: number;
  pricing: {
    average: number;
    minimum: number;
    maximum: number;
  };
  stock: {
    inStock: number;
    percentage: number;
  };
  structureDistribution: Record<ProductStructure, number>;
  structurePercentage: Record<ProductStructure, number>;
}

export interface MetricsState {
  metrics: Record<string, CategoryMetrics>;
  loading: boolean;
  error: string | null;
  selectedCategories: string[];
}

export interface MetricsActions {
  fetchMetrics: (slugs: string[]) => Promise<void>;
  selectCategory: (slug: string) => void;
  deselectCategory: (slug: string) => void;
  clearSelectedCategories: () => void;
  resetMetrics: () => void;
}

export interface MetricsStore extends MetricsState, MetricsActions {}
import { CategoryMetrics, ProductStructure } from '@/types/metrics.types';
import { Category } from '@/types/category.types';
import { getCategoryPath } from '@/services/api';

export const formatStructureName = (key: string): string => {
  switch (key) {
    case 'standalone': return 'Individuales';
    case 'bundle': return 'Packs';
    case 'variant': return 'Variantes';
    case 'accessory': return 'Accesorios';
    case 'other': return 'Otros';
    default: return key;
  }
};

export const formatStructureDistribution = (metrics: CategoryMetrics) => {
  return Object.entries(metrics.structureDistribution).map(([key, value]) => ({
    name: formatStructureName(key),
    value
  }));
};

export const formatPriceData = (metrics: CategoryMetrics) => {
  return [
    { name: 'Mínimo', value: metrics.pricing.minimum },
    { name: 'Promedio', value: metrics.pricing.average },
    { name: 'Máximo', value: metrics.pricing.maximum }
  ];
};

export const formatStockData = (metrics: CategoryMetrics) => {
  return [
    { name: 'En Stock', value: metrics.stock.inStock },
    { name: 'Sin Stock', value: metrics.totalProducts - metrics.stock.inStock }
  ];
};

export const getShortCategoryName = (slug: string, categoriesTree: Category[]): string => {
  const path = getCategoryPath(categoriesTree, slug);
  return path.slice(-1)[0] || slug;
};

export const formatComparisonTotalProducts = (
  slugs: string[],
  metrics: Record<string, CategoryMetrics>,
  categoriesTree: Category[]
) => {
  return slugs.map(slug => ({
    name: getShortCategoryName(slug, categoriesTree),
    value: metrics[slug]?.totalProducts || 0
  }));
};

export const formatComparisonAvgPrice = (
    slugs: string[],
    metrics: Record<string, CategoryMetrics>,
    categoriesTree: Category[]
  ) => {
    return slugs.map(slug => ({
      name: getShortCategoryName(slug, categoriesTree),
      value: metrics[slug]?.pricing.average || 0
    }));
  };
  
  export const formatComparisonStockPercentage = (
    slugs: string[],
    metrics: Record<string, CategoryMetrics>,
    categoriesTree: Category[]
  ) => {
    return slugs.map(slug => ({
      name: getShortCategoryName(slug, categoriesTree),
      value: metrics[slug]?.stock.percentage || 0
    }));
  };
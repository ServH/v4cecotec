import { GridLayout } from '@/stores/products/products.types';

export interface ViewControlsProps {
  totalProducts: number;
  loadedProducts: number;
  layout: GridLayout;
  onChangeLayout: (layout: GridLayout) => void;
  isOrderingMode: boolean;
  onToggleOrderingMode: () => void;
  savedLayouts: string[];
  onSaveLayout: () => void;
  onLoadLayout: (name: string) => void;
  onClearCategories: () => void;
  onLoadMoreProducts: () => void;
  productLimit: number;
  onChangeProductLimit: (limit: number) => void;
  disabled?: boolean;
}
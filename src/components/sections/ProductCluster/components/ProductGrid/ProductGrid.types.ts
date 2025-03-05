import { Product, GridLayout } from '@/stores/products/products.types';

export interface ProductGridProps {
  products: Product[];
  layout: GridLayout;
  isOrderingMode: boolean;
  customOrder?: Record<string, number>;
  loading?: boolean;
}
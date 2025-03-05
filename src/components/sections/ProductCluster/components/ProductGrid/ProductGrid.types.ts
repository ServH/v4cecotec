import { Product, GridLayout } from '@/stores/products/products.types';

export interface ProductGridProps {
  products: Product[];
  layout: GridLayout;
  isOrderingMode: boolean;
  customOrder?: Record<string, number>;
  onProductDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onProductDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onProductDrop?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  loading?: boolean;
}
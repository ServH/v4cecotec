import { Product } from '@/stores/products/products.types';

export interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list' | 'compact';
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}
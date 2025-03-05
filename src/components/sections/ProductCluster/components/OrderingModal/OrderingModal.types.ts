import { Product, GridLayout } from '@/stores/products/products.types';

export interface OrderingModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  layout: GridLayout;
  onSaveOrder: (newOrder: Record<string, number>) => void;
  initialCustomOrder?: Record<string, number>;
}
import { Product } from '@/stores/products/products.types';

export interface PDFPreviewProps {
  products: Product[];
  previewUrl: string;
  onClose: () => void;
  onExport: () => void;
}
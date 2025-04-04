import { Product } from '@/stores/products/products.types';
import { ProductExcelData } from '@/components/sections/ProductCluster/components/ExcelUploader/ExcelUploader';

export interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list' | 'compact';
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}

export interface EnhancedProductCardProps {
  product: Product;
  excelData?: ProductExcelData;
  layout?: 'grid' | 'list' | 'compact';
  isDraggable?: boolean;
  showDetailedView?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}
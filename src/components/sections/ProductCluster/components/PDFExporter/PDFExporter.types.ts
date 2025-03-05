import { Product } from '@/stores/products/products.types';

export interface PDFExporterProps {
  products: Product[];
  onClose: () => void;
}

export interface PDFOptions {
  title: string;
  subtitle: string;
  filename: string;
  showPrices: boolean;
  showStock: boolean;
  showCategories: boolean;
  pageNumbers: boolean;
  dateGenerated: boolean;
  orientation: 'portrait' | 'landscape';
}

export type PDFStepType = 'options' | 'preview' | 'generating';
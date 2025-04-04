export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  originalImage?: string;
  stock: boolean;
  discount: number;
  description?: string;
  category?: string;
  position?: number;
  upc?: string;         // Código UPC para cruzar con Excel
  reference?: string;   // Referencia del producto
  model?: string;       // Modelo del producto
}

export interface ProductExcelData {
  [productId: string]: {
    [columnName: string]: any;
  };
}

export interface ProductsState {
  products: Record<string, Product[]>;
  selectedCategories: string[];
  loading: boolean;
  error: string | null;
  gridLayout: GridLayout;
  orderingMode: boolean;
  customOrder: Record<string, number>;
  excelData: ProductExcelData | null;
  isExcelLoaded: boolean;
}

export interface ProductsActions {
  fetchProducts: (slug: string, limit?: number) => Promise<void>;
  selectCategory: (slug: string) => void;
  deselectCategory: (slug: string) => void;
  clearSelectedCategories: () => void;
  setGridLayout: (layout: GridLayout) => void;
  toggleOrderingMode: () => void;
  updateProductOrder: (productId: string, newPosition: number) => void;
  saveCustomOrder: () => void;
  loadSavedLayout: (layoutName: string) => void;
  saveCurrentLayout: (layoutName: string) => void;
  clearProductsCache: () => void;
  setExcelData: (data: ProductExcelData) => void;
  clearExcelData: () => void;
}

export interface ProductsStore extends ProductsState, ProductsActions {}

export type GridLayout = 'grid' | 'list' | 'compact';

export interface SavedLayout {
  name: string;
  timestamp: number;
  order: Record<string, number>;
  selectedCategories: string[];
}
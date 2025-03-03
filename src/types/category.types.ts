export interface Category {
    icon: string;
    name: string;
    slug: string;
    children: Category[];
    id?: string;
    url?: string;
  }
  
  export interface CategoriesResponse {
    pageProps: {
      categories: Category[];
    };
  }
  
  export interface CategoryProduct {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    stock: boolean;
    discount?: number;
    // Add more fields as needed
  }
  
  export interface CategoryProductsResponse {
    products: CategoryProduct[];
    pagination?: {
      total: number;
      currentPage: number;
      perPage: number;
      lastPage: number;
    };
  }
  
  // src/services/api/types.ts
  export interface CategoryResponse {
    status: 'OK' | 'KO';
    data?: CategoryProductsResponse;
    error?: string;
  }
  
  export interface CategoryStats {
    total: number;
    valid: number;
    invalid: number;
    processed: number;
    categories: {
      [slug: string]: {
        status: 'OK' | 'KO';
        error?: string;
      };
    };
  }
  
  // src/stores/categories/categories.types.ts
  export interface CategoriesState {
    stats: CategoryStats;
    loading: boolean;
    analyzing: boolean;
    currentCategory: string;
    error: string | null;
  }
  
  export interface CategoriesActions {
    fetchCategories: (slugs: string[]) => Promise<void>;
    resetStats: () => void;
    clearCache: () => void;
    analyzeIndividualCategory: (slug: string) => Promise<void>;
  }
  
  export interface CategoriesStore extends CategoriesState, CategoriesActions {}
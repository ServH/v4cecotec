export interface CategoryResponse {
    status: 'OK' | 'KO';
    data?: any;
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
export interface Category {
    icon: string;
    name: string;
    slug: string;
    children: Category[];
  }
  
  export interface CategoriesResponse {
    pageProps: {
      categories: Category[];
    };
    // Otros campos que pueda tener la respuesta
  }
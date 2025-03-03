import axios from 'axios';
import { CategoryResponse } from './types';

const BASE_URL = '/api/proxy';

// Helper function to check if the response contains products
const hasProducts = (data: any): boolean => {
  if (!data) return false;
  
  return (
    (Array.isArray(data.products) && data.products.length > 0) ||
    (data.products && typeof data.products === 'object' && Object.keys(data.products).length > 0) ||
    (Object.keys(data).length > 0 && JSON.stringify(data) !== '{}')
  );
};

export const fetchCategoryData = async (slug: string): Promise<CategoryResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}?category=${slug}`);
    
    if (hasProducts(response.data)) {
      return {
        status: 'OK',
        data: response.data
      };
    }
    
    return {
      status: 'KO',
      error: 'La categoría no contiene productos'
    };
  } catch (error) {
    // If there's an error in the request
    return {
      status: 'KO',
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};

export const analyzeCategory = async (slug: string): Promise<CategoryResponse> => {
  // Force bypass of any existing cache
  const timestamp = new Date().getTime();
  
  try {
    const response = await axios.get(`${BASE_URL}?category=${slug}&_=${timestamp}`);
    console.log(`Análisis individual de ${slug}:`, response.data);
    
    if (hasProducts(response.data)) {
      return {
        status: 'OK',
        data: response.data
      };
    }
    
    return {
      status: 'KO',
      error: 'La categoría no contiene productos (análisis individual)'
    };
  } catch (error) {
    return {
      status: 'KO',
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};
import axios from 'axios';
import { CategoryResponse } from './types';

const BASE_URL = '/api/proxy';

export const fetchCategoryData = async (slug: string): Promise<CategoryResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}?category=${slug}`);
    
    // Mejoramos la verificación para determinar si hay productos
    // Si la respuesta contiene un array 'products' con al menos un elemento
    if (
      response.data && 
      (
        (Array.isArray(response.data.products) && response.data.products.length > 0) ||
        (response.data.products && typeof response.data.products === 'object' && Object.keys(response.data.products).length > 0) ||
        // Verificamos si hay cualquier dato en la respuesta que indique que hay productos
        (Object.keys(response.data).length > 0 && JSON.stringify(response.data) !== '{}')
      )
    ) {
      return {
        status: 'OK',
        data: response.data
      };
    }
    
    // Si la respuesta está vacía o no tiene productos
    return {
      status: 'KO',
      error: 'La categoría no contiene productos'
    };
  } catch (error) {
    // Si hay un error en la petición
    return {
      status: 'KO',
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};


export const analyzeCategory = async (slug: string): Promise<CategoryResponse> => {
  // Forzamos que se omita cualquier caché existente
  const timestamp = new Date().getTime();
  try {
    const response = await axios.get(`${BASE_URL}?category=${slug}&_=${timestamp}`);
    console.log(`Análisis individual de ${slug}:`, response.data);
    
    
    if (
      response.data && 
      (
        (Array.isArray(response.data.products) && response.data.products.length > 0) ||
        (response.data.products && typeof response.data.products === 'object' && Object.keys(response.data.products).length > 0) ||
        (Object.keys(response.data).length > 0 && JSON.stringify(response.data) !== '{}')
      )
    ) {
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
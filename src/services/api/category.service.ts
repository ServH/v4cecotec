import axios from 'axios';
import { CategoryResponse } from './types';

// Cambiamos la URL base para usar nuestro proxy
const BASE_URL = '/api/proxy';

export const fetchCategoryData = async (slug: string): Promise<CategoryResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}?category=${slug}`);
    
    // Si hay datos en la respuesta, consideramos que la categoría es válida
    if (response.data && Object.keys(response.data).length > 0) {
      return {
        status: 'OK',
        data: response.data
      };
    }
    
    // Si la respuesta está vacía, consideramos que la categoría no es válida
    return {
      status: 'KO',
      error: 'La categoría no contiene productos'
    };
  } catch (error) {
    // Si hay un error en la petición, consideramos que la categoría no es válida
    return {
      status: 'KO',
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};
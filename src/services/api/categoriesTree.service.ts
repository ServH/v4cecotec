import axios from 'axios';
import { CategoriesResponse, Category } from '@/types/category.types';

// Usamos nuestro proxy en lugar del endpoint directo
const CATEGORIES_URL = '/api/categories';

export const fetchCategoriesTree = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<CategoriesResponse>(CATEGORIES_URL);
    return response.data.pageProps.categories || [];
  } catch (error) {
    console.error('Error al obtener el árbol de categorías:', error);
    return [];
  }
};

// Función recursiva para extraer todos los slugs de las categorías hijas
export const extractChildrenSlugs = (categories: Category[]): string[] => {
  const slugs: string[] = [];
  
  const extractSlugs = (category: Category) => {
    // No añadimos el slug de la categoría padre (la que recibimos)
    
    // Procesamos los hijos directos
    if (category.children && category.children.length > 0) {
      category.children.forEach(child => {
        // Añadimos el slug del hijo
        slugs.push(child.slug);
        // Procesamos recursivamente los hijos de este hijo
        extractSlugs(child);
      });
    }
  };
  
  // Aplicamos la función a cada categoría del array inicial
  categories.forEach(extractSlugs);
  
  // Eliminamos duplicados (por si acaso)
  return [...new Set(slugs)];
};
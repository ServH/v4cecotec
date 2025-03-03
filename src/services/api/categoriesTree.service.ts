import axios from 'axios';
import { CategoriesResponse, Category } from '@/types/category.types';

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

// Función para extraer solo los slugs de las categorías "hoja" (sin hijos)
export const extractChildrenSlugs = (categories: Category[]): string[] => {
  const slugs: string[] = [];
  
  const findLeafCategories = (category: Category) => {
    // Si la categoría no tiene hijos, es una categoría "hoja"
    if (!category.children || category.children.length === 0) {
      slugs.push(category.slug);
      return;
    }
    
    // Si tiene hijos, recorremos recursivamente cada uno
    category.children.forEach(child => {
      findLeafCategories(child);
    });
  };
  
  // Aplicamos la función a cada categoría del array inicial
  categories.forEach(findLeafCategories);
  
  // Eliminamos duplicados
  return [...new Set(slugs)];
};

// Función auxiliar para obtener la ruta completa de una categoría
export const getCategoryPath = (categories: Category[], slug: string): string[] => {
  const path: string[] = [];
  
  const findPath = (category: Category, currentPath: string[] = []): boolean => {
    const newPath = [...currentPath, category.name];
    
    if (category.slug === slug) {
      path.push(...newPath);
      return true;
    }
    
    if (category.children && category.children.length > 0) {
      for (const child of category.children) {
        if (findPath(child, newPath)) {
          return true;
        }
      }
    }
    
    return false;
  };
  
  categories.forEach(category => findPath(category));
  
  return path;
};
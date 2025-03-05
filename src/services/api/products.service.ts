import axios from 'axios';
import { Product } from '@/stores/products/products.types';

const BASE_URL = '/api/proxy';
const CONTENT_API_URL = 'https://content.cecotec.es/api/v4/products/';

// Fallback para productos cuando no podemos obtener sus detalles
const createFallbackProduct = (slug: string, categorySlug: string, index: number): Product => {
  return {
    id: slug,
    name: `Producto ${slug.split('-').pop()}`,  // Extraer último segmento como nombre
    slug: slug,
    price: 0,
    image: '',
    stock: false,
    discount: 0,
    description: '',
    category: categorySlug,
    position: index
  };
};

// Función para obtener el detalle de un producto específico
const getProductDetail = async (slug: string): Promise<Product | null> => {
  try {
    const response = await axios.get(`${CONTENT_API_URL}${slug}/`, {
      timeout: 5000  // Timeout más corto para fallar rápido
    });
    
    const data = response.data;
    
    // Obtener imagen - usar siempre la primera imagen disponible
    let imageUrl = '';
    
    if (data.media && data.media.mainImages && data.media.mainImages.length > 0) {
      // Usar directamente la primera imagen de mainImages
      imageUrl = data.media.mainImages[0];
    }
    
    // Obtener precio - usar directamente originalPrice
    let price = 0;
    if (data.pricing && data.pricing.originalPrice) {
      price = parseFloat(data.pricing.originalPrice);
    }
    
    // Obtener stock - usar directamente isInStock
    let inStock = false;
    
    if (data.pricing && data.pricing.isInStock !== undefined) {
      // Si es un número mayor que 0, está en stock
      if (typeof data.pricing.isInStock === 'number') {
        inStock = data.pricing.isInStock > 0;
      } 
      // Si es una cadena numérica, convertir y comprobar
      else if (typeof data.pricing.isInStock === 'string' && !isNaN(parseInt(data.pricing.isInStock))) {
        inStock = parseInt(data.pricing.isInStock) > 0;
      }
      // Si es un booleano, usar directamente
      else if (typeof data.pricing.isInStock === 'boolean') {
        inStock = data.pricing.isInStock;
      }
    }
    
    // Preparar descripción corta
    let description = '';
    if (data.shortDescription) {
      // Eliminar etiquetas HTML si hay descripción corta
      description = data.shortDescription.replace(/<[^>]*>?/gm, '');
    }
    
    // Construir el producto con los datos obtenidos
    return {
      id: data.id || slug,
      name: data.name || `Producto ${slug}`,
      slug: slug,
      price: price,
      image: imageUrl,
      originalImage: imageUrl,
      stock: inStock,
      discount: 0,
      description: description,
      category: data.categoryTree && data.categoryTree.length > 0 
        ? data.categoryTree[data.categoryTree.length - 1].name 
        : ''
    };
  } catch (error) {
    // Simplemente registrar el error pero no devolver null, ya que manejaremos esto en el nivel superior
    console.error(`Error obteniendo detalle del producto ${slug}:`, error);
    return null;
  }
};

// Función principal para obtener productos por categoría
export const fetchProductsByCategory = async (categorySlug: string, limit = 10): Promise<Product[]> => {
  try {
    // Obtener lista de productos en la categoría
    const timestamp = Date.now();
    const response = await axios.get(`${BASE_URL}?category=${categorySlug}&_=${timestamp}`);
    
    let productSlugs: string[] = [];
    const data = response.data;
    
    // Extraer slugs de los productos en función de la estructura de respuesta
    if (data.products) {
      // Si es un array, extraer los slugs directamente
      if (Array.isArray(data.products)) {
        productSlugs = data.products.map((p: any) => p.slug).filter(Boolean);
      } 
      // Si es un objeto, puede ser un único producto
      else if (data.products.slug) {
        productSlugs = [data.products.slug];
      }
    } 
    // Si la respuesta es un array directamente
    else if (Array.isArray(data)) {
      productSlugs = data.map((p: any) => p.slug).filter(Boolean);
    }
    // Si tiene una propiedad results que es un array
    else if (data.results && Array.isArray(data.results)) {
      productSlugs = data.results.map((p: any) => p.slug).filter(Boolean);
    }
    
    // Si no hay slugs, devolvemos array vacío
    if (productSlugs.length === 0) {
      return [];
    }
    
    // Límite 0 significa "todos los productos"
    const finalLimit = limit === 0 ? productSlugs.length : limit;
    
    // Limitar la cantidad de productos según el parámetro limit
    const limitedSlugs = productSlugs.slice(0, finalLimit);
    
    // Obtener detalles de cada producto
    const productsPromises = limitedSlugs.map(async (slug: string, index: number) => {
      try {
        const detail = await getProductDetail(slug);
        
        // Si se obtuvieron detalles correctamente, devolver producto completo
        if (detail) {
          return {
            ...detail,
            category: categorySlug,
            position: index
          };
        }
        
        // Si no se obtuvo detalle, crear un producto de respaldo
        return createFallbackProduct(slug, categorySlug, index);
      } catch (error) {
        // Si hay cualquier error durante el proceso, usar un producto de respaldo
        return createFallbackProduct(slug, categorySlug, index);
      }
    });
    
    // Esperar a que se resuelvan todas las promesas y filtrar los productos nulos
    const productsWithDetails = (await Promise.all(productsPromises)).filter(Boolean);
    
    return productsWithDetails;
  } catch (error) {
    console.error(`Error al obtener productos para categoría ${categorySlug}:`, error);
    return [];
  }
};

// Exportamos también la función de detalle para uso directo
export const fetchProductDetail = getProductDetail;
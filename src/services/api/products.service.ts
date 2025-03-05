import axios from 'axios';
import { Product } from '@/stores/products/products.types';

const BASE_URL = '/api/proxy';
const CONTENT_API_URL = 'https://content.cecotec.es/api/v4/products/';

// Función para obtener el detalle de un producto específico
const getProductDetail = async (slug: string): Promise<Product | null> => {
  try {
    console.log(`Obteniendo detalles para producto: ${slug}`);
    const response = await axios.get(`${CONTENT_API_URL}${slug}/`);
    const data = response.data;
    
    // Registro para depuración
    console.log(`Datos recibidos para ${slug}:`, {
      nombre: data.name ? 'OK' : 'Falta',
      pricing: data.pricing ? 'OK' : 'Falta',
      media: data.media ? 'OK' : 'Falta'
    });
    
    // Verificar datos importantes
    if (!data.name) {
      console.warn(`Producto ${slug} no tiene nombre`);
    }
    if (!data.pricing) {
      console.warn(`Producto ${slug} no tiene información de precio`);
    }
    if (!data.media || !data.media.mainImages || data.media.mainImages.length === 0) {
      console.warn(`Producto ${slug} no tiene imágenes`);
    }
    
    // Obtener imagen - usar siempre la primera imagen disponible
    let imageUrl = '';
    
    if (data.media && data.media.mainImages && data.media.mainImages.length > 0) {
      // Usar directamente la primera imagen de mainImages
      imageUrl = data.media.mainImages[0];
      console.log(`Imagen encontrada para ${slug}: ${imageUrl}`);
    } else {
      console.log(`No se encontró imagen para ${slug}`);
    }
    
    // Obtener precio - usar directamente originalPrice
    let price = 0;
    if (data.pricing && data.pricing.originalPrice) {
      price = parseFloat(data.pricing.originalPrice);
      console.log(`Precio para ${slug}: ${price}`);
    } else {
      console.log(`No se encontró precio para ${slug}`);
    }
    
    // Obtener stock - usar directamente isInStock
    let inStock = false;
    
    // isInStock puede ser un número (cantidad disponible) o un booleano
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
      console.log(`Stock para ${slug}: ${inStock ? 'En stock' : 'Sin stock'} (valor: ${data.pricing.isInStock})`);
    } else {
      console.log(`No hay información de stock para ${slug}`);
    }
    
    // Preparar descripción corta
    let description = '';
    if (data.shortDescription) {
      // Eliminar etiquetas HTML si hay descripción corta
      description = data.shortDescription.replace(/<[^>]*>?/gm, '');
    }
    
    // Construir el producto con los datos obtenidos
    const product = {
      id: data.id || slug,
      name: data.name || 'Producto sin nombre',
      slug: slug,
      price: price,
      image: imageUrl,
      originalImage: imageUrl,
      stock: inStock,
      discount: 0,  // No utilizamos descuentos por ahora
      description: description,
      category: data.categoryTree && data.categoryTree.length > 0 
        ? data.categoryTree[data.categoryTree.length - 1].name 
        : ''
    };
    
    console.log(`Producto procesado ${slug}:`, {
      nombre: product.name,
      precio: product.price,
      imagen: product.image ? 'OK' : 'No disponible',
      stock: product.stock
    });
    
    return product;
  } catch (error) {
    console.error(`Error obteniendo detalle del producto ${slug}:`, error);
    return null;
  }
};

// Función principal para obtener productos por categoría
export const fetchProductsByCategory = async (categorySlug: string, limit = 10): Promise<Product[]> => {
  try {
    console.log(`Obteniendo productos para categoría: ${categorySlug} (límite: ${limit})`);
    // Obtener lista de productos en la categoría
    const timestamp = Date.now();
    const response = await axios.get(`${BASE_URL}?category=${categorySlug}&_=${timestamp}`);
    
    let productSlugs: string[] = [];
    const data = response.data;
    
    // Registro de la estructura de datos para depuración
    console.log(`Estructura de datos para ${categorySlug}:`, {
      keys: Object.keys(data),
      hasProducts: data.products ? 'Sí' : 'No',
      productsType: data.products ? typeof data.products : 'N/A',
      isArray: data.products ? Array.isArray(data.products) : false
    });
    
    // Extraer slugs de los productos en función de la estructura de respuesta
    if (data.products) {
      // Si es un array, extraer los slugs directamente
      if (Array.isArray(data.products)) {
        productSlugs = data.products.map((p: any) => p.slug).filter(Boolean);
        console.log(`Extraídos ${productSlugs.length} slugs de un array de productos`);
      } 
      // Si es un objeto, puede ser un único producto
      else if (data.products.slug) {
        productSlugs = [data.products.slug];
        console.log(`Extraído 1 slug de un objeto producto único`);
      }
    } 
    // Si la respuesta es un array directamente
    else if (Array.isArray(data)) {
      productSlugs = data.map((p: any) => p.slug).filter(Boolean);
      console.log(`Extraídos ${productSlugs.length} slugs de datos como array`);
    }
    // Si tiene una propiedad results que es un array
    else if (data.results && Array.isArray(data.results)) {
      productSlugs = data.results.map((p: any) => p.slug).filter(Boolean);
      console.log(`Extraídos ${productSlugs.length} slugs de results`);
    }
    
    console.log(`Total: Encontrados ${productSlugs.length} productos para la categoría ${categorySlug}`);
    
    // Si no hay slugs, intentar extraer más información para debug
    if (productSlugs.length === 0) {
      console.warn(`No se encontraron slugs para ${categorySlug}. Datos:`, JSON.stringify(data).substring(0, 500));
      return [];
    }
    
    // Probar los primeros slugs para verificar que son válidos
    console.log(`Ejemplos de slugs: ${productSlugs.slice(0, 3).join(', ')}`);
    
    // Límite 0 significa "todos los productos"
    const finalLimit = limit === 0 ? productSlugs.length : limit;
    
    // Limitar la cantidad de productos según el parámetro limit
    const limitedSlugs = productSlugs.slice(0, finalLimit);
    
    console.log(`Procesando ${limitedSlugs.length} de ${productSlugs.length} productos`);
    
    // Obtener detalles de cada producto con reintentos
    const productsWithDetails = await Promise.all(
      limitedSlugs.map(async (slug: string, index: number) => {
        try {
          // Intento inicial
          let detail = await getProductDetail(slug);
          
          // Si falla, reintentar una vez más
          if (!detail || !detail.name || !detail.image) {
            console.log(`Reintentando ${slug}...`);
            detail = await getProductDetail(slug);
          }
          
          if (detail) {
            // Asegurar que tiene la categoría asignada
            return {
              ...detail,
              category: categorySlug,
              position: index
            };
          }
          
          // Si sigue fallando, usar un objeto mínimo
          console.warn(`No se pudo obtener detalles para ${slug}`);
          return {
            id: slug,
            name: slug,
            slug: slug,
            price: 0,
            image: '',
            stock: false,
            discount: 0,
            description: '',
            category: categorySlug,
            position: index
          };
        } catch (error) {
          console.error(`Error procesando ${slug}:`, error);
          return {
            id: slug,
            name: slug,
            slug: slug,
            price: 0,
            image: '',
            stock: false,
            discount: 0,
            description: '',
            category: categorySlug,
            position: index
          };
        }
      })
    );
    
    return productsWithDetails;
  } catch (error) {
    console.error(`Error al obtener productos para categoría ${categorySlug}:`, error);
    return [];
  }
};

// Exportamos también la función de detalle para uso directo
export const fetchProductDetail = getProductDetail;
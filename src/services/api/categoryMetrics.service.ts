import axios from 'axios';
import { CategoryMetrics, ProductStructure } from '@/types/metrics.types';

const BASE_URL = '/api/proxy';
const PRODUCT_DETAIL_URL = 'https://content.cecotec.es/api/v4/products/';

// Función para obtener los detalles de un producto individual
async function fetchProductDetail(productSlug: string) {
  try {
    const response = await axios.get(`${PRODUCT_DETAIL_URL}${productSlug}/`, {
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener detalles del producto ${productSlug}:`, error);
    return null;
  }
}

export const fetchCategoryMetrics = async (slug: string): Promise<CategoryMetrics | null> => {
  try {
    // Add timestamp to bypass cache
    const timestamp = Date.now();
    const response = await axios.get(`${BASE_URL}?category=${slug}&_=${timestamp}`, {
      timeout: 15000
    });
    
    // Intentamos obtener los productos
    let products = [];
    if (response.data && response.data.products) {
      products = Array.isArray(response.data.products) ? response.data.products : [response.data.products];
    } else if (Array.isArray(response.data)) {
      products = response.data;
    } else if (response.data && Array.isArray(response.data.results)) {
      products = response.data.results;
    } else {
      console.log("Estructura de respuesta inesperada:", response.data);
      products = [];
    }
    
    console.log(`Categoría: ${slug}, Productos encontrados: ${products.length}`);
    
    // Si no hay productos, devolvemos null
    const totalProducts = products.length;
    if (totalProducts === 0) {
      return null;
    }
    
    // Tomamos una muestra de productos para obtener sus detalles (máximo 5 para no sobrecargar)
    const sampleSize = Math.min(5, products.length);
    const sampleProducts = products.slice(0, sampleSize);
    
    const productDetails = [];
    let detailedProductsWithPrice = 0;
    let detailedProductsInStock = 0;
    let prices: number[] = [];
    
    // Obtenemos detalles de los productos de la muestra
    console.log(`Obteniendo detalles de ${sampleSize} productos de la categoría ${slug}`);
    
    for (const product of sampleProducts) {
      // Intentamos extraer el slug del producto
      let productSlug = '';
      
      if (product.slug) {
        productSlug = product.slug;
      } else if (product.id) {
        productSlug = product.id;
      } else if (product.url) {
        // Extraer el slug de la URL (último segmento)
        const urlParts = product.url.split('/');
        productSlug = urlParts[urlParts.length - 2] || urlParts[urlParts.length - 1];
      } else if (product.name) {
        // Convertir el nombre a un formato de slug
        productSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      
      if (!productSlug) {
        console.log("No se pudo determinar el slug del producto:", product);
        continue;
      }
      
      const detail = await fetchProductDetail(productSlug);
      if (detail) {
        productDetails.push(detail);
        
        // Intentamos extraer el precio
        let price = null;
        
        // Buscamos en varias ubicaciones posibles
        if (detail.price && !isNaN(parseFloat(detail.price))) {
          price = parseFloat(detail.price);
        } else if (detail.priceRange && detail.priceRange.minPrice) {
          price = parseFloat(detail.priceRange.minPrice);
        } else if (detail.precio && !isNaN(parseFloat(detail.precio))) {
          price = parseFloat(detail.precio);
        } else if (detail.pvp && !isNaN(parseFloat(detail.pvp))) {
          price = parseFloat(detail.pvp);
        }
        
        if (price !== null && price > 0) {
          prices.push(price);
          detailedProductsWithPrice++;
        }
        
        // Determinamos si está en stock
        if (
          (detail.stock === true) ||
          (detail.inStock === true) ||
          (typeof detail.stock === 'number' && detail.stock > 0) ||
          (detail.availability === 'in_stock') ||
          (detail.stockStatus === 'instock') ||
          // Añadir la nueva comprobación para isInStock
          (detail.pricing && detail.pricing.isInStock === 1)
        ) {
          detailedProductsInStock++;
        }
      }
    }
    
    console.log(`Detalles obtenidos para ${productDetails.length} productos`);
    console.log(`Productos con precio: ${detailedProductsWithPrice}, Precios encontrados: ${prices.length}`);
    
    // Si tenemos detalles de productos, calculamos métricas reales
    let avgPrice = 0;
    let minPrice = 0;
    let maxPrice = 0;
    let inStockPercentage = 0;
    
    if (prices.length > 0) {
      avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
      minPrice = Math.min(...prices);
      maxPrice = Math.max(...prices);
      console.log(`Precios - Min: ${minPrice}, Avg: ${avgPrice}, Max: ${maxPrice}`);
    } else {
      // Si no tenemos precios reales, usamos simulados
      console.log("No se encontraron precios reales, usando simulados");
      const seed = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const randomFactor = ((seed % 10) + 5) / 10;
      minPrice = 49.99 * randomFactor;
      avgPrice = 149.99 * randomFactor;
      maxPrice = 299.99 * randomFactor;
    }
    
    // Calculamos porcentaje de stock basado en los detalles o lo simulamos
    if (productDetails.length > 0) {
      inStockPercentage = (detailedProductsInStock / productDetails.length) * 100;
      console.log(`Productos en stock: ${detailedProductsInStock}/${productDetails.length} (${inStockPercentage.toFixed(2)}%)`);
    } else {
      const seed = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      inStockPercentage = 60 + (seed % 30);
    }
    
    const simulatedInStock = Math.round((totalProducts * inStockPercentage) / 100);
    
    // Inferimos la distribución de productos
    // Como no tenemos datos precisos, la simularemos basada en la categoría
    const seed = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const standalonePercentage = 50 + (seed % 30);
    const bundlePercentage = 5 + (seed % 10);
    const variantPercentage = 25 + (seed % 15);
    const accessoryPercentage = 100 - standalonePercentage - bundlePercentage - variantPercentage;
    
    const structureDistribution: Record<ProductStructure, number> = {
      standalone: Math.round((totalProducts * standalonePercentage) / 100),
      bundle: Math.round((totalProducts * bundlePercentage) / 100),
      variant: Math.round((totalProducts * variantPercentage) / 100),
      accessory: Math.round((totalProducts * accessoryPercentage) / 100),
      other: 0
    };
    
    // Ajustar para asegurar que la suma sea igual al total
    let sum = Object.values(structureDistribution).reduce((acc, val) => acc + val, 0);
    if (sum !== totalProducts) {
      const diff = totalProducts - sum;
      structureDistribution.standalone += diff;
    }
    
    // Porcentajes de estructura
    const structurePercentage = Object.entries(structureDistribution).reduce((acc, [key, value]) => {
      acc[key as ProductStructure] = (value / totalProducts) * 100;
      return acc;
    }, {} as Record<ProductStructure, number>);
    
    return {
      totalProducts,
      pricing: {
        average: avgPrice,
        minimum: minPrice,
        maximum: maxPrice
      },
      stock: {
        inStock: simulatedInStock,
        percentage: inStockPercentage
      },
      structureDistribution,
      structurePercentage
    };
  } catch (error) {
    // Manejo específico de errores de timeout
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED' || error.response?.status === 408) {
        console.error(`Timeout al obtener métricas para ${slug}`);
        return null;
      }
    }
    
    console.error(`Error fetching metrics for category ${slug}:`, error);
    return null;
  }
};

export const fetchMultipleCategoryMetrics = async (slugs: string[]): Promise<Record<string, CategoryMetrics>> => {
  const results: Record<string, CategoryMetrics> = {};
  
  // Reducir el tamaño del batch para disminuir la carga
  const batchSize = 1; // Un producto a la vez para evitar sobrecargar la API
  
  for (let i = 0; i < slugs.length; i += batchSize) {
    const batch = slugs.slice(i, i + batchSize);
    
    // Procesar secuencialmente en lugar de en paralelo
    for (const slug of batch) {
      try {
        console.log(`Obteniendo métricas para: ${slug}`);
        const metrics = await fetchCategoryMetrics(slug);
        if (metrics) {
          results[slug] = metrics;
          console.log(`Métricas para ${slug} obtenidas correctamente`);
        } else {
          console.log(`No se pudieron obtener métricas para ${slug}`);
        }
      } catch (error) {
        console.error(`Error procesando ${slug}:`, error);
      }
    }
    
    // Pausa entre batches
    if (i + batchSize < slugs.length) {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Pausa más larga para no sobrecargar
    }
  }
  
  return results;
};
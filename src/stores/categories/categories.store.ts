import { create } from 'zustand';
import { fetchCategoryData, analyzeCategory } from '@/services/api';
import { CategoriesStore } from './categories.types';

// Caché en memoria temporal
let cache: Record<string, any> = {};

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  stats: {
    total: 0,
    valid: 0,
    invalid: 0,
    processed: 0,
    categories: {}
  },
  loading: false,
  analyzing: false,
  currentCategory: '',
  error: null,

  fetchCategories: async (slugs: string[]) => {
    set({ loading: true, error: null });
    
    try {
      const total = slugs.length;
      let valid = 0;
      let invalid = 0;
      let processed = 0;
      const categories: Record<string, { status: 'OK' | 'KO', error?: string }> = {};
      
      for (const slug of slugs) {
        try {
          // Verificar si ya tenemos la respuesta en caché
          let response;
          if (cache[slug]) {
            response = cache[slug];
            console.log(`Usando caché para ${slug}`);
          } else {
            response = await fetchCategoryData(slug);
            // Guardar en caché
            cache[slug] = response;
            console.log(`Nueva solicitud para ${slug}: ${response.status}`);
          }
          
          // Actualizar estadísticas
          if (response.status === 'OK') {
            valid++;
          } else {
            invalid++;
          }
          
          categories[slug] = {
            status: response.status,
            ...(response.error ? { error: response.error } : {})
          };
          
          processed++;
          
          // Actualizar el estado después de cada consulta para mostrar progreso
          set({
            stats: {
              total,
              valid,
              invalid,
              processed,
              categories
            }
          });
        } catch (error) {
          invalid++;
          categories[slug] = {
            status: 'KO',
            error: error instanceof Error ? error.message : 'Error desconocido'
          };
        }
      }
      
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error desconocido' });
    } finally {
      set({ loading: false });
    }
  },

  clearCache: () => {
    console.log('Limpiando caché');
    cache = {};
    set({
      stats: {
        total: 0,
        valid: 0,
        invalid: 0,
        processed: 0,
        categories: {}
      },
      error: null
    });
  },

  resetStats: () => {
    set({
      stats: {
        total: 0,
        valid: 0,
        invalid: 0,
        processed: 0,
        categories: {}
      }
    });
  },

  analyzeIndividualCategory: async (slug: string) => {
    set({ analyzing: true, currentCategory: slug });
    
    try {
      const response = await analyzeCategory(slug);
      console.log(`Análisis individual de ${slug} completado:`, response);
      
      // Actualizar el estado con el resultado
      set(state => {
        const newCategories = {
          ...state.stats.categories,
          [slug]: {
            status: response.status,
            ...(response.error ? { error: response.error } : {})
          }
        };
        
        // Recalcular contadores
        const validCount = Object.values(newCategories).filter(c => c.status === 'OK').length;
        const invalidCount = Object.values(newCategories).filter(c => c.status === 'KO').length;
        
        // Actualizar caché
        cache[slug] = response;
        
        return {
          stats: {
            ...state.stats,
            valid: validCount,
            invalid: invalidCount,
            categories: newCategories
          }
        };
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error en análisis individual' });
    } finally {
      set({ analyzing: false, currentCategory: '' });
    }
  }
}));
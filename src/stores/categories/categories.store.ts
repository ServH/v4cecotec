import { create } from 'zustand';
import { fetchCategoryData } from '@/services/api';
import { CategoriesStore } from './categories.types';

// Caché en memoria temporal (después implementaremos Redis)
const cache: Record<string, any> = {};

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  stats: {
    total: 0,
    valid: 0,
    invalid: 0,
    processed: 0,
    categories: {}
  },
  loading: false,
  error: null,

  fetchCategories: async (slugs: string[]) => {
    set({ loading: true, error: null });
    
    try {
      const total = slugs.length;
      let valid = 0;
      let invalid = 0;
      let processed = 0;
      const categories: Record<string, { status: 'OK' | 'KO', error?: string }> = {};
      
      // Procesar cada categoría de forma secuencial para no saturar la API
      for (const slug of slugs) {
        try {
          // Verificar si ya tenemos la respuesta en caché
          let response;
          if (cache[slug]) {
            response = cache[slug];
          } else {
            response = await fetchCategoryData(slug);
            // Guardar en caché
            cache[slug] = response;
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
          // Si falla una categoría individual, la registramos como inválida pero continuamos
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
  }
}));
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { fetchCategoryData, analyzeCategory } from '@/services/api';
import { CategoryStats } from '@/services/api/types';

// Definimos los tipos de manera más clara
interface State {
  stats: CategoryStats;
  loading: boolean;
  analyzing: boolean;
  currentCategory: string;
  error: string | null;
}

interface Actions {
  fetchCategories: (slugs: string[]) => Promise<void>;
  resetStats: () => void;
  clearCache: () => void;
  analyzeIndividualCategory: (slug: string) => Promise<void>;
}

// Creamos el store con los tipos definidos
export const useCategoriesStore = create<State & Actions>()(
  persist(
    (set, get) => ({
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
        if (get().loading) return; // Prevenir solicitudes concurrentes
        
        // Reiniciar el estado antes de comenzar
        set({ 
          loading: true, 
          error: null,
          stats: {
            total: slugs.length,
            valid: 0,
            invalid: 0,
            processed: 0,
            categories: {}
          }
        });
        
        try {
          // Procesar cada slug de forma secuencial
          for (let i = 0; i < slugs.length; i++) {
            const slug = slugs[i];
            set({ currentCategory: slug });
            
            try {
              // Obtener datos de categoría
              const response = await fetchCategoryData(slug);
              
              // Actualizar estadísticas de forma segura con los tipos
              set((state) => ({
                stats: {
                  ...state.stats,
                  valid: response.status === 'OK' ? state.stats.valid + 1 : state.stats.valid,
                  invalid: response.status === 'KO' ? state.stats.invalid + 1 : state.stats.invalid,
                  processed: state.stats.processed + 1,
                  categories: {
                    ...state.stats.categories,
                    [slug]: {
                      status: response.status,
                      ...(response.error ? { error: response.error } : {})
                    }
                  }
                }
              }));
            } catch (error) {
              // Manejar error individual pero continuar con las demás categorías
              set((state) => ({
                stats: {
                  ...state.stats,
                  invalid: state.stats.invalid + 1,
                  processed: state.stats.processed + 1,
                  categories: {
                    ...state.stats.categories,
                    [slug]: {
                      status: 'KO' as const, // Aseguramos que TypeScript interprete esto como literal
                      error: error instanceof Error ? error.message : 'Error desconocido'
                    }
                  }
                }
              }));
            }
            
            // Pequeña pausa para no sobrecargar la API
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error desconocido' });
        } finally {
          set({ loading: false, currentCategory: '' });
        }
      },

      clearCache: () => {
        console.log('Limpiando caché');
        
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
        if (get().analyzing) return; // Prevenir análisis concurrentes
        
        set({ analyzing: true, currentCategory: slug });
        
        try {
          const response = await analyzeCategory(slug);
          console.log(`Análisis individual de ${slug} completado:`, response);
          
          // Actualizar el estado con el resultado
          set((state) => {
            // Primero creamos las categorías actualizadas
            const updatedCategories = {
              ...state.stats.categories
            };
            
            // Actualizamos la categoría específica
            updatedCategories[slug] = {
              status: response.status,
              ...(response.error ? { error: response.error } : {})
            };
            
            // Recalcular contadores
            const validCount = Object.values(updatedCategories).filter(c => c.status === 'OK').length;
            const invalidCount = Object.values(updatedCategories).filter(c => c.status === 'KO').length;
            
            // Devolver el nuevo estado
            return {
              stats: {
                ...state.stats,
                valid: validCount,
                invalid: invalidCount,
                categories: updatedCategories
              }
            };
          });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error en análisis individual' });
        } finally {
          set({ analyzing: false, currentCategory: '' });
        }
      }
    }),
    {
      name: 'cecotec-categories-store',
      partialize: (state) => ({ stats: state.stats }), // Solo persistir las estadísticas
      storage: createJSONStorage(() => sessionStorage), // Usar sessionStorage para mejor rendimiento
    }
  )
);
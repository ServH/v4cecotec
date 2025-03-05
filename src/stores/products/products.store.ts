import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ProductsState, ProductsActions, GridLayout, SavedLayout } from './products.types';
import { fetchProductsByCategory } from '@/services/api/products.service';

export const useProductsStore = create<ProductsState & ProductsActions>()(
  persist(
    (set, get) => ({
      products: {},
      selectedCategories: [],
      loading: false,
      error: null,
      gridLayout: 'grid',
      orderingMode: false,
      customOrder: {},

      fetchProducts: async (slug: string, limit = 10) => {
        set({ loading: true, error: null });
        
        try {
          const products = await fetchProductsByCategory(slug, limit);
          
          set(state => ({
            products: {
              ...state.products,
              [slug]: products
            },
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Error fetching products', 
            loading: false 
          });
        }
      },

      selectCategory: (slug: string) => {
        const { selectedCategories, fetchProducts } = get();
        
        if (selectedCategories.includes(slug)) return;
        
        set({ selectedCategories: [...selectedCategories, slug] });
        fetchProducts(slug);
      },

      deselectCategory: (slug: string) => {
        set(state => ({
          selectedCategories: state.selectedCategories.filter(s => s !== slug)
        }));
      },

      clearSelectedCategories: () => {
        set({ selectedCategories: [] });
      },

      setGridLayout: (layout: GridLayout) => {
        set({ gridLayout: layout });
      },

      toggleOrderingMode: () => {
        set(state => ({ orderingMode: !state.orderingMode }));
      },

      updateProductOrder: (productId: string, newPosition: number) => {
        set(state => ({
          customOrder: {
            ...state.customOrder,
            [productId]: newPosition
          }
        }));
      },

      saveCustomOrder: () => {
        // Esta función guarda el orden actual en el estado
        // El orden ya está guardado automáticamente en customOrder
        console.log('Custom order saved');
      },

      loadSavedLayout: (layoutName: string) => {
        try {
          const savedLayouts = localStorage.getItem('productLayouts');
          
          if (savedLayouts) {
            const layouts: SavedLayout[] = JSON.parse(savedLayouts);
            const layout = layouts.find(l => l.name === layoutName);
            
            if (layout) {
              set({ 
                customOrder: layout.order,
                selectedCategories: layout.selectedCategories
              });
              
              // Cargar productos si es necesario
              layout.selectedCategories.forEach(slug => {
                if (!get().products[slug]) {
                  get().fetchProducts(slug);
                }
              });
            }
          }
        } catch (error) {
          console.error('Error loading layout:', error);
        }
      },

      saveCurrentLayout: (layoutName: string) => {
        try {
          const { customOrder, selectedCategories } = get();
          
          const newLayout: SavedLayout = {
            name: layoutName,
            timestamp: Date.now(),
            order: customOrder,
            selectedCategories
          };
          
          const savedLayouts = localStorage.getItem('productLayouts');
          let layouts: SavedLayout[] = [];
          
          if (savedLayouts) {
            layouts = JSON.parse(savedLayouts);
            // Reemplazar si ya existe
            const existingIndex = layouts.findIndex(l => l.name === layoutName);
            if (existingIndex >= 0) {
              layouts[existingIndex] = newLayout;
            } else {
              layouts.push(newLayout);
            }
          } else {
            layouts = [newLayout];
          }
          
          localStorage.setItem('productLayouts', JSON.stringify(layouts));
        } catch (error) {
          console.error('Error saving layout:', error);
        }
      },

      clearProductsCache: () => {
        set({ products: {} });
      },
    }),
    {
      name: 'cecotec-products-store',
      partialize: (state) => ({ 
        selectedCategories: state.selectedCategories,
        gridLayout: state.gridLayout,
        customOrder: state.customOrder
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { fetchMultipleCategoryMetrics } from '@/services/api/categoryMetrics.service';
import { CategoryMetrics, MetricsState, MetricsActions } from '@/types/metrics.types';

export const useMetricsStore = create<MetricsState & MetricsActions>()(
  persist(
    (set, get) => ({
      metrics: {},
      loading: false,
      error: null,
      selectedCategories: [],

      fetchMetrics: async (slugs: string[]) => {
        if (get().loading) {
          console.log("Fetch already in progress, skipping.");
          return;
        }
        
        console.log("Starting fetch for slugs:", slugs);
        set({ loading: true, error: null });
        
        try {
          const results = await fetchMultipleCategoryMetrics(slugs);
          console.log("Fetch completed, results:", Object.keys(results).length);
          
          set((state) => {
            console.log("Updating state with results");
            return {
              metrics: {
                ...state.metrics,
                ...results
              },
              loading: false
            };
          });
        } catch (error) {
          console.error("Error in fetchMetrics:", error);
          set({ 
            error: error instanceof Error ? error.message : 'Error fetching metrics', 
            loading: false 
          });
        } finally {
          console.log("Fetch process completed");
        }
      },

      selectCategory: (slug: string) => {
        set((state) => {
          if (state.selectedCategories.includes(slug)) {
            return state;
          }
          
          return {
            selectedCategories: [...state.selectedCategories, slug]
          };
        });
      },

      deselectCategory: (slug: string) => {
        set((state) => ({
          selectedCategories: state.selectedCategories.filter(s => s !== slug)
        }));
      },

      clearSelectedCategories: () => {
        set({ selectedCategories: [] });
      },

      resetMetrics: () => {
        set({ 
          metrics: {},
          selectedCategories: []
        });
      }
    }),
    {
      name: 'cecotec-metrics-store',
      partialize: (state) => ({ 
        metrics: state.metrics,
        selectedCategories: state.selectedCategories 
      }),
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
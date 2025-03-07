import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import {
  CrawlerState,
  CrawlerActions,
  CrawlSettings,
  IssueStatus,
  IssueType,
  IssueSeverity,
} from '@/types/crawler/crawler.types';
import { startCrawling, stopCrawling } from '@/services/api/crawler/crawler.service';

const DEFAULT_SETTINGS: CrawlSettings = {
  baseUrl: 'https://cecotec.es',
  maxPages: 100,
  maxDepth: 3,
  concurrency: 5,
  includedPaths: ['/'],
  excludedPaths: ['/admin', '/api', '/login'],
  throttleRequests: true,
  requestDelay: 500,
  checkImages: true,
  checkExternalLinks: false,
  performanceThreshold: 2000,
};

const DEFAULT_STATS = {
  totalPages: 0,
  checkedPages: 0,
  totalIssues: 0,
  issuesByType: {
    broken_link: 0,
    not_found: 0,
    redirect_error: 0,
    server_error: 0,
    performance: 0,
    image_error: 0,
    other: 0,
  } as Record<IssueType, number>,
  issuesBySeverity: {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  } as Record<IssueSeverity, number>,
  averageResponseTime: 0,
  startTime: '',
};

export const useCrawlerStore = create<CrawlerState & CrawlerActions>()(
  persist(
    (set, get) => ({
      isRunning: false,
      progress: 0,
      results: [],
      issues: [],
      stats: DEFAULT_STATS,
      settings: DEFAULT_SETTINGS,
      error: null,
      currentUrl: '',

      startCrawl: async (customSettings) => {
        const currentSettings = {
          ...get().settings,
          ...customSettings,
        };

        set({
          isRunning: true,
          progress: 0,
          error: null,
          currentUrl: '',
          stats: {
            ...DEFAULT_STATS,
            startTime: new Date().toISOString(),
          },
        });

        try {
          const response = await startCrawling(currentSettings);
          
          // Este es un ejemplo de cómo se actualizaría el estado
          // En la implementación real, esto se haría a través de websockets o polling
          const updateProgress = (progressData: any) => {
            set(state => ({
              progress: progressData.progress,
              currentUrl: progressData.currentUrl,
              results: [...state.results, ...progressData.newResults],
              issues: [...state.issues, ...progressData.newIssues],
              stats: {
                ...state.stats,
                checkedPages: progressData.checkedPages,
                totalPages: progressData.totalPages,
                totalIssues: state.issues.length + progressData.newIssues.length,
                issuesByType: progressData.issuesByType,
                issuesBySeverity: progressData.issuesBySeverity,
                averageResponseTime: progressData.averageResponseTime,
              }
            }));
          };

          // Simulación de actualizaciones de progreso
          // En la implementación real, esto sería manejado por eventos del servidor
          const interval = setInterval(() => {
            const progress = Math.min(get().progress + 5, 100);
            
            if (progress >= 100) {
              clearInterval(interval);
              set({
                isRunning: false,
                progress: 100,
                stats: {
                  ...get().stats,
                  endTime: new Date().toISOString(),
                },
              });
            } else {
              set({ progress });
            }
          }, 1000);
          
        } catch (error) {
          set({
            isRunning: false,
            error: error instanceof Error ? error.message : 'Error durante el crawling',
          });
        }
      },

      stopCrawl: () => {
        stopCrawling();
        set({
          isRunning: false,
          stats: {
            ...get().stats,
            endTime: new Date().toISOString(),
          },
        });
      },

      updateSettings: (settings) => {
        set(state => ({
          settings: {
            ...state.settings,
            ...settings,
          },
        }));
      },

      resetResults: () => {
        set({
          results: [],
          issues: [],
          stats: DEFAULT_STATS,
          progress: 0,
        });
      },

      updateIssueStatus: (issueId, status) => {
        set(state => ({
          issues: state.issues.map(issue => 
            issue.id === issueId 
              ? { 
                  ...issue, 
                  status,
                  dateResolved: status === 'resolved' ? new Date().toISOString() : issue.dateResolved
                } 
              : issue
          )
        }));
      },

      exportResults: () => {
        const { results, issues, stats } = get();
        const dataStr = JSON.stringify({ results, issues, stats }, null, 2);
        const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
        
        const exportFileDefaultName = `crawler-report-${new Date().toISOString().slice(0, 10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
      },

      loadCrawlHistory: async (dateRange) => {
        // En una implementación real, esto cargaría datos históricos desde la API
        // Por ahora, simplemente simularemos algunos datos de ejemplo
        set({
          results: [],
          issues: [
            {
              id: uuidv4(),
              url: 'https://cecotec.es/productos/no-existe',
              type: 'not_found',
              status: 'new',
              severity: 'medium',
              details: 'Página no encontrada (404)',
              dateDetected: new Date().toISOString(),
              statusCode: 404,
            },
            {
              id: uuidv4(),
              url: 'https://cecotec.es/images/producto-destacado.jpg',
              type: 'image_error',
              status: 'new',
              severity: 'low',
              details: 'Imagen no encontrada',
              dateDetected: new Date().toISOString(),
            }
          ],
          stats: {
            ...DEFAULT_STATS,
            totalPages: 50,
            checkedPages: 50,
            totalIssues: 2,
            issuesByType: {
              ...DEFAULT_STATS.issuesByType,
              not_found: 1,
              image_error: 1,
            },
            issuesBySeverity: {
              ...DEFAULT_STATS.issuesBySeverity,
              low: 1,
              medium: 1,
            },
            averageResponseTime: 320,
            startTime: new Date(Date.now() - 3600000).toISOString(),
            endTime: new Date().toISOString(),
          },
        });
      },
    }),
    {
      name: 'cecotec-crawler-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        settings: state.settings,
        lastCrawlDate: state.stats.endTime,
      }),
    }
  )
);
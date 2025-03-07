import axios from 'axios';
import { CrawlSettings, CrawlResult, PageIssue } from '@/types/crawler/crawler.types';

// Endpoints
const CRAWLER_API_BASE = '/api/crawler';

/**
 * Inicia un nuevo proceso de crawling
 */
export const startCrawling = async (settings: CrawlSettings): Promise<{ jobId: string }> => {
  try {
    const response = await axios.post(`${CRAWLER_API_BASE}/start`, settings);
    return response.data;
  } catch (error) {
    console.error('Error al iniciar el crawling:', error);
    throw error;
  }
};

/**
 * Detiene un proceso de crawling en curso
 */
export const stopCrawling = async (): Promise<void> => {
  try {
    await axios.post(`${CRAWLER_API_BASE}/stop`);
  } catch (error) {
    console.error('Error al detener el crawling:', error);
    throw error;
  }
};

/**
 * Obtiene el estado actual del proceso de crawling
 */
export const getCrawlStatus = async (): Promise<{
  isRunning: boolean;
  progress: number;
  currentUrl: string;
}> => {
  try {
    const response = await axios.get(`${CRAWLER_API_BASE}/status`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el estado del crawling:', error);
    throw error;
  }
};

/**
 * Obtiene resultados parciales del crawling
 */
export const getCrawlResults = async (page: number = 1, limit: number = 50): Promise<{
  results: CrawlResult[];
  issues: PageIssue[];
  totalPages: number;
  currentPage: number;
}> => {
  try {
    const response = await axios.get(`${CRAWLER_API_BASE}/results`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener resultados del crawling:', error);
    throw error;
  }
};

/**
 * Obtiene un historial de crawlings anteriores
 */
export const getCrawlHistory = async (): Promise<{
  history: Array<{
    id: string;
    startTime: string;
    endTime?: string;
    totalPages: number;
    totalIssues: number;
  }>;
}> => {
  try {
    const response = await axios.get(`${CRAWLER_API_BASE}/history`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener historial de crawling:', error);
    throw error;
  }
};

/**
 * Analiza una URL específica
 */
export const analyzeSingleUrl = async (url: string): Promise<CrawlResult> => {
  try {
    const response = await axios.post(`${CRAWLER_API_BASE}/analyze`, { url });
    return response.data;
  } catch (error) {
    console.error('Error al analizar URL:', error);
    throw error;
  }
};
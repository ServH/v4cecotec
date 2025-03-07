import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { CrawlSettings } from '@/types/crawler/crawler.types';

// Estado del crawling (en una implementación completa, esto estaría en una base de datos)
let crawlingState = {
  isRunning: false,
  progress: 0,
  currentUrl: '',
  jobId: '',
  results: [],
  issues: [],
  startTime: '',
  endTime: '',
};

// Simulación de un servicio de crawling
const simulateCrawling = async (settings: CrawlSettings, abortSignal: AbortSignal) => {
  crawlingState = {
    isRunning: true,
    progress: 0,
    currentUrl: settings.baseUrl,
    jobId: `job_${Date.now()}`,
    results: [],
    issues: [],
    startTime: new Date().toISOString(),
    endTime: '',
  };

  // Simulamos el progreso de crawling
  const totalUrlsToCheck = settings.maxPages;
  let checkedUrls = 0;

  while (checkedUrls < totalUrlsToCheck && !abortSignal.aborted) {
    // Simulamos un retraso para imitar el tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 300));

    checkedUrls++;
    crawlingState.progress = Math.floor((checkedUrls / totalUrlsToCheck) * 100);
    crawlingState.currentUrl = `${settings.baseUrl}/page-${checkedUrls}`;

    // Simulamos encontrar algunos problemas aleatoriamente
    if (Math.random() > 0.8) {
      crawlingState.issues.push({
        id: `issue_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        url: crawlingState.currentUrl,
        type: Math.random() > 0.5 ? 'not_found' : 'broken_link',
        status: 'new',
        severity: Math.random() > 0.7 ? 'high' : 'medium',
        details: 'Problema detectado durante el crawling',
        dateDetected: new Date().toISOString(),
        statusCode: 404,
      });
    }

    crawlingState.results.push({
      url: crawlingState.currentUrl,
      statusCode: 200,
      responseTime: Math.floor(Math.random() * 500),
      contentType: 'text/html',
      title: `Página ${checkedUrls}`,
      links: [],
      issues: [],
      dateChecked: new Date().toISOString(),
    });
  }

  crawlingState.isRunning = false;
  crawlingState.endTime = new Date().toISOString();
  crawlingState.progress = 100;
};

// Manejamos el signal para abortar el crawling
let abortController: AbortController | null = null;

export async function POST(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;

    // Iniciar crawling
    if (path.endsWith('/start')) {
      const settings: CrawlSettings = await request.json();

      if (crawlingState.isRunning) {
        return NextResponse.json(
          { error: 'Ya hay un proceso de crawling en ejecución' },
          { status: 400 }
        );
      }

      // Creamos un nuevo AbortController para poder detener el proceso
      abortController = new AbortController();
      
      // Iniciamos el proceso de crawling en segundo plano
      simulateCrawling(settings, abortController.signal).catch(console.error);

      return NextResponse.json({ 
        jobId: crawlingState.jobId,
        message: 'Crawling iniciado correctamente' 
      });
    }

    // Detener crawling
    if (path.endsWith('/stop')) {
      if (!crawlingState.isRunning) {
        return NextResponse.json(
          { error: 'No hay un proceso de crawling en ejecución' },
          { status: 400 }
        );
      }

      // Abortar el proceso actual
      abortController?.abort();
      crawlingState.isRunning = false;
      crawlingState.endTime = new Date().toISOString();

      return NextResponse.json({ message: 'Crawling detenido correctamente' });
    }

    // Analizar una URL específica
    if (path.endsWith('/analyze')) {
      const { url } = await request.json();

      // Aquí normalmente analizaríamos la URL proporcionada
      // Para esta demo, simplemente devolvemos datos simulados

      return NextResponse.json({
        url,
        statusCode: 200,
        responseTime: 325,
        contentType: 'text/html',
        title: 'Página de ejemplo',
        links: [],
        issues: [],
        dateChecked: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { error: 'Endpoint no encontrado' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error en el API del crawler:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    
    // Obtener estado actual
    if (path.endsWith('/status')) {
      return NextResponse.json({
        isRunning: crawlingState.isRunning,
        progress: crawlingState.progress,
        currentUrl: crawlingState.currentUrl,
      });
    }

    // Obtener resultados
    if (path.endsWith('/results')) {
      const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
      const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50');
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      return NextResponse.json({
        results: crawlingState.results.slice(startIndex, endIndex),
        issues: crawlingState.issues,
        totalPages: Math.ceil(crawlingState.results.length / limit),
        currentPage: page,
      });
    }

    // Obtener historial
    if (path.endsWith('/history')) {
      // En una implementación real, obtendríamos esto de una base de datos
      return NextResponse.json({
        history: [{
          id: crawlingState.jobId || `job_${Date.now() - 86400000}`,
          startTime: crawlingState.startTime || new Date(Date.now() - 86400000).toISOString(),
          endTime: crawlingState.endTime || new Date(Date.now() - 83400000).toISOString(),
          totalPages: crawlingState.results.length || 100,
          totalIssues: crawlingState.issues.length || 5,
        }]
      });
    }

    return NextResponse.json(
      { error: 'Endpoint no encontrado' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error en el API del crawler:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
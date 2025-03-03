import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  
  if (!category) {
    return NextResponse.json(
      { error: 'Se requiere el parámetro category' },
      { status: 400 }
    );
  }
  
  try {
    console.log(`Solicitando datos para la categoría: ${category}`);
    const response = await axios.get(
      `https://content.cecotec.es/api/v4/products/products-list-by-category/?category=${category}`,
      {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'es', // Añadido el parámetro de idioma español
          'Cache-Control': 'no-cache'
        }
      }
    );
    
    // Log para depuración
    console.log(`Respuesta para ${category}: Status ${response.status}, Datos:`, 
      response.data ? 
        (Object.keys(response.data).length > 0 ? 'Tiene datos' : 'Objeto vacío') 
        : 'Sin datos'
    );
    
    if (response.status === 200) {
      // Devolvemos los datos con una caché más controlada
      return new NextResponse(JSON.stringify(response.data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'private, max-age=300' // Cache de 5 minutos para mejorar rendimiento
        }
      });
    } else {
      return NextResponse.json(
        { error: `Código de estado inesperado: ${response.status}` },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error(`Error al obtener datos para la categoría ${category}:`, error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return NextResponse.json(
          { error: 'Tiempo de espera agotado', status: 408 },
          { status: 408 }
        );
      }
      
      // Manejamos específicamente errores de red y 404
      if (error.response) {
        return NextResponse.json(
          { 
            error: `Error HTTP: ${error.response.status} - ${error.message}`, 
            status: error.response.status 
          },
          { status: error.response.status }
        );
      } else if (error.request) {
        // Error de red (sin respuesta)
        return NextResponse.json(
          { error: 'Error de red - No se pudo conectar al servidor', status: 503 },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { error: error.message, status: 500 },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error al obtener datos de la categoría' },
      { status: 500 }
    );
  }
}
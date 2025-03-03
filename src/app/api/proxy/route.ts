// src/app/api/proxy/route.ts
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
        timeout: 15000, // Aumentamos el timeout a 15 segundos
        headers: {
          'Accept': 'application/json',
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
      return NextResponse.json(response.data);
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
      
      return NextResponse.json(
        { error: error.message, status: error.response?.status || 500 },
        { status: error.response?.status || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error al obtener datos de la categoría' },
      { status: 500 }
    );
  }
}
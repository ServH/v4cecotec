// src/app/api/proxy/route.ts (actualización)
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  // Obtener la categoría de los parámetros de la URL
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  
  if (!category) {
    return NextResponse.json(
      { error: 'Se requiere el parámetro category' },
      { status: 400 }
    );
  }
  
  try {
    // Hacer la petición al endpoint original
    const response = await axios.get(
      `https://content.cecotec.es/api/v4/products/products-list-by-category/?category=${category}`,
      {
        timeout: 10000, // 10 segundos de timeout
        validateStatus: function (status) {
          return status < 500; // Resolver solo si el código de estado es menor que 500
        }
      }
    );
    
    // Comprobar si el status es 404 (recurso no encontrado)
    if (response.status === 404) {
      return NextResponse.json(
        { error: 'Categoría no encontrada', status: 404 },
        { status: 404 }
      );
    }
    
    // Devolver los datos
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(`Error al obtener datos para la categoría ${category}:`, error);
    
    // Si es un error de axios
    if (axios.isAxiosError(error)) {
      // Si es un timeout
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
    
    // Error genérico
    return NextResponse.json(
      { error: 'Error al obtener datos de la categoría' },
      { status: 500 }
    );
  }
}
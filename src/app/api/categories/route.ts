import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://cecotec.es/_next/data/PeYRTvNUKVaVr5l9zT3pv/es.json');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error al obtener el árbol de categorías:', error);
    
    // Si es un error de axios
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 }
      );
    }
    
    // Error genérico
    return NextResponse.json(
      { error: 'Error al obtener el árbol de categorías' },
      { status: 500 }
    );
  }
}
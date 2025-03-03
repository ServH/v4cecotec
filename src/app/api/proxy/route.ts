import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Simple in-memory cache with expiration
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const forceRefresh = searchParams.has('_');
  
  if (!category) {
    return NextResponse.json(
      { error: 'Se requiere el parámetro category' },
      { status: 400 }
    );
  }
  
  // Check cache if not forcing refresh
  if (!forceRefresh) {
    const cachedData = cache.get(category);
    const now = Date.now();
    
    if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
      console.log(`Using cached data for ${category}`);
      return NextResponse.json(cachedData.data, {
        headers: {
          'Cache-Control': 'private, max-age=300',
          'X-Cache': 'HIT'
        }
      });
    }
  }
  
  try {
    console.log(`Requesting data for category: ${category}`);
    const response = await axios.get(
      `https://content.cecotec.es/api/v4/products/products-list-by-category/?category=${category}`,
      {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'es',
          'Cache-Control': 'no-cache'
        }
      }
    );
    
    // Log for debugging
    console.log(`Response for ${category}: Status ${response.status}, Data:`, 
      response.data ? 
        (Object.keys(response.data).length > 0 ? 'Has data' : 'Empty object') 
        : 'No data'
    );
    
    if (response.status === 200) {
      // Update cache
      cache.set(category, {
        data: response.data,
        timestamp: Date.now()
      });
      
      // Return the data with controlled cache
      return new NextResponse(JSON.stringify(response.data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'private, max-age=300',
          'X-Cache': 'MISS'
        }
      });
    } else {
      return NextResponse.json(
        { error: `Unexpected status code: ${response.status}` },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error(`Error fetching data for category ${category}:`, error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return NextResponse.json(
          { error: 'Request timeout', status: 408 },
          { status: 408 }
        );
      }
      
      // Handle specific network errors and 404s
      if (error.response) {
        return NextResponse.json(
          { 
            error: `HTTP Error: ${error.response.status} - ${error.message}`, 
            status: error.response.status 
          },
          { status: error.response.status }
        );
      } else if (error.request) {
        // Network error (no response)
        return NextResponse.json(
          { error: 'Network error - Could not connect to server', status: 503 },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { error: error.message, status: 500 },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error fetching category data' },
      { status: 500 }
    );
  }
}
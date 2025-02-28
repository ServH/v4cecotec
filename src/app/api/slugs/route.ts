import { NextResponse } from 'next/server';
import slugsData from '@/data/es.json';

export async function GET() {
  return NextResponse.json(slugsData);
}
'use client';

import React from 'react';
import CategoryStats from '@/components/sections/CategoryStats';
// Importamos directamente el JSON
import slugsData from '@/data/es.json';

export default function Home() {
  // Extraemos los slugs del objeto JSON
  const slugs = slugsData.slugs || [];
  
  return (
    <main>
      <CategoryStats slugs={slugs} />
    </main>
  );
}
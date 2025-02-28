'use client';

import React, { useState, useEffect } from 'react';
import CategoryStats from '@/components/sections/CategoryStats'; // Usa importación por defecto
import { fetchCategoriesTree, extractChildrenSlugs } from '@/services/api';

export default function Home() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCategorySlugs = async () => {
      setLoading(true);
      try {
        // Obtener el árbol de categorías
        const categoriesTree = await fetchCategoriesTree();
        
        // Extraer los slugs de todas las categorías hijas
        const childrenSlugs = extractChildrenSlugs(categoriesTree);
        
        setSlugs(childrenSlugs);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
        setSlugs([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategorySlugs();
  }, []);
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Cargando categorías...
        </div>
        <div>
          Obteniendo estructura de categorías desde Cecotec
        </div>
      </div>
    );
  }
  
  return (
    <main>
      <CategoryStats slugs={slugs} />
    </main>
  );
}
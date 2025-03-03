'use client';

import React, { useState, useEffect } from 'react';
import CategoryStats from '@/components/sections/CategoryStats';
import { fetchCategoriesTree, extractChildrenSlugs } from '@/services/api';
import { Category } from '@/types/category.types';

export default function Home() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [categoriesTree, setCategoriesTree] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCategorySlugs = async () => {
      setLoading(true);
      try {
        // Obtener el árbol de categorías
        const tree = await fetchCategoriesTree();
        setCategoriesTree(tree);
        
        // Extraer los slugs de todas las categorías hoja
        const leafSlugs = extractChildrenSlugs(tree);
        
        setSlugs(leafSlugs);
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
      <CategoryStats slugs={slugs} categoriesTree={categoriesTree} />
    </main>
  );
}
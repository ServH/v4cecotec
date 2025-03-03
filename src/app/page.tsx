'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { fetchCategoriesTree, extractChildrenSlugs } from '@/services/api';
import { Category } from '@/types/category.types';

// Simple Loading Component (no need for separate import)
const LoadingComponent = ({ message }: { message: string }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    flexDirection: 'column',
    gap: '16px'
  }}>
    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
      {message}
    </div>
    <div>
      Obteniendo estructura de categorías desde Cecotec
    </div>
  </div>
);

// Lazy load CategoryStats component
const CategoryStats = dynamic(
  () => import('@/components/sections/CategoryStats'), 
  { 
    loading: () => <LoadingComponent message="Cargando componente de estadísticas..." />
  }
);

export default function Home() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [categoriesTree, setCategoriesTree] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadCategorySlugs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get the category tree
        const tree = await fetchCategoriesTree();
        
        if (!tree || tree.length === 0) {
          throw new Error('No se pudieron cargar las categorías');
        }
        
        setCategoriesTree(tree);
        
        // Extract slugs from all leaf categories
        const leafSlugs = extractChildrenSlugs(tree);
        setSlugs(leafSlugs);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar las categorías');
        setSlugs([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategorySlugs();
  }, []);
  
  // Memoize the slugs and tree to prevent unnecessary re-renders
  const memoizedSlugs = useMemo(() => slugs, [slugs]);
  const memoizedTree = useMemo(() => categoriesTree, [categoriesTree]);
  
  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#c5221f' }}>
          Error
        </div>
        <div>
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()}
          style={{ marginTop: '16px' }}
        >
          Reintentar
        </button>
      </div>
    );
  }
  
  if (loading) {
    return <LoadingComponent message="Cargando categorías..." />;
  }
  
  return (
    <main>
      <CategoryStats slugs={memoizedSlugs} categoriesTree={memoizedTree} />
    </main>
  );
}
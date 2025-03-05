'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { fetchCategoriesTree, extractChildrenSlugs } from '@/services/api';
import { Category } from '@/types/category.types';
import LoadingState from '@/components/app/LoadingState';
import ErrorState from '@/components/app/ErrorState';
import CategoryStats from '@/components/sections/CategoryStats';
import Header from '@/components/app/Header';
import Navigation from '@/components/app/Navigation';

export default function CategoriesPage() {
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
  
  if (loading) {
    return <LoadingState 
      title="Cargando categorías..."
      message="Obteniendo estructura de categorías desde Cecotec" 
    />;
  }
  
  if (error) {
    return <ErrorState 
      title="Error al cargar las categorías"
      message={error}
      onRetry={() => window.location.reload()}
    />;
  }
  
  return (
    <>
      <Header />
      <Navigation />
      <CategoryStats slugs={memoizedSlugs} categoriesTree={memoizedTree} />
    </>
  );
}
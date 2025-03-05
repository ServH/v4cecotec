'use client';

import React, { useState, useEffect } from 'react';
import { fetchCategoriesTree, extractChildrenSlugs } from '@/services/api';
import { Category } from '@/types/category.types';
import Header from '@/components/app/Header';
import Navigation from '@/components/app/Navigation';
import LoadingState from '@/components/app/LoadingState';
import ErrorState from '@/components/app/ErrorState';
import ProductCluster from '@/components/sections/ProductCluster';

export default function ClusterPage() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [categoriesTree, setCategoriesTree] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadCategorySlugs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Obtener el árbol de categorías
        const tree = await fetchCategoriesTree();
        
        if (!tree || tree.length === 0) {
          throw new Error('No se pudieron cargar las categorías');
        }
        
        setCategoriesTree(tree);
        
        // Extraer slugs de todas las categorías "hoja"
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
  
  if (loading) {
    return <LoadingState 
      title="Cargando categorías..."
      message="Obteniendo estructura de categorías para el cluster de productos" 
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
      <ProductCluster slugs={slugs} categoriesTree={categoriesTree} />
    </>
  );
}
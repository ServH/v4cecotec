import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useCategoriesStore } from '@/stores/categories';
import { getCategoryPath } from '@/services/api';
import { CategoryStatsProps } from './CategoryStats.types';
import Container from '@/components/layout/Container';
import Grid from '@/components/layout/Grid';
import Header from '@/components/app/Header';
import StatsOverview from '@/components/app/StatsOverview';
import AnalysisControls from '@/components/app/AnalysisControls';
import CategoryFilter from '@/components/app/CategoryFilter';
import CategoryCard from '@/components/app/CategoryCard';
import LoadingState from '@/components/app/LoadingState';
import ErrorState from '@/components/app/ErrorState';
import { AlertContainer, AlertBox, AnalyzingAlert, MainContent } from './CategoryStats.styles';

const CategoryStats: React.FC<CategoryStatsProps> = ({ slugs, categoriesTree }) => {
  const { 
    stats, 
    loading, 
    analyzing,
    currentCategory,
    error, 
    fetchCategories, 
    resetStats, 
    clearCache,
    analyzeIndividualCategory
  } = useCategoriesStore();
  
  const [batchSize, setBatchSize] = useState(10);
  const [filter, setFilter] = useState<'all' | 'valid' | 'invalid'>('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState<'alphabetical' | 'reverse-alphabetical'>('alphabetical');
  
  useEffect(() => {
    resetStats();
  }, [resetStats]);
  
  // Filtrar y ordenar slugs según las opciones avanzadas
  const filteredAndSortedSlugs = useMemo(() => {
    let result = [...slugs];
    
    // Filtrar por categoría principal si está seleccionada
    if (selectedCategory) {
      const selectedCat = categoriesTree.find(cat => cat.slug === selectedCategory);
      if (selectedCat) {
        // Obtenemos los slugs de las subcategorías
        const childSlugs = getCategoryChildrenSlugs(selectedCat);
        result = result.filter(slug => childSlugs.includes(slug));
      }
    }
    
    // Ordenar según la preferencia
    if (sortOrder === 'alphabetical') {
      result.sort((a, b) => a.localeCompare(b));
    } else {
      result.sort((a, b) => b.localeCompare(a));
    }
    
    return result;
  }, [slugs, selectedCategory, sortOrder, categoriesTree]);
  
  const handleStartAnalysis = useCallback(() => {
    const limitedSlugs = filteredAndSortedSlugs.slice(0, batchSize);
    fetchCategories(limitedSlugs);
  }, [batchSize, fetchCategories, filteredAndSortedSlugs]);

  const handleClearCacheAndAnalyze = useCallback(() => {
    clearCache();
    if (stats.processed > 0) {
      const limitedSlugs = Object.keys(stats.categories).slice(0, batchSize);
      fetchCategories(limitedSlugs);
    }
  }, [batchSize, clearCache, fetchCategories, stats.categories, stats.processed]);
  
  const handleRetryCategory = useCallback((slug: string) => {
    analyzeIndividualCategory(slug);
  }, [analyzeIndividualCategory]);
  
  const progress = useMemo(() => 
    stats.total > 0 ? (stats.processed / stats.total) * 100 : 0,
  [stats.processed, stats.total]);
  
  // Filter categories based on selection
  const filteredCategories = useMemo(() => 
    Object.entries(stats.categories).filter(([_, data]) => {
      if (filter === 'all') return true;
      if (filter === 'valid') return data.status === 'OK';
      if (filter === 'invalid') return data.status === 'KO';
      return true;
    }),
  [filter, stats.categories]);
  
  // Si no categories have been processed yet, show initial state
  const showInitialState = stats.processed === 0 && !loading;
  
  if (showInitialState) {
    return (
      <>
        <Header />
        <Container>
          <MainContent>
            <AnalysisControls 
              totalSlugs={filteredAndSortedSlugs.length}
              batchSize={batchSize}
              setBatchSize={setBatchSize}
              onStartAnalysis={handleStartAnalysis}
              onClearCacheAndRestart={handleClearCacheAndAnalyze}
              loading={loading}
              analyzing={analyzing}
              categoriesTree={categoriesTree}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </MainContent>
        </Container>
      </>
    );
  }
  
  return (
    <>
      <Header />
      <Container>
        <MainContent>
          {/* Error Alert */}
          {error && (
            <AlertContainer>
              <AlertBox variant="error">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <strong>Error:</strong> {error}
              </AlertBox>
            </AlertContainer>
          )}

          {/* Analyzing Alert */}
          {analyzing && (
            <AlertContainer>
              <AlertBox variant="info">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <AnalyzingAlert>
                  <strong>Analizando categoría:</strong> {currentCategory}
                </AnalyzingAlert>
              </AlertBox>
            </AlertContainer>
          )}
          
          {/* Analysis Controls */}
          <AnalysisControls 
            totalSlugs={filteredAndSortedSlugs.length}
            batchSize={batchSize}
            setBatchSize={setBatchSize}
            onStartAnalysis={handleStartAnalysis}
            onClearCacheAndRestart={handleClearCacheAndAnalyze}
            loading={loading}
            analyzing={analyzing}
            categoriesTree={categoriesTree}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          
          {/* Stats Overview */}
          {(stats.processed > 0 || loading) && (
            <StatsOverview 
              total={stats.total}
              valid={stats.valid}
              invalid={stats.invalid}
              processed={stats.processed}
              progress={progress}
            />
          )}
          
          {/* Category Filter */}
          {stats.processed > 0 && (
            <CategoryFilter 
              filter={filter}
              setFilter={setFilter}
              totalItems={Object.keys(stats.categories).length}
              filteredItems={filteredCategories.length}
            />
          )}
          
          {/* Category Grid */}
          {stats.processed > 0 && (
            <Grid 
              columns={{ base: 1, md: 2, lg: 3 }}
              gap={6}
            >
              {filteredCategories.map(([slug, data]) => (
                <CategoryCard 
                  key={slug}
                  slug={slug}
                  categoryPath={getCategoryPath(categoriesTree, slug)}
                  status={data.status}
                  error={data.error}
                  onRetry={handleRetryCategory}
                  disabled={analyzing}
                />
              ))}
            </Grid>
          )}
        </MainContent>
      </Container>
    </>
  );
};

// Función auxiliar para obtener todos los slugs de una categoría y sus hijos
const getCategoryChildrenSlugs = (category: { slug: string, children?: any[] }): string[] => {
  const slugs: string[] = [category.slug];
  
  if (category.children && category.children.length > 0) {
    category.children.forEach(child => {
      slugs.push(...getCategoryChildrenSlugs(child));
    });
  }
  
  return slugs;
};

export default CategoryStats;
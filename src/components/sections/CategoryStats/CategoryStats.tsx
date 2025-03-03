// src/components/sections/CategoryStats/CategoryStats.tsx
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
  
  useEffect(() => {
    resetStats();
  }, [resetStats]);
  
  const handleStartAnalysis = useCallback(() => {
    const limitedSlugs = slugs.slice(0, batchSize);
    fetchCategories(limitedSlugs);
  }, [batchSize, fetchCategories, slugs]);

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
  
  // If no categories have been processed yet, show initial state
  const showInitialState = stats.processed === 0 && !loading;
  
  if (showInitialState) {
    return (
      <>
        <Header />
        <Container>
          <MainContent>
            <AnalysisControls 
              totalSlugs={slugs.length}
              batchSize={batchSize}
              setBatchSize={setBatchSize}
              onStartAnalysis={handleStartAnalysis}
              onClearCacheAndRestart={handleClearCacheAndAnalyze}
              loading={loading}
              analyzing={analyzing}
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
            totalSlugs={slugs.length}
            batchSize={batchSize}
            setBatchSize={setBatchSize}
            onStartAnalysis={handleStartAnalysis}
            onClearCacheAndRestart={handleClearCacheAndAnalyze}
            loading={loading}
            analyzing={analyzing}
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

export default CategoryStats;
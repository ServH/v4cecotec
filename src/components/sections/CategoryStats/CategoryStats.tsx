import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { CategoryStatsProps } from './CategoryStats.types';
import { useCategoriesStore } from '@/stores/categories';
import { getCategoryPath } from '@/services/api';
import StatsCard from '@/components/common/StatsCard';
import ProgressBar from '@/components/common/ProgressBar';
import CategoryFilter from './components/CategoryFilter';
import CategoryItem from './components/CategoryItem';
import StatsHeader from './components/StatsHeader';
import BatchSelector from './components/BatchSelector';
import {
  Container,
  Header,
  Title,
  Description,
  StatsGrid,
  ProgressContainer,
  ProgressLabel,
  CategoryList,
  ButtonContainer
} from './CategoryStats.styles';

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
  
  return (
    <Container>
      <Header>
        <Title>Análisis de Subcategorías de Cecotec</Title>
        <Description>
          Verificando la disponibilidad de productos en {slugs.length} categorías hoja (sin subcategorías).
        </Description>
      </Header>
      
      <ButtonContainer>
        <BatchSelector 
          batchSize={batchSize} 
          setBatchSize={setBatchSize} 
          disabled={loading} 
          totalSlugs={slugs.length}
        />
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={handleStartAnalysis}
            disabled={loading || analyzing}
          >
            {loading ? 'Analizando...' : 'Iniciar Análisis'}
          </button>
          
          <button 
            onClick={handleClearCacheAndAnalyze}
            disabled={loading || analyzing}
            style={{ 
              backgroundColor: '#e67700', 
              color: 'white' 
            }}
          >
            Limpiar Caché y Reiniciar
          </button>
        </div>
      </ButtonContainer>
      
      {error && (
        <div style={{ color: '#c5221f', marginBottom: '16px', padding: '12px', backgroundColor: '#fce8e6', borderRadius: '4px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {analyzing && (
        <div style={{ color: '#1a73e8', marginBottom: '16px', padding: '12px', backgroundColor: '#e8f0fe', borderRadius: '4px' }}>
          <strong>Analizando categoría:</strong> {currentCategory}
        </div>
      )}
      
      {(stats.processed > 0 || loading) && (
        <>
          <StatsGrid>
            <StatsCard 
              title="Total Categorías" 
              value={stats.total} 
              color="primary" 
            />
            <StatsCard 
              title="Con Productos" 
              value={stats.valid} 
              color="success" 
            />
            <StatsCard 
              title="Sin Productos" 
              value={stats.invalid} 
              color="danger" 
            />
            <StatsCard 
              title="Procesadas" 
              value={`${stats.processed} / ${stats.total}`} 
              color="info" 
            />
          </StatsGrid>
          
          <ProgressContainer>
            <ProgressLabel>
              <span>Progreso del análisis</span>
              <span>{Math.round(progress)}%</span>
            </ProgressLabel>
            <ProgressBar progress={progress} />
          </ProgressContainer>
          
          {stats.processed > 0 && (
            <>
              <StatsHeader 
                filter={filter} 
                setFilter={setFilter} 
                totalItems={Object.keys(stats.categories).length}
                filteredItems={filteredCategories.length}
              />
              
              <CategoryList>
                {filteredCategories.map(([slug, data]) => (
                  <CategoryItem
                    key={slug}
                    slug={slug}
                    data={data}
                    categoryPath={getCategoryPath(categoriesTree, slug)}
                    onRetry={handleRetryCategory}
                    disabled={analyzing}
                  />
                ))}
              </CategoryList>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default CategoryStats;
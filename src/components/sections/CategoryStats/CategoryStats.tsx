import React, { useEffect, useState } from 'react';
import { CategoryStatsProps } from './CategoryStats.types';
import { useCategoriesStore } from '@/stores/categories';
import { getCategoryPath } from '@/services/api';
import StatsCard from '@/components/common/StatsCard';
import ProgressBar from '@/components/common/ProgressBar';
import {
  Container,
  Header,
  Title,
  Description,
  StatsGrid,
  ProgressContainer,
  ProgressLabel,
  CategoryList,
  CategoryItem,
  CategoryName,
  CategoryLink,
  CategoryStatus,
  CategoryError,
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
  
  const handleStartAnalysis = () => {
    const limitedSlugs = slugs.slice(0, batchSize);
    fetchCategories(limitedSlugs);
  };

  const handleClearCacheAndAnalyze = () => {
    clearCache();
    if (stats.processed > 0) {
      const limitedSlugs = Object.keys(stats.categories).slice(0, batchSize);
      fetchCategories(limitedSlugs);
    }
  };
  
  const handleRetryCategory = (slug: string) => {
    analyzeIndividualCategory(slug);
  };
  
  const progress = stats.total > 0 ? (stats.processed / stats.total) * 100 : 0;
  
  // Filtrar categorías según la selección
  const filteredCategories = Object.entries(stats.categories).filter(([_, data]) => {
    if (filter === 'all') return true;
    if (filter === 'valid') return data.status === 'OK';
    if (filter === 'invalid') return data.status === 'KO';
    return true;
  });
  
  return (
    <Container>
      <Header>
        <Title>Análisis de Subcategorías de Cecotec</Title>
        <Description>
          Verificando la disponibilidad de productos en {slugs.length} categorías hoja (sin subcategorías).
        </Description>
      </Header>
      
      <ButtonContainer>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label htmlFor="batchSize" style={{ marginRight: '8px' }}>
              Número de categorías a analizar:
            </label>
            <select 
              id="batchSize"
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              disabled={loading}
              style={{ padding: '4px 8px' }}
            >
              <option value="5">5 categorías</option>
              <option value="10">10 categorías</option>
              <option value="20">20 categorías</option>
              <option value="50">50 categorías</option>
              <option value="100">100 categorías</option>
              <option value={slugs.length}>Todas ({slugs.length} categorías)</option>
            </select>
          </div>
        </div>
        
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
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                margin: '24px 0 16px' 
              }}>
                <h2>Resultados:</h2>
                <div>
                  <label htmlFor="filter" style={{ marginRight: '8px' }}>
                    Filtrar:
                  </label>
                  <select 
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'valid' | 'invalid')}
                    style={{ padding: '4px 8px' }}
                  >
                    <option value="all">Todas</option>
                    <option value="valid">Con Productos</option>
                    <option value="invalid">Sin Productos</option>
                  </select>
                </div>
              </div>
              
              <div style={{ margin: '12px 0', fontSize: '14px', color: '#5f6368' }}>
                Mostrando {filteredCategories.length} de {Object.keys(stats.categories).length} categorías
              </div>
              
              <CategoryList>
                {filteredCategories.map(([slug, data]) => {
                  // Obtener la ruta de la categoría
                  const categoryPath = getCategoryPath(categoriesTree, slug);
                  
                  return (
                    <CategoryItem key={slug} status={data.status}>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#5f6368', 
                        marginBottom: '4px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px'
                      }}>
                        {categoryPath.map((segment, index) => (
                          <React.Fragment key={index}>
                            {index > 0 && <span style={{ margin: '0 2px' }}>&gt;</span>}
                            <span>{segment}</span>
                          </React.Fragment>
                        ))}
                      </div>
                      <CategoryName>
                        {slug}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleRetryCategory(slug)}
                            disabled={analyzing}
                            style={{ 
                              padding: '2px 6px', 
                              fontSize: '12px',
                              background: '#f1f3f4',
                              color: '#202124',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            Reanalizar
                          </button>
                          <CategoryLink 
                            href={`https://cecotec.es/es/${slug}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Ver en web
                          </CategoryLink>
                        </div>
                      </CategoryName>
                      <CategoryStatus status={data.status}>
                        {data.status === 'OK' ? 'Con Productos' : 'Sin Productos'}
                      </CategoryStatus>
                      {data.error && (
                        <CategoryError>{data.error}</CategoryError>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                        <CategoryLink 
                          href={`/api/proxy?category=${slug}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ fontSize: '12px' }}
                        >
                          Ver API
                        </CategoryLink>
                        <CategoryLink 
                          href={`https://content.cecotec.es/api/v4/products/products-list-by-category/?category=${slug}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ fontSize: '12px' }}
                        >
                          API Original
                        </CategoryLink>
                      </div>
                    </CategoryItem>
                  );
                })}
              </CategoryList>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default CategoryStats;
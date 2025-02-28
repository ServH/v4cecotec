import React, { useEffect, useState } from 'react';
import { CategoryStatsProps } from './CategoryStats.types';
import { useCategoriesStore } from '@/stores/categories';
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
  CategoryStatus,
  CategoryError,
  ButtonContainer
} from './CategoryStats.styles';

const CategoryStats: React.FC<CategoryStatsProps> = ({ slugs }) => {
  const { stats, loading, error, fetchCategories, resetStats } = useCategoriesStore();
  const [batchSize, setBatchSize] = useState(10); // Tamaño del lote para procesar
  
  useEffect(() => {
    // Limpiar estadísticas al montar el componente
    resetStats();
  }, [resetStats]);
  
  const handleStartAnalysis = () => {
    // Limitar el número de categorías a procesar para evitar sobrecarga
    const limitedSlugs = slugs.slice(0, batchSize);
    fetchCategories(limitedSlugs);
  };
  
  const progress = stats.total > 0 ? (stats.processed / stats.total) * 100 : 0;
  
  return (
    <Container>
      <Header>
        <Title>Análisis de Categorías de Cecotec</Title>
        <Description>Verifica qué categorías tienen productos y cuáles no.</Description>
      </Header>
      
      <ButtonContainer>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="batchSize" style={{ marginRight: '8px' }}>
            Número de categorías a analizar:
          </label>
          <select 
            id="batchSize"
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            disabled={loading}
          >
            <option value="5">5 categorías</option>
            <option value="10">10 categorías</option>
            <option value="20">20 categorías</option>
            <option value="50">50 categorías</option>
            <option value="100">100 categorías</option>
            <option value={slugs.length}>Todas ({slugs.length} categorías)</option>
          </select>
        </div>
        
        <button 
          onClick={handleStartAnalysis}
          disabled={loading}
        >
          {loading ? 'Analizando...' : 'Iniciar Análisis'}
        </button>
      </ButtonContainer>
      
      {error && (
        <div style={{ color: '#c5221f', marginBottom: '16px' }}>
          Error: {error}
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
              title="Categorías con Productos" 
              value={stats.valid} 
              color="success" 
            />
            <StatsCard 
              title="Categorías sin Productos" 
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
              <span>Progreso</span>
              <span>{Math.round(progress)}%</span>
            </ProgressLabel>
            <ProgressBar progress={progress} />
          </ProgressContainer>
          
          {stats.processed > 0 && (
            <>
              <h2 style={{ margin: '24px 0 16px' }}>Resultados:</h2>
              <CategoryList>
                {Object.entries(stats.categories).map(([slug, data]) => (
                  <CategoryItem key={slug} status={data.status}>
                    <CategoryName>{slug}</CategoryName>
                    <CategoryStatus status={data.status}>
                      {data.status === 'OK' ? 'Con Productos' : 'Sin Productos'}
                    </CategoryStatus>
                    {data.error && (
                      <CategoryError>{data.error}</CategoryError>
                    )}
                  </CategoryItem>
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
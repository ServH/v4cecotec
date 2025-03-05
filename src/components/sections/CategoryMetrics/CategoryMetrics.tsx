import React, { useEffect, useState } from 'react';
import { useMetricsStore } from '@/stores/metrics';
import { CategoryMetricsProps } from './CategoryMetrics.types';
import { MetricsContainer, MetricsControls } from './CategoryMetrics.styles';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';

// Componentes
import MetricsSelector from './components/MetricsSelector';
import ComparisonPanel from './components/ComparisonPanel';
import ComparisonView from './components/ComparisonView';
import MetricsDashboard from './components/MetricsDashboard';
import NoDataView from './components/NoDataView';
import InitialView from './components/InitialView';

const CategoryMetrics: React.FC<CategoryMetricsProps> = ({
  categoriesTree,
  slugs
}) => {
  const { 
    metrics, 
    loading, 
    selectedCategories,
    fetchMetrics,
    selectCategory,
    deselectCategory,
    clearSelectedCategories
  } = useMetricsStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [comparisonList, setComparisonList] = useState<string[]>([]);

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setLoadingTimeout(false);
    
    if (value && !metrics[value]) {
      fetchMetrics([value]);
    }
  };

  // Add to comparison
  const handleAddToComparison = () => {
    if (selectedCategory && !comparisonList.includes(selectedCategory)) {
      // Agregar a la lista de comparación local
      setComparisonList(prev => [...prev, selectedCategory]);
      
      // Agregar al store para precargar los datos
      if (!selectedCategories.includes(selectedCategory)) {
        selectCategory(selectedCategory);
      }
      
      if (!metrics[selectedCategory]) {
        fetchMetrics([selectedCategory]);
      }
    }
  };

  // Toggle compare mode
  const handleToggleCompareMode = () => {
    // Actualizar el store con todas las categorías seleccionadas localmente
    comparisonList.forEach(slug => {
      if (!selectedCategories.includes(slug)) {
        selectCategory(slug);
      }
      
      if (!metrics[slug]) {
        fetchMetrics([slug]);
      }
    });
    
    setCompareMode(!compareMode);
    
    if (compareMode) {
      clearSelectedCategories();
      setComparisonList([]);
    }
  };

  // Remove from comparison
  const handleRemoveFromComparison = (slug: string) => {
    setComparisonList(prev => prev.filter(s => s !== slug));
    deselectCategory(slug);
  };

  // Clear comparison list
  const handleClearComparison = () => {
    setComparisonList([]);
  };

  // Retry fetching metrics
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setLoadingTimeout(false);
    if (selectedCategory) {
      fetchMetrics([selectedCategory]);
    }
  };

  // Reset category selection
  const handleResetCategory = () => {
    setSelectedCategory('');
    setLoadingTimeout(false);
  };

  // Fetch metrics for initial selection
  useEffect(() => {
    if (selectedCategory && !metrics[selectedCategory]) {
      fetchMetrics([selectedCategory]);
    }
  }, [selectedCategory, metrics, fetchMetrics]);

  // Removida la selección automática de categoría inicial

  // Timeout detection
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (loading) {
      timer = setTimeout(() => {
        setLoadingTimeout(true);
      }, 20000); // 20 segundos
    } else {
      setLoadingTimeout(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);

  // Current metrics to display
  const currentMetrics = selectedCategory ? metrics[selectedCategory] : null;

  return (
    <MetricsContainer>
      <Container>
        <MetricsControls>
          <Card>
            <Card.Header>
              <Card.Title>Panel de Métricas de Categorías</Card.Title>
              <Card.Description>
                Analice y compare las métricas de diferentes categorías de productos
              </Card.Description>
            </Card.Header>
            <Card.Body>
              <MetricsSelector
                categoriesTree={categoriesTree}
                slugs={slugs}
                selectedCategory={selectedCategory}
                setSelectedCategory={handleCategoryChange}
                comparisonList={comparisonList}
                onAddToComparison={handleAddToComparison}
                loading={loading}
                compareMode={compareMode}
              />
              
              <ComparisonPanel
                comparisonList={comparisonList}
                categoriesTree={categoriesTree}
                onRemoveFromComparison={handleRemoveFromComparison}
                onToggleCompareMode={handleToggleCompareMode}
                onClearComparison={handleClearComparison}
                compareMode={compareMode}
              />
            </Card.Body>
          </Card>
        </MetricsControls>
        
        {compareMode && comparisonList.length > 0 ? (
          <ComparisonView
            comparisonList={comparisonList}
            categoriesTree={categoriesTree}
            metrics={metrics}
            onRemoveFromComparison={handleRemoveFromComparison}
            onToggleCompareMode={handleToggleCompareMode}
            onResetSelection={handleResetCategory}
          />
        ) : (
          <>
            {!selectedCategory ? (
              <InitialView />
            ) : !currentMetrics ? (
              <NoDataView
                loading={loading}
                loadingTimeout={loadingTimeout}
                onRetry={handleRetry}
                onResetCategory={handleResetCategory}
                retryCount={retryCount}
              />
            ) : (
              <MetricsDashboard metrics={currentMetrics} />
            )}
          </>
        )}
      </Container>
    </MetricsContainer>
  );
};

export default CategoryMetrics;
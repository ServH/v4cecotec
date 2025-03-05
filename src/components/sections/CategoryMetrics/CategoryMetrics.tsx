import React, { useEffect, useState } from 'react';
import { useMetricsStore } from '@/stores/metrics';
import { CategoryMetrics as CategoryMetricsType } from '@/types/metrics.types';
import { getCategoryPath } from '@/services/api';
import Container from '@/components/layout/Container';
import Grid from '@/components/layout/Grid';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import MetricsCard from '@/components/app/MetricsCard';
import CategoryMetricChart from '@/components/app/CategoryMetricChart';
import { 
  MetricsContainer, 
  MetricsControls,
  SelectContainer,
  ChartGrid,
  NoMetricsMessage,
  ComparisonBadge,
  ComparisonPanel
} from './CategoryMetrics.styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Category } from '@/types/category.types';

interface CategoryMetricsProps {
  categoriesTree: Category[];
  slugs: string[];
}

const CHART_COLORS = ['#0072ff', '#0ca5e9', '#36bffa', '#7cd4fd', '#b9e6fe'];

export const CategoryMetrics: React.FC<CategoryMetricsProps> = ({
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
  
  // Lista separada para las categorías en la comparativa
  const [comparisonList, setComparisonList] = useState<string[]>([]);

  // Format category options for select
  const categoryOptions = [
    { value: '', label: 'Seleccionar categoría' },
    ...slugs.map(slug => ({
      value: slug,
      label: getCategoryPath(categoriesTree, slug).join(' > ')
    }))
  ];

  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
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

  // Fetch metrics for initial selection
  useEffect(() => {
    if (selectedCategory && !metrics[selectedCategory]) {
      fetchMetrics([selectedCategory]);
    }
  }, [selectedCategory, metrics, fetchMetrics]);

  // Set initial category if none selected
  useEffect(() => {
    if (slugs.length > 0 && !selectedCategory) {
      // Seleccionamos categorías predefinidas que sabemos que funcionan bien
      const preferredCategories = ['aspiradores-verticales', 'robot-aspirador', 'freidoras-sin-aceite'];
      
      // Encontrar la primera categoría preferida que existe en los slugs
      const initialCategory = preferredCategories.find(cat => slugs.includes(cat)) || slugs[0];
      
      console.log("Seleccionando categoría inicial:", initialCategory);
      setSelectedCategory(initialCategory);
    }
  }, [slugs, selectedCategory]);

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
  const currentMetrics: CategoryMetricsType | null = selectedCategory ? metrics[selectedCategory] : null;

  // Format data for charts
  const formatStructureDistribution = (metrics: CategoryMetricsType) => {
    return Object.entries(metrics.structureDistribution).map(([key, value]) => ({
      name: formatStructureName(key),
      value
    }));
  };

  const formatStructureName = (key: string): string => {
    switch (key) {
      case 'standalone': return 'Individuales';
      case 'bundle': return 'Packs';
      case 'variant': return 'Variantes';
      case 'accessory': return 'Accesorios';
      case 'other': return 'Otros';
      default: return key;
    }
  };

  const formatPriceData = (metrics: CategoryMetricsType) => {
    return [
      { name: 'Mínimo', value: metrics.pricing.minimum },
      { name: 'Promedio', value: metrics.pricing.average },
      { name: 'Máximo', value: metrics.pricing.maximum }
    ];
  };

  const formatStockData = (metrics: CategoryMetricsType) => {
    return [
      { name: 'En Stock', value: metrics.stock.inStock },
      { name: 'Sin Stock', value: metrics.totalProducts - metrics.stock.inStock }
    ];
  };

  // Comparison data preparation
  const formatComparisonTotalProducts = () => {
    return comparisonList.map(slug => ({
      name: getCategoryPath(categoriesTree, slug).slice(-1)[0] || slug,
      value: metrics[slug]?.totalProducts || 0
    }));
  };

  const formatComparisonAvgPrice = () => {
    return comparisonList.map(slug => ({
      name: getCategoryPath(categoriesTree, slug).slice(-1)[0] || slug,
      value: metrics[slug]?.pricing.average || 0
    }));
  };

  const formatComparisonStockPercentage = () => {
    return comparisonList.map(slug => ({
      name: getCategoryPath(categoriesTree, slug).slice(-1)[0] || slug,
      value: metrics[slug]?.stock.percentage || 0
    }));
  };

  // Generar un nombre corto para mostrar en badges
  const getShortCategoryName = (slug: string): string => {
    const path = getCategoryPath(categoriesTree, slug);
    return path.slice(-1)[0] || slug;
  };

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
              <SelectContainer>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <Select
                    label="Categoría"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    options={categoryOptions}
                    placeholder="Seleccione una categoría"
                    disabled={loading}
                    fullWidth
                  />
                </div>
                
                {selectedCategory && !compareMode && (
                  <Button
                    onClick={handleAddToComparison}
                    disabled={loading || comparisonList.includes(selectedCategory)}
                    variant="secondary"
                    leftIcon={
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        width="16"
                        height="16"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    }
                  >
                    Añadir a comparación
                  </Button>
                )}
              </SelectContainer>
              
              {/* Panel de categorías para comparar */}
              {comparisonList.length > 0 && !compareMode && (
                <ComparisonPanel>
                  <div className="comparison-header">
                    <h3>Categorías seleccionadas para comparar</h3>
                    <div className="comparison-buttons">
                      <Button
                        onClick={handleToggleCompareMode}
                        variant="primary"
                        size="sm"
                        disabled={comparisonList.length < 2}
                      >
                        {comparisonList.length < 2 
                          ? 'Seleccione al menos 2 categorías' 
                          : 'Ver comparativa'
                        }
                      </Button>
                      
                      {comparisonList.length > 0 && (
                        <Button
                          onClick={() => setComparisonList([])}
                          variant="outline"
                          size="sm"
                        >
                          Limpiar selección
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="comparison-badges">
                    {comparisonList.map(slug => (
                      <ComparisonBadge key={slug}>
                        {getShortCategoryName(slug)}
                        <button 
                          onClick={() => handleRemoveFromComparison(slug)}
                          className="remove-badge"
                        >
                          ×
                        </button>
                      </ComparisonBadge>
                    ))}
                    
                    {/* Mensaje de instrucción */}
                    {comparisonList.length === 1 && (
                      <span className="comparison-help">
                        Seleccione otra categoría para comparar
                      </span>
                    )}
                  </div>
                </ComparisonPanel>
              )}
            </Card.Body>
          </Card>
        </MetricsControls>
        
        {/* Render comparison section or single category view */}
        {compareMode && comparisonList.length > 0 ? (
          <div>
            <Card className="mb-6">
              <Card.Header>
                <Card.Title>Comparativa de Categorías</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Comparando {comparisonList.length} categorías:</p>
                  <div className="flex flex-wrap gap-2">
                    {comparisonList.map(slug => (
                      <ComparisonBadge key={slug}>
                        {getShortCategoryName(slug)}
                        <button 
                          onClick={() => handleRemoveFromComparison(slug)}
                          className="remove-badge"
                        >
                          ×
                        </button>
                      </ComparisonBadge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    onClick={handleToggleCompareMode}
                    variant="outline"
                    size="sm"
                  >
                    Salir del modo comparación
                  </Button>
                  
                  <Button
                    onClick={() => setSelectedCategory('')}
                    variant="ghost"
                    size="sm"
                  >
                    Seleccionar otra categoría
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            <ChartGrid>
              <CategoryMetricChart
                title="Número total de productos"
                description="Comparativa de productos por categoría"
                isEmpty={formatComparisonTotalProducts().length === 0}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={formatComparisonTotalProducts()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Productos" fill="#0072ff" />
                  </BarChart>
                </ResponsiveContainer>
              </CategoryMetricChart>
              
              <CategoryMetricChart
                title="Precio promedio"
                description="Comparativa de precios promedio por categoría"
                isEmpty={formatComparisonAvgPrice().length === 0}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={formatComparisonAvgPrice()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value.toFixed(2)} €`, 'Precio']} />
                    <Bar dataKey="value" name="Precio promedio" fill="#0ca5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </CategoryMetricChart>
              
              <CategoryMetricChart
                title="Disponibilidad de stock"
                description="Porcentaje de productos en stock por categoría"
                isEmpty={formatComparisonStockPercentage().length === 0}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={formatComparisonStockPercentage()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'En stock']} />
                    <Bar dataKey="value" name="% en stock" fill="#00c853" />
                  </BarChart>
                </ResponsiveContainer>
              </CategoryMetricChart>
            </ChartGrid>
          </div>
        ) : (
          <>
            {!selectedCategory ? (
              <NoMetricsMessage>
                <div>
                  <h3>Seleccione una categoría para ver sus métricas</h3>
                  <p>Utilice el selector de arriba para elegir una categoría y visualizar sus métricas.</p>
                </div>
              </NoMetricsMessage>
            ) : !currentMetrics ? (
              <NoMetricsMessage>
                <div>
                  {loading ? (
                    <>
                      <h3>Cargando métricas...</h3>
                      {loadingTimeout && (
                        <div style={{ marginTop: '20px' }}>
                          <p>La carga está tomando más tiempo de lo esperado.</p>
                          <p>El servidor puede estar experimentando lentitud o timeouts.</p>
                          <div style={{ marginTop: '20px' }}>
                            <Button
                              onClick={() => {
                                setRetryCount(prev => prev + 1);
                                setLoadingTimeout(false);
                                fetchMetrics([selectedCategory]);
                              }}
                              style={{ marginRight: '10px' }}
                            >
                              Reintentar
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedCategory('');
                                setLoadingTimeout(false);
                              }}
                            >
                              Seleccionar otra categoría
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <h3>No hay datos disponibles para esta categoría</h3>
                      <p>La categoría seleccionada no tiene productos o no se pudieron obtener las métricas.</p>
                      <p>Intente seleccionar otra categoría.</p>
                    </>
                  )}
                </div>
              </NoMetricsMessage>
            ) : (
              <>
                <Grid 
                  columns={{ base: 1, md: 2, lg: 4 }}
                  gap={4}
                >
                  <MetricsCard
                    title="Productos"
                    subtitle="Métricas generales"
                    metrics={[
                      { label: 'Total productos', value: currentMetrics.totalProducts, highlight: true },
                      { label: 'En stock', value: currentMetrics.stock.inStock },
                      { label: '% Disponibilidad', value: `${currentMetrics.stock.percentage.toFixed(2)}%` },
                    ]}
                  />
                  
                  <MetricsCard
                    title="Precios"
                    subtitle="Métricas de precios (€)"
                    metrics={[
                      { label: 'Precio medio', value: `${currentMetrics.pricing.average.toFixed(2)} €`, highlight: true },
                      { label: 'Precio mínimo', value: `${currentMetrics.pricing.minimum.toFixed(2)} €` },
                      { label: 'Precio máximo', value: `${currentMetrics.pricing.maximum.toFixed(2)} €` },
                      { label: 'Rango de precios', value: `${(currentMetrics.pricing.maximum - currentMetrics.pricing.minimum).toFixed(2)} €` },
                    ]}
                  />
                  
                  <MetricsCard
                    title="Estructura"
                    subtitle="Tipos de productos"
                    metrics={[
                      { label: 'Individuales', value: currentMetrics.structureDistribution.standalone },
                      { label: 'Packs', value: currentMetrics.structureDistribution.bundle },
                      { label: 'Variantes', value: currentMetrics.structureDistribution.variant },
                      { label: 'Accesorios', value: currentMetrics.structureDistribution.accessory },
                    ]}
                  />
                  
                  <MetricsCard
                    title="Distribución"
                    subtitle="Porcentajes por tipo"
                    metrics={[
                      { label: 'Individuales', value: `${currentMetrics.structurePercentage.standalone.toFixed(1)}%` },
                      { label: 'Packs', value: `${currentMetrics.structurePercentage.bundle.toFixed(1)}%` },
                      { label: 'Variantes', value: `${currentMetrics.structurePercentage.variant.toFixed(1)}%` },
                      { label: 'Accesorios', value: `${currentMetrics.structurePercentage.accessory.toFixed(1)}%` },
                    ]}
                  />
                </Grid>
                
                <ChartGrid>
                  <CategoryMetricChart
                    title="Distribución por estructura"
                    description="Categorización de productos por tipo"
                    isEmpty={formatStructureDistribution(currentMetrics).length === 0}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={formatStructureDistribution(currentMetrics)}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {formatStructureDistribution(currentMetrics).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Productos']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CategoryMetricChart>
                  
                  <CategoryMetricChart
                    title="Rangos de precio"
                    description="Mínimo, promedio y máximo precio de los productos"
                    isEmpty={formatPriceData(currentMetrics).length === 0}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={formatPriceData(currentMetrics)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value.toFixed(2)} €`, 'Precio']} />
                        <Bar dataKey="value" fill="#0072ff" name="Precio (€)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CategoryMetricChart>
                  
                  <CategoryMetricChart
                    title="Disponibilidad de stock"
                    description="Distribución de productos según disponibilidad"
                    isEmpty={formatStockData(currentMetrics).length === 0}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={formatStockData(currentMetrics)}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#00c853" />
                          <Cell fill="#e2e8f0" />
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Productos']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CategoryMetricChart>
                </ChartGrid>
              </>
            )}
          </>
        )}
      </Container>
    </MetricsContainer>
  );
};

export default CategoryMetrics;
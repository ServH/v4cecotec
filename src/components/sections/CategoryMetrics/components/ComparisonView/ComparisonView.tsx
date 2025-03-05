import React from 'react';
import { ComparisonViewProps } from './ComparisonView.types';
import { 
  ComparisonContainer, 
  ChartGrid, 
  BadgesContainer,
  ButtonsContainer
} from './ComparisonView.styles';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import CategoryMetricChart from '@/components/app/CategoryMetricChart';
import { ComparisonBadge, RemoveBadgeButton } from '../ComparisonPanel/ComparisonPanel.styles';
import { 
  formatComparisonTotalProducts, 
  formatComparisonAvgPrice, 
  formatComparisonStockPercentage,
  getShortCategoryName
} from '../../utils/formatters';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ComparisonView: React.FC<ComparisonViewProps> = ({
  comparisonList,
  categoriesTree,
  metrics,
  onRemoveFromComparison,
  onToggleCompareMode,
  onResetSelection
}) => {
  const totalProductsData = formatComparisonTotalProducts(comparisonList, metrics, categoriesTree);
  const avgPriceData = formatComparisonAvgPrice(comparisonList, metrics, categoriesTree);
  const stockPercentageData = formatComparisonStockPercentage(comparisonList, metrics, categoriesTree);

  return (
    <ComparisonContainer>
      <Card className="mb-6">
        <Card.Header>
          <Card.Title>Comparativa de Categorías</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Comparando {comparisonList.length} categorías:</p>
            <BadgesContainer>
              {comparisonList.map(slug => (
                <ComparisonBadge key={slug}>
                  {getShortCategoryName(slug, categoriesTree)}
                  <RemoveBadgeButton 
                    onClick={() => onRemoveFromComparison(slug)}
                  >
                    ×
                  </RemoveBadgeButton>
                </ComparisonBadge>
              ))}
            </BadgesContainer>
          </div>
          
          <ButtonsContainer>
            <Button
              onClick={onToggleCompareMode}
              variant="outline"
              size="sm"
            >
              Salir del modo comparación
            </Button>
            
            <Button
              onClick={onResetSelection}
              variant="ghost"
              size="sm"
            >
              Seleccionar otra categoría
            </Button>
          </ButtonsContainer>
        </Card.Body>
      </Card>
      
      <ChartGrid>
        <CategoryMetricChart
          title="Número total de productos"
          description="Comparativa de productos por categoría"
          isEmpty={totalProductsData.length === 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={totalProductsData}
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
          isEmpty={avgPriceData.length === 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={avgPriceData}
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
          isEmpty={stockPercentageData.length === 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stockPercentageData}
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
    </ComparisonContainer>
  );
};

export default ComparisonView;
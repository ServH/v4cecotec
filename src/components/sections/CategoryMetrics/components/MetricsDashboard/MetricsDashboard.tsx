import React from 'react';
import { MetricsDashboardProps } from './MetricsDashboard.types';
import { ChartGrid } from './MetricsDashboard.styles';
import Grid from '@/components/layout/Grid';
import MetricsCard from '@/components/app/MetricsCard';
import CategoryMetricChart from '@/components/app/CategoryMetricChart';
import { 
  formatStructureDistribution, 
  formatPriceData, 
  formatStockData 
} from '../../utils/formatters';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const CHART_COLORS = ['#0072ff', '#0ca5e9', '#36bffa', '#7cd4fd', '#b9e6fe'];

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ metrics }) => {
  const structureData = formatStructureDistribution(metrics);
  const priceData = formatPriceData(metrics);
  const stockData = formatStockData(metrics);

  return (
    <>
      <Grid 
        columns={{ base: 1, md: 2, lg: 4 }}
        gap={4}
      >
        <MetricsCard
          title="Productos"
          subtitle="Métricas generales"
          metrics={[
            { label: 'Total productos', value: metrics.totalProducts, highlight: true },
            { label: 'En stock', value: metrics.stock.inStock },
            { label: '% Disponibilidad', value: `${metrics.stock.percentage.toFixed(2)}%` },
          ]}
        />
        
        <MetricsCard
          title="Precios"
          subtitle="Métricas de precios (€)"
          metrics={[
            { label: 'Precio medio', value: `${metrics.pricing.average.toFixed(2)} €`, highlight: true },
            { label: 'Precio mínimo', value: `${metrics.pricing.minimum.toFixed(2)} €` },
            { label: 'Precio máximo', value: `${metrics.pricing.maximum.toFixed(2)} €` },
            { label: 'Rango de precios', value: `${(metrics.pricing.maximum - metrics.pricing.minimum).toFixed(2)} €` },
          ]}
        />
        
        <MetricsCard
          title="Estructura"
          subtitle="Tipos de productos"
          metrics={[
            { label: 'Individuales', value: metrics.structureDistribution.standalone },
            { label: 'Packs', value: metrics.structureDistribution.bundle },
            { label: 'Variantes', value: metrics.structureDistribution.variant },
            { label: 'Accesorios', value: metrics.structureDistribution.accessory },
          ]}
        />
        
        <MetricsCard
          title="Distribución"
          subtitle="Porcentajes por tipo"
          metrics={[
            { label: 'Individuales', value: `${metrics.structurePercentage.standalone.toFixed(1)}%` },
            { label: 'Packs', value: `${metrics.structurePercentage.bundle.toFixed(1)}%` },
            { label: 'Variantes', value: `${metrics.structurePercentage.variant.toFixed(1)}%` },
            { label: 'Accesorios', value: `${metrics.structurePercentage.accessory.toFixed(1)}%` },
          ]}
        />
      </Grid>
      
      <ChartGrid>
        <CategoryMetricChart
          title="Distribución por estructura"
          description="Categorización de productos por tipo"
          isEmpty={structureData.length === 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={structureData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {structureData.map((entry, index) => (
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
          isEmpty={priceData.length === 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={priceData}
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
          isEmpty={stockData.length === 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stockData}
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
  );
};

export default MetricsDashboard;
import React from 'react';
import { 
  ChartContainer,
  ChartHeader,
  ChartTitle,
  ChartDescription,
  NoDataMessage
} from './CategoryMetricChart.styles';
import Card from '@/components/ui/Card';

interface ChartProps {
  title: string;
  description?: string;
  height?: number;
  noDataMessage?: string;
  isEmpty?: boolean;
  children: React.ReactNode;
}

export const CategoryMetricChart: React.FC<ChartProps> = ({
  title,
  description,
  height = 300,
  noDataMessage = 'No hay datos disponibles para mostrar',
  isEmpty = false,
  children
}) => {
  return (
    <ChartContainer>
      <Card>
        <Card.Body>
          <ChartHeader>
            <ChartTitle>{title}</ChartTitle>
            {description && <ChartDescription>{description}</ChartDescription>}
          </ChartHeader>
          
          <div style={{ height: `${height}px`, position: 'relative' }}>
            {isEmpty ? (
              <NoDataMessage>{noDataMessage}</NoDataMessage>
            ) : (
              children
            )}
          </div>
        </Card.Body>
      </Card>
    </ChartContainer>
  );
};

export default CategoryMetricChart;
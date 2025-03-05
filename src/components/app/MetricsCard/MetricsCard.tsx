import React from 'react';
import { 
  MetricsCardContainer,
  MetricsHeader,
  MetricsTitle,
  MetricsSubtitle,
  MetricsContent,
  MetricRow,
  MetricLabel,
  MetricValue,
  MetricHighlight
} from './MetricsCard.styles';
import Card from '@/components/ui/Card';

interface MetricsCardProps {
  title: string;
  subtitle?: string;
  metrics: {
    label: string;
    value: string | number;
    highlight?: boolean;
  }[];
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  subtitle,
  metrics
}) => {
  return (
    <MetricsCardContainer>
      <Card>
        <Card.Body>
          <MetricsHeader>
            <MetricsTitle>{title}</MetricsTitle>
            {subtitle && <MetricsSubtitle>{subtitle}</MetricsSubtitle>}
          </MetricsHeader>
          
          <MetricsContent>
            {metrics.map((metric, index) => (
              <MetricRow key={index} $highlight={metric.highlight}>
                <MetricLabel>{metric.label}</MetricLabel>
                <MetricValue>
                  {metric.highlight ? (
                    <MetricHighlight>{metric.value}</MetricHighlight>
                  ) : (
                    metric.value
                  )}
                </MetricValue>
              </MetricRow>
            ))}
          </MetricsContent>
        </Card.Body>
      </Card>
    </MetricsCardContainer>
  );
};

export default MetricsCard;
// src/components/common/StatsCard/StatsCard.tsx
import React from 'react';
import { StatsCardProps } from './StatsCard.types';
import { Card, Title, Value } from './StatsCard.styles';

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  color = 'info'
}) => {
  return (
    <Card color={color}>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Card>
  );
};

export default StatsCard;
import React from 'react';
import { ProgressBarProps } from './ProgressBar.types';
import { Container, Progress } from './ProgressBar.styles';

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8
}) => {
  // Aseguramos que el progreso esté entre 0 y 100
  const normalizedProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <Container height={height}>
      <Progress progress={normalizedProgress} />
    </Container>
  );
};

export default ProgressBar;
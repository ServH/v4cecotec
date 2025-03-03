import React from 'react';
import { Container, Spinner, Message } from './LoadingIndicator.styles';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Cargando...' 
}) => {
  return (
    <Container>
      <Spinner />
      <Message>{message}</Message>
    </Container>
  );
};

export default LoadingIndicator;
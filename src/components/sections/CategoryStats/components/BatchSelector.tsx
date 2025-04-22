import React from 'react';
import styled from 'styled-components';
import { BatchSelectorProps } from './BatchSelector.types';

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Label = styled.label`
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.875rem;
`;

const Select = styled.select`
  background: var(--surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px;
  transition: var(--transition-base);
  
  &:hover:not(:disabled) {
    border-color: var(--primary);
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary)20;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const InfoText = styled.span`
  color: var(--text-tertiary);
  font-size: 0.75rem;
  font-weight: 500;
`;

const BatchSelector: React.FC<BatchSelectorProps> = ({ 
  batchSize, 
  setBatchSize, 
  disabled, 
  totalSlugs 
}) => {
  const batchOptions = [5, 10, 20, 50, 100].filter(size => size <= totalSlugs);
  
  return (
    <SelectorContainer>
      <Label htmlFor="batch-size">Analizar por lotes:</Label>
      <Select
        id="batch-size"
        value={batchSize}
        onChange={(e) => setBatchSize(Number(e.target.value))}
        disabled={disabled}
      >
        {batchOptions.map(size => (
          <option key={size} value={size}>
            {size} categorías
          </option>
        ))}
      </Select>
      <InfoText>de {totalSlugs} total</InfoText>
    </SelectorContainer>
  );
};

export default BatchSelector;
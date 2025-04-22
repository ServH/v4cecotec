import React from 'react';
import styled from 'styled-components';
import CategoryFilter from './CategoryFilter';
import { StatsHeaderProps } from './StatsHeader.types';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Counter = styled.span`
  background: var(--primary)10;
  color: var(--primary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
`;

const StatsHeader: React.FC<StatsHeaderProps> = ({ 
  filter, 
  setFilter, 
  totalItems, 
  filteredItems 
}) => {
  return (
    <Header>
      <Title>
        Resultados del Análisis
        <Counter>{filteredItems} de {totalItems}</Counter>
      </Title>
      <CategoryFilter 
        activeFilter={filter} 
        onFilterChange={setFilter}
      />
    </Header>
  );
};

export default StatsHeader;
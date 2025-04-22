import React from 'react';
import styled from 'styled-components';
import { CategoryFilterProps } from './CategoryFilter.types';

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem;
  background: var(--background);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 0.875rem;
  transition: var(--transition-base);
  background: ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  border: none;
  box-shadow: none;
  
  &:hover:not(:disabled) {
    background: ${props => props.active ? 'var(--primary)' : 'var(--border)'};
    color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary)30;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <FilterContainer>
      <FilterButton 
        active={activeFilter === 'all'} 
        onClick={() => onFilterChange('all')}
      >
        🗂️ Todas
      </FilterButton>
      <FilterButton 
        active={activeFilter === 'valid'} 
        onClick={() => onFilterChange('valid')}
      >
        ✅ Con productos
      </FilterButton>
      <FilterButton 
        active={activeFilter === 'invalid'} 
        onClick={() => onFilterChange('invalid')}
      >
        ❌ Sin productos
      </FilterButton>
    </FilterContainer>
  );
};

export default CategoryFilter;
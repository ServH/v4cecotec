import React from 'react';
import { 
  FilterContainer, 
  FilterHeader,
  FilterTitle, 
  FilterControls,
  ResultsCount
} from './CategoryFilter.styles';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';

interface CategoryFilterProps {
  filter: 'all' | 'valid' | 'invalid';
  setFilter: (filter: 'all' | 'valid' | 'invalid') => void;
  totalItems: number;
  filteredItems: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  filter,
  setFilter,
  totalItems,
  filteredItems
}) => {
  return (
    <FilterContainer>
      <Card>
        <Card.Body>
          <FilterHeader>
            <FilterTitle>Resultados</FilterTitle>
            
            <FilterControls>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'valid' | 'invalid')}
                options={[
                  { value: 'all', label: 'Todas las categorías' },
                  { value: 'valid', label: 'Con Productos' },
                  { value: 'invalid', label: 'Sin Productos' }
                ]}
                size="sm"
              />
            </FilterControls>
          </FilterHeader>
          
          <ResultsCount>
            Mostrando <strong>{filteredItems}</strong> de <strong>{totalItems}</strong> categorías
          </ResultsCount>
        </Card.Body>
      </Card>
    </FilterContainer>
  );
};

export default CategoryFilter;
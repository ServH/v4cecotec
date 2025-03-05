import React from 'react';
import { MetricsSelectorProps } from './MetricsSelector.types';
import { SelectContainer } from './MetricsSelector.styles';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { getCategoryPath } from '@/services/api';

const MetricsSelector: React.FC<MetricsSelectorProps> = ({
  categoriesTree,
  slugs,
  selectedCategory,
  setSelectedCategory,
  comparisonList,
  onAddToComparison,
  loading,
  compareMode
}) => {
  // Format category options for select and ordena alfabéticamente
  const categoryOptions = [
    { value: '', label: 'Seleccionar categoría' },
    ...slugs
      .map(slug => ({
        value: slug,
        label: getCategoryPath(categoriesTree, slug).join(' > ')
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) // Ordena alfabéticamente
  ];

  return (
    <SelectContainer>
      <div style={{ flex: 1, minWidth: '250px' }}>
        <Select
          label="Categoría"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categoryOptions}
          placeholder="Seleccione una categoría"
          disabled={loading}
          fullWidth
        />
      </div>
      
      {selectedCategory && !compareMode && (
        <Button
          onClick={onAddToComparison}
          disabled={loading || comparisonList.includes(selectedCategory)}
          variant="secondary"
          leftIcon={
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              width="16"
              height="16"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          }
        >
          Añadir a comparación
        </Button>
      )}
    </SelectContainer>
  );
};

export default MetricsSelector;
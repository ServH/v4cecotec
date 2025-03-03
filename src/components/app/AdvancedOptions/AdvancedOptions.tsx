import React, { useState } from 'react';
import {
  AdvancedOptionsContainer,
  ToggleButton,
  OptionsPanel,
  OptionGroup,
  OptionLabel
} from './AdvancedOptions.styles';
import Select from '@/components/ui/Select';
import { Category } from '@/types/category.types';

interface AdvancedOptionsProps {
  categoriesTree: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOrder: 'alphabetical' | 'reverse-alphabetical';
  setSortOrder: (order: 'alphabetical' | 'reverse-alphabetical') => void;
  disabled?: boolean;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  categoriesTree,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
  disabled = false
}) => {
  const [expanded, setExpanded] = useState(false);

  // Crear opciones para el selector de categorías principales
  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    ...categoriesTree.map(category => ({
      value: category.slug,
      label: category.name
    }))
  ];

  // Opciones para el orden de análisis
  const sortOptions = [
    { value: 'alphabetical', label: 'Alfabético (A-Z)' },
    { value: 'reverse-alphabetical', label: 'Alfabético inverso (Z-A)' }
  ];

  return (
    <AdvancedOptionsContainer>
      <ToggleButton 
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        type="button"
      >
        {expanded ? 'Ocultar opciones avanzadas' : 'Mostrar opciones avanzadas'}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ 
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </ToggleButton>

      {expanded && (
        <OptionsPanel>
          <OptionGroup>
            <OptionLabel>Categoría principal a analizar:</OptionLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categoryOptions}
              disabled={disabled}
            />
          </OptionGroup>

          <OptionGroup>
            <OptionLabel>Orden de análisis:</OptionLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'alphabetical' | 'reverse-alphabetical')}
              options={sortOptions}
              disabled={disabled}
            />
          </OptionGroup>
        </OptionsPanel>
      )}
    </AdvancedOptionsContainer>
  );
};

export default AdvancedOptions;
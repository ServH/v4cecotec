import React, { useState, useMemo } from 'react';
import { CategorySelectorProps } from './CategorySelector.types';
import { getCategoryPath } from '@/services/api';
import {
  SelectorContainer,
  SelectorHeader,
  SelectorTitle,
  CategoryCount,
  SelectorContent,
  SelectionRow,
  SelectControl,
  CategoryChipsContainer,
  CategoryChip,
  RemoveButton,
  EmptySelectionMessage
} from './CategorySelector.styles';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categoriesTree,
  slugs,
  selectedCategories,
  onSelectCategory,
  onDeselectCategory,
  disabled = false
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string>('');

  // Ordenar los slugs alfabéticamente por su ruta
  const sortedSlugs = useMemo(() => {
    return [...slugs].sort((a, b) => {
      const pathA = getCategoryPath(categoriesTree, a).join(' > ');
      const pathB = getCategoryPath(categoriesTree, b).join(' > ');
      return pathA.localeCompare(pathB);
    });
  }, [slugs, categoriesTree]);

  // Crear las opciones para el select, excluyendo las categorías ya seleccionadas
  const categoryOptions = useMemo(() => {
    return [
      { value: '', label: 'Seleccionar categoría' },
      ...sortedSlugs
        .filter(slug => !selectedCategories.includes(slug))
        .map(slug => ({
          value: slug,
          label: getCategoryPath(categoriesTree, slug).join(' > ')
        }))
    ];
  }, [sortedSlugs, categoriesTree, selectedCategories]);

  // Manejar la selección de una categoría
  const handleSelectCategory = () => {
    if (selectedSlug && !selectedCategories.includes(selectedSlug)) {
      onSelectCategory(selectedSlug);
      setSelectedSlug('');
    }
  };

  // Manejar cambio en el select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSlug(e.target.value);
  };

  return (
    <SelectorContainer>
      <SelectorHeader>
        <SelectorTitle>Seleccionar categorías</SelectorTitle>
        <CategoryCount>{selectedCategories.length} seleccionadas</CategoryCount>
      </SelectorHeader>
      
      <SelectorContent>
        <SelectionRow>
          <SelectControl>
            <Select
              value={selectedSlug}
              onChange={handleSelectChange}
              options={categoryOptions}
              placeholder="Seleccione una categoría"
              disabled={disabled}
              fullWidth
            />
          </SelectControl>
          
          <Button
            onClick={handleSelectCategory}
            disabled={!selectedSlug || disabled}
            variant="primary"
          >
            Añadir categoría
          </Button>
        </SelectionRow>
        
        {selectedCategories.length > 0 ? (
          <CategoryChipsContainer>
            {selectedCategories.map(slug => (
              <CategoryChip key={slug}>
                {getCategoryPath(categoriesTree, slug).join(' > ')}
                <RemoveButton
                  onClick={() => onDeselectCategory(slug)}
                  title="Eliminar categoría"
                  disabled={disabled}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </RemoveButton>
              </CategoryChip>
            ))}
          </CategoryChipsContainer>
        ) : (
          <EmptySelectionMessage>
            No has seleccionado ninguna categoría. Selecciona al menos una para ver sus productos.
          </EmptySelectionMessage>
        )}
      </SelectorContent>
    </SelectorContainer>
  );
};

export default CategorySelector;
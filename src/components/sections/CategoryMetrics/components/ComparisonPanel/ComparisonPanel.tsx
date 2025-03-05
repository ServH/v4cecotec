import React from 'react';
import { ComparisonPanelProps } from './ComparisonPanel.types';
import {
  PanelContainer,
  PanelHeader,
  ButtonsContainer,
  BadgesContainer,
  ComparisonHelp,
  ComparisonBadge,
  RemoveBadgeButton
} from './ComparisonPanel.styles';
import Button from '@/components/ui/Button';
import { getShortCategoryName } from '../../utils/formatters';

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  comparisonList,
  categoriesTree,
  onRemoveFromComparison,
  onToggleCompareMode,
  onClearComparison,
  compareMode
}) => {
  if (comparisonList.length === 0 || compareMode) {
    return null;
  }

  return (
    <PanelContainer>
      <PanelHeader>
        <h3>Categorías seleccionadas para comparar</h3>
        <ButtonsContainer>
          <Button
            onClick={onToggleCompareMode}
            variant="primary"
            size="sm"
            disabled={comparisonList.length < 2}
          >
            {comparisonList.length < 2 
              ? 'Seleccione al menos 2 categorías' 
              : 'Ver comparativa'
            }
          </Button>
          
          {comparisonList.length > 0 && (
            <Button
              onClick={onClearComparison}
              variant="outline"
              size="sm"
            >
              Limpiar selección
            </Button>
          )}
        </ButtonsContainer>
      </PanelHeader>
      
      <BadgesContainer>
        {comparisonList.map(slug => (
          <ComparisonBadge key={slug}>
            {getShortCategoryName(slug, categoriesTree)}
            <RemoveBadgeButton 
              onClick={() => onRemoveFromComparison(slug)}
            >
              ×
            </RemoveBadgeButton>
          </ComparisonBadge>
        ))}
        
        {comparisonList.length === 1 && (
          <ComparisonHelp>
            Seleccione otra categoría para comparar
          </ComparisonHelp>
        )}
      </BadgesContainer>
    </PanelContainer>
  );
};

export default ComparisonPanel;
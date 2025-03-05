import React, { useState } from 'react';
import { ViewControlsProps } from './ViewControls.types';
import {
  ControlsContainer,
  ControlsGroup,
  ProductCount,
  LayoutButtonGroup,
  LayoutButton,
  OrderModeButton,
  SaveLayoutButton,
  LayoutSelect
} from './ViewControls.styles';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

export const ViewControls: React.FC<ViewControlsProps> = ({
  totalProducts,
  loadedProducts,
  layout,
  onChangeLayout,
  isOrderingMode,
  onToggleOrderingMode,
  savedLayouts,
  onSaveLayout,
  onLoadLayout,
  onClearCategories,
  onLoadMoreProducts,
  onExportPdf,
  productLimit,
  onChangeProductLimit,
  disabled = false
}) => {
  const [selectedLayout, setSelectedLayout] = useState<string>('');
  
  const handleLayoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLayout(e.target.value);
    if (e.target.value) {
      onLoadLayout(e.target.value);
    }
  };
  
  const handleSaveLayout = () => {
    onSaveLayout();
    setSelectedLayout('');
  };
  
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    onChangeProductLimit(newLimit);
  };

  return (
    <ControlsContainer>
      {/* Primera fila de controles: controles de visualización */}
      <ControlsGroup>
        <ProductCount>
          {loadedProducts} de {totalProducts} {totalProducts === 1 ? 'producto' : 'productos'}
        </ProductCount>
        
        <LayoutButtonGroup>
          <LayoutButton
            active={layout === 'grid'}
            onClick={() => onChangeLayout('grid')}
            title="Vista cuadrícula"
            disabled={disabled}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </LayoutButton>
          
          <LayoutButton
            active={layout === 'list'}
            onClick={() => onChangeLayout('list')}
            title="Vista lista"
            disabled={disabled}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </LayoutButton>
          
          <LayoutButton
            active={layout === 'compact'}
            onClick={() => onChangeLayout('compact')}
            title="Vista compacta"
            disabled={disabled}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="4" height="4"></rect>
              <rect x="10" y="3" width="4" height="4"></rect>
              <rect x="17" y="3" width="4" height="4"></rect>
              <rect x="3" y="10" width="4" height="4"></rect>
              <rect x="10" y="10" width="4" height="4"></rect>
              <rect x="17" y="10" width="4" height="4"></rect>
              <rect x="3" y="17" width="4" height="4"></rect>
              <rect x="10" y="17" width="4" height="4"></rect>
              <rect x="17" y="17" width="4" height="4"></rect>
            </svg>
          </LayoutButton>
        </LayoutButtonGroup>

        {/* Botón para exportar a PDF */}
        <Button
          onClick={onExportPdf}
          variant="primary"
          size="sm"
          disabled={disabled || loadedProducts === 0}
          leftIcon={
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
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          }
        >
          Exportar a PDF
        </Button>
      </ControlsGroup>
      
      {/* Segunda fila de controles: límites y acciones */}
      <ControlsGroup>
        <Select
          value={productLimit.toString()}
          onChange={handleLimitChange}
          options={[
            { value: '10', label: '10 productos' },
            { value: '20', label: '20 productos' },
            { value: '50', label: '50 productos' },
            { value: '100', label: '100 productos' },
            { value: '0', label: 'Todos los productos' },
          ]}
          disabled={disabled}
          size="sm"
        />
        
        {loadedProducts < totalProducts && (
          <Button
            onClick={onLoadMoreProducts}
            variant="outline"
            size="sm"
            disabled={disabled}
          >
            Cargar más productos
          </Button>
        )}
        
        <Button
          onClick={onToggleOrderingMode}
          variant={isOrderingMode ? "primary" : "outline"}
          size="sm"
          disabled={disabled || loadedProducts === 0}
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
              <path d="M21 12c0 4.969-4.031 9-9 9s-9-4.031-9-9 4.031-9 9-9 9 4.031 9 9z"></path>
              <path d="M3 12h18"></path>
              <path d="M12 3v18"></path>
            </svg>
          }
        >
          {isOrderingMode ? 'Ordenación activa' : 'Activar ordenación'}
        </Button>
        
        {savedLayouts.length > 0 && (
          <LayoutSelect
            value={selectedLayout}
            onChange={handleLayoutChange}
            disabled={disabled}
          >
            <option value="">Cargar diseño guardado</option>
            {savedLayouts.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </LayoutSelect>
        )}
        
        <SaveLayoutButton
          onClick={handleSaveLayout}
          disabled={disabled || loadedProducts === 0}
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
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          Guardar
        </SaveLayoutButton>
        
        <Button
          onClick={onClearCategories}
          variant="outline"
          size="sm"
          disabled={disabled || loadedProducts === 0}
        >
          Limpiar
        </Button>
      </ControlsGroup>
    </ControlsContainer>
  );
};

export default ViewControls;
import React, { useMemo } from 'react';
import { ProductGridProps } from './ProductGrid.types';
import {
  GridContainer,
  OrderingModeMessage,
  ProductsGrid,
  NoProductsMessage,
  LoadingOverlay,
  LoadingSpinner
} from './ProductGrid.styles';
import ProductCard from '../ProductCard';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  layout,
  isOrderingMode,
  customOrder = {},
  onProductDragStart,
  onProductDragOver,
  onProductDrop,
  loading = false
}) => {
  // Ordenar productos según customOrder o posición original
  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];
    
    return productsCopy.sort((a, b) => {
      const posA = customOrder[a.id] !== undefined ? customOrder[a.id] : a.position || 0;
      const posB = customOrder[b.id] !== undefined ? customOrder[b.id] : b.position || 0;
      return posA - posB;
    });
  }, [products, customOrder]);

  if (loading) {
    return (
      <LoadingOverlay>
        <LoadingSpinner />
      </LoadingOverlay>
    );
  }

  if (products.length === 0) {
    return (
      <NoProductsMessage>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="64" 
          height="64" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
          <path d="M16.5 9.4 7.55 4.24"></path>
          <polyline points="3.29 7 12 12 20.71 7"></polyline>
          <line x1="12" y1="22" x2="12" y2="12"></line>
          <circle cx="18.5" cy="15.5" r="2.5"></circle>
          <path d="M20.27 17.27 22 19"></path>
        </svg>
        <h3>No hay productos para mostrar</h3>
        <p>Selecciona una o más categorías para ver sus productos</p>
      </NoProductsMessage>
    );
  }

  return (
    <GridContainer isOrderingMode={isOrderingMode}>
      {isOrderingMode && (
        <OrderingModeMessage>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 19V5"></path>
            <path d="m5 12 7-7 7 7"></path>
          </svg>
          Modo ordenación activo. Arrastra y suelta los productos para organizarlos.
        </OrderingModeMessage>
      )}
      
      <ProductsGrid layout={layout}>
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            layout={layout}
            isDraggable={isOrderingMode}
            onDragStart={onProductDragStart}
            onDragOver={onProductDragOver}
            onDrop={onProductDrop}
          />
        ))}
      </ProductsGrid>
    </GridContainer>
  );
};

export default ProductGrid;
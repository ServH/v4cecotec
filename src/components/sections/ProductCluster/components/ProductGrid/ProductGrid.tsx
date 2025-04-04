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
import EnhancedProductCard from '../ProductCard/EnhancedProductCard';
import { useProductsStore } from '@/stores/products';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  layout,
  isOrderingMode,
  customOrder = {},
  loading = false
}) => {
  // Ordenar productos según customOrder o posición original
  const sortedProducts = useMemo(() => {
    if (!isOrderingMode || Object.keys(customOrder).length === 0) {
      return products;
    }
    
    const productsCopy = [...products];
    
    return productsCopy.sort((a, b) => {
      const posA = customOrder[a.id] !== undefined ? Number(customOrder[a.id]) : (Number(a.position) || 0);
      const posB = customOrder[b.id] !== undefined ? Number(customOrder[b.id]) : (Number(b.position) || 0);
      return posA - posB;
    });
  }, [products, customOrder, isOrderingMode]);

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
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
        <h3>No hay productos para mostrar</h3>
        <p>Selecciona una o más categorías para ver sus productos</p>
      </NoProductsMessage>
    );
  }

  // Get Excel data from the store
  const { excelData } = useProductsStore();

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
          Los productos se muestran en el orden personalizado. Para cambiar el orden, usa el botón "Activar ordenación".
        </OrderingModeMessage>
      )}
      
      <ProductsGrid layout={layout}>
        {sortedProducts.map((product) => (
          <EnhancedProductCard
            key={product.id}
            product={product}
            layout={layout}
            isDraggable={false}
            excelData={excelData || undefined}
            showDetailedView={false} // Aseguramos que no se muestren detalles del Excel en la vista normal
          />
        ))}
      </ProductsGrid>
    </GridContainer>
  );
};

export default ProductGrid;
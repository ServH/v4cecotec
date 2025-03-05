import React, { useState } from 'react';
import { ProductCardProps } from './ProductCard.types';
import {
  CardContainer,
  StyledCard,
  CardImageContainer,
  CardImage,
  CardBody,
  CardTitle,
  CardPrice,
  CardDescription,
  StockBadge,
  CardFooter
} from './ProductCard.styles';

// Imagen de placeholder en base64 para evitar solicitudes fallidas
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDAgSDIwMCBWMjAwIEgwIFoiIGZpbGw9IiNFRUVFRUUiLz4KPHBhdGggZD0iTTk0LjkgMTExLjhDOTQuOSAxMTUuMyA5OC43IDExOC4yIDEwMy4zIDExOC4yQzEwNy45IDExOC4yIDExMS43IDExNS4zIDExMS43IDExMS44QzExMS43IDEwOC4zIDEwNy45IDEwNS40IDEwMy4zIDEwNS40Qzk4LjcgMTA1LjQgOTQuOSAxMDguMyA5NC45IDExMS44WiIgZmlsbD0iIzk5OSIvPgo8cGF0aCBkPSJNMTQ1LjggODcuNkMxNDUuOCA5OS4zIDEzNi4yIDEwOC44IDEyNC41IDEwOC44QzExMi44IDEwOC44IDEwMy4zIDk5LjMgMTAzLjMgODcuNkMxMDMuMyA3NS45IDExMi44IDY2LjQgMTI0LjUgNjYuNEMxMzYuMiA2Ni40IDE0NS44IDc1LjkgMTQ1LjggODcuNloiIGZpbGw9IiM5OTkiLz4KPHBhdGggZD0iTTEyNC41IDEyOC4xQzE1MC4xIDEyOC4xIDE3Ny4xIDE0MS4yIDE5Mi42IDE2Mi44TDE5Mi42IDEzMy43QzE3Ny4xIDExMi4xIDE1MC4xIDk5IDE4NC41IDk5QzE1OC45IDk5IDEzMS45IDExMi4xIDExNi40IDEzMy43TDExNi40IDE2Mi44QzEzMS45IDE0MS4yIDE1OC45IDEyOC4xIDEyNC41IDEyOC4xWiIgZmlsbD0iIzk5OSIvPgo8L3N2Zz4K';

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layout = 'grid',
  isDraggable = false,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  const [imageError, setImageError] = useState(false);

  // Registro para depuración - nos ayudará a entender por qué algunos productos no muestran datos
  console.log(`Renderizando ProductCard para: ${product.slug}`, { 
    name: product.name, 
    price: product.price, 
    image: product.image ? 'Tiene imagen' : 'Sin imagen', 
    stock: product.stock 
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (onDragStart && isDraggable) {
      onDragStart(e, product.id);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (onDragOver && isDraggable) {
      e.preventDefault();
      onDragOver(e);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (onDrop && isDraggable) {
      e.preventDefault();
      onDrop(e, product.id);
    }
  };

  const handleImageError = () => {
    console.log(`Error al cargar imagen para: ${product.slug}`);
    setImageError(true);
  };

  return (
    <CardContainer 
      layout={layout}
      isDraggable={isDraggable}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-product-id={product.id}
    >
      <StyledCard>
        <CardImageContainer layout={layout}>
          <CardImage 
            src={imageError || !product.image ? PLACEHOLDER_IMAGE : product.image}
            alt={product.name}
            onError={handleImageError}
          />
        </CardImageContainer>

        <CardBody layout={layout}>
          <CardTitle layout={layout}>{product.name || 'Producto sin nombre'}</CardTitle>
          
          <CardPrice layout={layout}>
            {product.price > 0 ? `${product.price.toFixed(2)}€` : 'Precio no disponible'}
          </CardPrice>
          
          {/* Stock badge siempre visible, incluso en vista compacta */}
          <StockBadge inStock={product.stock}>
            {product.stock ? 'En stock' : 'Sin stock'}
          </StockBadge>
          
          {layout !== 'compact' && product.description && (
            <CardDescription layout={layout}>
              {product.description}
            </CardDescription>
          )}
          
          {/* Se ha eliminado el footer con la categoría como solicitado */}
        </CardBody>
      </StyledCard>
    </CardContainer>
  );
};

export default ProductCard;
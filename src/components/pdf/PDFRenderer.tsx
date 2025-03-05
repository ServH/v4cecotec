// src/components/pdf/PDFRenderer.tsx
import React from 'react';
import { Product } from '@/stores/products/products.types';
import {
  PDFContainer,
  PDFHeader,
  PDFTitle,
  PDFSubtitle,
  PDFGrid,
  PDFProductCard,
  PDFProductImage,
  PDFProductInfo,
  PDFProductName,
  PDFProductPrice,
  PDFProductStock,
  PDFFooter,
  PDFPageNumber,
  PDFDateGenerated
} from './PDFRenderer.styles';

// Placeholder image for products without images
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDAgSDIwMCBWMjAwIEgwIFoiIGZpbGw9IiNFRUVFRUUiLz4KPHBhdGggZD0iTTk0LjkgMTExLjhDOTQuOSAxMTUuMyA5OC43IDExOC4yIDEwMy4zIDExOC4yQzEwNy45IDExOC4yIDExMS43IDExNS4zIDExMS43IDExMS44QzExMS43IDEwOC4zIDEwNy45IDEwNS40IDEwMy4zIDEwNS40Qzk4LjcgMTA1LjQgOTQuOSAxMDguMyA5NC45IDExMS44WiIgZmlsbD0iIzk5OSIvPgo8cGF0aCBkPSJNMTQ1LjggODcuNkMxNDUuOCA5OS4zIDEzNi4yIDEwOC44IDEyNC41IDEwOC44QzExMi44IDEwOC44IDEwMy4zIDk5LjMgMTAzLjMgODcuNkMxMDMuMyA3NS45IDExMi44IDY2LjQgMTI0LjUgNjYuNEMxMzYuMiA2Ni40IDE0NS44IDc1LjkgMTQ1LjggODcuNloiIGZpbGw9IiM5OTkiLz4KPHBhdGggZD0iTTEyNC41IDEyOC4xQzE1MC4xIDEyOC4xIDE3Ny4xIDE0MS4yIDE5Mi42IDE2Mi44TDE5Mi42IDEzMy43QzE3Ny4xIDExMi4xIDE1MC4xIDk5IDE4NC41IDk5QzE1OC45IDk5IDEzMS45IDExMi4xIDExNi40IDEzMy43TDExNi40IDE2Mi44QzEzMS45IDE0MS4yIDE1OC45IDEyOC4xIDEyNC41IDEyOC4xWiIgZmlsbD0iIzk5OSIvPgo8L3N2Zz4K';

interface PDFRendererProps {
  products: Product[];
  title: string;
  subtitle?: string;
  options: {
    showPrices: boolean;
    showStock: boolean;
    pageNumbers: boolean;
    dateGenerated: boolean;
  };
}

const PDFRenderer: React.FC<PDFRendererProps> = ({ 
  products, 
  title, 
  subtitle, 
  options 
}) => {
  const currentDate = new Date().toLocaleDateString();
  
  // Determinar el número de columnas según el número de productos
  // Adaptamos el número de columnas para mejorar la compatibilidad con PDF
  const numColumns = products.length > 12 ? 4 : 3;
  
  return (
    <PDFContainer id="pdf-content">
      <PDFHeader>
        <PDFTitle>{title}</PDFTitle>
        {subtitle && <PDFSubtitle>{subtitle}</PDFSubtitle>}
      </PDFHeader>

      <PDFGrid style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}>
        {products.map((product) => (
          <PDFProductCard key={product.id}>
            <PDFProductImage>
              <img 
                src={product.image || PLACEHOLDER_IMAGE} 
                alt={product.name} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                }}
              />
            </PDFProductImage>
            <PDFProductInfo>
              <PDFProductName>{product.name || 'Producto sin nombre'}</PDFProductName>
              
              {options.showPrices && (
                <PDFProductPrice>
                  {product.price > 0 ? `${product.price.toFixed(2)}€` : 'Precio no disponible'}
                </PDFProductPrice>
              )}
              
              {options.showStock && (
                <PDFProductStock inStock={product.stock}>
                  {product.stock ? 'En stock' : 'Sin stock'}
                </PDFProductStock>
              )}
            </PDFProductInfo>
          </PDFProductCard>
        ))}
      </PDFGrid>

      {(options.pageNumbers || options.dateGenerated) && (
        <PDFFooter>
          {options.pageNumbers && <PDFPageNumber>Página 1</PDFPageNumber>}
          {options.dateGenerated && <PDFDateGenerated>Generado: {currentDate}</PDFDateGenerated>}
        </PDFFooter>
      )}
    </PDFContainer>
  );
};

export default PDFRenderer;
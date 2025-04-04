import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Product } from '@/stores/products/products.types';
import { ProductExcelData } from '@/components/sections/ProductCluster/components/ExcelUploader/ExcelUploader';

// Styled components para la tarjeta
const CardContainer = styled.div<{ layout?: string; isDraggable?: boolean }>`
  position: relative;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: ${({ isDraggable }) => (isDraggable ? 'grab' : 'default')};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:active {
    cursor: ${({ isDraggable }) => (isDraggable ? 'grabbing' : 'default')};
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  background-color: white;
  box-shadow: ${theme.shadows.sm};
`;

const CardImageContainer = styled.div<{ layout?: string }>`
  position: relative;
  width: 100%;
  padding-top: 75%; /* Aspect ratio 4:3 para una mejor visualización */
  background-color: ${theme.colors.neutral[100]};
  overflow: hidden;
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  padding: ${theme.spacing[4]};
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${theme.spacing[4]};
`;

const CardTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
  min-height: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardPrice = styled.div`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary[700]};
  margin-bottom: ${theme.spacing[2]};
`;

const StockBadge = styled.span<{ inStock: boolean }>`
  display: inline-block;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.full};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.medium};
  margin-bottom: ${theme.spacing[3]};
  background-color: ${({ inStock }) => 
    inStock ? theme.colors.success.light : theme.colors.error.light};
  color: ${({ inStock }) => 
    inStock ? theme.colors.success.dark : theme.colors.error.dark};
`;

// Componentes para los datos del Excel
const ExcelDataContainer = styled.div`
  margin-top: ${theme.spacing[2]};
  border-top: 1px solid ${theme.colors.divider};
  padding-top: ${theme.spacing[2]};
`;

// Sección de detalles adicionales con fondo azul claro similar al Excel
const DetailsSectionHeader = styled.div`
  background-color: #e6f2ff; /* Color azul claro similar al Excel */
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  font-weight: ${theme.typography.fontWeights.medium};
  border-radius: ${theme.radii.sm};
  margin-bottom: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSizes.sm};
`;

// Campo de referencia con fondo similar al Excel
const ReferenceItem = styled.div`
  background-color: #e6f2ff; /* Color azul claro */
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.sm};
  margin-bottom: ${theme.spacing[2]};
  display: flex;
  flex-direction: column;
`;

// Campo de subcategoría con fondo similar al Excel
const CategoryItem = styled.div`
  background-color: #fff2e6; /* Color naranja claro */
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.sm};
  margin-bottom: ${theme.spacing[2]};
  display: flex;
  flex-direction: column;
`;

// Campos de orden con fondo similar al Excel
const OrderItem = styled.div`
  background-color: #e6ffe6; /* Color verde claro */
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.sm};
  margin-bottom: ${theme.spacing[2]};
  display: flex;
  flex-direction: column;
`;

// Item genérico
const DataItem = styled.div`
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.sm};
  margin-bottom: ${theme.spacing[2]};
  display: flex;
  flex-direction: column;
`;

const ItemLabel = styled.span`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.text.secondary};
`;

const ItemValue = styled.span`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.primary};
`;

// Item UPC en la parte superior
const UpcItem = styled.div`
  background-color: #2196f3; /* Color azul brillante */
  color: white;
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: ${theme.radii.md};
  margin-bottom: ${theme.spacing[3]};
  display: inline-block;
  font-weight: ${theme.typography.fontWeights.semibold};
  font-size: ${theme.typography.fontSizes.sm};
`;

// Componente para las imágenes de producto en formato más amigable
const ProductImage = styled.div`
  background-color: #f0f0f0; /* Color gris claro */
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.sm};
  margin-bottom: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSizes.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Componente para destacados
const HighlightItem = styled.div`
  background-color: #ffecb3; /* Color amarillo claro */
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.sm};
  margin-bottom: ${theme.spacing[2]};
  display: flex;
  flex-direction: column;
`;

// Placeholder image for missing product images
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDAgSDIwMCBWMjAwIEgwIFoiIGZpbGw9IiNFRUVFRUUiLz4KPHBhdGggZD0iTTk0LjkgMTExLjhDOTQuOSAxMTUuMyA5OC43IDExOC4yIDEwMy4zIDExOC4yQzEwNy45IDExOC4yIDExMS43IDExNS4zIDExMS43IDExMS44QzExMS43IDEwOC4zIDEwNy45IDEwNS40IDEwMy4zIDEwNS40Qzk4LjcgMTA1LjQgOTQuOSAxMDguMyA5NC45IDExMS44WiIgZmlsbD0iIzk5OSIvPgo8cGF0aCBkPSJNMTQ1LjggODcuNkMxNDUuOCA5OS4zIDEzNi4yIDEwOC44IDEyNC41IDEwOC44QzExMi44IDEwOC44IDEwMy4zIDk5LjMgMTAzLjMgODcuNkMxMDMuMyA3NS45IDExMi44IDY2LjQgMTI0LjUgNjYuNEMxMzYuMiA2Ni40IDE0NS44IDc1LjkgMTQ1LjggODcuNloiIGZpbGw9IiM5OTkiLz4KPHBhdGggZD0iTTEyNC41IDEyOC4xQzE1MC4xIDEyOC4xIDE3Ny4xIDE0MS4yIDE5Mi42IDE2Mi44TDE5Mi42IDEzMy43QzE3Ny4xIDExMi4xIDE1MC4xIDk5IDE4NC41IDk5QzE1OC45IDk5IDEzMS45IDExMi4xIDExNi40IDEzMy43TDExNi40IDE2Mi44QzEzMS45IDE0MS4yIDE1OC45IDEyOC4xIDEyNC41IDEyOC4xWiIgZmlsbD0iIzk5OSIvPgo8L3N2Zz4K';

interface EnhancedProductCardProps {
  product: Product;
  excelData?: ProductExcelData;
  layout?: 'grid' | 'list' | 'compact';
  isDraggable?: boolean;
  showDetailedView?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}

// Helper to find the product in the Excel data
const findProductInExcelData = (product: Product, excelData?: ProductExcelData): any => {
  if (!excelData) return null;
  
  // Normalizar el UPC - quitar el cero inicial si existe
  const upc = product.upc ? product.upc.replace(/^0+/, '') : '';
  if (upc && excelData[upc]) {
    return excelData[upc];
  }
  
  // Buscar por referencia si existe en el producto
  if (product.reference && excelData[product.reference]) {
    return excelData[product.reference];
  }
  
  // Buscar por coincidencia por otros campos
  for (const [key, data] of Object.entries(excelData)) {
    // Comprobar si key es igual al UPC sin ceros iniciales
    const normalizedKey = key.replace(/^0+/, '');
    if (upc && normalizedKey === upc) {
      return data;
    }
    
    // Buscar por referencia en los datos del Excel
    const excelRef = data.Referencia || data.referencia || data.REF || data.ref;
    if (excelRef && product.reference && excelRef.toString() === product.reference) {
      return data;
    }
    
    // Si fallan todos los métodos anteriores, buscar por nombre
    if (data.Nombre && product.name && 
        data.Nombre.toString().toLowerCase().includes(product.name.toLowerCase())) {
      return data;
    }
  }
  
  return null;
};

// Función para filtrar y ordenar los campos del excel que queremos mostrar
const extractExcelColumns = (productData: any) => {
  if (!productData) return null;
  
  const result: Record<string, any> = {};
  
  // Extraer referencia (Ref Cruce)
  const referencia = productData.Referencia || productData.referencia || productData['Ref Cruce'] || '';
  if (referencia) {
    result.referencia = referencia;
  }
  
  // Extraer subcategoría
  const subcategoria = productData.Subcategoria || productData.subcategoria || productData.Subcategoría || '';
  if (subcategoria) {
    result.subcategoria = subcategoria;
  }
  
  // Extraer órdenes
  const ordenHoja = productData['Orden Hoja PS'] || '';
  if (ordenHoja) {
    result.ordenHoja = ordenHoja;
  }
  
  const ordenColumna = productData['Orden Columna PS'] || '';
  if (ordenColumna) {
    result.ordenColumna = ordenColumna;
  }
  
  // Extraer imagen del producto
  const imagenProducto = productData['Imagen Producto'] || '';
  if (imagenProducto) {
    result.imagenProducto = imagenProducto;
  }
  
  // Extraer highlights
  const highlight1 = productData['Highlight 1'] || '';
  if (highlight1) {
    result.highlight1 = highlight1;
  }
  
  const highlight3 = productData['Highlight 3'] || '';
  if (highlight3) {
    result.highlight3 = highlight3;
  }
  
  // Extraer campos de precios y márgenes si existen
  const fieldPrefixes = ['P.PVP', 'PVPr', 'Margen', 'C.F', 'P1', 'P2', 'P3', 'P4', 'P5', 'NV', 'UPC', 'CMP'];
  
  for (const [key, value] of Object.entries(productData)) {
    if (value === null || value === undefined || value === '') continue;
    
    // Si la clave comienza con alguno de los prefijos, la incluimos
    for (const prefix of fieldPrefixes) {
      if (key.startsWith(prefix)) {
        result[key] = value;
        break;
      }
    }
  }
  
  return result;
};

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({
  product,
  excelData,
  layout = 'grid',
  isDraggable = false,
  showDetailedView = false,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Find this product in the Excel data
  const productExcelData = findProductInExcelData(product, excelData);
  
  // Extraer campos relevantes
  const excelColumns = extractExcelColumns(productExcelData);
  
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
    setImageError(true);
  };

  // UPC normalizado para mostrar
  const upcDisplay = product.upc ? product.upc.replace(/^0+/, '') : '';

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
          {/* Datos básicos visibles siempre */}
          {showDetailedView && upcDisplay && (
            <UpcItem>UPC: {upcDisplay}</UpcItem>
          )}
          
          <CardTitle layout={layout}>
            {productExcelData?.Nombre || product.name || 'Producto sin nombre'}
          </CardTitle>
          
          <CardPrice layout={layout}>
            {product.price > 0 ? `${product.price.toFixed(2)}€` : 'Precio no disponible'}
          </CardPrice>
          
          <StockBadge inStock={product.stock}>
            {product.stock ? 'En stock' : 'Sin stock'}
          </StockBadge>
          
          {/* Mostrar datos del Excel en modo ordenación */}
          {showDetailedView && excelColumns && (
            <ExcelDataContainer>
              <DetailsSectionHeader>Detalles adicionales</DetailsSectionHeader>
              
              {excelColumns.referencia && (
                <ReferenceItem>
                  <ItemLabel>Ref Cruce</ItemLabel>
                  <ItemValue>{excelColumns.referencia}</ItemValue>
                </ReferenceItem>
              )}
              
              {excelColumns.subcategoria && (
                <CategoryItem>
                  <ItemLabel>Subcategoría</ItemLabel>
                  <ItemValue>{excelColumns.subcategoria}</ItemValue>
                </CategoryItem>
              )}
              
              {excelColumns.ordenHoja && (
                <OrderItem>
                  <ItemLabel>Orden Hoja PS</ItemLabel>
                  <ItemValue>{excelColumns.ordenHoja}</ItemValue>
                </OrderItem>
              )}
              
              {excelColumns.ordenColumna && (
                <OrderItem>
                  <ItemLabel>Orden Columna PS</ItemLabel>
                  <ItemValue>{excelColumns.ordenColumna}</ItemValue>
                </OrderItem>
              )}
              
              {excelColumns.imagenProducto && (
                <ProductImage>
                  <ItemLabel>Imagen Producto</ItemLabel>
                  <ItemValue>{excelColumns.imagenProducto}</ItemValue>
                </ProductImage>
              )}
              
              {excelColumns.highlight1 && (
                <HighlightItem>
                  <ItemLabel>Highlight 1</ItemLabel>
                  <ItemValue>{excelColumns.highlight1}</ItemValue>
                </HighlightItem>
              )}
              
              {excelColumns.highlight3 && (
                <HighlightItem>
                  <ItemLabel>Highlight 3</ItemLabel>
                  <ItemValue>{excelColumns.highlight3}</ItemValue>
                </HighlightItem>
              )}
              
              {/* Mostrar otros campos financieros si existen */}
              {Object.entries(excelColumns).map(([key, value]) => {
                // Omitir los que ya mostramos específicamente
                if (['referencia', 'subcategoria', 'ordenHoja', 'ordenColumna', 
                     'imagenProducto', 'highlight1', 'highlight3'].includes(key)) {
                  return null;
                }
                
                return (
                  <DataItem key={key}>
                    <ItemLabel>{key}</ItemLabel>
                    <ItemValue>{value}</ItemValue>
                  </DataItem>
                );
              })}
            </ExcelDataContainer>
          )}
        </CardBody>
      </StyledCard>
    </CardContainer>
  );
};

export default EnhancedProductCard;
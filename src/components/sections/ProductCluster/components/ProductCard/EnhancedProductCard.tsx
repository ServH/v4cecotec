import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Product } from '@/stores/products/products.types';
import { ProductExcelData } from '@/components/sections/ProductCluster/components/ExcelUploader/ExcelUploader';

// Styled components for the enhanced card
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
 padding-top: 100%; /* Aspect ratio 1:1 */
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
 min-height: 48px;
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

// Specific excel data display components
const ExcelDataContainer = styled.div`
 margin-top: ${theme.spacing[3]};
 border-top: 1px solid ${theme.colors.divider};
 padding-top: ${theme.spacing[3]};
`;

const SpecSection = styled.div`
 margin-bottom: ${theme.spacing[3]};
`;

const SpecTitle = styled.h4`
 font-size: ${theme.typography.fontSizes.sm};
 font-weight: ${theme.typography.fontWeights.semibold};
 color: ${theme.colors.text.primary};
 margin-bottom: ${theme.spacing[2]};
 padding: ${theme.spacing[1]} ${theme.spacing[2]};
 background-color: ${theme.colors.primary[50]};
 border-radius: ${theme.radii.md};
`;

const SpecTable = styled.div`
 display: grid;
 grid-template-columns: 1fr 1fr;
 gap: ${theme.spacing[1]};
 margin-bottom: ${theme.spacing[2]};
`;

const SpecItem = styled.div<{ highlight?: boolean }>`
 display: flex;
 flex-direction: column;
 padding: ${theme.spacing[1]} ${theme.spacing[2]};
 border-radius: ${theme.radii.sm};
 background-color: ${({ highlight }) => highlight ? theme.colors.primary[50] : 'transparent'};
`;

const SpecLabel = styled.span`
 font-size: ${theme.typography.fontSizes.xs};
 color: ${theme.colors.text.secondary};
`;

const SpecValue = styled.span<{ highlight?: boolean }>`
 font-size: ${theme.typography.fontSizes.sm};
 font-weight: ${({ highlight }) => highlight ? theme.typography.fontWeights.semibold : theme.typography.fontWeights.medium};
 color: ${({ highlight }) => highlight ? theme.colors.primary[700] : theme.colors.text.primary};
`;

const FeatureList = styled.ul`
 list-style: none;
 padding: 0;
 margin: 0;
`;

const FeatureItem = styled.li`
 display: flex;
 align-items: center;
 font-size: ${theme.typography.fontSizes.sm};
 margin-bottom: ${theme.spacing[1]};
 
 &:before {
   content: "•";
   color: ${theme.colors.primary[500]};
   font-weight: bold;
   margin-right: ${theme.spacing[2]};
 }
`;

const ModelBox = styled.div`
 background-color: ${theme.colors.primary[700]};
 color: white;
 border-radius: ${theme.radii.md};
 padding: ${theme.spacing[2]} ${theme.spacing[3]};
 font-weight: ${theme.typography.fontWeights.semibold};
 font-size: ${theme.typography.fontSizes.sm};
 margin-bottom: ${theme.spacing[3]};
 display: inline-block;
`;

// Placeholder image for missing product images
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDAgSDIwMCBWMjAwIEgwIFoiIGZpbGw9IiNFRUVFRUUiLz4KPHBhdGggZD0iTTk0LjkgMTExLjhDOTQuOSAxMTUuMyA5OC43IDExOC4yIDEwMy4zIDExOC4yQzEwNy45IDExOC4yIDExMS43IDExNS4zIDExMS43IDExMS44QzExMS43IDEwOC4zIDEwNy45IDEwNS40IDEwMy4zIDEwNS40Qzk4LjcgMTA1LjQgOTQuOSAxMDguMyA5NC45IDExMS44WiIgZmlsbD0iIzk5OSIvPgo8cGF0aCBkPSJNMTQ1LjggODcuNkMxNDUuOCA5OS4zIDEzNi4yIDEwOC44IDEyNC41IDEwOC44QzExMi44IDEwOC44IDEwMy4zIDk5LjMgMTAzLjMgODcuNkMxMDMuMyA3NS45IDExMi44IDY2LjQgMTI0LjUgNjYuNEMxMzYuMiA2Ni40IDE0NS44IDc1LjkgMTQ1LjggODcuNloiIGZpbGw9IiM5OTkiLz4KPHBhdGggZD0iTTEyNC41IDEyOC4xQzE1MC4xIDEyOC4xIDE3Ny4xIDE0MS4yIDE5Mi42IDE2Mi44TDE5Mi42IDEzMy43QzE3Ny4xIDExMi4xIDE1MC4xIDk5IDE4NC41IDk5QzE1OC45IDk5IDEzMS45IDExMi4xIDExNi40IDEzMy43TDExNi40IDE2Mi44QzEzMS45IDE0MS4yIDE1OC45IDEyOC4xIDEyNC41IDEyOC4xWiIgZmlsbD0iIzk5OSIvPgo8L3N2Zz4K';

interface EnhancedProductCardProps {
 product: Product;
 excelData?: ProductExcelData;
 layout?: 'grid' | 'list' | 'compact';
 isDraggable?: boolean;
 onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
 onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
 onDrop?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}

// Helper to find the product in the Excel data
const findProductInExcelData = (product: Product, excelData?: ProductExcelData): any => {
 if (!excelData) return null;
 
 // Try to find the product by id
 if (excelData[product.id]) {
   return excelData[product.id];
 }
 
 // Try to find by name (exact match)
 if (product.name && excelData[product.name]) {
   return excelData[product.name];
 }
 
 // Try to find by name in lowercase (case-insensitive match)
 const nameLower = product.name.toLowerCase();
 if (nameLower && excelData[nameLower]) {
   return excelData[nameLower];
 }
 
 // Try to find by partial match in product name
 const normalizedName = product.name.toLowerCase().trim();
 const normalizedSlug = product.slug.toLowerCase().trim();
 
 for (const [key, data] of Object.entries(excelData)) {
   // Try matching by Nombre
   const excelName = data.Nombre?.toLowerCase()?.trim() || '';
   // Try matching by Modelo
   const excelModel = data.Modelo?.toLowerCase()?.trim() || '';
   
   if (
     excelName.includes(normalizedName) || 
     normalizedName.includes(excelName) ||
     excelModel.includes(normalizedSlug) ||
     normalizedSlug.includes(excelModel)
   ) {
     return data;
   }
 }
 
 return null;
};

// Helper to extract columns in the AL-BQ range
const extractTargetColumnsData = (productData: any) => {
 if (!productData) return null;
 
 // Filter for columns within AL-BQ range
 const result: { [key: string]: any } = {};
 
 // Define the column range (AL = 37, BQ = 68)
 const startCol = 37; // AL
 const endCol = 68;   // BQ
 
 // Map of column indices to Excel column names
 const colIndexToName: { [key: number]: string } = {};
 for (let i = startCol; i <= endCol; i++) {
   const colName = String.fromCharCode(Math.floor(i / 26) + 64) + String.fromCharCode((i % 26) + 65);
   colIndexToName[i] = colName;
 }
 
 // Extract data from the columns in range
 Object.entries(productData).forEach(([key, value]) => {
   // Include specific columns of interest regardless of their position
   const importantColumns = ['Modelo', 'Nombre', 'Peso', 'Color', 'Material', 'Dimensiones'];
   if (importantColumns.includes(key)) {
     result[key] = value;
   }
   
   // Check if the column name might be in our target range
   for (let i = startCol; i <= endCol; i++) {
     const colName = colIndexToName[i];
     if (key === colName || key.includes(colName)) {
       result[key] = value;
     }
   }
 });
 
 return result;
};

// Format data for display
const formatDisplayData = (productData: any) => {
 if (!productData) return null;
 
 // Group data into logical sections
 const specs = {
   basic: [] as { label: string; value: any }[],
   dimensions: [] as { label: string; value: any }[],
   features: [] as string[],
   highlights: [] as { label: string; value: any }[]
 };
 
 // Process each key in the extracted data
 for (const key of Object.keys(productData)) {
   const value = productData[key];
   if (value === undefined || value === null || value === '') continue;
   
   // Categorize the data into sections
   if (['Altura', 'Ancho', 'Profundidad', 'Dimensiones'].includes(key)) {
     specs.dimensions.push({ label: key, value });
   } else if (key.includes('Características') || key.includes('Feature')) {
     if (typeof value === 'string') {
       // Split by delimiters
       const features = value.split(/[,;.\n]/).filter(f => f.trim()).map(f => f.trim());
       specs.features.push(...features);
     } else {
       specs.features.push(String(value));
     }
   } else if (['Modelo', 'Material', 'Color'].includes(key)) {
     specs.highlights.push({ label: key, value });
   } else {
     // Everything else goes to basic specs
     specs.basic.push({ label: key, value });
   }
 }
 
 return specs;
};

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({
 product,
 excelData,
 layout = 'grid',
 isDraggable = false,
 onDragStart,
 onDragOver,
 onDrop
}) => {
 const [imageError, setImageError] = useState(false);
 
 // Find this product in the Excel data
 const productExcelData = findProductInExcelData(product, excelData);
 
 // Extract target columns data
 const extractedData = extractTargetColumnsData(productExcelData);
 
 // Format the data for display
 const formattedData = formatDisplayData(extractedData);
 
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

 // Get product model from Excel data or from product itself
 const productModel = productExcelData?.Modelo || product.id;

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
         {productExcelData?.Modelo && (
           <ModelBox>{productExcelData.Modelo}</ModelBox>
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
         
         {formattedData && (
           <ExcelDataContainer>
             {formattedData.highlights.length > 0 && (
               <SpecSection>
                 <SpecTitle>Características Destacadas</SpecTitle>
                 <SpecTable>
                   {formattedData.highlights.map((spec, idx) => (
                     <SpecItem key={idx} highlight={true}>
                       <SpecLabel>{spec.label}</SpecLabel>
                       <SpecValue highlight={true}>{spec.value}</SpecValue>
                     </SpecItem>
                   ))}
                 </SpecTable>
               </SpecSection>
             )}
             
             {formattedData.dimensions.length > 0 && (
               <SpecSection>
                 <SpecTitle>Dimensiones</SpecTitle>
                 <SpecTable>
                   {formattedData.dimensions.map((spec, idx) => (
                     <SpecItem key={idx}>
                       <SpecLabel>{spec.label}</SpecLabel>
                       <SpecValue>{spec.value}</SpecValue>
                     </SpecItem>
                   ))}
                 </SpecTable>
               </SpecSection>
             )}
             
             {formattedData.basic.length > 0 && (
               <SpecSection>
                 <SpecTitle>Especificaciones</SpecTitle>
                 <SpecTable>
                   {formattedData.basic.map((spec, idx) => (
                     <SpecItem key={idx}>
                       <SpecLabel>{spec.label}</SpecLabel>
                       <SpecValue>{spec.value}</SpecValue>
                     </SpecItem>
                   ))}
                 </SpecTable>
               </SpecSection>
             )}
             
             {formattedData.features.length > 0 && (
               <SpecSection>
                 <SpecTitle>Características</SpecTitle>
                 <FeatureList>
                   {formattedData.features.map((feature, idx) => (
                     <FeatureItem key={idx}>{feature}</FeatureItem>
                   ))}
                 </FeatureList>
               </SpecSection>
             )}
           </ExcelDataContainer>
         )}
       </CardBody>
     </StyledCard>
   </CardContainer>
 );
};

export default EnhancedProductCard;
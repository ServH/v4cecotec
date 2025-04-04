import React, { useState, useEffect, useMemo } from 'react';
import { ProductClusterProps } from './ProductCluster.types';
import { useProductsStore } from '@/stores/products';
import { Product, ProductExcelData } from '@/stores/products/products.types';
import {
  ClusterContainer,
  ClusterHeader,
  ClusterTitle,
  ClusterDescription,
  LoadingContainer,
  SaveLayoutModalOverlay,
  SaveLayoutModal,
  ModalTitle,
  ModalForm,
  ButtonGroup
} from './ProductCluster.styles';
import Container from '@/components/layout/Container';
import CategorySelector from './components/CategorySelector';
import ViewControls from './components/ViewControls';
import ProductGrid from './components/ProductGrid';
import PDFExporter from './components/PDFExporter';
import OrderingModal from './components/OrderingModal';
import ExcelUploader, { ExcelData } from './components/ExcelUploader/ExcelUploader';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export const ProductCluster: React.FC<ProductClusterProps> = ({
  categoriesTree,
  slugs
}) => {
  const {
    products,
    selectedCategories,
    loading,
    gridLayout,
    orderingMode,
    customOrder,
    excelData,
    isExcelLoaded,
    selectCategory,
    deselectCategory,
    clearSelectedCategories,
    fetchProducts,
    setGridLayout,
    toggleOrderingMode,
    updateProductOrder,
    saveCustomOrder,
    saveCurrentLayout,
    loadSavedLayout,
    setExcelData
  } = useProductsStore();
  
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isPdfExporterOpen, setIsPdfExporterOpen] = useState(false);
  const [isOrderingModalOpen, setIsOrderingModalOpen] = useState(false);
  const [layoutName, setLayoutName] = useState('');
  const [savedLayouts, setSavedLayouts] = useState<string[]>([]);
  const [productLimit, setProductLimit] = useState<number>(10);
  const [allProductSlugs, setAllProductSlugs] = useState<Record<string, string[]>>({});
  
  // Cargar layouts guardados al montar el componente
  useEffect(() => {
    try {
      const stored = localStorage.getItem('productLayouts');
      if (stored) {
        const layouts = JSON.parse(stored);
        setSavedLayouts(layouts.map((layout: any) => layout.name));
      }
    } catch (error) {
      console.error('Error loading saved layouts:', error);
    }
  }, []);
  
  // Todos los productos combinados de las categorías seleccionadas
  const allProducts = useMemo(() => {
    let productList: Product[] = [];
    
    selectedCategories.forEach(slug => {
      if (products[slug]) {
        productList.push(...products[slug]);
      }
    });
    
    if (orderingMode && Object.keys(customOrder).length > 0) {
      // Ordenar según customOrder
      productList.sort((a, b) => {
        // Asegurarse de que las posiciones son números
        const posA = customOrder[a.id] !== undefined ? Number(customOrder[a.id]) : (Number(a.position) || 0);
        const posB = customOrder[b.id] !== undefined ? Number(customOrder[b.id]) : (Number(b.position) || 0);
        return posA - posB;
      });
    }
    
    return productList;
  }, [products, selectedCategories, orderingMode, customOrder]);
  
  // Total de productos disponibles (incluidos los no cargados)
  const totalProductCount = useMemo(() => {
    let total = 0;
    
    selectedCategories.forEach(slug => {
      if (allProductSlugs[slug]) {
        total += allProductSlugs[slug].length;
      } else {
        // Si no tenemos información, usamos la cantidad de productos cargados
        total += products[slug]?.length || 0;
      }
    });
    
    return total;
  }, [selectedCategories, allProductSlugs, products]);
  
  // Abrir modal para guardar layout
  const handleOpenSaveModal = () => {
    setIsSaveModalOpen(true);
    setLayoutName('');
  };
  
  // Guardar layout con nombre
  const handleSaveLayout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (layoutName.trim()) {
      saveCurrentLayout(layoutName.trim());
      setSavedLayouts(prev => {
        if (prev.includes(layoutName.trim())) {
          return prev;
        }
        return [...prev, layoutName.trim()];
      });
      setIsSaveModalOpen(false);
    }
  };
  
  // Cargar layout guardado
  const handleLoadLayout = (name: string) => {
    loadSavedLayout(name);
  };
  
  // Cambiar el límite de productos
  const handleChangeProductLimit = (limit: number) => {
    setProductLimit(limit);
    
    // Si el nuevo límite es mayor, cargar más productos
    if (limit === 0 || limit > productLimit) {
      selectedCategories.forEach(slug => {
        fetchProducts(slug, limit);
      });
    }
  };
  
  // Cargar más productos
  const handleLoadMoreProducts = () => {
    selectedCategories.forEach(slug => {
      const currentCount = products[slug]?.length || 0;
      const newLimit = currentCount + productLimit;
      fetchProducts(slug, newLimit);
    });
  };
  
  // Abrir exportador de PDF
  const handleOpenPdfExporter = () => {
    setIsPdfExporterOpen(true);
  };
  
  // Cerrar exportador de PDF
  const handleClosePdfExporter = () => {
    setIsPdfExporterOpen(false);
  };
  
  // Abrir/cerrar modal de ordenación
  const handleToggleOrderingModal = () => {
    setIsOrderingModalOpen(!isOrderingModalOpen);
  };
  
  // Guardar orden personalizado de productos
  const handleSaveOrder = (newOrder: Record<string, number>) => {
    // Actualizar el orden en el store
    Object.entries(newOrder).forEach(([id, position]) => {
      updateProductOrder(id, position);
    });
    
    // Guardar el orden actualizado
    saveCustomOrder();
    
    // Activar el modo ordenación en el store para que se aplique el orden
    if (!orderingMode) {
      toggleOrderingMode();
    }
  };
  
  // Handle PDF export
  const handleExport = async () => {
    if (!hiddenPdfRef.current) return;
    
    setCurrentStep('generating');
    
    try {
      await generatePDF(hiddenPdfRef.current, {
        filename: options.filename.endsWith('.pdf') ? options.filename : `${options.filename}.pdf`,
        orientation: options.orientation
      });
      onClose();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Inténtalo de nuevo.');
      setCurrentStep('preview');
    }
  };
  
  // Handle Excel file upload
  const handleExcelDataLoaded = (data: ExcelData, productMapping: ProductExcelData) => {
    console.log('Excel data loaded:', Object.keys(data).length, 'sheets');
    console.log('Product mapping created with', Object.keys(productMapping).length, 'products');
    
    // Update the store with the Excel data
    setExcelData(productMapping);
  };
  
  // Cargar productos
  useEffect(() => {
    if (selectedCategories.length > 0) {
      selectedCategories.forEach(slug => {
        fetchProducts(slug, productLimit);
      });
    }
  }, [selectedCategories, fetchProducts, productLimit]);
  
  return (
    <ClusterContainer>
      <Container>
        <ClusterHeader>
          <ClusterTitle>Cluster de Productos</ClusterTitle>
          <ClusterDescription>
            Primero sube el archivo Excel con los detalles de los productos, luego selecciona categorías para visualizar y organizar los productos.
          </ClusterDescription>
        </ClusterHeader>
        
        {/* Excel Uploader - Must be loaded before category selection */}
        <ExcelUploader 
          onExcelDataLoaded={handleExcelDataLoaded}
          isLoaded={isExcelLoaded}
        />
        
        <CategorySelector
          categoriesTree={categoriesTree}
          slugs={slugs}
          selectedCategories={selectedCategories}
          onSelectCategory={selectCategory}
          onDeselectCategory={deselectCategory}
          disabled={loading || !isExcelLoaded}
        />
        
        <ViewControls
          totalProducts={totalProductCount}
          loadedProducts={allProducts.length}
          layout={gridLayout}
          onChangeLayout={setGridLayout}
          isOrderingMode={orderingMode}
          onToggleOrderingMode={handleToggleOrderingModal}
          savedLayouts={savedLayouts}
          onSaveLayout={handleOpenSaveModal}
          onLoadLayout={handleLoadLayout}
          onClearCategories={clearSelectedCategories}
          onLoadMoreProducts={handleLoadMoreProducts}
          productLimit={productLimit}
          onChangeProductLimit={handleChangeProductLimit}
          onExportPdf={handleOpenPdfExporter}
          disabled={loading}
        />
        
        {loading ? (
          <LoadingContainer>
            <div>Cargando productos...</div>
          </LoadingContainer>
        ) : (
          <ProductGrid
            products={allProducts}
            layout={gridLayout}
            isOrderingMode={orderingMode}
            customOrder={customOrder}
            loading={loading}
          />
        )}
        
        {/* Save Layout Modal */}
        {isSaveModalOpen && (
          <SaveLayoutModalOverlay>
            <SaveLayoutModal>
              <ModalTitle>Guardar Diseño</ModalTitle>
              <ModalForm onSubmit={handleSaveLayout}>
                <Input
                  label="Nombre del diseño"
                  value={layoutName}
                  onChange={(e) => setLayoutName(e.target.value)}
                  placeholder="Mi diseño personalizado"
                  required
                />
                <ButtonGroup>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSaveModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={!layoutName.trim()}
                  >
                    Guardar
                  </Button>
                </ButtonGroup>
              </ModalForm>
            </SaveLayoutModal>
          </SaveLayoutModalOverlay>
        )}
        
        {/* PDF Exporter */}
        {isPdfExporterOpen && (
          <PDFExporter
            products={allProducts}
            onClose={handleClosePdfExporter}
          />
        )}
        
        {/* Ordering Modal */}
        <OrderingModal
          isOpen={isOrderingModalOpen}
          onClose={handleToggleOrderingModal}
          products={allProducts}
          layout={gridLayout}
          onSaveOrder={handleSaveOrder}
          initialCustomOrder={customOrder}
        />
      </Container>
    </ClusterContainer>
  );
};

export default ProductCluster;
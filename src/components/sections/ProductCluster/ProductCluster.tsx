import React, { useState, useEffect, useMemo } from 'react';
import { ProductClusterProps } from './ProductCluster.types';
import { useProductsStore } from '@/stores/products';
import { Product } from '@/stores/products/products.types';
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
    selectCategory,
    deselectCategory,
    clearSelectedCategories,
    fetchProducts,
    setGridLayout,
    toggleOrderingMode,
    updateProductOrder,
    saveCustomOrder,
    saveCurrentLayout,
    loadSavedLayout
  } = useProductsStore();
  
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [layoutName, setLayoutName] = useState('');
  const [draggedProductId, setDraggedProductId] = useState<string | null>(null);
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
    const productList: Product[] = [];
    
    selectedCategories.forEach(slug => {
      if (products[slug]) {
        productList.push(...products[slug]);
      }
    });
    
    return productList;
  }, [products, selectedCategories]);
  
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
  
  // Manejar el inicio del arrastre de un producto
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggedProductId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Hace que la imagen arrastrada sea transparente
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };
  
  // Manejar el arrastre sobre un producto
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  // Manejar el soltado de un producto
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    
    if (draggedProductId && draggedProductId !== targetId) {
      // Encontrar las posiciones actuales
      const draggedIndex = allProducts.findIndex(p => p.id === draggedProductId);
      const targetIndex = allProducts.findIndex(p => p.id === targetId);
      
      if (draggedIndex >= 0 && targetIndex >= 0) {
        updateProductOrder(draggedProductId, targetIndex);
        saveCustomOrder();
      }
    }
    
    setDraggedProductId(null);
  };
  
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
            Selecciona categorías para visualizar y organizar sus productos. Puedes guardar tus diseños personalizados.
          </ClusterDescription>
        </ClusterHeader>
        
        <CategorySelector
          categoriesTree={categoriesTree}
          slugs={slugs}
          selectedCategories={selectedCategories}
          onSelectCategory={selectCategory}
          onDeselectCategory={deselectCategory}
          disabled={loading}
        />
        
        <ViewControls
          totalProducts={totalProductCount}
          loadedProducts={allProducts.length}
          layout={gridLayout}
          onChangeLayout={setGridLayout}
          isOrderingMode={orderingMode}
          onToggleOrderingMode={toggleOrderingMode}
          savedLayouts={savedLayouts}
          onSaveLayout={handleOpenSaveModal}
          onLoadLayout={handleLoadLayout}
          onClearCategories={clearSelectedCategories}
          onLoadMoreProducts={handleLoadMoreProducts}
          productLimit={productLimit}
          onChangeProductLimit={handleChangeProductLimit}
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
            onProductDragStart={handleDragStart}
            onProductDragOver={handleDragOver}
            onProductDrop={handleDrop}
          />
        )}
        
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
      </Container>
    </ClusterContainer>
  );
};

export default ProductCluster;
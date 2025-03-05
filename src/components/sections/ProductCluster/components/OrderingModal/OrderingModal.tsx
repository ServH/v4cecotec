import React, { useState, useEffect, useRef } from 'react';
import { OrderingModalProps } from './OrderingModal.types';
import { Product } from '@/stores/products/products.types';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  HeaderTitle,
  HeaderControls,
  ModalContent,
  InstructionsPanel,
  InstructionIcon,
  InstructionText,
  ProductsContainer,
  ProductsGrid,
  DragPreview,
  OrderControls,
  OrderOption
} from './OrderingModal.styles';
import DraggableProductCard from './components/DraggableProductCard';
import ProductCard from '../ProductCard';
import Button from '@/components/ui/Button';

const OrderingModal: React.FC<OrderingModalProps> = ({
  isOpen,
  onClose,
  products,
  layout,
  onSaveOrder,
  initialCustomOrder = {}
}) => {
  const [orderedProducts, setOrderedProducts] = useState<Product[]>([]);
  const [draggingProduct, setDraggingProduct] = useState<Product | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number>(-1);
  const [dropIndex, setDropIndex] = useState<number>(-1);
  const [customOrder, setCustomOrder] = useState<Record<string, number>>(initialCustomOrder);
  const [dragPreviewPosition, setDragPreviewPosition] = useState({ x: 0, y: 0 });
  const [activeSort, setActiveSort] = useState<string>('custom');
  
  const dragPreviewRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  
  // Inicializar productos ordenados
  useEffect(() => {
    if (products.length > 0) {
      const sorted = [...products];
      
      // Aplicar ordenación personalizada actual
      if (Object.keys(initialCustomOrder).length > 0) {
        sorted.sort((a, b) => {
          const posA = initialCustomOrder[a.id] !== undefined ? 
            Number(initialCustomOrder[a.id]) : Number(a.position) || 0;
          const posB = initialCustomOrder[b.id] !== undefined ? 
            Number(initialCustomOrder[b.id]) : Number(b.position) || 0;
          return posA - posB;
        });
      }
      
      setOrderedProducts(sorted);
    }
  }, [products, initialCustomOrder]);
  
  // Manejar ordenación por diferentes criterios
  const handleSort = (sortType: string) => {
    setActiveSort(sortType);
    const sorted = [...orderedProducts];
    
    switch (sortType) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'custom':
        // Volver a la ordenación personalizada
        if (Object.keys(customOrder).length > 0) {
          sorted.sort((a, b) => {
            const posA = customOrder[a.id] !== undefined ? 
              Number(customOrder[a.id]) : Number(a.position) || 0;
            const posB = customOrder[b.id] !== undefined ? 
              Number(customOrder[b.id]) : Number(b.position) || 0;
            return posA - posB;
          });
        }
        break;
    }
    
    setOrderedProducts(sorted);
    
    // Actualizar el orden personalizado con las posiciones actuales
    const newOrder: Record<string, number> = {};
    sorted.forEach((product, index) => {
      newOrder[product.id] = index;
    });
    setCustomOrder(newOrder);
  };
  
  // Manejar el inicio del arrastre
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: Product, index: number) => {
    setDraggingProduct(product);
    setDraggingIndex(index);
    
    // Configurar para mover el preview junto con el cursor
    const updatePreviewPosition = (moveEvent: MouseEvent) => {
      setDragPreviewPosition({
        x: moveEvent.clientX + 20,
        y: moveEvent.clientY - 40
      });
    };
    
    document.addEventListener('mousemove', updatePreviewPosition);
    
    // Limpiar al finalizar
    e.dataTransfer.setData('text/plain', product.id);
    
    // Manejar finalización del arrastre
    const handleDragEnd = () => {
      document.removeEventListener('mousemove', updatePreviewPosition);
      document.removeEventListener('dragend', handleDragEnd);
    };
    
    document.addEventListener('dragend', handleDragEnd);
  };
  
  // Manejar el arrastre sobre un elemento
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggingIndex === index) return;
    
    setDropIndex(index);
  };
  
  // Manejar el fin del arrastre
  const handleDragEnd = () => {
    setDraggingProduct(null);
    setDraggingIndex(-1);
    setDropIndex(-1);
    document.body.classList.remove('dragging-active');
  };
  
  // Manejar el momento de soltar
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    
    if (draggingIndex === -1 || draggingIndex === targetIndex) {
      handleDragEnd();
      return;
    }
    
    // Reordenar los productos
    const newOrderedProducts = [...orderedProducts];
    const [removedProduct] = newOrderedProducts.splice(draggingIndex, 1);
    newOrderedProducts.splice(targetIndex, 0, removedProduct);
    
    // Actualizar el estado
    setOrderedProducts(newOrderedProducts);
    
    // Actualizar el orden personalizado
    const newOrder: Record<string, number> = {};
    newOrderedProducts.forEach((product, index) => {
      newOrder[product.id] = index;
    });
    setCustomOrder(newOrder);
    
    // Establecer la ordenación como personalizada
    setActiveSort('custom');
    
    handleDragEnd();
  };
  
  // Guardar y cerrar
  const handleSave = () => {
    onSaveOrder(customOrder);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <HeaderTitle>Modo Ordenación</HeaderTitle>
          <HeaderControls>
            <Button 
              variant="outline" 
              onClick={onClose}
              size="sm"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              size="sm"
            >
              Guardar y Salir
            </Button>
          </HeaderControls>
        </ModalHeader>
        
        <ModalContent>
          <InstructionsPanel>
            <InstructionIcon>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 15V3m0 12 4-4m-4 4-4-4" />
                <path d="M8 10H4v10h16V10h-4" />
              </svg>
            </InstructionIcon>
            <InstructionText>
              <h3>Ordena tus productos como prefieras</h3>
              <p>Arrastra y suelta los productos para cambiar su orden. También puedes usar los botones de ordenación rápida para organizarlos automáticamente.</p>
            </InstructionText>
          </InstructionsPanel>
          
          <OrderControls>
            <OrderOption 
              active={activeSort === 'custom'} 
              onClick={() => handleSort('custom')}
            >
              Orden personalizado
            </OrderOption>
            <OrderOption 
              active={activeSort === 'name-asc'} 
              onClick={() => handleSort('name-asc')}
            >
              Nombre (A-Z)
            </OrderOption>
            <OrderOption 
              active={activeSort === 'name-desc'} 
              onClick={() => handleSort('name-desc')}
            >
              Nombre (Z-A)
            </OrderOption>
            <OrderOption 
              active={activeSort === 'price-asc'} 
              onClick={() => handleSort('price-asc')}
            >
              Precio (menor a mayor)
            </OrderOption>
            <OrderOption 
              active={activeSort === 'price-desc'} 
              onClick={() => handleSort('price-desc')}
            >
              Precio (mayor a menor)
            </OrderOption>
          </OrderControls>
          
          <ProductsContainer ref={productsRef}>
            <ProductsGrid layout={layout}>
              {orderedProducts.map((product, index) => (
                <DraggableProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  layout={layout}
                  isDragging={draggingIndex === index}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                />
              ))}
            </ProductsGrid>
          </ProductsContainer>
          
          {draggingProduct && (
            <DragPreview
              ref={dragPreviewRef}
              style={{
                transform: `translate(${dragPreviewPosition.x}px, ${dragPreviewPosition.y}px)`,
                width: '200px'
              }}
            >
              <ProductCard
                product={draggingProduct}
                layout="compact"
                isDraggable={false}
              />
            </DragPreview>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default OrderingModal;
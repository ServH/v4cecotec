import React, { useRef } from 'react';
import { Product } from '@/stores/products/products.types';
import EnhancedProductCard from '../../ProductCard/EnhancedProductCard';
import { useProductsStore } from '@/stores/products';
import {
  DraggableContainer,
  CardWrapper,
  PositionIndicator,
  DragHandle
} from './DraggableProductCard.styles';

interface DraggableProductCardProps {
  product: Product;
  index: number;
  layout: 'grid' | 'list' | 'compact';
  isDragging: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, product: Product, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
}

const DraggableProductCard: React.FC<DraggableProductCardProps> = ({
  product,
  index,
  layout,
  isDragging,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { excelData } = useProductsStore();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(e, product, index);
    
    document.body.classList.add('dragging-active');
    
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragOver(e, index);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    document.body.classList.remove('dragging-active');
    onDragEnd(e);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(e, index);
  };

  return (
    <DraggableContainer
      ref={cardRef}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      isDragging={isDragging}
      data-product-id={product.id}
      data-position={index}
    >
      <PositionIndicator>{index + 1}</PositionIndicator>
      <DragHandle title="Arrastrar para reordenar">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M5 10H19"></path>
          <path d="M5 14H19"></path>
          <path d="M5 18H19"></path>
          <path d="M5 6H19"></path>
        </svg>
      </DragHandle>
      
      <CardWrapper>
        <EnhancedProductCard
          product={product}
          layout={layout}
          isDraggable={false}
          excelData={excelData || undefined}
          showDetailedView={true}
        />
      </CardWrapper>
    </DraggableContainer>
  );
};

export default DraggableProductCard;
import React from 'react';
import { 
  PreviewOverlay,
  PreviewContainer,
  PreviewHeader,
  PreviewTitle,
  CloseButton,
  PreviewContent,
  PreviewIframe,
  PreviewFooter,
  ProductCount
} from './PDFPreview.styles';
import { PDFPreviewProps } from './PDFPreview.types';
import Button from '@/components/ui/Button';

const PDFPreview: React.FC<PDFPreviewProps> = ({ 
  products, 
  previewUrl, 
  onClose, 
  onExport 
}) => {
  return (
    <PreviewOverlay>
      <PreviewContainer>
        <PreviewHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PreviewTitle>Vista previa del PDF</PreviewTitle>
            <ProductCount>{products.length} productos</ProductCount>
          </div>
          <CloseButton onClick={onClose} title="Cerrar">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </CloseButton>
        </PreviewHeader>
        
        <PreviewContent>
          <PreviewIframe src={previewUrl} title="Vista previa del PDF" />
        </PreviewContent>
        
        <PreviewFooter>
          <Button 
            onClick={onClose} 
            variant="ghost"
          >
            Cancelar
          </Button>
          
          <Button 
            onClick={onExport}
          >
            Exportar PDF
          </Button>
        </PreviewFooter>
      </PreviewContainer>
    </PreviewOverlay>
  );
};

export default PDFPreview;
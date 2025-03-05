// src/components/sections/ProductCluster/components/PDFExporter/PDFExporter.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  ExporterOverlay,
  ExporterContainer,
  ExporterHeader,
  ExporterTitle,
  CloseButton,
  ExporterContent,
  ExporterFooter,
  FormRow,
  FormGroup,
  FormLabel,
  CheckboxRow,
  StepIndicator,
  Step,
  PreviewContainer,
  PreviewIframe,
  GeneratingOverlay,
  SpinnerContainer,
  GeneratingText
} from './PDFExporter.styles';
import { PDFExporterProps, PDFOptions, PDFStepType } from './PDFExporter.types';
import PDFRenderer from '@/components/pdf/PDFRenderer';
import { generatePDF, createPDFPreview } from '@/utils/pdf/pdfGenerator';
import { DEFAULT_CONTENT_OPTIONS } from '@/utils/pdf/pdfStyles';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const PDFExporter: React.FC<PDFExporterProps> = ({ products, onClose }) => {
  const [currentStep, setCurrentStep] = useState<PDFStepType>('options');
  const [options, setOptions] = useState<PDFOptions>({
    title: 'Catálogo de productos',
    subtitle: `${products.length} productos seleccionados`,
    filename: 'catalogo-productos.pdf',
    ...DEFAULT_CONTENT_OPTIONS,
    orientation: 'portrait'
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const pdfContentRef = useRef<HTMLDivElement>(null);
  const hiddenPdfRef = useRef<HTMLDivElement>(null);
  
  // Generate preview when entering preview step
  useEffect(() => {
    if (currentStep === 'preview' && hiddenPdfRef.current && !previewUrl) {
      createPreview();
    }
    
    return () => {
      // Clean up preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [currentStep]);
  
  // Create PDF preview
  const createPreview = async () => {
    if (!hiddenPdfRef.current) return;
    
    try {
      const url = await createPDFPreview(hiddenPdfRef.current, {
        orientation: options.orientation
      });
      setPreviewUrl(url);
    } catch (error) {
      console.error('Error creating preview:', error);
      alert('Error al crear la vista previa del PDF. Inténtalo de nuevo.');
    }
  };
  
  // Handle option changes
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setOptions(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setOptions(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 'options') {
      setCurrentStep('preview');
    } else if (currentStep === 'preview') {
      handleExport();
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    if (currentStep === 'preview') {
      setCurrentStep('options');
      setPreviewUrl(null);
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
  
  return (
    <ExporterOverlay>
      <ExporterContainer>
        <ExporterHeader>
          <ExporterTitle>
            {currentStep === 'options' ? 'Opciones de exportación' : 
             currentStep === 'preview' ? 'Vista previa del PDF' :
             'Generando PDF...'}
          </ExporterTitle>
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
        </ExporterHeader>
        
        <StepIndicator>
          <Step active={currentStep === 'options'} completed={currentStep === 'preview' || currentStep === 'generating'}>
            1
          </Step>
          <Step active={currentStep === 'preview'} completed={currentStep === 'generating'}>
            2
          </Step>
          <Step active={currentStep === 'generating'} completed={false}>
            3
          </Step>
        </StepIndicator>
        
        <ExporterContent>
          {currentStep === 'options' && (
            <>
              <FormRow>
                <Input
                  label="Título del documento"
                  name="title"
                  value={options.title}
                  onChange={handleOptionChange}
                  placeholder="Catálogo de productos"
                />
              </FormRow>
              
              <FormRow>
                <Input
                  label="Subtítulo (opcional)"
                  name="subtitle"
                  value={options.subtitle}
                  onChange={handleOptionChange}
                  placeholder="Descripción o información adicional"
                />
              </FormRow>
              
              <FormRow>
                <Input
                  label="Nombre del archivo"
                  name="filename"
                  value={options.filename}
                  onChange={handleOptionChange}
                  placeholder="catalogo-productos.pdf"
                />
              </FormRow>
              
              <FormRow>
                <FormLabel>Orientación del documento</FormLabel>
                <Select
                  name="orientation"
                  value={options.orientation}
                  onChange={handleOptionChange}
                  options={[
                    { value: 'portrait', label: 'Vertical (Retrato)' },
                    { value: 'landscape', label: 'Horizontal (Paisaje)' }
                  ]}
                />
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <FormLabel>Opciones de contenido</FormLabel>
                  
                  <CheckboxRow>
                    <input
                      type="checkbox"
                      id="showPrices"
                      name="showPrices"
                      checked={options.showPrices}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="showPrices" style={{ marginLeft: '8px' }}>
                      Mostrar precios
                    </label>
                  </CheckboxRow>
                  
                  <CheckboxRow>
                    <input
                      type="checkbox"
                      id="showStock"
                      name="showStock"
                      checked={options.showStock}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="showStock" style={{ marginLeft: '8px' }}>
                      Mostrar disponibilidad de stock
                    </label>
                  </CheckboxRow>
                  
                  <CheckboxRow>
                    <input
                      type="checkbox"
                      id="pageNumbers"
                      name="pageNumbers"
                      checked={options.pageNumbers}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="pageNumbers" style={{ marginLeft: '8px' }}>
                      Mostrar números de página
                    </label>
                  </CheckboxRow>
                  
                  <CheckboxRow>
                    <input
                      type="checkbox"
                      id="dateGenerated"
                      name="dateGenerated"
                      checked={options.dateGenerated}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="dateGenerated" style={{ marginLeft: '8px' }}>
                      Incluir fecha de generación
                    </label>
                  </CheckboxRow>
                </FormGroup>
              </FormRow>
            </>
          )}
          
          {currentStep === 'preview' && (
            <>
              <PreviewContainer>
                {previewUrl ? (
                  <PreviewIframe src={previewUrl} title="Vista previa del PDF" />
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    Generando vista previa...
                  </div>
                )}
              </PreviewContainer>
              
              <p>
                Esta es una vista previa del PDF que se generará. Verifica que todo esté correcto antes de exportar.
              </p>
            </>
          )}
          
          {currentStep === 'generating' && (
            <GeneratingOverlay>
              <SpinnerContainer>
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ animation: 'spin 2s linear infinite' }}
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="#1a73e8"
                    strokeWidth="4"
                    strokeDasharray="100"
                    strokeDashoffset="25"
                  />
                </svg>
              </SpinnerContainer>
              <GeneratingText>Generando PDF...</GeneratingText>
            </GeneratingOverlay>
          )}
          
          {/* Hidden PDF content for rendering */}
          <div style={{ position: 'absolute', left: '-9999px', top: 0 }} ref={hiddenPdfRef}>
            <PDFRenderer
              products={products}
              title={options.title}
              subtitle={options.subtitle}
              options={{
                showPrices: options.showPrices,
                showStock: options.showStock,
                pageNumbers: options.pageNumbers,
                dateGenerated: options.dateGenerated
              }}
            />
          </div>
        </ExporterContent>
        
        <ExporterFooter>
          {currentStep !== 'generating' && (
            <>
              <Button 
                onClick={onClose} 
                variant="ghost"
              >
                Cancelar
              </Button>
              
              {currentStep === 'preview' && (
                <Button 
                  onClick={handlePrevStep} 
                  variant="outline"
                >
                  Anterior
                </Button>
              )}
              
              <Button 
                onClick={handleNextStep}
                disabled={currentStep === 'preview' && !previewUrl}
              >
                {currentStep === 'options' ? 'Vista previa' : 'Exportar PDF'}
              </Button>
            </>
          )}
        </ExporterFooter>
      </ExporterContainer>
    </ExporterOverlay>
  );
};

export default PDFExporter;
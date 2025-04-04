import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Styled components
const UploadContainer = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

const DropZone = styled.div<{ isDragging: boolean; hasFile: boolean }>`
  border: 2px dashed ${({ isDragging, hasFile }) => 
    isDragging 
      ? theme.colors.primary[500] 
      : hasFile 
        ? theme.colors.success.main 
        : theme.colors.neutral[300]};
  background-color: ${({ isDragging, hasFile }) => 
    isDragging 
      ? theme.colors.primary[50] 
      : hasFile 
        ? theme.colors.success.light 
        : theme.colors.background.subtle};
  border-radius: ${theme.radii.lg};
  padding: ${theme.spacing[8]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
`;

const UploadIcon = styled.div<{ hasFile: boolean }>`
  width: 64px;
  height: 64px;
  margin-bottom: ${theme.spacing[4]};
  color: ${({ hasFile }) => hasFile ? theme.colors.success.main : theme.colors.primary[500]};
`;

const InputFile = styled.input`
  display: none;
`;

const FileName = styled.div`
  font-weight: ${theme.typography.fontWeights.medium};
  margin-bottom: ${theme.spacing[1]};
`;

const FileSize = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[4]};
`;

const FileDetails = styled.div`
  margin-top: ${theme.spacing[4]};
  padding: ${theme.spacing[4]};
  background-color: ${theme.colors.background.paper};
  border-radius: ${theme.radii.md};
  width: 100%;
`;

const DetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DetailItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing[2]} 0;
  border-bottom: 1px solid ${theme.colors.divider};
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.secondary};
`;

const DetailValue = styled.span`
  color: ${theme.colors.text.primary};
`;

// Types
export interface ExcelData {
  [key: string]: { [key: string]: any }[]; // Each sheet name contains an array of row objects
}

export interface ExcelSheetInfo {
  name: string;
  rowCount: number;
  columnCount: number;
}

export interface ProductExcelData {
  [productId: string]: {
    [columnName: string]: any;
  };
}

interface ExcelUploaderProps {
  onExcelDataLoaded: (data: ExcelData, productMapping: ProductExcelData) => void;
  isLoaded: boolean;
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onExcelDataLoaded, isLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [sheetInfo, setSheetInfo] = useState<ExcelSheetInfo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Format bytes to human-readable size
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processExcelFile(files[0]);
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processExcelFile(files[0]);
    }
  };

  // Process the Excel file
  const processExcelFile = async (file: File) => {
    // Check if file is an Excel file
    if (!file.name.match(/\.(xlsx|xls)$/)) {
      alert('Por favor, selecciona un archivo Excel válido (.xlsx, .xls)');
      return;
    }

    setFile(file);

    // Read the file
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { 
          type: 'array',
          cellStyles: true,
          cellDates: true
        });

        // Process workbook data
        const excelData: ExcelData = {};
        const sheetsInfo: ExcelSheetInfo[] = [];
        
        // Extract data from each sheet
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const sheetData = XLSX.utils.sheet_to_json(worksheet);
          
          excelData[sheetName] = sheetData;
          
          // Get sheet dimensions
          const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
          sheetsInfo.push({
            name: sheetName,
            rowCount: sheetData.length,
            columnCount: range.e.c + 1
          });
        });
        
        setSheetInfo(sheetsInfo);

        // Create product mapping from the Excel data
        const productMapping = createProductMapping(excelData);
        
        // Call the callback with the extracted data
        onExcelDataLoaded(excelData, productMapping);
      } catch (error) {
        console.error('Error processing Excel file:', error);
        alert('Error al procesar el archivo Excel. Por favor, inténtalo de nuevo.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Create a mapping of product IDs to their data from Excel
  const createProductMapping = (excelData: ExcelData): ProductExcelData => {
    const productMapping: ProductExcelData = {};
    
    // Assume the first sheet contains the product data
    const firstSheetName = Object.keys(excelData)[0];
    if (!firstSheetName) return productMapping;
    
    const sheetData = excelData[firstSheetName];

    // Process each row in the sheet
    sheetData.forEach((row, index) => {
      // Try to find a suitable identifier column 
      // Check for "Nombre" first, then try other common identifiers
      const idCandidates = ['Nombre', 'Modelo', 'id', 'ID', 'SKU', 'sku', 'model', 'Referencia', 'Code'];
      
      let productId = null;
      
      // Try each possible ID column
      for (const candidate of idCandidates) {
        if (row[candidate] !== undefined) {
          productId = String(row[candidate]).trim();
          break;
        }
      }
      
      // If no ID found, use the row index as fallback
      if (!productId) {
        productId = `row_${index + 1}`;
      }
      
      // Store all columns for this product
      productMapping[productId] = { ...row };
      
      // Also store by lowercase version to help with matching
      productMapping[productId.toLowerCase()] = { ...row };
    });
    
    return productMapping;
  };

  // Trigger the file input click
  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <UploadContainer>
      <Card>
        <Card.Header>
          <Card.Title>Subir Archivo Excel</Card.Title>
          <Card.Description>
            {isLoaded 
              ? 'Archivo Excel cargado correctamente. Ahora puedes seleccionar categorías para visualizar productos.'
              : 'Sube el archivo Excel con la información de productos para activar la selección de categorías.'}
          </Card.Description>
        </Card.Header>
        
        <Card.Body>
          <DropZone 
            isDragging={isDragging}
            hasFile={!!file}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <InputFile 
              type="file" 
              ref={inputRef}
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />
            
            <UploadIcon hasFile={!!file}>
              {file ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              )}
            </UploadIcon>
            
            {file ? (
              <>
                <FileName>{file.name}</FileName>
                <FileSize>{formatBytes(file.size)}</FileSize>
                <Button size="sm" variant="outline">Cambiar archivo</Button>
              </>
            ) : (
              <p>Arrastra y suelta un archivo Excel aquí o haz clic para seleccionarlo</p>
            )}
          </DropZone>
          
          {file && sheetInfo.length > 0 && (
            <FileDetails>
              <h4>Información del archivo:</h4>
              <DetailsList>
                <DetailItem>
                  <DetailLabel>Nombre:</DetailLabel>
                  <DetailValue>{file.name}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Tamaño:</DetailLabel>
                  <DetailValue>{formatBytes(file.size)}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Última modificación:</DetailLabel>
                  <DetailValue>{new Date(file.lastModified).toLocaleString()}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Hojas:</DetailLabel>
                  <DetailValue>{sheetInfo.length}</DetailValue>
                </DetailItem>
                {sheetInfo.map((sheet, index) => (
                  <DetailItem key={index}>
                    <DetailLabel>{sheet.name}:</DetailLabel>
                    <DetailValue>{sheet.rowCount} filas, {sheet.columnCount} columnas</DetailValue>
                  </DetailItem>
                ))}
              </DetailsList>
            </FileDetails>
          )}
        </Card.Body>
      </Card>
    </UploadContainer>
  );
};

export default ExcelUploader;
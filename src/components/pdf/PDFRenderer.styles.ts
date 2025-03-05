// src/components/pdf/PDFRenderer.styles.ts
import styled from 'styled-components';

export const PDFContainer = styled.div`
  width: 100%;
  padding: 30px;
  background-color: white;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
`;

export const PDFHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
`;

export const PDFTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

export const PDFSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`;

export const PDFGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

export const PDFProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  break-inside: avoid;
`;

export const PDFProductImage = styled.div`
  height: 120px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eee;
  padding: 10px;

  img {
    max-width: 80%;
    max-height: 100px;
    object-fit: contain;
  }
`;

export const PDFProductInfo = styled.div`
  padding: 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const PDFProductName = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 8px 0;
  line-height: 1.3;
  height: 36px;
  overflow: hidden;
`;

export const PDFProductPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #1a73e8;
  margin-bottom: 5px;
`;

export const PDFProductStock = styled.div<{ inStock: boolean }>`
  font-size: 12px;
  margin-top: auto;
  color: ${props => props.inStock ? '#0d652d' : '#c5221f'};
`;

export const PDFFooter = styled.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
`;

export const PDFPageNumber = styled.div``;

export const PDFDateGenerated = styled.div``;
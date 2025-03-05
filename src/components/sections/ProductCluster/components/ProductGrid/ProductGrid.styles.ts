import styled, { css, keyframes } from 'styled-components';
import { theme } from '@/styles/theme';
import { GridLayout } from '@/stores/products/products.types';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const GridContainer = styled.div<{ isOrderingMode: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacing[4]};
  
  ${({ isOrderingMode }) => isOrderingMode && css`
    border: 2px dashed ${theme.colors.primary[300]};
    padding: ${theme.spacing[4]};
    background-color: ${theme.colors.primary[50]};
    border-radius: ${theme.radii.lg};
  `}
`;

export const OrderingModeMessage = styled.div`
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};
  background-color: ${theme.colors.primary[100]};
  color: ${theme.colors.primary[700]};
  border-radius: ${theme.radii.md};
  font-weight: ${theme.typography.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  
  svg {
    flex-shrink: 0;
  }
`;

export const ProductsGrid = styled.div<{ layout: GridLayout }>`
  display: grid;
  gap: ${theme.spacing[6]};
  
  ${({ layout }) => {
    switch (layout) {
      case 'grid':
        return css`
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        `;
      case 'list':
        return css`
          grid-template-columns: 1fr;
        `;
      case 'compact':
        return css`
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        `;
      default:
        return css`
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        `;
    }
  }}
  
  & > div {
    animation: ${fadeIn} 0.3s ease forwards;
  }
`;

export const NoProductsMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${theme.spacing[10]};
  background-color: ${theme.colors.background.subtle};
  border-radius: ${theme.radii.lg};
  color: ${theme.colors.text.secondary};
  
  svg {
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.neutral[400]};
  }
  
  h3 {
    margin-bottom: ${theme.spacing[2]};
    color: ${theme.colors.text.primary};
  }
`;

export const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing[10]};
  background-color: ${theme.colors.background.subtle};
  border-radius: ${theme.radii.lg};
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${theme.colors.primary[100]};
  border-top-color: ${theme.colors.primary[500]};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  animation: ${fadeIn} 0.3s ease-in-out;
  overflow: hidden;
`;

export const ModalContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  background-color: ${theme.colors.primary[500]};
  color: white;
  box-shadow: ${theme.shadows.md};
  z-index: 10;
`;

export const HeaderTitle = styled.h2`
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  margin: 0;
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
`;

export const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing[6]};
`;

export const InstructionsPanel = styled.div`
  background-color: ${theme.colors.primary[50]};
  border: 1px solid ${theme.colors.primary[100]};
  border-radius: ${theme.radii.md};
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
`;

export const InstructionIcon = styled.div`
  color: ${theme.colors.primary[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
`;

export const InstructionText = styled.div`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.text.primary};
  
  h3 {
    margin: 0 0 ${theme.spacing[2]};
    font-size: ${theme.typography.fontSizes.lg};
    font-weight: ${theme.typography.fontWeights.semibold};
    color: ${theme.colors.primary[700]};
  }
  
  p {
    margin: 0;
  }
`;

export const ProductsContainer = styled.div`
  width: 100%;
`;

export const ProductsGrid = styled.div<{ layout: 'grid' | 'list' | 'compact' }>`
  display: grid;
  gap: ${theme.spacing[4]};
  
  grid-template-columns: ${({ layout }) => 
    layout === 'list' 
      ? '1fr' 
      : layout === 'compact' 
        ? 'repeat(auto-fill, minmax(200px, 1fr))' 
        : 'repeat(auto-fill, minmax(250px, 1fr))'
  };
`;

export const DragPreview = styled.div`
  position: fixed;
  z-index: 2000;
  pointer-events: none;
  opacity: 0.8;
  transform: scale(0.8);
  box-shadow: ${theme.shadows.lg};
  background-color: white;
  border: 2px solid ${theme.colors.primary[500]};
  border-radius: ${theme.radii.lg};
`;

export const DropPlaceholder = styled.div`
  border: 2px dashed ${theme.colors.primary[300]};
  background-color: ${theme.colors.primary[50]};
  border-radius: ${theme.radii.lg};
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary[500]};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
`;

export const ButtonsContainer = styled.div`
  margin-top: ${theme.spacing[6]};
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing[3]};
`;

export const OrderControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};
`;

export const OrderOption = styled.button<{ active: boolean }>`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.radii.md};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  border: 1px solid ${theme.colors.primary[500]};
  background-color: ${({ active }) => active ? theme.colors.primary[500] : 'transparent'};
  color: ${({ active }) => active ? 'white' : theme.colors.primary[500]};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ active }) => active ? theme.colors.primary[600] : theme.colors.primary[50]};
  }
`;
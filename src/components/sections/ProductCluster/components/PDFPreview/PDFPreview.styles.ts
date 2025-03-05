import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const PreviewOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing[4]};
`;

export const PreviewContainer = styled.div`
  background-color: white;
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.xl};
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const PreviewHeader = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  border-bottom: 1px solid ${theme.colors.divider};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PreviewTitle = styled.h2`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  padding: ${theme.spacing[1]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radii.full};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${theme.colors.neutral[100]};
    color: ${theme.colors.text.primary};
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const PreviewContent = styled.div`
  flex: 1;
  overflow: hidden;
  background-color: ${theme.colors.neutral[100]};
`;

export const PreviewIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export const PreviewFooter = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  border-top: 1px solid ${theme.colors.divider};
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing[3]};
`;

export const ProductCount = styled.div`
  background-color: ${theme.colors.primary[50]};
  color: ${theme.colors.primary[700]};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: ${theme.radii.full};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  margin-left: ${theme.spacing[3]};
`;
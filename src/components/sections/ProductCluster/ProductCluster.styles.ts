import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const ClusterContainer = styled.section`
  padding: ${theme.spacing[6]} 0;
`;

export const ClusterHeader = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

export const ClusterTitle = styled.h2`
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

export const ClusterDescription = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[4]};
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const SaveLayoutModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const SaveLayoutModal = styled.div`
  background-color: white;
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing[6]};
  width: 100%;
  max-width: 450px;
`;

export const ModalTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin-bottom: ${theme.spacing[4]};
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing[3]};
  margin-top: ${theme.spacing[4]};
`;
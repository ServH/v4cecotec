import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  text-align: center;
`;

export const LoadingIcon = styled.div`
  color: ${theme.colors.primary[500]};
  animation: ${spin} 2s linear infinite;
  margin-bottom: ${theme.spacing[4]};
  
  svg {
    width: 64px;
    height: 64px;
  }
`;

export const LoadingTitle = styled.h2`
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

export const LoadingMessage = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;
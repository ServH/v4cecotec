import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

export const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  text-align: center;
`;

export const ErrorIcon = styled.div`
  color: ${theme.colors.error.main};
  margin-bottom: ${theme.spacing[4]};
  
  svg {
    width: 64px;
    height: 64px;
  }
`;

export const ErrorTitle = styled.h2`
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

export const ErrorMessage = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.text.secondary};
  margin: 0 0 ${theme.spacing[6]} 0;
`;

export const RetryButton = styled.div`
  margin-top: ${theme.spacing[4]};
`;
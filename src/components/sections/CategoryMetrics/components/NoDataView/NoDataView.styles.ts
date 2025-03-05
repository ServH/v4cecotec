import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const NoMetricsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  background-color: ${theme.colors.background.subtle};
  border-radius: ${theme.radii.lg};
  padding: ${theme.spacing[6]};
  
  h3 {
    font-size: ${theme.typography.fontSizes.xl};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing[2]};
  }
  
  p {
    color: ${theme.colors.text.secondary};
    max-width: 500px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  justify-content: center;
  margin-top: ${theme.spacing[5]};
`;
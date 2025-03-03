import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Card from '@/components/ui/Card';

export const MainContent = styled.main`
  padding: ${theme.spacing[6]} 0;
`;

export const AlertContainer = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

export const AlertBox = styled.div<{ variant: 'info' | 'warning' | 'error' | 'success' }>`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing[3]};
  padding: ${theme.spacing[4]};
  border-radius: ${theme.radii.md};
  
  ${({ variant }) => {
    switch (variant) {
      case 'info':
        return `
          background-color: ${theme.colors.info.light};
          color: ${theme.colors.info.dark};
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.warning.light};
          color: ${theme.colors.warning.dark};
        `;
      case 'error':
        return `
          background-color: ${theme.colors.error.light};
          color: ${theme.colors.error.dark};
        `;
      case 'success':
        return `
          background-color: ${theme.colors.success.light};
          color: ${theme.colors.success.dark};
        `;
      default:
        return '';
    }
  }}
  
  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
  
  strong {
    margin-right: ${theme.spacing[1]};
  }
`;

export const AnalyzingAlert = styled.div`
  display: flex;
  flex-direction: column;
  
  strong {
    margin-bottom: ${theme.spacing[1]};
  }
`;

export const NoResultsContainer = styled(Card)`
  padding: ${theme.spacing[6]};
  text-align: center;
  
  h3 {
    margin-bottom: ${theme.spacing[2]};
  }
  
  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing[4]};
  }
`;
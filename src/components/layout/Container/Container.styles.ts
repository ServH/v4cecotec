import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import { ContainerProps } from './Container.types';

// Container max width values
const containerMaxWidths = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
};

export const StyledContainer = styled.div<{ $maxWidth?: string; $padding?: boolean }>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ $maxWidth = 'lg' }) => containerMaxWidths[$maxWidth]};
  
  ${({ $padding = true }) => $padding && css`
    padding-left: ${theme.spacing[4]};
    padding-right: ${theme.spacing[4]};
    
    @media ${theme.media.md} {
      padding-left: ${theme.spacing[6]};
      padding-right: ${theme.spacing[6]};
    }
    
    @media ${theme.media.lg} {
      padding-left: ${theme.spacing[8]};
      padding-right: ${theme.spacing[8]};
    }
  `}
`;
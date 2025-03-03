import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import { FlexProps } from './Flex.types';

export const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ align = 'flex-start' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  flex-wrap: ${({ wrap = 'nowrap' }) => wrap};
  
  ${({ gap }) => {
    if (gap === undefined) return '';
    
    // If it's a string (like '4px' or '1rem')
    if (typeof gap === 'string') {
      return css`gap: ${gap};`;
    }
    
    // If it's a number (using theme spacing)
    if (typeof gap === 'number') {
      return css`gap: ${theme.spacing[gap]};`;
    }
    
    return '';
  }}
`;
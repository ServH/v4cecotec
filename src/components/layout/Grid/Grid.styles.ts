import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import { GridProps, ResponsiveValue } from './Grid.types';

// Helper to generate responsive CSS
const responsive = <T extends any>(
  prop: string,
  value: ResponsiveValue<T>,
  transform: (val: T) => string
) => {
  if (typeof value !== 'object') {
    return css`${prop}: ${transform(value)};`;
  }

  const { base, sm, md, lg, xl } = value as Record<string, T>;
  
  return css`
    ${base && css`${prop}: ${transform(base)};`}
    
    ${sm && css`
      @media ${theme.media.sm} {
        ${prop}: ${transform(sm)};
      }
    `}
    
    ${md && css`
      @media ${theme.media.md} {
        ${prop}: ${transform(md)};
      }
    `}
    
    ${lg && css`
      @media ${theme.media.lg} {
        ${prop}: ${transform(lg)};
      }
    `}
    
    ${xl && css`
      @media ${theme.media.xl} {
        ${prop}: ${transform(xl)};
      }
    `}
  `;
};

export const StyledGrid = styled.div<{ $columns?: ResponsiveValue<number>; $gap?: ResponsiveValue<number | string> }>`
  display: grid;
  
  ${({ $columns = { base: 1, md: 2, lg: 3 } }) => responsive(
    'grid-template-columns',
    $columns,
    (val) => `repeat(${val}, 1fr)`
  )}
  
  ${({ $gap }) => {
    if ($gap === undefined) {
      return css`gap: ${theme.spacing[4]};`;
    }
    
    if (typeof $gap === 'number') {
      return css`gap: ${theme.spacing[$gap as keyof typeof theme.spacing] || '16px'};`;
    }
    
    if (typeof $gap === 'string') {
      return css`gap: ${$gap};`;
    }
    
    return responsive('gap', $gap, (val) => {
      if (typeof val === 'number') {
        return theme.spacing[val as keyof typeof theme.spacing] || `${val}px`;
      }
      return val;
    });
  }}
`;
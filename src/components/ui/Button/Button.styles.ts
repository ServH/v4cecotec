import styled, { css, keyframes } from 'styled-components';
import { theme } from '@/styles/theme';
import { ButtonBaseProps } from './Button.types';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Button size variations
const sizeStyles = {
  sm: css`
    height: 32px;
    padding: ${theme.spacing[1]} ${theme.spacing[3]};
    font-size: ${theme.typography.fontSizes.sm};
    border-radius: ${theme.radii.md};
  `,
  md: css`
    height: 40px;
    padding: ${theme.spacing[2]} ${theme.spacing[4]};
    font-size: ${theme.typography.fontSizes.md};
    border-radius: ${theme.radii.md};
  `,
  lg: css`
    height: 48px;
    padding: ${theme.spacing[3]} ${theme.spacing[5]};
    font-size: ${theme.typography.fontSizes.lg};
    border-radius: ${theme.radii.lg};
  `,
};

// Button variant styles
const variantStyles = {
  primary: css`
    background-color: ${theme.colors.primary[500]};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary[600]};
    }
    
    &:active:not(:disabled) {
      background-color: ${theme.colors.primary[700]};
    }
    
    &:disabled {
      background-color: ${theme.colors.neutral[300]};
      color: ${theme.colors.neutral[500]};
    }
  `,
  secondary: css`
    background-color: ${theme.colors.secondary[500]};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${theme.colors.secondary[600]};
    }
    
    &:active:not(:disabled) {
      background-color: ${theme.colors.secondary[700]};
    }
    
    &:disabled {
      background-color: ${theme.colors.neutral[300]};
      color: ${theme.colors.neutral[500]};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${theme.colors.primary[500]};
    border: 1px solid ${theme.colors.primary[500]};
    
    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary[50]};
    }
    
    &:active:not(:disabled) {
      background-color: ${theme.colors.primary[100]};
    }
    
    &:disabled {
      color: ${theme.colors.neutral[400]};
      border-color: ${theme.colors.neutral[300]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${theme.colors.primary[500]};
    
    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary[50]};
    }
    
    &:active:not(:disabled) {
      background-color: ${theme.colors.primary[100]};
    }
    
    &:disabled {
      color: ${theme.colors.neutral[400]};
    }
  `,
  danger: css`
    background-color: ${theme.colors.error.main};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${theme.colors.error.dark};
    }
    
    &:active:not(:disabled) {
      background-color: ${theme.colors.error.dark};
      filter: brightness(90%);
    }
    
    &:disabled {
      background-color: ${theme.colors.neutral[300]};
      color: ${theme.colors.neutral[500]};
    }
  `,
};

// Usamos un objeto de tipo parcial que solo contiene las propiedades que necesitamos para los estilos
type StyledButtonProps = ButtonBaseProps & {
  fullWidth?: boolean;
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  font-weight: ${theme.typography.fontWeights.medium};
  white-space: nowrap;
  transition: ${theme.transitions.default};
  cursor: pointer;
  box-shadow: ${theme.shadows.sm};
  text-decoration: none; /* Importante para enlaces */
  
  ${({ size = 'md' }) => sizeStyles[size]}
  ${({ variant = 'primary' }) => variantStyles[variant]}
  
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  &:disabled {
    cursor: not-allowed;
    box-shadow: none;
  }
  
  &:focus {
    outline: 2px solid ${theme.colors.primary[300]};
    outline-offset: 2px;
  }
`;

export const StyledIcon = styled.span<{ left?: boolean; right?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${({ left }) => left && css`
    margin-right: ${theme.spacing[1]};
  `}
  
  ${({ right }) => right && css`
    margin-left: ${theme.spacing[1]};
  `}
  
  &.loader {
    animation: ${spin} 1s linear infinite;
    margin-right: ${theme.spacing[2]};
    
    svg {
      width: 1em;
      height: 1em;
      stroke: currentColor;
    }
  }
  
  svg {
    width: 1em;
    height: 1em;
  }
`;
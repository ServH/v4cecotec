'use client';
import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import { SelectWrapperProps } from './Select.types';

export const SelectContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-bottom: ${theme.spacing[4]};
`;

export const SelectLabel = styled.label<{ required: boolean; disabled: boolean }>`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  margin-bottom: ${theme.spacing[1]};
  color: ${({ disabled }) => 
    disabled ? theme.colors.text.disabled : theme.colors.text.primary};
  
  ${({ required }) => required && css`
    &::after {
      content: ' *';
      color: ${theme.colors.error.main};
    }
  `}
`;

// Select size variations
const selectSizeStyles = {
  sm: css`
    height: 32px;
    font-size: ${theme.typography.fontSizes.sm};
  `,
  md: css`
    height: 40px;
    font-size: ${theme.typography.fontSizes.md};
  `,
  lg: css`
    height: 48px;
    font-size: ${theme.typography.fontSizes.lg};
  `,
};

// Select variant styles - convertidos a funciones
const selectVariantStyles = {
  outline: (props: { hasError: boolean }) => css`
    border: 1px solid ${props.hasError ? theme.colors.error.main : theme.colors.neutral[300]};
    border-radius: ${theme.radii.md};
    background-color: ${theme.colors.background.default};
    
    &:focus-within {
      border-color: ${props.hasError ? theme.colors.error.main : theme.colors.primary[500]};
      box-shadow: 0 0 0 1px ${props.hasError ? theme.colors.error.main : theme.colors.primary[500]};
    }
  `,
  filled: (props: { hasError: boolean }) => css`
    border: 1px solid transparent;
    border-bottom: 1px solid ${props.hasError ? theme.colors.error.main : theme.colors.neutral[300]};
    border-radius: ${theme.radii.md} ${theme.radii.md} 0 0;
    background-color: ${theme.colors.neutral[100]};
    
    &:focus-within {
      background-color: ${theme.colors.neutral[50]};
      border-bottom-color: ${props.hasError ? theme.colors.error.main : theme.colors.primary[500]};
    }
  `,
  flushed: (props: { hasError: boolean }) => css`
    border: none;
    border-bottom: 1px solid ${props.hasError ? theme.colors.error.main : theme.colors.neutral[300]};
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    
    &:focus-within {
      border-bottom-color: ${props.hasError ? theme.colors.error.main : theme.colors.primary[500]};
      box-shadow: 0 1px 0 0 ${props.hasError ? theme.colors.error.main : theme.colors.primary[500]};
    }
  `,
};

export const SelectWrapper = styled.div<SelectWrapperProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  transition: ${theme.transitions.default};
  
  ${({ size = 'md' }) => selectSizeStyles[size]}
  ${({ variant = 'outline', hasError }) => selectVariantStyles[variant]({ hasError })}
  
  ${({ disabled }) => disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 100%;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  padding-right: ${theme.spacing[8]}; // Space for the chevron
  border: none;
  background: transparent;
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary};
  appearance: none; // Remove default arrow
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
  
  /* For IE and Edge */
  &::-ms-expand {
    display: none;
  }
`;

export const ChevronIcon = styled.div`
  position: absolute;
  right: ${theme.spacing[3]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.secondary};
  pointer-events: none; // Make sure the icon doesn't interfere with select clicks
`;

export const SelectError = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.error.main};
  margin-top: ${theme.spacing[1]};
  margin-bottom: 0;
`;

export const SelectHelperText = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing[1]};
  margin-bottom: 0;
`;
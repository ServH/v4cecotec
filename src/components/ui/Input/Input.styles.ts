import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import { InputProps, InputWrapperProps } from './Input.types';

export const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-bottom: ${theme.spacing[4]};
`;

export const InputLabel = styled.label<{ required: boolean; disabled: boolean }>`
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

// Input size variations
const inputSizeStyles = {
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

// Input variant styles
const inputVariantStyles = {
  outline: css<{ hasError: boolean }>`
    border: 1px solid ${({ hasError }) => 
      hasError ? theme.colors.error.main : theme.colors.neutral[300]};
    border-radius: ${theme.radii.md};
    background-color: ${theme.colors.background.default};
    
    &:focus-within {
      border-color: ${({ hasError }) => 
        hasError ? theme.colors.error.main : theme.colors.primary[500]};
      box-shadow: 0 0 0 1px ${({ hasError }) => 
        hasError ? theme.colors.error.main : theme.colors.primary[500]};
    }
  `,
  filled: css<{ hasError: boolean }>`
    border: 1px solid transparent;
    border-bottom: 1px solid ${({ hasError }) => 
      hasError ? theme.colors.error.main : theme.colors.neutral[300]};
    border-radius: ${theme.radii.md} ${theme.radii.md} 0 0;
    background-color: ${theme.colors.neutral[100]};
    
    &:focus-within {
      background-color: ${theme.colors.neutral[50]};
      border-bottom-color: ${({ hasError }) => 
        hasError ? theme.colors.error.main : theme.colors.primary[500]};
    }
  `,
  flushed: css<{ hasError: boolean }>`
    border: none;
    border-bottom: 1px solid ${({ hasError }) => 
      hasError ? theme.colors.error.main : theme.colors.neutral[300]};
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    
    &:focus-within {
      border-bottom-color: ${({ hasError }) => 
        hasError ? theme.colors.error.main : theme.colors.primary[500]};
      box-shadow: 0 1px 0 0 ${({ hasError }) => 
        hasError ? theme.colors.error.main : theme.colors.primary[500]};
    }
  `,
};

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  transition: ${theme.transitions.default};
  
  ${({ size = 'md' }) => inputSizeStyles[size]}
  ${({ variant = 'outline', hasError }) => inputVariantStyles[variant]({ hasError })}
  
  ${({ disabled }) => disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
  
  ${({ readOnly }) => readOnly && css`
    background-color: ${theme.colors.neutral[50]};
    cursor: default;
  `}
`;

export const StyledInput = styled.input<{
  hasLeftElement?: boolean;
  hasRightElement?: boolean;
}>`
  width: 100%;
  height: 100%;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border: none;
  background: transparent;
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary};
  
  padding-left: ${({ hasLeftElement }) => 
    hasLeftElement ? theme.spacing[10] : theme.spacing[3]};
  padding-right: ${({ hasRightElement }) => 
    hasRightElement ? theme.spacing[10] : theme.spacing[3]};
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${theme.colors.text.disabled};
  }
`;

export const InputLeftElement = styled.div`
  position: absolute;
  left: ${theme.spacing[3]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.secondary};
`;

export const InputRightElement = styled.div`
  position: absolute;
  right: ${theme.spacing[3]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.secondary};
`;

export const InputError = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.error.main};
  margin-top: ${theme.spacing[1]};
  margin-bottom: 0;
`;

export const InputHelperText = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing[1]};
  margin-bottom: 0;
`;
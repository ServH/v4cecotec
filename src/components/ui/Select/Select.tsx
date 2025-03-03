import React, { forwardRef } from 'react';
import {
  SelectContainer,
  SelectLabel,
  StyledSelect,
  SelectWrapper,
  SelectError,
  SelectHelperText,
  ChevronIcon
} from './Select.styles';
import { SelectProps } from './Select.types';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  onBlur,
  disabled = false,
  error,
  helperText,
  required = false,
  variant = 'outline',
  size = 'md',
  fullWidth = false,
  className,
  ...rest
}, ref) => {
  // Generate a random ID if none is provided
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <SelectContainer 
      className={className} 
      fullWidth={fullWidth}
    >
      {label && (
        <SelectLabel 
          htmlFor={selectId}
          required={required}
          disabled={disabled}
        >
          {label}
        </SelectLabel>
      )}
      
      <SelectWrapper 
        hasError={!!error}
        disabled={disabled}
        variant={variant}
        size={size}
      >
        <StyledSelect
          id={selectId}
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        
        <ChevronIcon>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            width="16"
            height="16"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </ChevronIcon>
      </SelectWrapper>
      
      {error && <SelectError>{error}</SelectError>}
      {helperText && !error && <SelectHelperText>{helperText}</SelectHelperText>}
    </SelectContainer>
  );
});

Select.displayName = 'Select';

export default Select;
import React from 'react';
import { StyledContainer } from './Container.styles';
import { ContainerProps } from './Container.types';

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = true,
  className,
  ...rest
}) => {
  return (
    <StyledContainer 
      $maxWidth={maxWidth}
      $padding={padding}
      className={className}
      {...rest}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;
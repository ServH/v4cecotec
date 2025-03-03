import React from 'react';
import { StyledFlex } from './Flex.styles';
import { FlexProps } from './Flex.types';

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'flex-start',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap,
  className,
  ...rest
}) => {
  return (
    <StyledFlex
      direction={direction}
      align={align}
      justify={justify}
      wrap={wrap}
      gap={gap}
      className={className}
      {...rest}
    >
      {children}
    </StyledFlex>
  );
};

export default Flex;
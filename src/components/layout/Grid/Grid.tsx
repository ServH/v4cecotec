import React from 'react';
import { StyledGrid } from './Grid.styles';
import { GridProps } from './Grid.types';

export const Grid: React.FC<GridProps> = ({
  children,
  columns = { base: 1, md: 2, lg: 3 },
  gap,
  className,
  ...rest
}) => {
  return (
    <StyledGrid
      $columns={columns}
      $gap={gap}
      className={className}
      {...rest}
    >
      {children}
    </StyledGrid>
  );
};

export default Grid;
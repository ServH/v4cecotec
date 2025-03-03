import React from 'react';
import { 
  StyledCard, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardBody, 
  CardFooter 
} from './Card.styles';
import { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  elevation = 'md',
  bordered = false,
  className,
  ...rest
}) => {
  return (
    <StyledCard 
      variant={variant}
      elevation={elevation}
      bordered={bordered}
      className={className}
      {...rest}
    >
      {children}
    </StyledCard>
  );
};

export default Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});
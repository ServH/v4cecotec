import { ButtonHTMLAttributes, ReactNode, AnchorHTMLAttributes } from 'react';

// Definimos un tipo que unifica las propiedades de botón y anchor
export type PolymorphicComponentProps<
  Element extends React.ElementType, 
  Props = {}
> = Props & Omit<
  React.ComponentPropsWithRef<Element>,
  keyof Props | 'as'
> & {
  as?: Element;
};

// Propiedades base del botón
export interface ButtonBaseProps {
  /** Button label content */
  children: ReactNode;
  /** Button visual style */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Make button take full width of container */
  fullWidth?: boolean;
  /** Icon displayed before the children */
  leftIcon?: ReactNode;
  /** Icon displayed after the children */
  rightIcon?: ReactNode;
  /** Show loading indicator */
  isLoading?: boolean;
  /** Disable button */
  disabled?: boolean;
}

// Tipo final para el botón
export type ButtonProps<Element extends React.ElementType = 'button'> = 
  PolymorphicComponentProps<Element, ButtonBaseProps> & {
    type?: 'button' | 'submit' | 'reset';
  };
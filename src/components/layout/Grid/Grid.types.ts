import { HTMLAttributes, ReactNode } from 'react';

export type ResponsiveValue<T> = T | {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Grid content */
  children: ReactNode;
  /** Number of columns at different breakpoints */
  columns?: ResponsiveValue<number>;
  /** Gap between items - can use theme.spacing key (number) or direct value (string) */
  gap?: ResponsiveValue<number | string>;
}
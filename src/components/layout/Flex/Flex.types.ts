import { HTMLAttributes, ReactNode } from 'react';

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /** Flex content */
  children: ReactNode;
  /** Flex direction */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Align items */
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  /** Justify content */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  /** Flex wrap */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Gap between items - can use theme.spacing key (number) or direct value (string) */
  gap?: number | string;
}
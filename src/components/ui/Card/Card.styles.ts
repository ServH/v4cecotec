import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import { CardProps } from './Card.types';

// Card variant styles
const cardVariants = {
  default: css`
    background-color: ${theme.colors.background.card};
    color: ${theme.colors.text.primary};
  `,
  primary: css`
    background-color: ${theme.colors.primary[50]};
    color: ${theme.colors.primary[900]};
  `,
  secondary: css`
    background-color: ${theme.colors.secondary[50]};
    color: ${theme.colors.secondary[900]};
  `,
  success: css`
    background-color: ${theme.colors.success.light};
    color: ${theme.colors.success.dark};
  `,
  error: css`
    background-color: ${theme.colors.error.light};
    color: ${theme.colors.error.dark};
  `,
  warning: css`
    background-color: ${theme.colors.warning.light};
    color: ${theme.colors.warning.dark};
  `,
  info: css`
    background-color: ${theme.colors.info.light};
    color: ${theme.colors.info.dark};
  `,
};

// Card elevation styles
const cardElevations = {
  none: css`
    box-shadow: none;
  `,
  xs: css`
    box-shadow: ${theme.shadows.sm};
  `,
  sm: css`
    box-shadow: ${theme.shadows.sm};
  `,
  md: css`
    box-shadow: ${theme.shadows.md};
  `,
  lg: css`
    box-shadow: ${theme.shadows.lg};
  `,
  xl: css`
    box-shadow: ${theme.shadows.xl};
  `,
};

export const StyledCard = styled.div<CardProps>`
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  ${({ variant = 'default' }) => cardVariants[variant]};
  ${({ elevation = 'md' }) => cardElevations[elevation]};
  ${({ bordered }) => bordered && css`
    border: 1px solid ${theme.colors.divider};
  `}
  transition: ${theme.transitions.default};
  
  &:hover {
    ${({ elevation }) => elevation !== 'none' && css`
      box-shadow: ${theme.shadows.lg};
    `}
  }
`;

export const CardHeader = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  border-bottom: 1px solid ${theme.colors.divider};
`;

export const CardTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin-bottom: ${theme.spacing[1]};
`;

export const CardDescription = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: 0;
`;

export const CardBody = styled.div`
  padding: ${theme.spacing[5]};
`;

export const CardFooter = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  border-top: 1px solid ${theme.colors.divider};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${theme.spacing[3]};
`;
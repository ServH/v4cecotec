import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const ChartContainer = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

export const ChartHeader = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

export const ChartTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[1]};
`;

export const ChartDescription = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

export const NoDataMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSizes.md};
  text-align: center;
  padding: ${theme.spacing[4]};
`;
import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const MetricsCardContainer = styled.div`
  height: 100%;
  
  & > div {
    height: 100%;
    transition: transform 0.2s ease-in-out;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

export const MetricsHeader = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

export const MetricsTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[1]};
`;

export const MetricsSubtitle = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

export const MetricsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;

export const MetricRow = styled.div<{ $highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing[2]} 0;
  
  ${({ $highlight }) => $highlight && `
    background-color: ${theme.colors.primary[50]};
    padding: ${theme.spacing[2]} ${theme.spacing[3]};
    border-radius: ${theme.radii.md};
    margin: 0 -${theme.spacing[3]};
  `}
  
  &:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.divider};
  }
`;

export const MetricLabel = styled.span`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
`;

export const MetricValue = styled.span`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.primary};
`;

export const MetricHighlight = styled.span`
  color: ${theme.colors.primary[500]};
  font-weight: ${theme.typography.fontWeights.semibold};
`;
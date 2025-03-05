import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Card from '@/components/ui/Card';

export const MetricsContainer = styled.section`
  padding: ${theme.spacing[6]} 0;
`;

export const MetricsControls = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

export const ControlsCard = styled(Card)`
  margin-bottom: ${theme.spacing[6]};
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  align-items: flex-end;
  flex-wrap: wrap;
  
  @media ${theme.media.sm} {
    flex-wrap: nowrap;
  }
`;

export const ComparisonPanel = styled.div`
  margin-top: ${theme.spacing[5]};
  padding-top: ${theme.spacing[4]};
  border-top: 1px solid ${theme.colors.divider};
  
  .comparison-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing[3]};
    flex-wrap: wrap;
    gap: ${theme.spacing[3]};
    
    h3 {
      font-size: ${theme.typography.fontSizes.md};
      font-weight: ${theme.typography.fontWeights.medium};
      color: ${theme.colors.text.primary};
      margin: 0;
    }
    
    .comparison-buttons {
      display: flex;
      gap: ${theme.spacing[2]};
    }
  }
  
  .comparison-badges {
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing[2]};
    align-items: center;
    
    .comparison-help {
      font-size: ${theme.typography.fontSizes.sm};
      color: ${theme.colors.text.secondary};
      font-style: italic;
    }
  }
`;

export const ComparisonBadge = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.primary[50]};
  color: ${theme.colors.primary[700]};
  border-radius: ${theme.radii.full};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  font-size: ${theme.typography.fontSizes.sm};
  
  .remove-badge {
    margin-left: ${theme.spacing[1]};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: ${theme.typography.fontSizes.lg};
    color: ${theme.colors.primary[500]};
    
    &:hover {
      background-color: ${theme.colors.primary[100]};
      color: ${theme.colors.primary[700]};
    }
  }
`;

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[6]};
  margin-top: ${theme.spacing[6]};
  
  @media ${theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media ${theme.media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const NoMetricsMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  background-color: ${theme.colors.background.subtle};
  border-radius: ${theme.radii.lg};
  padding: ${theme.spacing[6]};
  
  h3 {
    font-size: ${theme.typography.fontSizes.xl};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing[2]};
  }
  
  p {
    color: ${theme.colors.text.secondary};
    max-width: 500px;
  }
`;
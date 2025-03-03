import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
`;

export const StatCardContainer = styled.div`
  width: 100%;
`;

export const StatCardIcon = styled.div<{ $color: 'primary' | 'success' | 'error' | 'info' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${theme.radii.lg};
  flex-shrink: 0;
  
  ${({ $color }) => {
    switch ($color) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary[50]};
          color: ${theme.colors.primary[500]};
        `;
      case 'success':
        return `
          background-color: ${theme.colors.success.light};
          color: ${theme.colors.success.main};
        `;
      case 'error':
        return `
          background-color: ${theme.colors.error.light};
          color: ${theme.colors.error.main};
        `;
      case 'info':
        return `
          background-color: ${theme.colors.info.light};
          color: ${theme.colors.info.main};
        `;
      default:
        return '';
    }
  }}
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const StatCardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatCardValue = styled.div`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
`;

export const StatCardLabel = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
`;

export const ProgressContainer = styled.div`
  margin-top: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[6]};
`;

export const ProgressLabel = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[1]};
`;

export const ProgressValue = styled.div`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.primary[500]};
  margin-bottom: ${theme.spacing[2]};
`;
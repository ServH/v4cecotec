import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const PanelContainer = styled.div`
  margin-top: ${theme.spacing[5]};
  padding-top: ${theme.spacing[4]};
  border-top: 1px solid ${theme.colors.divider};
`;

export const PanelHeader = styled.div`
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
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
`;

export const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  align-items: center;
`;

export const ComparisonHelp = styled.span`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  font-style: italic;
`;

export const ComparisonBadge = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.primary[50]};
  color: ${theme.colors.primary[700]};
  border-radius: ${theme.radii.full};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  font-size: ${theme.typography.fontSizes.sm};
`;

export const RemoveBadgeButton = styled.button`
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
`;
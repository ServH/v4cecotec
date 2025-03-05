import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const SelectorContainer = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

export const SelectorHeader = styled.div`
  margin-bottom: ${theme.spacing[2]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

export const SelectorTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

export const CategoryCount = styled.span`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  background-color: ${theme.colors.neutral[100]};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: ${theme.radii.full};
`;

export const SelectorContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

export const SelectionRow = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
  flex-wrap: wrap;
  
  @media ${theme.media.md} {
    flex-wrap: nowrap;
  }
`;

export const SelectControl = styled.div`
  flex: 1;
  min-width: 250px;
`;

export const CategoryChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  margin-top: ${theme.spacing[4]};
`;

export const CategoryChip = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  background-color: ${theme.colors.primary[50]};
  border: 1px solid ${theme.colors.primary[200]};
  color: ${theme.colors.primary[700]};
  border-radius: ${theme.radii.full};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  font-size: ${theme.typography.fontSizes.sm};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${theme.colors.primary[100]};
  }
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${theme.colors.primary[200]};
  color: ${theme.colors.primary[700]};
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${theme.colors.primary[300]};
  }
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

export const EmptySelectionMessage = styled.div`
  padding: ${theme.spacing[4]};
  background-color: ${theme.colors.background.subtle};
  border-radius: ${theme.radii.md};
  text-align: center;
  color: ${theme.colors.text.secondary};
`;
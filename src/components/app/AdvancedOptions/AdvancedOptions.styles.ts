import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const AdvancedOptionsContainer = styled.div`
  margin-top: ${theme.spacing[3]};
  width: 100%;
`;

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${theme.spacing[2]};
  background-color: transparent;
  border: none;
  color: ${theme.colors.primary[500]};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.colors.primary[600]};
    background-color: ${theme.colors.neutral[50]};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
  }
`;

export const OptionsPanel = styled.div`
  margin-top: ${theme.spacing[3]};
  padding: ${theme.spacing[3]};
  background-color: ${theme.colors.background.subtle};
  border-radius: ${theme.radii.md};
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[4]};
  
  @media ${theme.media.md} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

export const OptionLabel = styled.label`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.secondary};
`;
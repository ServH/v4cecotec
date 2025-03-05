import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
  margin: ${theme.spacing[4]} 0;
  
  @media ${theme.media.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export const ControlsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[3]};
  align-items: center;
  
  @media ${theme.media.md} {
    flex-wrap: nowrap;
  }
`;

export const ProductCount = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  background-color: ${theme.colors.background.subtle};
  border-radius: ${theme.radii.full};
  white-space: nowrap;
`;

export const LayoutButtonGroup = styled.div`
  display: flex;
  border-radius: ${theme.radii.md};
  overflow: hidden;
  border: 1px solid ${theme.colors.divider};
  flex-shrink: 0;
`;

export const LayoutButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${({ active }) => 
    active ? theme.colors.primary[50] : theme.colors.background.default};
  color: ${({ active }) => 
    active ? theme.colors.primary[600] : theme.colors.text.secondary};
  border: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ active }) => 
    active ? theme.colors.primary[100] : theme.colors.neutral[100]};
  }
  
  &:not(:last-child) {
    border-right: 1px solid ${theme.colors.divider};
  }
`;

export const OrderModeButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.radii.md};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  background-color: ${({ active }) => 
    active ? theme.colors.primary[500] : theme.colors.background.default};
  color: ${({ active }) => 
    active ? 'white' : theme.colors.text.primary};
  border: 1px solid ${({ active }) => 
    active ? theme.colors.primary[500] : theme.colors.divider};
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background-color: ${({ active }) => 
    active ? theme.colors.primary[600] : theme.colors.neutral[100]};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const SaveLayoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.radii.md};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  background-color: ${theme.colors.background.default};
  color: ${theme.colors.primary[500]};
  border: 1px solid ${theme.colors.primary[500]};
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  
  &:hover {
    background-color: ${theme.colors.primary[50]};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const LayoutSelect = styled.select`
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.radii.md};
  font-size: ${theme.typography.fontSizes.sm};
  border: 1px solid ${theme.colors.divider};
  background-color: ${theme.colors.background.default};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[300]};
    box-shadow: 0 0 0 2px ${theme.colors.primary[100]};
  }
`;
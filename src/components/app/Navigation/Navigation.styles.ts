import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Link from 'next/link';

export const NavigationContainer = styled.nav`
  background-color: ${theme.colors.background.subtle};
  border-bottom: 1px solid ${theme.colors.divider};
  padding: ${theme.spacing[2]} 0;
`;

export const NavigationList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: ${theme.spacing[2]};
`;

export const NavigationItem = styled.li`
  margin: 0;
`;

export const NavigationLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  border-radius: ${theme.radii.md};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${theme.colors.neutral[100]};
    color: ${theme.colors.primary[600]};
  }
  
  &.active {
    background-color: ${theme.colors.primary[50]};
    color: ${theme.colors.primary[600]};
  }
`;

export const NavigationIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
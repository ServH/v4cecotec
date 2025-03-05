import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Link from 'next/link';

export const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  height: 100%;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
`;

export const CardIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary[50]};
  padding: ${theme.spacing[6]};
  color: ${theme.colors.primary[500]};
  
  svg {
    width: 60px;
    height: 60px;
  }
`;

export const CardContent = styled.div`
  padding: ${theme.spacing[6]};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h2`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

export const CardDescription = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  flex-grow: 1;
`;

export const CardFooter = styled.div`
  padding-top: ${theme.spacing[4]};
  display: flex;
  align-items: center;
  color: ${theme.colors.primary[500]};
  font-weight: ${theme.typography.fontWeights.medium};
  
  svg {
    margin-left: ${theme.spacing[1]};
    width: 18px;
    height: 18px;
  }
`;
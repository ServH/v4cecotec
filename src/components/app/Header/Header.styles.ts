import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const HeaderContainer = styled.header`
  background-color: ${theme.colors.primary[500]};
  color: white;
  padding: ${theme.spacing[4]} 0;
  box-shadow: ${theme.shadows.md};
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background-color: white;
  border-radius: ${theme.radii.lg};
  color: ${theme.colors.primary[500]};
  flex-shrink: 0;
`;

export const HeaderTitle = styled.h1`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.bold};
  margin: 0;
  line-height: 1.2;
  
  @media ${theme.media.md} {
    font-size: ${theme.typography.fontSizes['2xl']};
  }
`;

export const HeaderInfo = styled.p`
  font-size: ${theme.typography.fontSizes.sm};
  opacity: 0.9;
  margin: ${theme.spacing[1]} 0 0 0;
`;
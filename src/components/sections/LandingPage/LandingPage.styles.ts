import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const LandingContainer = styled.div`
  min-height: 100vh;
  padding: ${theme.spacing[8]} 0;
  background-color: ${theme.colors.background.default};
`;

export const LandingHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing[12]};
`;

export const LandingTitle = styled.h1`
  font-size: ${theme.typography.fontSizes['4xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

export const LandingSubtitle = styled.p`
  font-size: ${theme.typography.fontSizes.lg};
  color: ${theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

export const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${theme.spacing[6]};
  
  @media ${theme.media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media ${theme.media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Footer = styled.footer`
  text-align: center;
  margin-top: ${theme.spacing[16]};
  padding-top: ${theme.spacing[8]};
  border-top: 1px solid ${theme.colors.divider};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSizes.sm};
`;

export const FooterLink = styled.a`
  color: ${theme.colors.primary[500]};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;
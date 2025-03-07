import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const CrawlerContainer = styled.section`
  padding: ${theme.spacing[6]} 0;
`;

export const CrawlerHeader = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

export const CrawlerTitle = styled.h2`
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

export const CrawlerDescription = styled.p`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[4]};
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[6]};
  margin-top: ${theme.spacing[6]};
  
  @media ${theme.media.lg} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const IssuesContainer = styled.div`
  margin-top: ${theme.spacing[6]};
`;

export const ProgressContainer = styled.div`
  margin-top: ${theme.spacing[6]};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: ${theme.spacing[4]};
`;

export const ProgressDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
`;

export const ProgressValue = styled.div`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary[500]};
`;

export const CurrentUrl = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  background-color: ${theme.colors.background.subtle};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.md};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
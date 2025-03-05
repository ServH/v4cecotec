import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const ComparisonContainer = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[6]};
  margin-top: ${theme.spacing[6]};
  
  @media ${theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media ${theme.media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[4]};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
`;
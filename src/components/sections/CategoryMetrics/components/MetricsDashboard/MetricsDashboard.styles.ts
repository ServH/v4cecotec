import styled from 'styled-components';
import { theme } from '@/styles/theme';

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
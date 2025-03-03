import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const FilterContainer = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[3]};
  
  @media ${theme.media.sm} {
    margin-bottom: 0;
  }
`;

export const FilterTitle = styled.h2`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin: 0;
`;

export const FilterControls = styled.div`
  width: 200px;
`;

export const ResultsCount = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  
  strong {
    color: ${theme.colors.primary[500]};
  }
`;

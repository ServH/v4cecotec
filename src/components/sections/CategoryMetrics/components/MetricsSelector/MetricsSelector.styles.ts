import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const SelectContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  align-items: flex-end;
  flex-wrap: wrap;
  
  @media ${theme.media.sm} {
    flex-wrap: nowrap;
  }
`;
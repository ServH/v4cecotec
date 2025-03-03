import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const ControlsContainer = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

export const ControlsCard = styled.div`
  padding: ${theme.spacing[4]};
  border-radius: ${theme.radii.lg};
  background-color: white;
  box-shadow: ${theme.shadows.md};
`;

export const SelectContainer = styled.div`
  width: 200px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  flex-wrap: wrap;
  
  @media ${theme.media.sm} {
    flex-wrap: nowrap;
  }
`;
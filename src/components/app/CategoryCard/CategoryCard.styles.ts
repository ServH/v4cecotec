import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Button from '@/components/ui/Button';

export const CardContainer = styled.div`
  height: 100%;
  
  & > div {
    height: 100%;
    transition: transform 0.2s ease-in-out;
    
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

export const CategoryPath = styled.div`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[2]};
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[1]};
  
  span {
    display: inline-block;
  }
`;

export const CategoryName = styled.h3`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[3]};
  word-break: break-word;
`;

export const StatusBadge = styled.span<{ status: 'OK' | 'KO' }>`
  display: inline-block;
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: ${theme.radii.full};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.medium};
  background-color: ${({ status }) => 
    status === 'OK' ? theme.colors.success.light : theme.colors.error.light};
  color: ${({ status }) => 
    status === 'OK' ? theme.colors.success.dark : theme.colors.error.dark};
`;

export const ErrorMessage = styled.p`
  margin-top: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.error.main};
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing[4]};
  
  & > div {
    display: flex;
    gap: ${theme.spacing[2]};
  }
`;

export const LinkButton = styled(Button)`
  text-decoration: none;
`;
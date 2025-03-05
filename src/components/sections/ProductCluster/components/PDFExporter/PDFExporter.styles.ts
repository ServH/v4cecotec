import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const ExporterOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing[4]};
  @media ${theme.media.md} {
    padding: ${theme.spacing[8]};
  }
`;

export const ExporterContainer = styled.div`
  background-color: white;
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.xl};
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ExporterHeader = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  border-bottom: 1px solid ${theme.colors.divider};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ExporterTitle = styled.h2`
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  padding: ${theme.spacing[1]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radii.full};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${theme.colors.neutral[100]};
    color: ${theme.colors.text.primary};
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const ExporterContent = styled.div`
  padding: ${theme.spacing[5]};
  overflow-y: auto;
  flex: 1;
`;

export const ExporterFooter = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[5]};
  border-top: 1px solid ${theme.colors.divider};
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing[3]};
`;

export const FormRow = styled.div`
  margin-bottom: ${theme.spacing[5]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormLabel = styled.label`
  display: block;
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  margin-bottom: ${theme.spacing[2]};
  color: ${theme.colors.text.primary};
`;

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing[4]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing[3]};
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing[5]};
`;

export const Step = styled.div<{ active: boolean; completed: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 ${theme.spacing[2]};
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeights.medium};
  position: relative;
  
  background-color: ${({ active, completed }) => 
    completed ? theme.colors.primary[500] : 
    active ? theme.colors.primary[100] : 
    theme.colors.neutral[100]};
  
  color: ${({ active, completed }) => 
    completed ? 'white' : 
    active ? theme.colors.primary[700] : 
    theme.colors.text.secondary};
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${({ completed }) => 
      completed ? theme.colors.primary[500] : theme.colors.neutral[200]};
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
  }
  
  &:last-child::after {
    display: none;
  }
`;

export const PreviewContainer = styled.div`
  border: 1px solid ${theme.colors.divider};
  border-radius: ${theme.radii.md};
  height: 500px;
  overflow: hidden;
  margin-bottom: ${theme.spacing[5]};
`;

export const PreviewIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export const GeneratingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const SpinnerContainer = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

export const GeneratingText = styled.p`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.primary};
  text-align: center;
`;
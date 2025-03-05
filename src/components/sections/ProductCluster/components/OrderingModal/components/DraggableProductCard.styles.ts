import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const DraggableContainer = styled.div<{ isDragging: boolean }>`
  cursor: grab;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  user-select: none;
  opacity: ${props => props.isDragging ? 0.4 : 1};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:active {
    cursor: grabbing;
  }
`;

export const CardWrapper = styled.div`
  border-radius: ${theme.radii.lg};
  background-color: white;
  border: 1px solid ${theme.colors.neutral[200]};
  overflow: hidden;
`;

export const PositionIndicator = styled.div`
  position: absolute;
  top: -8px;
  left: -8px;
  width: 28px;
  height: 28px;
  background-color: ${theme.colors.primary[500]};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.bold};
  z-index: 2;
  box-shadow: ${theme.shadows.sm};
`;

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 2;
  color: ${theme.colors.primary[500]};
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: ${theme.shadows.sm};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;
import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

export const CardContainer = styled.div<{ layout?: string; isDraggable?: boolean }>`
  position: relative;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: ${({ isDraggable }) => (isDraggable ? 'grab' : 'default')};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:active {
    cursor: ${({ isDraggable }) => (isDraggable ? 'grabbing' : 'default')};
  }
  
  ${({ layout }) => 
    layout === 'list' &&
    css`
      & > div {
        display: flex;
        flex-direction: row;
        height: auto;
      }
    `}
`;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  background-color: white;
  box-shadow: ${theme.shadows.sm};
`;

export const CardImageContainer = styled.div<{ layout?: string }>`
  position: relative;
  width: 100%;
  padding-top: 100%; /* Aspect ratio 1:1 */
  background-color: ${theme.colors.neutral[100]};
  overflow: hidden;
  
  ${({ layout }) => 
    layout === 'list' &&
    css`
      width: 120px;
      min-width: 120px;
      height: 120px;
      padding-top: 0;
    `}
  
  ${({ layout }) => 
    layout === 'compact' &&
    css`
      padding-top: 75%; /* Aspect ratio 4:3 */
    `}
`;

export const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

export const CardBody = styled.div<{ layout?: string }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${theme.spacing[4]};
  
  ${({ layout }) => 
    layout === 'compact' &&
    css`
      padding: ${theme.spacing[2]};
    `}
`;

export const CardTitle = styled.h3<{ layout?: string }>`
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  ${({ layout }) => 
    layout === 'compact' &&
    css`
      font-size: ${theme.typography.fontSizes.sm};
      margin-bottom: ${theme.spacing[1]};
    `}
`;

export const CardPrice = styled.div<{ layout?: string }>`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary[700]};
  margin-bottom: ${theme.spacing[2]};
  
  ${({ layout }) => 
    layout === 'compact' &&
    css`
      font-size: ${theme.typography.fontSizes.md};
      margin-bottom: ${theme.spacing[1]};
    `}
`;

export const OldPrice = styled.span`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  text-decoration: line-through;
  margin-right: ${theme.spacing[2]};
`;

export const CardDescription = styled.p<{ layout?: string }>`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[3]};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  ${({ layout }) => 
    layout === 'compact' &&
    css`
      display: none;
    `}
`;

export const StockBadge = styled.span<{ inStock: boolean }>`
  display: inline-block;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.full};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.medium};
  margin-bottom: ${theme.spacing[3]};
  
  ${({ inStock }) => 
    inStock
      ? css`
          background-color: ${theme.colors.success.light};
          color: ${theme.colors.success.dark};
        `
      : css`
          background-color: ${theme.colors.error.light};
          color: ${theme.colors.error.dark};
        `}
`;

export const CardFooter = styled.div<{ layout?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  
  ${({ layout }) => 
    layout === 'compact' &&
    css`
      margin-top: ${theme.spacing[1]};
    `}
`;

export const CategoryLabel = styled.span`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.text.secondary};
  background-color: ${theme.colors.neutral[100]};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.full};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
`;

export const DiscountBadge = styled.div`
  position: absolute;
  top: ${theme.spacing[2]};
  right: ${theme.spacing[2]};
  background-color: ${theme.colors.error.main};
  color: white;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.md};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.bold};
  z-index: 1;
`;
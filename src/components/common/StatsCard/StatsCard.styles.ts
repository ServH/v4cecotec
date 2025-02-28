import styled, { css } from 'styled-components';
import { StatsCardProps } from './StatsCard.types';

const getCardColor = (color: StatsCardProps['color']) => {
  switch (color) {
    case 'primary':
      return css`
        background-color: #e8f0fe;
        color: #1a73e8;
      `;
    case 'success':
      return css`
        background-color: #e6f4ea;
        color: #0d652d;
      `;
    case 'danger':
      return css`
        background-color: #fce8e6;
        color: #c5221f;
      `;
    case 'warning':
      return css`
        background-color: #fef7e0;
        color: #ea8600;
      `;
    case 'info':
    default:
      return css`
        background-color: #e8eaed;
        color: #202124;
      `;
  }
};

export const Card = styled.div<{ color: StatsCardProps['color'] }>`
  border-radius: 8px;
  padding: 16px;
  ${({ color }) => getCardColor(color)}
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 500;
`;

export const Value = styled.div`
  font-size: 28px;
  font-weight: 700;
`;
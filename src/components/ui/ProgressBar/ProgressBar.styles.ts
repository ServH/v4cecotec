import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { ProgressBarProps } from './ProgressBar.types';

export const Container = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: ${theme.colors.neutral[200]};
  border-radius: ${({ height }) => height / 2}px;
  overflow: hidden;
`;

export const Progress = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: ${theme.colors.primary[500]};
  transition: width 0.3s ease;
`;
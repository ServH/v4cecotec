import styled from 'styled-components';
import { ProgressBarProps } from './ProgressBar.types';

export const Container = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: #e8eaed;
  border-radius: ${({ height }) => height / 2}px;
  overflow: hidden;
`;

export const Progress = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: #1a73e8;
  transition: width 0.3s ease;
`;
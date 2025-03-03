import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 16px;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1a73e8;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Message = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #202124;
`;

// src/components/common/LoadingIndicator/index.ts
export { default } from './LoadingIndicator';
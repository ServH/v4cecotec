import React from 'react';
import { 
  ErrorContainer, 
  ErrorContent,
  ErrorIcon,
  ErrorTitle,
  ErrorMessage,
  RetryButton
} from './ErrorState.styles';
import Button from '@/components/ui/Button';

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry
}) => {
  return (
    <ErrorContainer>
      <ErrorContent>
        <ErrorIcon>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </ErrorIcon>
        <ErrorTitle>{title}</ErrorTitle>
        <ErrorMessage>{message}</ErrorMessage>
        
        {onRetry && (
          <RetryButton>
            <Button 
              onClick={onRetry}
              leftIcon={
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  width="16"
                  height="16"
                >
                  <path d="M23 4v6h-6"></path>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
              }
            >
              Reintentar
            </Button>
          </RetryButton>
        )}
      </ErrorContent>
    </ErrorContainer>
  );
};

export default ErrorState;
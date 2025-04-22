import React from 'react';
import styled from 'styled-components';
import { CategoryItemProps } from './CategoryItem.types';

const Item = styled.div<{ status: 'OK' | 'KO' }>`
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--border);
  transition: var(--transition-base);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: var(--shadow-md);
    border-color: ${props => props.status === 'OK' ? 'var(--success)' : 'var(--danger)'}30;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${props => props.status === 'OK' ? 'var(--success)' : 'var(--danger)'};
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const PathText = styled.div`
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .separator {
    color: var(--text-tertiary);
    font-weight: 400;
  }
`;

const SlugText = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-family: monospace;
  background: var(--background);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  display: inline-block;
`;

const StatusBadge = styled.span<{ status: 'OK' | 'KO' }>`
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.875rem;
  background: ${props => props.status === 'OK' ? 'var(--success)' : 'var(--danger)'}10;
  color: ${props => props.status === 'OK' ? 'var(--success)' : 'var(--danger)'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RetryButton = styled.button`
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  transition: var(--transition-base);
  
  &:hover:not(:disabled) {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CategoryItem: React.FC<CategoryItemProps> = ({ 
  slug, 
  data, 
  categoryPath, 
  onRetry, 
  disabled 
}) => {
  return (
    <Item status={data.status}>
      <Info>
        <PathText>
          {categoryPath.map((path, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="separator">/</span>}
              {path}
            </React.Fragment>
          ))}
        </PathText>
        <SlugText>{slug}</SlugText>
      </Info>
      
      <Actions>
        <StatusBadge status={data.status}>
          {data.status === 'OK' ? '✅' : '❌'}
          {data.status === 'OK' ? 'Con productos' : 'Sin productos'}
        </StatusBadge>
        
        {data.status === 'KO' && (
          <RetryButton 
            onClick={() => onRetry(slug)}
            disabled={disabled}
          >
            🔄 Reintentar
          </RetryButton>
        )}
      </Actions>
    </Item>
  );
};

export default CategoryItem;
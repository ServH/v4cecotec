import React from 'react';
import { 
  CardContainer, 
  CategoryPath, 
  CategoryName, 
  StatusBadge, 
  ActionContainer,
  ErrorMessage
} from './CategoryCard.styles';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface CategoryCardProps {
  slug: string;
  categoryPath: string[];
  status: 'OK' | 'KO';
  error?: string;
  onRetry: (slug: string) => void;
  disabled: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  slug,
  categoryPath,
  status,
  error,
  onRetry,
  disabled
}) => {
  return (
    <CardContainer>
      <Card>
        <Card.Body>
          <CategoryPath>
            {categoryPath.map((segment, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>&gt;</span>}
                <span>{segment}</span>
              </React.Fragment>
            ))}
          </CategoryPath>
          
          <CategoryName>{slug}</CategoryName>
          
          <StatusBadge status={status}>
            {status === 'OK' ? 'Con Productos' : 'Sin Productos'}
          </StatusBadge>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <ActionContainer>
            <div>
              <Button 
                as="a"
                href={`/api/proxy?category=${slug}`}
                target="_blank" 
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
              >
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
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                API
              </Button>
              
              <Button 
                as="a"
                href={`https://cecotec.es/es/${slug}`}
                target="_blank" 
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
              >
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
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Web
              </Button>
            </div>
            
            <Button
              onClick={() => onRetry(slug)}
              disabled={disabled}
              variant="outline"
              size="sm"
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
              Reanalizar
            </Button>
          </ActionContainer>
        </Card.Body>
      </Card>
    </CardContainer>
  );
};

export default CategoryCard;
import React from 'react';
import {
  CategoryItem as StyledCategoryItem,
  CategoryName,
  CategoryLink,
  CategoryStatus,
  CategoryError,
} from '../CategoryStats.styles';

interface CategoryItemProps {
  slug: string;
  data: {
    status: 'OK' | 'KO';
    error?: string;
  };
  categoryPath: string[];
  onRetry: (slug: string) => void;
  disabled: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  slug,
  data,
  categoryPath,
  onRetry,
  disabled,
}) => {
  return (
    <StyledCategoryItem status={data.status}>
      <div style={{ 
        fontSize: '12px', 
        color: '#5f6368', 
        marginBottom: '4px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px'
      }}>
        {categoryPath.map((segment, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span style={{ margin: '0 2px' }}>&gt;</span>}
            <span>{segment}</span>
          </React.Fragment>
        ))}
      </div>
      <CategoryName>
        {slug}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onRetry(slug)}
            disabled={disabled}
            style={{ 
              padding: '2px 6px', 
              fontSize: '12px',
              background: '#f1f3f4',
              color: '#202124',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reanalizar
          </button>
          <CategoryLink 
            href={`https://cecotec.es/es/${slug}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Ver en web
          </CategoryLink>
        </div>
      </CategoryName>
      <CategoryStatus status={data.status}>
        {data.status === 'OK' ? 'Con Productos' : 'Sin Productos'}
      </CategoryStatus>
      {data.error && (
        <CategoryError>{data.error}</CategoryError>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
        <CategoryLink 
          href={`/api/proxy?category=${slug}`}
          target="_blank" 
          rel="noopener noreferrer"
          style={{ fontSize: '12px' }}
        >
          Ver API
        </CategoryLink>
        <CategoryLink 
          href={`https://content.cecotec.es/api/v4/products/products-list-by-category/?category=${slug}`}
          target="_blank" 
          rel="noopener noreferrer"
          style={{ fontSize: '12px' }}
        >
          API Original
        </CategoryLink>
      </div>
    </StyledCategoryItem>
  );
};

export default CategoryItem;
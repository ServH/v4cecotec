import React from 'react';
import CategoryFilter from './CategoryFilter';

interface StatsHeaderProps {
  filter: 'all' | 'valid' | 'invalid';
  setFilter: (filter: 'all' | 'valid' | 'invalid') => void;
  totalItems: number;
  filteredItems: number;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ 
  filter, 
  setFilter, 
  totalItems,
  filteredItems
}) => {
  return (
    <>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        margin: '24px 0 16px' 
      }}>
        <h2>Resultados:</h2>
        <CategoryFilter filter={filter} setFilter={setFilter} />
      </div>
      
      <div style={{ margin: '12px 0', fontSize: '14px', color: '#5f6368' }}>
        Mostrando {filteredItems} de {totalItems} categorías
      </div>
    </>
  );
};

export default StatsHeader;
import React from 'react';

interface CategoryFilterProps {
  filter: 'all' | 'valid' | 'invalid';
  setFilter: (filter: 'all' | 'valid' | 'invalid') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ filter, setFilter }) => {
  return (
    <div>
      <label htmlFor="filter" style={{ marginRight: '8px' }}>
        Filtrar:
      </label>
      <select 
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value as 'all' | 'valid' | 'invalid')}
        style={{ padding: '4px 8px' }}
      >
        <option value="all">Todas</option>
        <option value="valid">Con Productos</option>
        <option value="invalid">Sin Productos</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
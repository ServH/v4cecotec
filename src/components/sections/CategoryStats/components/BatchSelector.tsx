import React from 'react';

interface BatchSelectorProps {
  batchSize: number;
  setBatchSize: (size: number) => void;
  disabled: boolean;
  totalSlugs: number;
}

const BatchSelector: React.FC<BatchSelectorProps> = ({ 
  batchSize, 
  setBatchSize, 
  disabled, 
  totalSlugs 
}) => {
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
      <div>
        <label htmlFor="batchSize" style={{ marginRight: '8px' }}>
          Número de categorías a analizar:
        </label>
        <select 
          id="batchSize"
          value={batchSize}
          onChange={(e) => setBatchSize(Number(e.target.value))}
          disabled={disabled}
          style={{ padding: '4px 8px' }}
        >
          <option value="5">5 categorías</option>
          <option value="10">10 categorías</option>
          <option value="20">20 categorías</option>
          <option value="50">50 categorías</option>
          <option value="100">100 categorías</option>
          <option value={totalSlugs}>Todas ({totalSlugs} categorías)</option>
        </select>
      </div>
    </div>
  );
};

export default BatchSelector;
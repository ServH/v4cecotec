export interface CategoryFilterProps {
  activeFilter: 'all' | 'valid' | 'invalid';
  onFilterChange: (filter: 'all' | 'valid' | 'invalid') => void;
}
export interface StatsHeaderProps {
  filter: 'all' | 'valid' | 'invalid';
  setFilter: (filter: 'all' | 'valid' | 'invalid') => void;
  totalItems: number;
  filteredItems: number;
}
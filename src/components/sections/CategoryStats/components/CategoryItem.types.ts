export interface CategoryItemProps {
  slug: string;
  data: {
    status: 'OK' | 'KO';
    error?: string;
  };
  categoryPath: string[];
  onRetry: (slug: string) => void;
  disabled: boolean;
}
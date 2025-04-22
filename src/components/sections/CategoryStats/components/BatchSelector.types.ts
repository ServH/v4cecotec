export interface BatchSelectorProps {
  batchSize: number;
  setBatchSize: (size: number) => void;
  disabled: boolean;
  totalSlugs: number;
}
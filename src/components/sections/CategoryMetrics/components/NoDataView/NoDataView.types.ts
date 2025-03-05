export interface NoDataViewProps {
    loading: boolean;
    loadingTimeout: boolean;
    onRetry: () => void;
    onResetCategory: () => void;
    retryCount: number;
  }
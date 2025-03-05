import React from 'react';
import { NoDataViewProps } from './NoDataView.types';
import { NoMetricsContainer, ButtonsContainer } from './NoDataView.styles';
import Button from '@/components/ui/Button';

const NoDataView: React.FC<NoDataViewProps> = ({
  loading,
  loadingTimeout,
  onRetry,
  onResetCategory,
  retryCount
}) => {
  return (
    <NoMetricsContainer>
      <div>
        {loading ? (
          <>
            <h3>Cargando métricas...</h3>
            {loadingTimeout && (
              <div style={{ marginTop: '20px' }}>
                <p>La carga está tomando más tiempo de lo esperado.</p>
                <p>El servidor puede estar experimentando lentitud o timeouts.</p>
                <ButtonsContainer>
                  <Button
                    onClick={onRetry}
                    disabled={retryCount > 3}
                  >
                    {retryCount > 3 ? 'Demasiados intentos' : 'Reintentar'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onResetCategory}
                  >
                    Seleccionar otra categoría
                  </Button>
                </ButtonsContainer>
              </div>
            )}
          </>
        ) : (
          <>
            <h3>No hay datos disponibles para esta categoría</h3>
            <p>La categoría seleccionada no tiene productos o no se pudieron obtener las métricas.</p>
            <p>Intente seleccionar otra categoría.</p>
          </>
        )}
      </div>
    </NoMetricsContainer>
  );
};

export default NoDataView;
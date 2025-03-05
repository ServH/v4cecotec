import React from 'react';
import { NoMetricsContainer } from '../NoDataView/NoDataView.styles';

const InitialView: React.FC = () => {
  return (
    <NoMetricsContainer>
      <div>
        <h3>Seleccione una categoría para ver sus métricas</h3>
        <p>Utilice el selector de arriba para elegir una categoría y visualizar sus métricas.</p>
      </div>
    </NoMetricsContainer>
  );
};

export default InitialView;
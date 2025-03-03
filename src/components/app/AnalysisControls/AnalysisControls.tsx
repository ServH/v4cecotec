import React from 'react';
import { 
  ControlsContainer, 
  ControlsCard,
  SelectContainer,
  ButtonContainer
} from './AnalysisControls.styles';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Flex from '@/components/layout/Flex';

interface AnalysisControlsProps {
  totalSlugs: number;
  batchSize: number;
  setBatchSize: (size: number) => void;
  onStartAnalysis: () => void;
  onClearCacheAndRestart: () => void;
  loading: boolean;
  analyzing: boolean;
}

export const AnalysisControls: React.FC<AnalysisControlsProps> = ({
  totalSlugs,
  batchSize,
  setBatchSize,
  onStartAnalysis,
  onClearCacheAndRestart,
  loading,
  analyzing
}) => {
  return (
    <ControlsContainer>
      <Card>
        <Card.Header>
          <Card.Title>Configuración del Análisis</Card.Title>
          <Card.Description>
            Selecciona el número de categorías a analizar y comienza el proceso.
          </Card.Description>
        </Card.Header>
        
        <Card.Body>
          <Flex direction="column" gap={4}>
            <SelectContainer>
              <Select
                label="Número de categorías a analizar"
                value={batchSize.toString()}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                disabled={loading || analyzing}
                options={[
                  { value: '5', label: '5 categorías' },
                  { value: '10', label: '10 categorías' },
                  { value: '20', label: '20 categorías' },
                  { value: '50', label: '50 categorías' },
                  { value: '100', label: '100 categorías' },
                  { value: totalSlugs.toString(), label: `Todas (${totalSlugs} categorías)` }
                ]}
              />
            </SelectContainer>
            
            <ButtonContainer>
              <Button
                onClick={onStartAnalysis}
                disabled={loading || analyzing}
                isLoading={loading}
                leftIcon={
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                }
              >
                {loading ? 'Analizando...' : 'Iniciar Análisis'}
              </Button>
              
              <Button
                onClick={onClearCacheAndRestart}
                disabled={loading || analyzing}
                variant="danger"
                leftIcon={
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                }
              >
                Limpiar Caché y Reiniciar
              </Button>
            </ButtonContainer>
          </Flex>
        </Card.Body>
      </Card>
    </ControlsContainer>
  );
};

export default AnalysisControls;
import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface CrawlerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onExport: () => void;
  activeTab: 'dashboard' | 'issues' | 'settings' | 'map';
  onChangeTab: (tab: 'dashboard' | 'issues' | 'settings' | 'map') => void;
}

const ControlsContainer = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[4]};
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.colors.divider};
  margin-bottom: ${theme.spacing[4]};
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  font-size: ${theme.typography.fontSizes.md};
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${props => props.active ? theme.colors.primary[500] : theme.colors.text.secondary};
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? theme.colors.primary[500] : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.colors.primary[500]};
  }
`;

const CrawlerControls: React.FC<CrawlerControlsProps> = ({
  isRunning,
  onStart,
  onStop,
  onReset,
  onExport,
  activeTab,
  onChangeTab
}) => {
  return (
    <ControlsContainer>
      <Card>
        <Card.Body>
          <ButtonGroup>
            {!isRunning ? (
              <Button 
                onClick={onStart} 
                leftIcon={
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                }
              >
                Iniciar Crawling
              </Button>
            ) : (
              <Button 
                onClick={onStop} 
                variant="danger"
                leftIcon={
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="6" width="12" height="12"></rect>
                  </svg>
                }
              >
                Detener Crawling
              </Button>
            )}
            
            <Button 
              onClick={onReset} 
              variant="outline"
              disabled={isRunning}
              leftIcon={
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M3 2v6h6"></path>
                  <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
                  <path d="M21 22v-6h-6"></path>
                  <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
                </svg>
              }
            >
              Reiniciar
            </Button>
            
            <Button 
              onClick={onExport} 
              variant="secondary"
              disabled={isRunning}
              leftIcon={
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              }
            >
              Exportar Resultados
            </Button>
          </ButtonGroup>
          
          <TabsContainer>
            <TabButton 
              active={activeTab === 'dashboard'} 
              onClick={() => onChangeTab('dashboard')}
            >
              Dashboard
            </TabButton>
            <TabButton 
              active={activeTab === 'issues'} 
              onClick={() => onChangeTab('issues')}
            >
              Problemas
            </TabButton>
            <TabButton 
              active={activeTab === 'map'} 
              onClick={() => onChangeTab('map')}
            >
              Mapa del Sitio
            </TabButton>
            <TabButton 
              active={activeTab === 'settings'} 
              onClick={() => onChangeTab('settings')}
            >
              Configuración
            </TabButton>
          </TabsContainer>
        </Card.Body>
      </Card>
    </ControlsContainer>
  );
};

export default CrawlerControls;
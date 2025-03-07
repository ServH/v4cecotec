import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { CrawlSettings } from '@/types/crawler/crawler.types';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface CrawlerSettingsProps {
  settings: CrawlSettings;
  onUpdateSettings: (settings: Partial<CrawlSettings>) => void;
}

const SettingsContainer = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[4]};
  
  @media ${theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormSection = styled.div`
  margin-bottom: ${theme.spacing[6]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.semibold};
  margin-bottom: ${theme.spacing[3]};
  color: ${theme.colors.text.primary};
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing[3]};
`;

const StyledCheckbox = styled.input`
  margin-right: ${theme.spacing[2]};
`;

const CheckboxLabel = styled.label`
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.colors.text.primary};
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing[3]};
  margin-top: ${theme.spacing[4]};
`;

const PathsListContainer = styled.div`
  margin-top: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[4]};
`;

const PathsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  margin-top: ${theme.spacing[2]};
`;

const PathTag = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  background-color: ${theme.colors.primary[50]};
  color: ${theme.colors.primary[700]};
  border-radius: ${theme.radii.md};
  font-size: ${theme.typography.fontSizes.sm};
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${theme.spacing[1]};
  background: none;
  border: none;
  color: ${theme.colors.primary[700]};
  cursor: pointer;
  
  &:hover {
    color: ${theme.colors.error.main};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const PathInput = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
`;

const CrawlerSettings: React.FC<CrawlerSettingsProps> = ({ settings, onUpdateSettings }) => {
  const [formState, setFormState] = useState<CrawlSettings>(settings);
  const [newIncludedPath, setNewIncludedPath] = useState('');
  const [newExcludedPath, setNewExcludedPath] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleSaveSettings = () => {
    onUpdateSettings(formState);
  };

  const handleResetSettings = () => {
    setFormState(settings);
  };

  const addIncludedPath = () => {
    if (newIncludedPath && !formState.includedPaths.includes(newIncludedPath)) {
      setFormState(prev => ({
        ...prev,
        includedPaths: [...prev.includedPaths, newIncludedPath]
      }));
      setNewIncludedPath('');
    }
  };

  const removeIncludedPath = (path: string) => {
    setFormState(prev => ({
      ...prev,
      includedPaths: prev.includedPaths.filter(p => p !== path)
    }));
  };

  const addExcludedPath = () => {
    if (newExcludedPath && !formState.excludedPaths.includes(newExcludedPath)) {
      setFormState(prev => ({
        ...prev,
        excludedPaths: [...prev.excludedPaths, newExcludedPath]
      }));
      setNewExcludedPath('');
    }
  };

  const removeExcludedPath = (path: string) => {
    setFormState(prev => ({
      ...prev,
      excludedPaths: prev.excludedPaths.filter(p => p !== path)
    }));
  };

  return (
    <SettingsContainer>
      <Card>
        <Card.Header>
          <Card.Title>Configuración del Crawler</Card.Title>
          <Card.Description>
            Personaliza el comportamiento del crawler para adaptarlo a tus necesidades
          </Card.Description>
        </Card.Header>
        
        <Card.Body>
          <FormSection>
            <SectionTitle>Configuración general</SectionTitle>
            <FormGrid>
              <Input
                label="URL base"
                name="baseUrl"
                value={formState.baseUrl}
                onChange={handleInputChange}
                placeholder="https://cecotec.es"
              />
              
              <Input
                label="Límite de páginas"
                name="maxPages"
                type="number"
                value={formState.maxPages.toString()}
                onChange={handleInputChange}
                placeholder="100"
              />
              
              <Input
                label="Profundidad máxima"
                name="maxDepth"
                type="number"
                value={formState.maxDepth.toString()}
                onChange={handleInputChange}
                placeholder="3"
              />
              
              <Input
                label="Concurrencia"
                name="concurrency"
                type="number"
                value={formState.concurrency.toString()}
                onChange={handleInputChange}
                placeholder="5"
                helperText="Número de solicitudes simultáneas"
              />
            </FormGrid>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Rutas a incluir</SectionTitle>
            <PathsListContainer>
              <PathsList>
                {formState.includedPaths.map((path, index) => (
                  <PathTag key={index}>
                    {path}
                    <RemoveButton 
                      onClick={() => removeIncludedPath(path)}
                      title="Eliminar"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </RemoveButton>
                  </PathTag>
                ))}
              </PathsList>
              
              <PathInput>
                <Input
                  value={newIncludedPath}
                  onChange={(e) => setNewIncludedPath(e.target.value)}
                  placeholder="/ruta-a-incluir"
                />
                
                <Button onClick={addIncludedPath} disabled={!newIncludedPath}>
                  Añadir
                </Button>
              </PathInput>
            </PathsListContainer>
            
            <SectionTitle>Rutas a excluir</SectionTitle>
            <PathsListContainer>
              <PathsList>
                {formState.excludedPaths.map((path, index) => (
                  <PathTag key={index}>
                    {path}
                    <RemoveButton 
                      onClick={() => removeExcludedPath(path)}
                      title="Eliminar"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </RemoveButton>
                  </PathTag>
                ))}
              </PathsList>
              
              <PathInput>
                <Input
                  value={newExcludedPath}
                  onChange={(e) => setNewExcludedPath(e.target.value)}
                  placeholder="/ruta-a-excluir"
                />
                
                <Button onClick={addExcludedPath} disabled={!newExcludedPath}>
                  Añadir
                </Button>
              </PathInput>
            </PathsListContainer>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Opciones avanzadas</SectionTitle>
            
            <CheckboxWrapper>
              <StyledCheckbox
                type="checkbox"
                id="throttleRequests"
                name="throttleRequests"
                checked={formState.throttleRequests}
                onChange={handleInputChange}
              />
              <CheckboxLabel htmlFor="throttleRequests">
                Limitar velocidad de solicitudes
              </CheckboxLabel>
            </CheckboxWrapper>
            
            {formState.throttleRequests && (
              <Input
                label="Tiempo entre solicitudes (ms)"
                name="requestDelay"
                type="number"
                value={formState.requestDelay.toString()}
                onChange={handleInputChange}
                placeholder="500"
              />
            )}
            
            <CheckboxWrapper>
              <StyledCheckbox
                type="checkbox"
                id="checkImages"
                name="checkImages"
                checked={formState.checkImages}
                onChange={handleInputChange}
              />
              <CheckboxLabel htmlFor="checkImages">
                Verificar imágenes
              </CheckboxLabel>
            </CheckboxWrapper>
            
            <CheckboxWrapper>
              <StyledCheckbox
                type="checkbox"
                id="checkExternalLinks"
                name="checkExternalLinks"
                checked={formState.checkExternalLinks}
                onChange={handleInputChange}
              />
              <CheckboxLabel htmlFor="checkExternalLinks">
                Verificar enlaces externos
              </CheckboxLabel>
            </CheckboxWrapper>
            
            <Input
              label="Umbral de rendimiento (ms)"
              name="performanceThreshold"
              type="number"
              value={formState.performanceThreshold.toString()}
              onChange={handleInputChange}
              placeholder="2000"
              helperText="Las páginas que tarden más que este valor se marcarán como lentas"
            />
          </FormSection>
          
          <ButtonsContainer>
            <Button 
              onClick={handleResetSettings} 
              variant="outline"
            >
              Restaurar predeterminados
            </Button>
            
            <Button 
              onClick={handleSaveSettings}
              variant="primary"
            >
              Guardar configuración
            </Button>
          </ButtonsContainer>
        </Card.Body>
      </Card>
    </SettingsContainer>
  );
};

export default CrawlerSettings;
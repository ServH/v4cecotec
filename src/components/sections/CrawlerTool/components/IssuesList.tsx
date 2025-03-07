import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { PageIssue, IssueType, IssueStatus, IssueSeverity } from '@/types/crawler/crawler.types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

interface IssuesListProps {
  issues: PageIssue[];
  onUpdateStatus: (issueId: string, status: IssueStatus) => void;
}

const ListContainer = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};
  flex-wrap: wrap;
  
  @media ${theme.media.md} {
    flex-wrap: nowrap;
  }
`;

const FilterControl = styled.div`
  min-width: 200px;
  flex: 1;
`;

const IssueCard = styled.div<{ severity: IssueSeverity }>`
  border-left: 4px solid ${props => {
    switch (props.severity) {
      case 'critical': return theme.colors.error.main;
      case 'high': return theme.colors.error.main;
      case 'medium': return theme.colors.warning.main;
      case 'low': return theme.colors.info.main;
      default: return theme.colors.neutral[400];
    }
  }};
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};
  background-color: white;
  border-radius: ${theme.radii.md};
  box-shadow: ${theme.shadows.sm};
`;

const IssueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing[2]};
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  
  @media ${theme.media.md} {
    flex-wrap: nowrap;
  }
`;

const IssueTitle = styled.h3`
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const IssueUrl = styled.a`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.primary[500]};
  text-decoration: none;
  word-break: break-all;
  
  &:hover {
    text-decoration: underline;
  }
`;

const IssueDetails = styled.div`
  margin: ${theme.spacing[3]} 0;
`;

const BadgesContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[3]};
  flex-wrap: wrap;
`;

const Badge = styled.span<{ variant?: 'default' | 'error' | 'warning' | 'info' | 'success' }>`
  display: inline-block;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.radii.full};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.medium};
  
  ${props => {
    switch (props.variant) {
      case 'error':
        return `
          background-color: ${theme.colors.error.light};
          color: ${theme.colors.error.dark};
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.warning.light};
          color: ${theme.colors.warning.dark};
        `;
      case 'info':
        return `
          background-color: ${theme.colors.info.light};
          color: ${theme.colors.info.dark};
        `;
      case 'success':
        return `
          background-color: ${theme.colors.success.light};
          color: ${theme.colors.success.dark};
        `;
      default:
        return `
          background-color: ${theme.colors.neutral[200]};
          color: ${theme.colors.text.secondary};
        `;
    }
  }}
`;

const IssueActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing[2]};
`;

const NoIssuesMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[6]};
  text-align: center;
  color: ${theme.colors.text.secondary};
  
  svg {
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.success.main};
  }
`;

// Opciones de estado para el select
const statusOptions = [
  { value: 'new', label: 'Nuevo' },
  { value: 'investigating', label: 'Investigando' },
  { value: 'resolved', label: 'Resuelto' },
  { value: 'ignored', label: 'Ignorado' }
];

// Mapeo de tipos de problemas a nombres legibles
const issueTypeNames: Record<IssueType, string> = {
  broken_link: 'Enlace roto',
  not_found: 'No encontrado (404)',
  redirect_error: 'Error de redirección',
  server_error: 'Error de servidor',
  performance: 'Rendimiento lento',
  image_error: 'Error de imagen',
  other: 'Otro problema'
};

// Mapeo de severidad a nombres legibles
const severityNames: Record<IssueSeverity, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  critical: 'Crítica'
};

// Mapeo de estado a variante visual
const statusVariants: Record<IssueStatus, 'default' | 'error' | 'warning' | 'info' | 'success'> = {
  new: 'error',
  investigating: 'warning',
  resolved: 'success',
  ignored: 'default'
};

// Mapeo de estado a nombres legibles
const statusNames: Record<IssueStatus, string> = {
  new: 'Nuevo',
  investigating: 'Investigando',
  resolved: 'Resuelto',
  ignored: 'Ignorado'
};

const IssuesList: React.FC<IssuesListProps> = ({ issues, onUpdateStatus }) => {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  // Filtrar issues
  const filteredIssues = issues.filter(issue => {
    if (typeFilter !== 'all' && issue.type !== typeFilter) return false;
    if (statusFilter !== 'all' && issue.status !== statusFilter) return false;
    if (severityFilter !== 'all' && issue.severity !== severityFilter) return false;
    return true;
  });

  // Ordenar por severidad y luego por fecha
  const sortedIssues = [...filteredIssues].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const aOrder = severityOrder[a.severity] || 4;
    const bOrder = severityOrder[b.severity] || 4;
    
    if (aOrder !== bOrder) return aOrder - bOrder;
    
    // Si la severidad es la misma, ordenar por fecha (más recientes primero)
    return new Date(b.dateDetected).getTime() - new Date(a.dateDetected).getTime();
  });

  return (
    <ListContainer>
      <Card>
        <Card.Header>
          <Card.Title>Problemas detectados</Card.Title>
          <Card.Description>
            {filteredIssues.length} de {issues.length} problemas mostrados
          </Card.Description>
        </Card.Header>
        
        <Card.Body>
          <FiltersContainer>
            <FilterControl>
              <Select
                label="Tipo de problema"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'Todos los tipos' },
                  { value: 'broken_link', label: 'Enlaces rotos' },
                  { value: 'not_found', label: 'No encontrado (404)' },
                  { value: 'redirect_error', label: 'Error de redirección' },
                  { value: 'server_error', label: 'Error de servidor' },
                  { value: 'performance', label: 'Rendimiento lento' },
                  { value: 'image_error', label: 'Error de imagen' },
                  { value: 'other', label: 'Otros problemas' }
                ]}
              />
            </FilterControl>
            
            <FilterControl>
              <Select
                label="Estado"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'Todos los estados' },
                  { value: 'new', label: 'Nuevos' },
                  { value: 'investigating', label: 'Investigando' },
                  { value: 'resolved', label: 'Resueltos' },
                  { value: 'ignored', label: 'Ignorados' }
                ]}
              />
            </FilterControl>
            
            <FilterControl>
              <Select
                label="Severidad"
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'Todas las severidades' },
                  { value: 'critical', label: 'Crítica' },
                  { value: 'high', label: 'Alta' },
                  { value: 'medium', label: 'Media' },
                  { value: 'low', label: 'Baja' }
                ]}
              />
            </FilterControl>
          </FiltersContainer>

          {sortedIssues.length > 0 ? (
            sortedIssues.map(issue => (
              <IssueCard key={issue.id} severity={issue.severity}>
                <IssueHeader>
                  <IssueTitle>{issueTypeNames[issue.type]}</IssueTitle>
                  <Select
                    value={issue.status}
                    onChange={(e) => onUpdateStatus(issue.id, e.target.value as IssueStatus)}
                    options={statusOptions}
                    size="sm"
                  />
                </IssueHeader>
                
                <IssueUrl href={issue.url} target="_blank" rel="noopener noreferrer">
                  {issue.url}
                </IssueUrl>
                
                <IssueDetails>
                  {issue.details}
                </IssueDetails>
                
                <BadgesContainer>
                  <Badge variant={statusVariants[issue.status]}>
                    Estado: {statusNames[issue.status]}
                  </Badge>
                  
                  <Badge variant={
                    issue.severity === 'critical' || issue.severity === 'high' 
                      ? 'error' 
                      : issue.severity === 'medium' 
                        ? 'warning' 
                        : 'info'
                  }>
                    Severidad: {severityNames[issue.severity]}
                  </Badge>
                  
                  {issue.statusCode && (
                    <Badge variant={issue.statusCode >= 400 ? 'error' : 'info'}>
                      Código: {issue.statusCode}
                    </Badge>
                  )}
                  
                  {issue.responseTime && (
                    <Badge variant={issue.responseTime > 2000 ? 'warning' : 'info'}>
                      Tiempo: {issue.responseTime}ms
                    </Badge>
                  )}
                </BadgesContainer>
                
                <IssueActions>
                  <Button 
                    as="a" 
                    href={issue.url} 
                    target="_blank"
                    variant="outline"
                    size="sm"
                  >
                    Visitar página
                  </Button>
                  
                  {issue.status !== 'resolved' && (
                    <Button 
                      onClick={() => onUpdateStatus(issue.id, 'resolved')}
                      variant="primary"
                      size="sm"
                    >
                      Marcar como resuelto
                    </Button>
                  )}
                </IssueActions>
              </IssueCard>
            ))
          ) : (
            <NoIssuesMessage>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3>¡No hay problemas que mostrar!</h3>
              <p>
                {issues.length > 0 
                  ? 'Ajusta los filtros para ver los problemas disponibles.' 
                  : 'Comienza un nuevo análisis para detectar problemas en el sitio.'}
              </p>
            </NoIssuesMessage>
          )}
        </Card.Body>
      </Card>
    </ListContainer>
  );
};

export default IssuesList;
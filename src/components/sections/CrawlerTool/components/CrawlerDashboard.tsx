import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { CrawlStats, PageIssue, IssueType, IssueSeverity } from '@/types/crawler/crawler.types';
import Card from '@/components/ui/Card';
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface CrawlerDashboardProps {
  stats: CrawlStats;
  issues: PageIssue[];
}

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[6]};
  
  @media ${theme.media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media ${theme.media.lg} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
  
  @media ${theme.media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing[4]};
  background-color: white;
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.sm};
`;

const StatValue = styled.div`
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary[500]};
  margin-bottom: ${theme.spacing[2]};
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

const ChartContainer = styled.div`
  height: 300px;
  padding: ${theme.spacing[4]};
`;

const NoDataMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${theme.colors.text.secondary};
  
  svg {
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.neutral[400]};
  }
`;

// Colores para las gráficas
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Mapeo de nombres para mostrar
const issueTypeNames: Record<IssueType, string> = {
  broken_link: 'Enlaces rotos',
  not_found: 'No encontrado (404)',
  redirect_error: 'Error redirección',
  server_error: 'Error servidor',
  performance: 'Rendimiento',
  image_error: 'Error imagen',
  other: 'Otros'
};

const severityNames: Record<IssueSeverity, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  critical: 'Crítica'
};

const CrawlerDashboard: React.FC<CrawlerDashboardProps> = ({ stats, issues }) => {
  // Preparar datos para los gráficos
  const issueTypeData = Object.entries(stats.issuesByType).map(([type, count]) => ({
    name: issueTypeNames[type as IssueType] || type,
    value: count
  })).filter(item => item.value > 0);

  const issueSeverityData = Object.entries(stats.issuesBySeverity).map(([severity, count]) => ({
    name: severityNames[severity as IssueSeverity] || severity,
    value: count
  })).filter(item => item.value > 0);

  const hasIssues = issues.length > 0;

  return (
    <>
      <StatsGrid>
        <StatCard>
          <StatValue>{stats.totalPages}</StatValue>
          <StatLabel>Páginas totales</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.checkedPages}</StatValue>
          <StatLabel>Páginas analizadas</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.totalIssues}</StatValue>
          <StatLabel>Problemas detectados</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.averageResponseTime}ms</StatValue>
          <StatLabel>Tiempo de respuesta medio</StatLabel>
        </StatCard>
      </StatsGrid>

      <DashboardContainer>
        <Card>
          <Card.Header>
            <Card.Title>Problemas por tipo</Card.Title>
          </Card.Header>
          <ChartContainer>
            {hasIssues ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issueTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {issueTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Cantidad']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <NoDataMessage>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>No hay datos disponibles</div>
                <div>Inicia un nuevo crawling para ver resultados</div>
              </NoDataMessage>
            )}
          </ChartContainer>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Problemas por severidad</Card.Title>
          </Card.Header>
          <ChartContainer>
            {hasIssues ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={issueSeverityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Cantidad']} />
                  <Bar dataKey="value" fill="#8884d8">
                    {issueSeverityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <NoDataMessage>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>No hay datos disponibles</div>
                <div>Inicia un nuevo crawling para ver resultados</div>
              </NoDataMessage>
            )}
          </ChartContainer>
        </Card>
      </DashboardContainer>
    </>
  );
};

export default CrawlerDashboard;
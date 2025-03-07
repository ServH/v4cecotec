import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { PageIssue } from '@/types/crawler/crawler.types';
import Card from '@/components/ui/Card';

interface SiteMapProps {
  issues: PageIssue[];
}

const MapContainer = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

const VisualizationContainer = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
  border-radius: ${theme.radii.md};
  background-color: ${theme.colors.background.subtle};
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

// Implementación básica del mapa de sitio
// En un proyecto real, usaríamos una biblioteca como D3.js o vis.js
const SiteMap: React.FC<SiteMapProps> = ({ issues }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || issues.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Configurar canvas
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Redibujar cuando cambie el tamaño
      drawSiteMap();
    };
    
    // Redibujar en resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Función para dibujar el mapa
    function drawSiteMap() {
      if (!ctx) return;
      
      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Extraer dominios únicos de las URLs de problemas
      const urlsWithIssues = issues.map(issue => {
        try {
          return new URL(issue.url);
        } catch (e) {
          console.error('URL inválida:', issue.url);
          return null;
        }
      }).filter(Boolean) as URL[];
      
      // Agrupar URLs por path principal
      const pathGroups: Record<string, { urls: URL[], issues: PageIssue[] }> = {};
      
      urlsWithIssues.forEach((url, index) => {
        if (!url) return;
        
        const pathParts = url.pathname.split('/');
        const mainPath = pathParts.length > 1 ? `/${pathParts[1]}` : '/';
        
        if (!pathGroups[mainPath]) {
          pathGroups[mainPath] = { urls: [], issues: [] };
        }
        
        pathGroups[mainPath].urls.push(url);
        pathGroups[mainPath].issues.push(issues[index]);
      });
      
      // Dibujar nodos
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.7;
      
      // Dibujar nodo central
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fillStyle = theme.colors.primary[500];
      ctx.fill();
      
      // Dibujar texto del nodo central
      ctx.font = '14px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('/', centerX, centerY);
      
      // Dibujar nodos secundarios
      const pathEntries = Object.entries(pathGroups);
      pathEntries.forEach(([path, data], index) => {
        const angle = (index / pathEntries.length) * Math.PI * 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // Dibujar línea desde el centro
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = theme.colors.neutral[300];
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Determinar color basado en severidad
        const hasHighSeverity = data.issues.some(issue => 
          issue.severity === 'critical' || issue.severity === 'high'
        );
        const hasMediumSeverity = data.issues.some(issue => 
          issue.severity === 'medium'
        );
        
        let nodeColor = theme.colors.success.main;
        if (hasHighSeverity) {
          nodeColor = theme.colors.error.main;
        } else if (hasMediumSeverity) {
          nodeColor = theme.colors.warning.main;
        }
        
        // Dibujar nodo
        const nodeSize = 15 + Math.min(data.issues.length * 2, 15);
        ctx.beginPath();
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
        
        // Dibujar texto
        ctx.font = '12px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(path, x, y);
        
        // Dibujar contador
        const issueCount = data.issues.length;
        const countX = x + nodeSize * 0.7;
        const countY = y - nodeSize * 0.7;
        
        ctx.beginPath();
        ctx.arc(countX, countY, 10, 0, Math.PI * 2);
        ctx.fillStyle = theme.colors.neutral[800];
        ctx.fill();
        
        ctx.font = '10px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(issueCount.toString(), countX, countY);
      });
    }
    
    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [issues]);
  
  return (
    <MapContainer>
      <Card>
        <Card.Header>
          <Card.Title>Mapa visual del sitio</Card.Title>
          <Card.Description>
            Visualización de la estructura del sitio con problemas destacados
          </Card.Description>
        </Card.Header>
        
        <VisualizationContainer>
          {issues.length > 0 ? (
            <canvas ref={canvasRef} />
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
              <div>No hay datos disponibles para visualizar</div>
              <div>Inicia un nuevo crawling para ver el mapa del sitio</div>
            </NoDataMessage>
          )}
        </VisualizationContainer>
      </Card>
    </MapContainer>
  );
};

export default SiteMap;
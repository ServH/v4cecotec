import React from 'react';
import { LandingPageProps, ToolInfo } from './LandingPage.types';
import {
  LandingContainer,
  LandingHeader,
  LandingTitle,
  LandingSubtitle,
  ToolsGrid,
  Footer,
  FooterLink
} from './LandingPage.styles';
import Container from '@/components/layout/Container';
import ToolCard from './components/ToolCard';

const LandingPage: React.FC<LandingPageProps> = () => {
  const tools: ToolInfo[] = [
    {
      id: 'categories',
      name: 'Análisis de Categorías',
      description: 'Analiza categorías de productos para comprobar su disponibilidad y obtener información detallada sobre su estructura.',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      path: '/categories'
    },
    {
      id: 'metrics',
      name: 'Métricas y Estadísticas',
      description: 'Visualiza métricas clave sobre productos, incluyendo precios, disponibilidad, y comparativas entre categorías.',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6" y2="6"></line>
          <line x1="6" y1="18" x2="6" y2="18"></line>
        </svg>
      ),
      path: '/metrics'
    },
    {
      id: 'cluster',
      name: 'Cluster de Productos',
      description: 'Organiza, visualiza y exporta grupos de productos en diferentes formatos, ideal para crear catálogos personalizados.',
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      path: '/cluster'
    }
  ];

  return (
    <LandingContainer>
      <Container>
        <LandingHeader>
          <LandingTitle>Panel de Herramientas Cecotec</LandingTitle>
          <LandingSubtitle>
            Suite de herramientas para análisis, visualización y gestión de productos y categorías
          </LandingSubtitle>
        </LandingHeader>
        
        <ToolsGrid>
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </ToolsGrid>
        
        <Footer>
          <p>© {new Date().getFullYear()} Herramientas de Análisis Cecotec - Desarrollado por <FooterLink href="#">Equipo de Desarrollo</FooterLink></p>
        </Footer>
      </Container>
    </LandingContainer>
  );
};

export default LandingPage;
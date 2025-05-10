import React from 'react';
import { 
  HeaderContainer, 
  HeaderContent, 
  Logo, 
  HeaderTitle,
  HeaderInfo
} from './Header.styles';
import Container from '@/components/layout/Container';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <Logo>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              width="32"
              height="32"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </Logo>
          
          <div>
            <HeaderTitle>Analizador de Categorías Cecotec</HeaderTitle>
            <HeaderInfo>Herramienta para analizar las categorías de productos de Cecotec</HeaderInfo>
          </div>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
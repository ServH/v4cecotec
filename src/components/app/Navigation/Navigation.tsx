import React from 'react';
import { 
  NavigationContainer,
  NavigationList,
  NavigationItem,
  NavigationLink,
  NavigationIcon
} from './Navigation.styles';
import Container from '@/components/layout/Container';
import { usePathname } from 'next/navigation';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  
  return (
    <NavigationContainer>
      <Container>
        <NavigationList>
          <NavigationItem>
            <NavigationLink 
              href="/categories"
              className={pathname === '/categories' ? 'active' : ''}
            >
              <NavigationIcon>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </NavigationIcon>
              Categorías
            </NavigationLink>
          </NavigationItem>
          
          <NavigationItem>
            <NavigationLink 
              href="/metrics"
              className={pathname === '/metrics' ? 'active' : ''}
            >
              <NavigationIcon>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                  <line x1="6" y1="6" x2="6" y2="6"></line>
                  <line x1="6" y1="18" x2="6" y2="18"></line>
                </svg>
              </NavigationIcon>
              Métricas
            </NavigationLink>
          </NavigationItem>

          <NavigationItem>
            <NavigationLink 
              href="/cluster"
              className={pathname === '/cluster' ? 'active' : ''}
            >
              <NavigationIcon>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </NavigationIcon>
              Cluster
            </NavigationLink>
          </NavigationItem>
        </NavigationList>
      </Container>
    </NavigationContainer>
  );
};

export default Navigation;
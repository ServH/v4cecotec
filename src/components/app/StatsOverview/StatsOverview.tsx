import React from 'react';
import { 
  StatsContainer, 
  StatCardContainer,
  StatCardIcon,
  StatCardContent,
  StatCardValue,
  StatCardLabel,
  ProgressContainer,
  ProgressLabel,
  ProgressValue
} from './StatsOverview.styles';
import Card from '@/components/ui/Card';
import Grid from '@/components/layout/Grid';
import ProgressBar from '@/components/ui/ProgressBar';

interface StatsOverviewProps {
  total: number;
  valid: number;
  invalid: number;
  processed: number;
  progress: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  total,
  valid,
  invalid,
  processed,
  progress
}) => {
  return (
    <div>
      <Grid 
        columns={{ base: 1, sm: 2, lg: 4 }}
        gap={4}
      >
        <StatCard 
          icon={
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          }
          value={total}
          label="Total Categorías"
          color="primary"
        />
        
        <StatCard 
          icon={
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
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
          }
          value={valid}
          label="Con Productos"
          color="success"
        />
        
        <StatCard 
          icon={
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          }
          value={invalid}
          label="Sin Productos"
          color="error"
        />
        
        <StatCard 
          icon={
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          }
          value={`${processed} / ${total}`}
          label="Procesadas"
          color="info"
        />
      </Grid>
      
      <ProgressContainer>
        <ProgressLabel>Progreso del análisis</ProgressLabel>
        <ProgressValue>{Math.round(progress)}%</ProgressValue>
        <ProgressBar progress={progress} height={8} />
      </ProgressContainer>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  color: 'primary' | 'success' | 'error' | 'info';
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  color
}) => {
  return (
    <StatCardContainer>
      <Card>
        <Card.Body>
          <StatsContainer>
            <StatCardIcon $color={color}>{icon}</StatCardIcon>
            <StatCardContent>
              <StatCardValue>{value}</StatCardValue>
              <StatCardLabel>{label}</StatCardLabel>
            </StatCardContent>
          </StatsContainer>
        </Card.Body>
      </Card>
    </StatCardContainer>
  );
};

export default StatsOverview;
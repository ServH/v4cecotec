import React from 'react';
import { ToolCardProps } from './ToolCard.types';
import {
  CardContainer,
  CardIconContainer,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter
} from './ToolCard.styles';

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <CardContainer href={tool.path}>
      <CardIconContainer>
        {tool.icon}
      </CardIconContainer>
      <CardContent>
        <CardTitle>{tool.name}</CardTitle>
        <CardDescription>{tool.description}</CardDescription>
        <CardFooter>
          Acceder
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </CardFooter>
      </CardContent>
    </CardContainer>
  );
};

export default ToolCard;
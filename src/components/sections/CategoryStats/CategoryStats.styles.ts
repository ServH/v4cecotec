import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 0 0 8px;
`;

export const Description = styled.p`
  color: #5f6368;
  margin: 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

export const ProgressContainer = styled.div`
  margin-bottom: 24px;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
`;

export const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

export const CategoryItem = styled.div<{ status: 'OK' | 'KO' }>`
  padding: 16px;
  border-radius: 6px;
  background-color: ${({ status }) => status === 'OK' ? '#e6f4ea' : '#fce8e6'};
  border-left: 4px solid ${({ status }) => status === 'OK' ? '#0d652d' : '#c5221f'};
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const CategoryName = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CategoryLink = styled.a`
  color: #1a73e8;
  font-size: 14px;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const CategoryStatus = styled.div<{ status: 'OK' | 'KO' }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  background-color: ${({ status }) => status === 'OK' ? '#0d652d' : '#c5221f'};
  color: white;
`;

export const CategoryError = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #c5221f;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 24px;
`;
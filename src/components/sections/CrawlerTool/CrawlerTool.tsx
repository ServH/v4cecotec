import React, { useState, useEffect } from 'react';
import { useCrawlerStore } from '@/stores/crawler';
import {
  CrawlerContainer,
  CrawlerHeader,
  CrawlerTitle,
  CrawlerDescription,
  DashboardGrid,
  IssuesContainer,
  ProgressContainer,
  ProgressBarWrapper,
  ProgressDetails,
  ProgressValue,
  CurrentUrl
} from './CrawlerTool.styles';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import CrawlerControls from './components/CrawlerControls';
import CrawlerDashboard from './components/CrawlerDashboard';
import IssuesList from './components/IssuesList';
import CrawlerSettings from './components/CrawlerSettings';
import SiteMap from './components/SiteMap';
import { CrawlerToolProps } from './CrawlerTool.types';

const CrawlerTool: React.FC<CrawlerToolProps> = () => {
  const {
    isRunning,
    progress,
    currentUrl,
    stats,
    issues,
    settings,
    error,
    startCrawl,
    stopCrawl,
    updateSettings,
    resetResults,
    updateIssueStatus,
    exportResults,
    loadCrawlHistory
  } = useCrawlerStore();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'issues' | 'settings' | 'map'>('dashboard');

  // Cargar historial al montar el componente
  useEffect(() => {
    loadCrawlHistory();
  }, [loadCrawlHistory]);

  return (
    <CrawlerContainer>
      <Container>
        <CrawlerHeader>
          <CrawlerTitle>Crawler de Sitio Web</CrawlerTitle>
          <CrawlerDescription>
            Analiza automáticamente la web de Cecotec para detectar problemas como enlaces rotos, páginas 404,
            redirecciones incorrectas y otros errores que podrían afectar la experiencia del usuario.
          </CrawlerDescription>
        </CrawlerHeader>

        <CrawlerControls
          isRunning={isRunning}
          onStart={() => startCrawl()}
          onStop={stopCrawl}
          onReset={resetResults}
          onExport={exportResults}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        {isRunning && (
          <ProgressContainer>
            <Card>
              <Card.Body>
                <ProgressBarWrapper>
                  <ProgressBar progress={progress} height={12} />
                </ProgressBarWrapper>
                <ProgressDetails>
                  <ProgressValue>{progress}% completado</ProgressValue>
                  <div>Páginas analizadas: {stats.checkedPages} de {stats.totalPages}</div>
                  {currentUrl && (
                    <div>
                      Analizando: <CurrentUrl>{currentUrl}</CurrentUrl>
                    </div>
                  )}
                </ProgressDetails>
              </Card.Body>
            </Card>
          </ProgressContainer>
        )}

        {error && (
          <Card style={{ marginTop: '24px', backgroundColor: '#fce8e6' }}>
            <Card.Body>
              <div style={{ color: '#c5221f', fontWeight: 500 }}>Error: {error}</div>
            </Card.Body>
          </Card>
        )}

        {activeTab === 'dashboard' && (
          <CrawlerDashboard stats={stats} issues={issues} />
        )}

        {activeTab === 'issues' && (
          <IssuesContainer>
            <IssuesList issues={issues} onUpdateStatus={updateIssueStatus} />
          </IssuesContainer>
        )}

        {activeTab === 'settings' && (
          <CrawlerSettings settings={settings} onUpdateSettings={updateSettings} />
        )}

        {activeTab === 'map' && (
          <SiteMap issues={issues} />
        )}
      </Container>
    </CrawlerContainer>
  );
};

export default CrawlerTool;
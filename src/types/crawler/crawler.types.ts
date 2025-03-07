export type IssueType = 'broken_link' | 'not_found' | 'redirect_error' | 'server_error' | 'performance' | 'image_error' | 'other';

export type IssueStatus = 'new' | 'investigating' | 'resolved' | 'ignored';

export type IssueSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface PageIssue {
  id: string;
  url: string;
  type: IssueType;
  status: IssueStatus;
  severity: IssueSeverity;
  details: string;
  dateDetected: string;
  dateResolved?: string;
  affectedPages?: string[];
  statusCode?: number;
  responseTime?: number;
}

export interface CrawlResult {
  url: string;
  statusCode: number;
  responseTime: number;
  contentType: string;
  title: string;
  links: string[];
  parentUrl?: string;
  issues: PageIssue[];
  dateChecked: string;
}

export interface CrawlStats {
  totalPages: number;
  checkedPages: number;
  totalIssues: number;
  issuesByType: Record<IssueType, number>;
  issuesBySeverity: Record<IssueSeverity, number>;
  averageResponseTime: number;
  startTime: string;
  endTime?: string;
}

export interface CrawlSettings {
  baseUrl: string;
  maxPages: number;
  maxDepth: number;
  concurrency: number;
  includedPaths: string[];
  excludedPaths: string[];
  throttleRequests: boolean;
  requestDelay: number;
  checkImages: boolean;
  checkExternalLinks: boolean;
  performanceThreshold: number; // milliseconds
}

export interface CrawlerState {
  isRunning: boolean;
  progress: number;
  results: CrawlResult[];
  issues: PageIssue[];
  stats: CrawlStats;
  settings: CrawlSettings;
  error: string | null;
  currentUrl: string;
  lastCrawlDate?: string;
}

export interface CrawlerActions {
  startCrawl: (settings?: Partial<CrawlSettings>) => Promise<void>;
  stopCrawl: () => void;
  updateSettings: (settings: Partial<CrawlSettings>) => void;
  resetResults: () => void;
  updateIssueStatus: (issueId: string, status: IssueStatus) => void;
  exportResults: () => void;
  loadCrawlHistory: (dateRange?: { start: string; end: string }) => Promise<void>;
}

export interface CrawlerStore extends CrawlerState, CrawlerActions {}
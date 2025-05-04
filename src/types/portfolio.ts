// src/types/portfolio.ts
export type PortfolioType = 'REAL' | 'VIRTUAL';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Portfolio {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  capital: number;
  currency: string;
  type: PortfolioType;
  riskLevel: RiskLevel;
  strategiesIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioSummary {
  totalCount: number;
  realCount: number;
  virtualCount: number;
  totalCapital: number;
  realCapital: number;
  virtualCapital: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  strategyUtilization: Record<string, number>;
}

// src/types/strategy.ts
export type StrategyType = 'MOMENTUM' | 'MEAN_REVERSION' | 'OPTION_SELLING' | 'DELTA_NEUTRAL' | 'CUSTOM';

export interface Strategy {
  id: string;
  name: string;
  description: string;
  type: StrategyType;
  riskLevel: RiskLevel;
  logic: string;
  parameters: {
    entryCriteria: string;
    exitCriteria: string;
    riskManagementRules: string;
  };
  linkedPortfoliosCount: number;
  createdAt: string;
  updatedAt: string;
}

// src/types/test.ts
export type TestMode = 'BACKTEST' | 'FORWARD_TEST';

export interface TestConfig {
  id?: string;
  portfolioIds: string[];
  strategyId: string;
  mode: TestMode;
  startDate: string;
  endDate: string;
  timeframe: string;
  frequency: string;
  capitalAllocation: number;
  dataSource: string;
}

export interface TestResult {
  id: string;
  testConfigId: string;
  equityCurve: { date: string; value: number }[];
  metrics: {
    sharpeRatio: number;
    maxDrawdown: number;
    winRatio: number;
    cagr: number;
    volatility: number;
    profitFactor: number;
  };
  portfolioResults: Record<string, {
    initialCapital: number;
    finalCapital: number;
    returnPercentage: number;
  }>;
  createdAt: string;
}

// src/types/user.ts
export type UserRole = 'ADMIN' | 'PORTFOLIO_MANAGER' | 'ANALYST';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  portfolioCount: number;
  totalCapital: number;
  createdAt: string;
}

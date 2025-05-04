// src/components/dashboard/portfolio-summary.tsx
import React from 'react';
import { PortfolioSummary } from '@/types/portfolio';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type Props = {
  summary: PortfolioSummary;
};

export default function PortfolioSummaryCard({ summary }: Props) {
  const { totalCount, realCount, virtualCount, totalCapital, realCapital, virtualCapital } = summary;
  
  const capitalData = [
    { name: 'Real', value: realCapital },
    { name: 'Virtual', value: virtualCapital },
  ];
  
  const countData = [
    { name: 'Real', value: realCount },
    { name: 'Virtual', value: virtualCount },
  ];
  
  const COLORS = ['#0088FE', '#00C49F'];
  
  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Portfolio Summary</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Portfolios</span>
              <span className="font-mono text-lg">{totalCount}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">Real</span>
              <span className="font-mono">{realCount}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">Virtual</span>
              <span className="font-mono">{virtualCount}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Capital</span>
              <span className="font-mono text-lg">${totalCapital.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted-foreground">Real</span>
              <span className="font-mono">${realCapital.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">Virtual</span>
              <span className="font-mono">${virtualCapital.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={capitalData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {capitalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// src/components/dashboard/risk-distribution.tsx
import React from 'react';
import { PortfolioSummary } from '@/types/portfolio';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  summary: PortfolioSummary;
};

export default function RiskDistributionCard({ summary }: Props) {
  const { riskDistribution } = summary;
  
  const data = [
    { name: 'Low', value: riskDistribution.low },
    { name: 'Medium', value: riskDistribution.medium },
    { name: 'High', value: riskDistribution.high },
  ];
  
  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Risk Distribution</h3>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// src/components/dashboard/recent-portfolios.tsx
import React from 'react';
import Link from 'next/link';
import { Portfolio } from '@/types/portfolio';

type Props = {
  portfolios: Portfolio[];
};

export default function RecentPortfoliosCard({ portfolios }: Props) {
  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Recent Portfolios</h3>
        <Link href="/portfolios" className="text-sm text-primary hover:underline">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-center">
              <Link href={`/portfolios/${portfolio.id}`} className="text-base font-medium hover:text-primary">
                {portfolio.name}
              </Link>
              <span className={`text-xs px-2 py-1 rounded-full ${
                portfolio.type === 'REAL' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              }`}>
                {portfolio.type}
              </span>
            </div>
            <div className="mt-1 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Client: {portfolio.clientName}</span>
              <span className="text-sm font-mono">${portfolio.capital.toLocaleString()}</span>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Risk: {portfolio.riskLevel}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(portfolio.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// src/app/dashboard/page.tsx
import React from 'react';
import PortfolioSummaryCard from '@/components/dashboard/portfolio-summary';
import RiskDistributionCard from '@/components/dashboard/risk-distribution';
import RecentPortfoliosCard from '@/components/dashboard/recent-portfolios';
import { PortfolioSummary } from '@/types/portfolio';

// Mock data - in a real application, this would be fetched from an API
const summaryData: PortfolioSummary = {
  totalCount: 24,
  realCount: 14,
  virtualCount: 10,
  totalCapital: 5280000,
  realCapital: 4150000,
  virtualCapital: 1130000,
  riskDistribution: {
    low: 8,
    medium: 12,
    high: 4,
  },
  strategyUtilization: {
    "MOMENTUM": 10,
    "MEAN_REVERSION": 6,
    "OPTION_SELLING": 5,
    "DELTA_NEUTRAL": 3,
  }
};

const recentPortfolios = [
  {
    id: "p1",
    name: "Growth Portfolio Alpha",
    clientId: "c1",
    clientName: "John Smith",
    capital: 500000,
    currency: "USD",
    type: "REAL",
    riskLevel: "MEDIUM",
    strategiesIds: ["s1", "s3"],
    createdAt: "2025-04-12T10:30:00.000Z",
    updatedAt: "2025-04-12T10:30:00.000Z"
  },
  {
    id: "p2",
    name: "Tech Momentum Strategy",
    clientId: "c2",
    clientName: "Alice Johnson",
    capital: 350000,
    currency: "USD",
    type: "VIRTUAL",
    riskLevel: "HIGH",
    strategiesIds: ["s2"],
    createdAt: "2025-04-11T14:20:00.000Z",
    updatedAt: "2025-04-11T14:20:00.000Z"
  },
  {
    id: "p3",
    name: "Conservative Income",
    clientId: "c3",
    clientName: "Robert Davis",
    capital: 750000,
    currency: "USD",
    type: "REAL",
    riskLevel: "LOW",
    strategiesIds: ["s4", "s5"],
    createdAt: "2025-04-10T09:15:00.000Z",
    updatedAt: "2025-04-10T09:15:00.000Z"
  },
  {
    id: "p4",
    name: "Options Strategy Test",
    clientId: "c4",
    clientName: "Emily Wilson",
    capital: 250000,
    currency: "USD",
    type: "VIRTUAL",
    riskLevel: "MEDIUM",
    strategiesIds: ["s6"],
    createdAt: "2025-04-09T11:45:00.000Z",
    updatedAt: "2025-04-09T11:45:00.000Z"
  },
  {
    id: "p5",
    name: "Balanced Global",
    clientId: "c5",
    clientName: "Michael Brown",
    capital: 420000,
    currency: "USD",
    type: "REAL",
    riskLevel: "MEDIUM",
    strategiesIds: ["s1", "s4"],
    createdAt: "2025-04-08T16:10:00.000Z",
    updatedAt: "2025-04-08T16:10:00.000Z"
  }
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PortfolioSummaryCard summary={summaryData} />
        <RiskDistributionCard summary={summaryData} />
      </div>
      
      <div className="mb-6">
        <RecentPortfoliosCard portfolios={recentPortfolios} />
      </div>
    </div>
  );
}

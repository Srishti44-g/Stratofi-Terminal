// src/components/portfolios/portfolio-table.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { Portfolio, PortfolioType, RiskLevel } from '@/types/portfolio';

interface PortfolioTableProps {
  portfolios: Portfolio[];
  onCreateNew: () => void;
}

export default function PortfolioTable({ portfolios, onCreateNew }: PortfolioTableProps) {

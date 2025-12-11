'use client';

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A horizontal bar chart';

export function DashboardChartBarHorizontal({
  totalIncome,
  totalBudget,
  totalExpenses,
  totalSavings,
}) {
  const chartData = [
    { month: 'Income', desktop: totalIncome },
    { month: 'Savings', desktop: totalSavings },
    { month: 'Budget', desktop: totalBudget },
    { month: 'Expenses', desktop: totalExpenses },
  ];

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'var(--chart-1)',
    },
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: -5,
          }}
        >
          <XAxis type="number" dataKey="desktop" hide />
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}

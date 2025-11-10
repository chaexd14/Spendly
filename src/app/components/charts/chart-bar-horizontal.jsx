'use client';

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A horizontal bar chart';

const chartData = [
  { month: 'Total Budget', desktop: 100 },
  { month: 'Total Expenses', desktop: 50 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
};

export default function ChartBarHorizontal() {
  return (
    <ResponsiveContainer>
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData} layout="vertical" margin={{ left: -20 }}>
          <XAxis type="number" dataKey="desktop" hide />
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
            width={120}
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

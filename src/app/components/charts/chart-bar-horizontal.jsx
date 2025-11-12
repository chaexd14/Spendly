'use client';

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export default function ChartBarHorizontal({ budgetSum, expensesSum }) {
  const chartData = [
    { label: 'Total Budget', value: budgetSum },
    { label: 'Total Expenses', value: expensesSum },
  ];

  const chartConfig = {
    value: {
      label: 'Total',
      color: 'var(--chart-1)',
    },
  };

  return (
    <ResponsiveContainer>
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData} layout="vertical" margin={{ left: -20 }}>
          <XAxis type="number" dataKey="value" hide />
          <YAxis
            dataKey="label"
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
          <Bar dataKey="value" fill="var(--color-value)" radius={5} />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}

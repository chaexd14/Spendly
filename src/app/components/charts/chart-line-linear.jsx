'use client';

import { TrendingUp } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  ResponsiveContainer,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A linear line chart';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
};

export default function ChartLineLinear({ incomes }) {
  const chartData = (incomes ?? []).map((i) => ({
    month: new Date(i.incomeDateReceived).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    amount: i.incomeAmount,
  }));

  console.log(chartData);

  return (
    <ResponsiveContainer>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 20,
            left: 10,
            right: 10,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={5}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="amount"
            type="linear"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}

'use client';

import { Pie, PieChart, ResponsiveContainer } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

export function ChartPieLegend({ expensesCategory }) {
  const chartData = expensesCategory.map((e) => ({
    category: e.category,
    amount: e.total,
    fill: `var(--color-${e.category})`,
  }));

  const chartConfig = {
    food: {
      label: 'Food',
      color: 'var(--chart-1)',
    },
    transportation: {
      label: 'Transportation',
      color: 'var(--chart-2)',
    },
    bills: {
      label: 'Bills',
      color: 'var(--chart-3)',
    },
    other: {
      label: 'Other',
      color: 'var(--chart-4)',
    },
  };

  return (
    <ResponsiveContainer>
      <ChartContainer config={chartConfig} className="mx-auto">
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="amount" hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="amount"
            labelLine={false}
            label={({ payload, ...props }) => {
              return (
                <text
                  cx={props.cx}
                  cy={props.cy}
                  x={props.x}
                  y={props.y}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill="hsla(var(--foreground))"
                >
                  {payload.amount}
                </text>
              );
            }}
            nameKey="category"
          />

          <ChartLegend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            content={
              <ChartLegendContent
                nameKey="category"
                data={chartData}
                config={chartConfig.category}
              />
            }
            className="flex flex-col items-start justify-center p-0 mr-[80px] text-base"
          />
        </PieChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}

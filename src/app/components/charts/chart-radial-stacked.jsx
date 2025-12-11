'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export function ChartRadialStacked({ userGoal }) {
  const chartData = userGoal.map((d) => ({
    month: d.goalName,
    currentAmount: d.goalCurrentAmount,
    totalAmount: d.goalAmount,
  }));

  const chartConfig = {
    currentAmount: {
      label: 'Current Amount',
      color: 'var(--chart-2)',
    },
    totalAmount: {
      label: 'Total Amount',
      color: 'var(--chart-1)',
    },
  };

  const total = chartData[0].totalAmount - chartData[0].currentAmount;

  console.log(chartData);
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[250px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={360}
        innerRadius={90}
        outerRadius={140}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox?.cx && viewBox?.cy) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="text-4xl font-bold fill-foreground"
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy + 30}
                      className="fill-muted-foreground"
                    >
                      Remaining
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>

        <RadialBar
          dataKey="currentAmount"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-currentAmount)"
          className="stroke-2 stroke-transparent"
        />

        <RadialBar
          dataKey="totalAmount"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-totalAmount)"
          className="stroke-2 stroke-transparent"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}

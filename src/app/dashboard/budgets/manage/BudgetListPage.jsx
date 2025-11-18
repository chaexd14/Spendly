'use client';

import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ChartBarHorizontal from '@/app/components/charts/chart-bar-horizontal';

export default function BudgetListPage({ userBudgets }) {
  const [budgets, setbudgets] = useState(userBudgets.budgets);

  const data = budgets.map((b) => ({
    id: b.budgetId,
    title: b.budgetTitle,
    periodType: b.budgetPeriodType,
    totalBudget: b.totalBudget,
    totalExpenses: b.totalBudgetExpenses,
    remainingBudget: b.remainingBudget,
    startDate: new Date(b.budgetStartDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    endDate: new Date(b.budgetEndDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  }));

  return (
    <>
      <ScrollArea className="h-full">
        <div className="grid grid-cols-3 gap-5">
          {data.map((d) => (
            <Card key={d.title} className="flex flex-col w-full">
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Budget for {d.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Active from <span>{d.startDate}</span> to{' '}
                      <span>{d.endDate}</span>
                    </CardDescription>
                  </div>
                  <Badge className="">{d.periodType}</Badge>
                </div>
              </CardHeader>

              <Separator />

              <CardContent className="py-3">
                <div className="flex items-baseline justify-center">
                  <CardTitle className="text-2xl">
                    ₱ {d.remainingBudget}
                  </CardTitle>
                  <CardDescription className="text-base">
                    / {d.totalBudget}
                  </CardDescription>
                </div>
              </CardContent>

              <Separator />

              <CardContent className="py-3">
                <div className="h-[100px]">
                  <ChartBarHorizontal
                    budgetSum={d.totalBudget}
                    expensesSum={d.totalExpenses}
                  />
                </div>
              </CardContent>

              <Separator />

              <CardFooter className="gap-5 py-3">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/budgets/manage/${d.id}`)
                  }
                >
                  Edit
                </Button>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/budgets/manage/${d.id}`)
                  }
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}

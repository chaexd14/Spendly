'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import { useCallback, useState } from 'react';

// Form
import RecordBudgetForm from './form/RecordBudgetForm';

// Chart
import ChartBarHorizontal from '@/app/components/charts/chart-bar-horizontal';

export default function BudgetPage({ userBudgets }) {
  const [budgets, setbudgets] = useState(userBudgets.budgets);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [budgetSum, setBudgetSum] = useState(userBudgets.totalBudgetSum);
  const [expensesSum, setExpensesSum] = useState(userBudgets.totalExpensesSum);

  const data = budgets.map((b) => ({
    title: b.budgetTitle,
    periodType: b.budgetPeriodType,
    totalBudget: b.totalBudget,
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

  const refreshBudget = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/budgets');
      if (!res.ok) throw new Error('Failed to fetch budgets');
      const data = await res.json();
      setbudgets(data.budgets);
      setBudgetSum(data.totalBudgetSum);
      setExpensesSum(data.totalExpensesSum);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* Budget Cards */}
      <div className="col-span-3">
        <ScrollArea>
          <div className="flex gap-5 mb-5">
            {data.map((d) => (
              <Card key={d.title} className="flex flex-col w-[330px]">
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

                <CardContent className="py-4">
                  <div className="flex items-baseline justify-center">
                    <CardTitle className="text-2xl">
                      ₱ {d.remainingBudget}
                    </CardTitle>
                    <CardDescription className="text-base">
                      / {d.totalBudget}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Form */}
      <div className="col-span-3 row-start-3 lg:col-start-1 lg:row-start-2 lg:col-span-1">
        <RecordBudgetForm
          onSuccess={() => {
            refreshBudget();
          }}
        />
      </div>

      <div className="col-span-3 row-start-2 lg:col-span-2 lg:col-start-2 lg:row-start-2 h-[300px] lg:h-full">
        <Card className="flex flex-col justify-between w-full h-full">
          <CardHeader className="py-5">
            <CardTitle>Budget Analysis</CardTitle>
            <CardDescription>
              Visual summary of your budget and expenses.
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="flex-1 py-5">
            <ChartBarHorizontal
              budgetSum={budgetSum}
              expensesSum={expensesSum}
            />
          </CardContent>

          <Separator />

          <CardFooter className="py-5">
            <Button
              variant="outline"
              className="w-full"
              disabled={loading}
              onClick={() => {
                refreshBudget();
              }}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Refreshing...</span>
                </>
              ) : (
                <span>Refresh</span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

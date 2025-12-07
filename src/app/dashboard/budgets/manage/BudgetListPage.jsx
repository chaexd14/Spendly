'use client';

import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Table
import { BudgetColumns } from './table/BudgetColumns';
import { DataTable } from '../../income/table/data-table';

// Icon
import { LayoutList } from 'lucide-react';

export default function BudgetListPage({ userBudgets }) {
  const [budgets, setbudgets] = useState(userBudgets.budgets);
  const [isTable, setIsTable] = useState(true);

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
      year: 'numeric',
    }),
    endDate: new Date(b.budgetEndDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  }));

  console.log(data);
  return (
    <div className="flex flex-col h-full gap-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-5">
          <div>
            <CardTitle className="text-2xl">Budget List</CardTitle>
            <CardDescription>
              See your budgets and make changes anytime.
            </CardDescription>
          </div>

          <Button variant="outline" onClick={() => setIsTable((prev) => !prev)}>
            <LayoutList />
          </Button>
        </CardHeader>
      </Card>

      {isTable && (
        <>
          <DataTable columns={BudgetColumns} data={data} />
        </>
      )}

      {!isTable && (
        <ScrollArea className="flex-1">
          <div className="grid h-full grid-cols-3 gap-5">
            {data.map((d) => (
              <Card key={d.title} className="flex flex-col w-full">
                <CardHeader className="py-5">
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

                <CardContent className="py-5">
                  <div className="flex items-baseline justify-center">
                    <CardTitle className="text-4xl text-blue-600">
                      ₱ {d.remainingBudget.toLocaleString()}
                    </CardTitle>
                    <CardDescription className="text-base text-green-600">
                      / {d.totalBudget.toLocaleString()}
                    </CardDescription>
                  </div>
                </CardContent>

                <Separator />

                <CardFooter className="gap-5 py-5">
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
      )}
    </div>
  );
}

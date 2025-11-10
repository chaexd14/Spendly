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

// Form
import RecordBudgetForm from './form/RecordBudgetForm';

// Chart
import ChartBarHorizontal from '@/app/components/charts/chart-bar-horizontal';

export default function BudgetPage() {
  const data = [
    {
      title: 'Food',
      periodType: 'monthly',
      totalBudget: 1000,
      remainingBudget: 800,
    },
    {
      title: 'Shopee',
      periodType: 'monthly',
      totalBudget: 2000,
      remainingBudget: 1300,
    },
    {
      title: 'Utilities',
      periodType: 'monthly',
      totalBudget: 5000,
      remainingBudget: 2500,
    },
    {
      title: 'sample1',
      periodType: 'monthly',
      totalBudget: 5000,
      remainingBudget: 2500,
    },

    {
      title: 'sample4',
      periodType: 'monthly',
      totalBudget: 5000,
      remainingBudget: 2500,
    },
    {
      title: 'sample3',
      periodType: 'monthly',
      totalBudget: 5000,
      remainingBudget: 2500,
    },
  ];

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
                        As of June 2025
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
        <RecordBudgetForm />
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
            <ChartBarHorizontal />
          </CardContent>

          <Separator />

          <CardFooter className="py-5">
            <Button className="w-full" variant="outline">
              Refresh
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

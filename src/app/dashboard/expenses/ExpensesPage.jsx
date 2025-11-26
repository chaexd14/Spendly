import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import RecordExpensesForm from './form/RecordExpensesForm';
import { ChartPieLegend } from '@/app/components/charts/chart-pie-legend';
import { Button } from '@/components/ui/button';

export default function ExpensesPage() {
  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-2xl">Expenses</CardTitle>
            <CardDescription>
              Add new expenses and see a clear visual breakdown of your spending
              across budgets.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-2">
          <RecordExpensesForm />
        </div>

        <div className="col-span-3 col-start-3">
          <Card className="flex flex-col justify-between w-full h-full">
            <CardHeader className="py-5">
              <CardTitle>Expenses Breakdown</CardTitle>
              <CardDescription>
                Visual overview of your spending across all categories.
              </CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className="flex-1">
              <ChartPieLegend />
            </CardContent>

            <Separator />
          </Card>
        </div>
      </div>
    </div>
  );
}

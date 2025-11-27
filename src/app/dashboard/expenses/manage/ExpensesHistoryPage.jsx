'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { DataTable } from '../../income/table/data-table';
import { ExpensesColumns } from './table/ExpensesColumns';

export default function ExpensesHistoryPage() {
  const data = [
    {
      expenseTitle: 'Sample',
      expenseCategory: 'Food',
      expenseAmount: '300',
      expenseDate: '11/27/2025',
    },
  ];

  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-2xl">Expenses History</CardTitle>
            <CardDescription>
              Review your past expenses and track how your spending changes over
              time.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <DataTable columns={ExpensesColumns} data={data} />
    </div>
  );
}

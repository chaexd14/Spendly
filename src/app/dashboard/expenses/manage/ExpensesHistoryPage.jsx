'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { DataTable } from '../../income/table/data-table';
import { ExpensesColumns } from './table/ExpensesColumns';

export default function ExpensesHistoryPage({ userExpenses }) {
  const data = userExpenses.map((expenses) => ({
    expenseId: expenses.expenseId,
    expenseTitle: expenses.expenseTitle,
    expenseCategory: expenses.expenseCategory,
    expenseAmount: expenses.expenseAmount,
    expenseDate: new Date(expenses.expenseDate),
  }));

  console.log(data);

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

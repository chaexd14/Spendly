'use client';

import * as z from 'zod';

export const Incomes = z.object({
  id: z.string(),
  title: z.string(),
  source: z.string(),
  amount: z.number(),
  date: z.date(),
});

export const Columns = [
  { accessorKey: 'incomeTitle', header: 'Title' },
  { accessorKey: 'incomeSource', header: 'Source' },
  { accessorKey: 'incomeAmount', header: 'Amount' },
  {
    accessorKey: 'incomeDateReceived',
    header: 'Date',
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
  },
];

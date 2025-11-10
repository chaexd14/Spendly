'use client';

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

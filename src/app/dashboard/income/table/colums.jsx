'use client';

export const Columns = [
  {
    accessorKey: 'incomeTitle',
    header: 'Title',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
  },
  {
    accessorKey: 'incomeSource',
    header: 'Source',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
  },
  {
    accessorKey: 'incomeAmount',
    header: 'Amount',
    cell: ({ getValue }) => {
      const amount = Number(getValue());

      const color =
        amount > 0
          ? 'text-green-600'
          : amount < 0
            ? 'text-red-600'
            : 'text-gray-600';

      return <span className={`${color}`}>₱ {amount.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: 'incomeDateReceived',
    header: 'Date',
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
  },
];

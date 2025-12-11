'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { Separator } from '@/components/ui/separator';

import { Ellipsis } from 'lucide-react';

import EditBudget from '../../form/EditBudget';
import DeleteBudget from '../../form/DeleteBudget';

export const BudgetColumns = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
  },
  {
    accessorKey: 'periodType',
    header: 'Period Type',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '';
      return (
        <span className="px-3 py-1 border rounded-xl border-primary">
          {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
        </span>
      );
    },
  },
  {
    accessorKey: 'totalBudget',
    header: 'Budget',
    cell: ({ getValue }) => {
      const amount = Number(getValue());

      const color = 'text-green-600';
      return <span className={`${color} `}>₱ {amount.toLocaleString()}</span>;
    },
  },

  {
    accessorKey: 'remainingBudget',
    header: 'Remaning',
    cell: ({ getValue }) => {
      const amount = Number(getValue());

      const color = amount > 0 ? 'text-blue-600' : 'text-red-600';
      return <span className={`${color} `}>₱ {amount.toLocaleString()}</span>;
    },
  },

  {
    accessorKey: 'totalExpenses',
    header: 'Total Expenses',
    cell: ({ getValue }) => {
      const amount = Number(getValue());

      const color = 'text-red-600';
      return <span className={`${color} `}>₱ {amount.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start',
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
  },
  {
    accessorKey: 'endDate',
    header: 'End',
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[90px] rounded-lg flex flex-col gap-2 p-3"
            align="end"
          >
            <div>
              <DropdownMenuLabel className="p-1">Actions</DropdownMenuLabel>
              <Separator />
            </div>
            <DropdownMenuGroup className="flex flex-col gap-1">
              <Dialog>
                <DialogTrigger asChild className="w-full">
                  <DropdownMenuItem
                    onSelect={(event) => event.preventDefault()}
                  >
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Budget</DialogTitle>
                    <DialogDescription>
                      <strong>{item.title}</strong>
                    </DialogDescription>
                  </DialogHeader>

                  <EditBudget
                    budgetId={item.id}
                    budgetTitle={item.title}
                    budgetPeriodType={item.periodType}
                    totalBudget={item.totalBudget}
                  />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild className="w-full">
                  <DropdownMenuItem
                    onSelect={(event) => event.preventDefault()}
                  >
                    Delete
                  </DropdownMenuItem>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Income</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete your income{' '}
                      <strong>{item.budgetTitle}</strong>?
                    </DialogDescription>
                  </DialogHeader>

                  <DeleteBudget budgetId={item.budgetId} />
                </DialogContent>
              </Dialog>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

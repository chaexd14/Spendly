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

import EditExpenses from '../../form/EditExpenses';
import DeleteExpenses from '../../form/DeleteExpenses';

export const ExpensesColumns = [
  {
    accessorKey: 'expenseTitle',
    header: 'Title',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
  },
  {
    accessorKey: 'expenseCategory',
    header: 'Category',
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
    accessorKey: 'expenseAmount',
    header: 'Amount',
    cell: ({ getValue }) => {
      const amount = Number(getValue());

      const color = 'text-red-600';
      return <span className={`${color}`}>₱ {amount.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: 'expenseDate',
    header: 'Date',
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
                    <DialogTitle>Edit Goal</DialogTitle>
                    <DialogDescription>
                      <strong>{item.expenseTitle}</strong>
                    </DialogDescription>
                  </DialogHeader>

                  <EditExpenses
                    expenseId={item.expenseId}
                    expenseTitle={item.expenseTitle}
                    expenseCategory={item.expenseCategory}
                    expenseDescription={item.expenseDescription}
                    expenseAmount={item.expenseAmount}
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
                    <DialogTitle>Delete Expenses</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete your Expenses{' '}
                      <strong> {item.expenseTitle}</strong>?
                    </DialogDescription>
                  </DialogHeader>

                  <DeleteExpenses expenseId={item.expenseId} />
                </DialogContent>
              </Dialog>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

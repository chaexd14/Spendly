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

import EditSavingsForm from '../forms/EditSavingsForm';
import DeleteSavings from '../forms/DeleteSavings';

export const savingsColumns = [
  {
    accessorKey: 'savingsTitle',
    header: 'Title',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
  },

  {
    accessorKey: 'savingsAmount',
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
    accessorKey: 'createdAt',
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
                    <DialogTitle>Edit Savings</DialogTitle>
                    <DialogDescription>
                      <strong>{item.savingsTitle}</strong>
                    </DialogDescription>
                  </DialogHeader>

                  <EditSavingsForm
                    savingsId={item.savingsId}
                    savingsTitle={item.savingsTitle}
                    savingsAmount={item.savingsAmount}
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
                    <DialogTitle>Delete Goal</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete your goal{' '}
                      <strong>{item.goalName}</strong>?
                    </DialogDescription>
                  </DialogHeader>

                  <DeleteSavings savingsId={item.savingsId} />
                </DialogContent>
              </Dialog>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

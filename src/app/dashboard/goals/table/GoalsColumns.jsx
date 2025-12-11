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

// FORMS
import AddContributionForm from '../form/AddContributionForm';
import EditGoal from '../form/EditGoal';
import DeleteGoalForm from '../form/DeleteGoalForm';

export const GoalsColumns = [
  {
    accessorKey: 'goalName',
    header: 'Title',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
  },

  {
    accessorKey: 'goalAmount',
    header: 'Amount',
    cell: ({ getValue }) => {
      const amount = Number(getValue());

      const color = 'text-green-600';
      return <span className={`${color}`}>₱ {amount.toLocaleString()}</span>;
    },
  },

  {
    accessorKey: 'goalCurrentAmount',
    header: 'Contributed',
    cell: ({ getValue }) => {
      const amount = Number(getValue());

      const color = 'text-blue-600';
      return <span className={`${color}`}>₱ {amount.toLocaleString()}</span>;
    },
  },

  {
    accessorKey: 'goalStatus',
    header: 'Status',
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
    accessorKey: 'goalTargetDate',
    header: 'Target Completion',
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
                    Add Funds
                  </DropdownMenuItem>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Funds</DialogTitle>
                    <DialogDescription>
                      Add contribution to {item.goalName}
                    </DialogDescription>
                  </DialogHeader>

                  <AddContributionForm goalId={item.goalId} />
                </DialogContent>
              </Dialog>

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
                      <strong>{item.goalName}</strong>
                    </DialogDescription>
                  </DialogHeader>

                  <EditGoal
                    goalId={item.goalId}
                    goalName={item.goalName}
                    goalAmount={item.goalAmount}
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

                  <DeleteGoalForm goalId={item.goalId} />
                </DialogContent>
              </Dialog>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

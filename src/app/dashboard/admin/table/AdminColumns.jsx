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

import EditUser from '../form/EditUser';
import DeleteUser from '../form/DeleteUser';

export const adminColumns = [
  {
    accessorKey: 'id',
    header: 'User ID',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
  },

  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
  },

  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
  },

  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
  },

  {
    accessorKey: 'emailVerified',
    header: 'Status',
    cell: ({ getValue }) => {
      const value = getValue();

      return (
        <span
          className={`px-2 py-1 rounded-full text-sm border ${
            value ? 'border-green-500' : 'border-red-500'
          }`}
        >
          {value ? 'Verified' : 'Unverified'}
        </span>
      );
    },
  },

  {
    accessorKey: 'createdAt',
    header: 'Account Creation',
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
                    <DialogTitle>Edit Role</DialogTitle>
                    <DialogDescription>
                      <strong>{item.name}</strong>
                    </DialogDescription>
                  </DialogHeader>

                  <EditUser id={item.id} role={item.role} />
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
                      Are you sure you want to delete{' '}
                      <strong>{item.name}</strong>?
                    </DialogDescription>
                  </DialogHeader>

                  <DeleteUser id={item.id} />
                </DialogContent>
              </Dialog>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

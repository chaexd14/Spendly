'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';

import { DataTable } from '../income/table/data-table';
import { adminColumns } from './table/AdminColumns';

export default function AdminPage({ userAccount }) {
  const [accounts, setAccounts] = useState(userAccount);

  const data = accounts.map((d) => ({
    id: d.id,
    name: d.name,
    email: d.email,
    emailVerified: d.emailVerified,
    image: d.image,
    role: d.role,
    createdAt: d.createdAt,
  }));

  console.log(data);

  console.log(data);
  return (
    <div className="flex flex-col h-full gap-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-5">
          <div>
            <CardTitle className="text-2xl">Manage Users</CardTitle>
          </div>
        </CardHeader>
      </Card>

      <DataTable columns={adminColumns} data={data} />
    </div>
  );
}

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

import { User, TrendingUp, Eye } from 'lucide-react';

export default function AdminPage({ userAccount, userCount }) {
  const [accounts, setAccounts] = useState(userAccount);
  const [userCounts, setUserCounts] = useState(userCount);

  const data = accounts.map((d) => ({
    id: d.id,
    name: d.name,
    email: d.email,
    emailVerified: d.emailVerified,
    image: d.image,
    role: d.role,
    createdAt: d.createdAt,
  }));

  console.log(userCounts);

  return (
    <div className="flex flex-col h-full gap-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-5">
          <div>
            <CardTitle className="text-2xl">Manage Users</CardTitle>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-3 gap-5">
        <Card>
          <CardContent className="p-5">
            <CardTitle className="text-lg">Total User</CardTitle>
            <div className="flex items-center justify-center gap-5">
              <User />
              <CardTitle className="text-4xl text-green-600">
                <span>{userCounts}</span>
              </CardTitle>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <CardTitle className="text-lg">Total App Visit</CardTitle>

            <div className="flex items-center justify-center gap-5">
              <TrendingUp />
              <CardTitle className="text-4xl text-green-600">
                <span>136</span>
              </CardTitle>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <CardTitle className="text-lg">Total User</CardTitle>
            <div className="flex items-center justify-center gap-5">
              <User />
              <CardTitle className="text-4xl text-green-600">
                <span>{userCounts}</span>
              </CardTitle>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable columns={adminColumns} data={data} />
    </div>
  );
}

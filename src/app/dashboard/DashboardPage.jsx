'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Image from 'next/image';

import { DashboardChartBarHorizontal } from '../components/charts/dashboard-chart-bar-horizontal';

import EditAccount from './form/editAccount';

import {
  BanknoteArrowUpIcon,
  PiggyBank,
  CreditCard,
  ShoppingCart,
} from 'lucide-react';

export default function DashboardPage({
  session,
  userIncome,
  userBudget,
  userSavings,
}) {
  const user = session.user;
  const image = user.image;
  const totalIncome = userIncome.totalIncome;
  const totalBudget = userBudget.totalBudgetSum;
  const totalExpenses = userBudget.totalExpensesSum;
  const totalSavings = userSavings.totalSavings;

  console.log(user.id);
  console.log(image);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <Card className="flex flex-col justify-between">
          <CardContent className="flex flex-col items-center justify-center gap-10 p-5">
            <div>
              <Image
                src={image}
                width={200}
                height={200}
                alt="SP"
                className="rounded-full"
              />
            </div>
            <div>
              <CardTitle className="text-4xl">
                Welcome back, {user.name}!
              </CardTitle>
              <CardDescription>
                Here's an overview of your recent activity.
              </CardDescription>
            </div>
          </CardContent>

          <CardFooter>
            <Dialog>
              <DialogTrigger asChild className="w-full">
                <Button onSelect={(event) => event.preventDefault()}>
                  Edit Profile
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Account</DialogTitle>
                  <DialogDescription>
                    <strong>{user.name}</strong>
                  </DialogDescription>
                </DialogHeader>

                <EditAccount
                  id={user.id}
                  name={user.name}
                  email={user.email}
                  image={user.image}
                />
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <div className="flex flex-col flex-1 gap-5">
          <Card>
            <CardHeader className="h-full">
              <CardTitle>Quote of the Day</CardTitle>
              <CardTitle className="text-3xl">
                Beware of little expenses. A small leak will sink a great ship
              </CardTitle>
              <CardDescription>- Benjamin Franklin</CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-2 gap-5">
            <Card>
              <CardContent className="p-5">
                <CardTitle className="text-lg">Total Income</CardTitle>

                <div className="flex items-center gap-5">
                  <BanknoteArrowUpIcon />
                  <CardTitle className="text-3xl text-green-600">
                    <span>₱{totalIncome.toLocaleString()}</span>
                  </CardTitle>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <CardTitle className="text-lg">Savings</CardTitle>

                <div className="flex items-center gap-5">
                  <PiggyBank />
                  <CardTitle className="text-3xl text-green-600">
                    <span>₱{totalSavings.toLocaleString()}</span>
                  </CardTitle>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <CardTitle className="text-lg">Total Budget</CardTitle>

                <div className="flex items-center gap-5">
                  <CreditCard />
                  <CardTitle className="text-3xl text-blue-600">
                    <span>₱{totalBudget.toLocaleString()}</span>
                  </CardTitle>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <CardTitle className="text-lg"> Expenses</CardTitle>

                <div className="flex items-center gap-5">
                  <ShoppingCart />
                  <CardTitle className="text-3xl text-orange-600">
                    <span>₱{totalExpenses.toLocaleString()}</span>
                  </CardTitle>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Total Comparison</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <DashboardChartBarHorizontal
            totalIncome={totalIncome}
            totalBudget={totalBudget}
            totalExpenses={totalExpenses}
            totalSavings={totalSavings}
          />
        </CardContent>
      </Card>
    </div>
  );
}

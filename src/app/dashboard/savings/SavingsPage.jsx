'use client';

import { useState, useCallback } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

import { ScrollArea } from '@/components/ui/scroll-area';

import RecordSavingsForm from './forms/RecordSavingsForm';

// Icon
import { TrendingUp, TrendingDown } from 'lucide-react';

// Chart
import ChartLineLinear from '@/app/components/charts/chart-line-linear';

// TABLE
import { DataTable } from '../income/table/data-table';
import { savingsColumns } from './table/savingsColumns';

import { useIsMobile } from '@/hooks/use-mobile';

export default function SavingsPage({ userSavings, userTotalSavings }) {
  const [savings, setSacings] = useState(userSavings);
  const [totalSavings, setTotalSavings] = useState(userTotalSavings);
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState({
    savings: false,
    totalSavings: false,
  });

  const data = savings.map((d) => ({
    savingsId: d.savingsId,
    savingsTitle: d.savingsTitle,
    savingsAmount: d.savingsAmount,
    createdAt: new Date(d.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  }));

  console.log(userTotalSavings);
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-2xl">My Savings</CardTitle>
            <CardDescription>
              Track your total savings and manage your savings history
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 grid-rows-2 gap-5 lg:grid-cols-6 lg:grid-rows-1">
          <Card className="flex flex-col items-center justify-between lg:col-span-4">
            <CardHeader className="w-full py-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="lg:text-2xl">Total Savings</CardTitle>
                  <CardDescription>As of December 2025</CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className={`gap-2 text-sm font-semibold ${
                    totalSavings?.growthPercentage > 0
                      ? 'text-green-600 border-green-500'
                      : totalSavings?.growthPercentage < 0
                        ? 'text-red-600 border-red-500'
                        : 'text-gray-600 border-gray-400'
                  }`}
                >
                  {totalSavings?.growthPercentage > 0 ? (
                    <TrendingUp size={16} className="text-green-600" />
                  ) : (
                    <TrendingDown size={16} className="text-red-600" />
                  )}

                  {loading.totalSavings
                    ? '...%'
                    : `${totalSavings.growthPercentage}%`}
                </Badge>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="w-full h-full py-0">
              <div className="grid h-full grid-rows-2 lg:grid-cols-6 lg:grid-rows-1">
                <div className="flex items-center justify-between w-full gap-5 lg:col-span-2">
                  <div className="flex flex-col items-center justify-center w-full gap-3">
                    <CardTitle className="text-5xl text-green-600 lg:text-6xl">
                      {loading.totalSavings ? (
                        <span>₱...</span>
                      ) : (
                        <span>
                          ₱{totalSavings.totalSavings.toLocaleString()}
                        </span>
                      )}
                    </CardTitle>

                    <CardDescription className="text-xs lg:text-sm">
                      {loading.totalSavings ? (
                        <span>₱... </span>
                      ) : (
                        <span
                          className={
                            totalSavings.latestSavingRecord >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {totalSavings.latestSavingRecord >= 0 ? '+' : '-'}₱
                          {totalSavings.latestSavingRecord.toLocaleString()}{' '}
                        </span>
                      )}
                      from last record
                    </CardDescription>
                  </div>

                  {!isMobile && <Separator orientation="vertical" />}
                </div>

                <div className="py-3 pr-0 lg:col-start-3 lg:col-span-4 lg:pl-6">
                  <ChartLineLinear
                    data={savings}
                    dateKey="createdAt"
                    amountKey="savingsAmount"
                  />
                </div>
              </div>
            </CardContent>

            <Separator />

            <CardFooter className="w-full py-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  refreshTotalIncome();
                  refreshIncomes();
                }}
              >
                {loading.totalSavings ? (
                  <span>Refreshing...</span>
                ) : (
                  <span>Refresh</span>
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="w-full col-span-2 col-start-5">
            <RecordSavingsForm
              className="w-full"
              onSuccess={() => {
                refreshIncomes();
                refreshTotalIncome();
              }}
            />
          </div>
        </div>

        <div>
          <DataTable columns={savingsColumns} data={savings} />
        </div>
      </div>
    </div>
  );
}

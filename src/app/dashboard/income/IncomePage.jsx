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

import RecordIncomeForm from './forms/RecordIncomeForm';

// Icon
import { TrendingUp } from 'lucide-react';

// Chart
import ChartLineLinear from '@/app/components/charts/chart-line-linear';

// TABLE
import { DataTable } from './table/data-table';
import { Columns, Incomes } from './table/colums';
import { DataTablePagination } from './table/DataTablePagination';

import { useIsMobile } from '@/hooks/use-mobile';

export default function IncomePage({ initialIncomes, initialTotalIncome }) {
  const [incomes, setIncomes] = useState(initialIncomes);
  const [totalIncome, setTotalIncome] = useState(initialTotalIncome);

  const isMobile = useIsMobile();

  const [loading, setLoading] = useState({
    incomes: false,
    totalIncome: false,
  });

  const [error, setError] = useState('');

  const fetchData = useCallback(async (endpoint, setter, key) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    setError('');

    try {
      const res = await fetch(`/api/${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await res.json();
      setter(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  }, []);

  const refreshIncomes = () => fetchData('incomes', setIncomes, 'incomes');
  const refreshTotalIncome = () =>
    fetchData('incomes/total', setTotalIncome, 'totalIncome');

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 grid-rows-2 gap-5 lg:grid-cols-4 lg:grid-rows-1">
        <Card className="flex flex-col items-center justify-between lg:col-span-3">
          <CardHeader className="w-full py-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="lg:text-2xl">Total Income</CardTitle>
                <CardDescription>As of June 2025</CardDescription>
              </div>
              <Badge
                className="gap-2 text-sm text-muted-foreground"
                variant="outline"
              >
                <TrendingUp size={16} />{' '}
                {loading.totalIncome ? (
                  <span>₱...%</span>
                ) : (
                  <span>₱{totalIncome.growthPercentage}%</span>
                )}
              </Badge>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="w-full h-full py-0">
            <div className="grid h-full grid-rows-2 lg:grid-cols-6 lg:grid-rows-1">
              <div className="flex items-center justify-between w-full gap-5 lg:col-span-2">
                <div className="flex flex-col items-center justify-center w-full gap-3">
                  <CardTitle className="text-5xl lg:text-6xl">
                    {loading.totalIncome ? (
                      <span>₱...</span>
                    ) : (
                      <span>₱{totalIncome.totalIncome}</span>
                    )}
                  </CardTitle>

                  <CardDescription className="text-xs lg:text-sm">
                    {loading.totalIncome ? (
                      <span>₱... </span>
                    ) : (
                      <span>+₱{totalIncome.latestIncomeRecord} </span>
                    )}
                    from last record
                  </CardDescription>
                </div>

                {!isMobile && <Separator orientation="vertical" />}
              </div>

              <div className="py-3 pr-0 lg:col-start-3 lg:col-span-4 lg:pl-6">
                <ChartLineLinear incomes={incomes} />
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
              {loading.totalIncome ? (
                <span>Refreshing...</span>
              ) : (
                <span>Refresh</span>
              )}
            </Button>
          </CardFooter>
        </Card>

        <RecordIncomeForm
          className="w-full"
          onSuccess={() => {
            refreshIncomes();
            refreshTotalIncome();
          }}
        />
      </div>

      <div>
        <DataTable columns={Columns} data={incomes} />
      </div>
    </div>
  );
}

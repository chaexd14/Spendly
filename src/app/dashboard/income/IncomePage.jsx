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

import RecordIncomeForm from './RecordIncomeForm';

// Icon
import { TrendingUp } from 'lucide-react';

// Chart
import ChartLineLinear from '@/app/components/charts/chart-line-linear';

export default function IncomePage({ initialIncomes, initialTotalIncome }) {
  const [incomes, setIncomes] = useState(initialIncomes);
  const [totalIncome, setTotalIncome] = useState(initialTotalIncome);
  const [incomeGrowth, setIncomeGrowth] = useState(initialIncomes);

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
    <div className="grid grid-cols-4 grid-rows-1 gap-5">
      <Card className="col-span-3">
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Total Income</CardTitle>
              <CardDescription>As of June 2025</CardDescription>
            </div>
            <Badge
              className="gap-2 text-base text-muted-foreground"
              variant="outline"
            >
              <TrendingUp size={16} />${totalIncome.growthPercentage}%
            </Badge>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="py-0">
          <div className="flex items-center justify-center gap-5 h-[250px]">
            <div className="flex flex-col items-center justify-center w-[300px] min-w-fit gap-3">
              <CardTitle className="text-6xl">
                {loading.totalIncome ? (
                  <span>₱...</span>
                ) : (
                  <span>₱{totalIncome.totalIncome}</span>
                )}
              </CardTitle>

              <CardDescription className="text-sm">
                +₱{totalIncome.latestIncomeRecord} from last record
              </CardDescription>
            </div>

            <Separator orientation="vertical" className="h-full" />

            <div className="flex items-center w-full h-full py-5">
              <ChartLineLinear />
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="py-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={refreshTotalIncome}
          >
            {loading.totalIncome ? (
              <span>Refreshing...</span>
            ) : (
              <span>Refresh</span>
            )}
          </Button>
        </CardFooter>
      </Card>

      <RecordIncomeForm />
    </div>
  );
}

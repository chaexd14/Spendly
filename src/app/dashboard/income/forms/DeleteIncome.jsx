'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export default function DeleteIncome({ incomeId }) {
  const [selectedIncomeId] = useState(incomeId);
  const [isLoading, setIsLoading] = useState(false);

  const deleteGoal = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/incomes/${selectedIncomeId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incomeId: selectedIncomeId }),
      });

      let responseData;
      if (res.headers.get('content-type')?.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to delete Income');
      }

      toast.success('Income Deleted!');
    } catch (err) {
      console.error('Error deleting Income:', err);
      toast.error(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full"
      onClick={deleteGoal}
    >
      {isLoading ? (
        <>
          <Spinner className="w-4 h-4 mr-2 animate-spin" />
          Deleting...
        </>
      ) : (
        'Delete'
      )}
    </Button>
  );
}

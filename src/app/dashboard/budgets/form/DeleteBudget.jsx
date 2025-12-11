'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export default function DeleteBudget({ budgetId }) {
  const [selectedBudgetId] = useState(budgetId);
  const [isLoading, setIsLoading] = useState(false);

  const deleteGoal = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/budgets/${selectedBudgetId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ budgetId: selectedBudgetId }),
      });

      let responseData;
      if (res.headers.get('content-type')?.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to delete Budget');
      }

      toast.success('Budget Deleted!');
    } catch (err) {
      console.error('Error deleting Budget:', err);
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

'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export default function DeleteGoalForm({ goalId }) {
  const [selectedGoalId] = useState(goalId);
  const [isLoading, setIsLoading] = useState(false);

  const deleteGoal = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/goals/${selectedGoalId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalId: selectedGoalId }),
      });

      let responseData;
      if (res.headers.get('content-type')?.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to add contribution');
      }

      toast.success('Goal Deleted!');
    } catch (err) {
      console.error('Error deleting goal:', err);
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

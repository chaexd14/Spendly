'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export default function DeleteSavings({ savingsId }) {
  const [selectedSavingsId] = useState(savingsId);
  const [isLoading, setIsLoading] = useState(false);

  const deleteSavings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/savings/${selectedSavingsId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savingsId: selectedSavingsId }),
      });

      let responseData;
      if (res.headers.get('content-type')?.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to add contribution');
      }

      toast.success('Savings Deleted!');
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
      onClick={deleteSavings}
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

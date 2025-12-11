'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export default function DeleteUser({ id }) {
  const [selectedUserId] = useState(id);
  const [isLoading, setIsLoading] = useState(false);

  const deleteExpenses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/user/${selectedUserId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedUserId }),
      });

      let responseData;
      if (res.headers.get('content-type')?.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        throw new Error(responseData?.message || 'Failed to add contribution');
      }

      toast.success('User Deleted!');
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
      onClick={deleteExpenses}
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

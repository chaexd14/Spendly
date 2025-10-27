'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function BudgetPage({ session }) {
  const [periodType, setPeriodType] = useState('weekly');
  const [totalBudget, setTotalBudget] = useState(0);
  const [startDate, setStartDate] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!totalBudget || !startDate) {
      alert('Please fill all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          periodType,
          totalBudget,
          startDate,
        }),
      });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.message || data || 'Failed to add budget');
      }

      router.push('/home');
      setPeriodType('');
      setTotalBudget('');
      setStartDate('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-5 p-5 border border-red-400 h-fit w-fit"
      >
        <h1 className="text-3xl font-bold">Budget</h1>
        {error && <p>{error}</p>}

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Period Type</label>
          <select
            name="periodType"
            value={periodType}
            onChange={(e) => setPeriodType(e.target.value)}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Total Budget</label>
          <input
            type="number"
            name="totalBudget"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-3 text-xl font-semibold border border-red-400"
        >
          {isLoading ? 'Seting Budet...' : 'Set Budget'}
        </button>
      </form>
    </>
  );
}

export default BudgetPage;

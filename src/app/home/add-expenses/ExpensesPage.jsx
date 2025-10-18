'use client';

import { useState } from 'react';
import { addExpenses } from '../../../../lib/actions/expenses-actions';
import { useRouter } from 'next/navigation';

function ExpensesPage({ session }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const userId = session.user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!amount) {
      alert('Please fill Amount');
      return;
    }

    try {
      const result = await addExpenses(
        userId,
        title,
        category,
        description,
        amount,
        date
      );
      if (result) {
        router.push('/home');
      }

      // Reset form
      setTitle('');
      setCategory('');
      setDescription('');
      setAmount('');
      setDate('');
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
        <h1 className="text-3xl font-bold">Expenses</h1>
        {error && <p>{error}</p>}

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Category</label>
          <input
            type="text"
            name="categort"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Date</label>
          <input
            type="date"
            name="startDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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

export default ExpensesPage;

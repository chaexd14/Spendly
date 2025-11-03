'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Income_Page() {
  const [formData, setFormData] = useState({
    title: '',
    source: '',
    amount: '',
    note: '',
    date: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      source: '',
      amount: '',
      note: '',
      date: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setFieldErrors({});

    // --- CLIENT-SIDE VALIDATION ---
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (formData.amount === '' || isNaN(Number(formData.amount)))
      errors.amount = 'Amount is required';
    else if (Number(formData.amount) <= 0)
      errors.amount = 'Amount must be a positive number';
    if (!formData.date) errors.date = 'Date is required';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    // --- SUBMIT TO API ---
    try {
      const res = await fetch('/api/incomes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data;
      // only parse JSON if response is ok
      if (res.headers.get('content-type')?.includes('application/json')) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data?.message || 'Failed to add income');
      }

      // success
      resetForm();
      router.push('/home');
    } catch (err) {
      console.error('Error adding income:', err);
      setError(err.message || 'Something went wrong. Please try again.');
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
        <h1 className="text-3xl font-bold">Income</h1>
        {error && <p>{error}</p>}

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          {fieldErrors.title && (
            <p className="text-sm text-red-500">{fieldErrors.title}</p>
          )}
          <label className="text-lg font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`px-5 py-1 text-lg border focus:outline-none ${
              fieldErrors.title ? 'border-red-400' : 'border-blue-400'
            }`}
          />
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Source</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          {fieldErrors.amount && (
            <p className="text-sm text-red-500">{fieldErrors.amount}</p>
          )}
          <label className="text-lg font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className={`px-5 py-1 text-lg border focus:outline-none ${
              fieldErrors.amount ? 'border-red-400' : 'border-blue-400'
            }`}
          />
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          <label className="text-lg font-medium">Notes</label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="px-5 py-1 text-lg border border-red-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 p-3 border border-red-400">
          {fieldErrors.date && (
            <p className="text-sm text-red-500">{fieldErrors.date}</p>
          )}
          <label className="text-lg font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`px-5 py-1 text-lg border focus:outline-none ${
              fieldErrors.date ? 'border-red-400' : 'border-blue-400'
            }`}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-3 text-xl font-semibold border border-red-400"
        >
          {isLoading ? 'Setting Income...' : 'Add Income'}
        </button>
      </form>
    </>
  );
}

export default Income_Page;

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function AddGoalPage({ session }) {
  // userId, goalName, goalAmount, goalTargetDate

  const [formData, setFromData] = useState({
    goalName: '',
    goalAmount: '',
    goalTargetDate: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFromData({
      goalName: '',
      goalAmount: '',
      goalTargetDate: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault;
    setIsLoading(true);
    setError('');
    setFieldErrors({});

    const errors = {};

    if (!formData.goalName.trim()) errors.goalName = 'Goal Title is Required';
    if (formData.goalAmount === '' || isNaN(Number(formData.goalAmount))) {
      errors.goalAmount = 'Goal Amount is Required';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data;

      if (res.headers.get('content-type')?.includes('application/json')) {
        data = await res.json();
      }

      if (!res.ok) throw new Error(data.message || 'Failed to add Goal');

      resetForm();
      router.push('/home');
    } catch (err) {
      console.error('Error addning Goal: ', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>add goal page</h1>
    </>
  );
}

export default AddGoalPage;

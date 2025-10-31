'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

export default function UserHome({
  session,
  initialUsers,
  initialBudgets,
  initialExpenses,
  initialIncomes,
}) {
  const router = useRouter();
  const user = session.user;

  // --- State ---
  const [users, setUsers] = useState(initialUsers);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [incomes, setIncomes] = useState(initialIncomes);

  const [loading, setLoading] = useState({
    users: false,
    budgets: false,
    expenses: false,
    incomes: false,
  });

  const [error, setError] = useState('');

  const navigateTo = (path) => router.push(path);

  // --- Generic fetch function ---
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

  // --- Refresh functions ---
  const refreshUsers = () => fetchData('user', setUsers, 'users');
  const refreshBudgets = () => fetchData('budgets', setBudgets, 'budgets');
  const refreshExpenses = () => fetchData('expenses', setExpenses, 'expenses');
  const refreshIncomes = () => fetchData('incomes', setIncomes, 'incomes');

  return (
    <section className="flex flex-wrap gap-10">
      {/* Account Info */}
      <div>
        <h1>Welcome, {user.name}</h1>
        <p>ID: {user.id}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <div>
          <button onClick={() => navigateTo('/home/add-budget')}>Budget</button>
          <button onClick={() => navigateTo('/home/add-expenses')}>
            Add Expenses
          </button>
        </div>
      </div>

      {/* Users */}
      {user.role === 'admin' && (
        <div>
          <h2>Registered Users</h2>
          {loading.users ? (
            <p>Loading...</p>
          ) : (
            users.map((u) => (
              <div key={u.id}>
                <p>
                  {u.name} — {u.email} — {u.role}
                </p>

                <img src={u.image} alt="img" />
              </div>
            ))
          )}
          <button onClick={refreshUsers} disabled={loading.users}>
            Refresh Users
          </button>
        </div>
      )}

      {/* Budgets */}
      <div>
        <h2>Your Budgets</h2>
        {loading.budgets ? (
          <p>Loading...</p>
        ) : (
          budgets.map((b) => (
            <p key={b.budgetId}>
              {b.budgetPeriodType} — {b.totalBudget} — Remaining:{' '}
              {b.remainingBudget}
            </p>
          ))
        )}
        <button onClick={refreshBudgets} disabled={loading.budgets}>
          Refresh Budgets
        </button>
      </div>

      {/* Expenses */}
      <div>
        <h2>Your Expenses</h2>
        {loading.expenses ? (
          <p>Loading...</p>
        ) : (
          expenses.map((e) => (
            <p key={e.expenseId}>
              {e.expenseTitle} — {e.expenseCategory} — ₱{e.expenseAmount}
            </p>
          ))
        )}
        <button onClick={refreshExpenses} disabled={loading.expenses}>
          Refresh Expenses
        </button>
      </div>

      {/* Income */}
      <div>
        <h2>Your Income</h2>
        {loading.incomes ? (
          <p>Loading...</p>
        ) : (
          incomes.map((i) => (
            <p key={i.incomeId}>
              {i.incomeTitle} — {i.incomeSource} — ₱{i.incomeAmount}
            </p>
          ))
        )}
        <button onClick={refreshIncomes} disabled={loading.incomes}>
          Refresh Income
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  );
}

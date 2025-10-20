'use client';

import { useState } from 'react';
import { signOut } from '../../../lib/actions/auth-actions';
import { useRouter } from 'next/navigation';

function UserHome({ session, allUsers, userBudget, userExpenses }) {
  const [fetchedUser, setFetchedUsers] = useState(allUsers);
  const [fetchedBudget, setFetchedBudget] = useState(userBudget);
  const [fetchedExpenses, setFetchedExpenses] = useState(userExpenses);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingBudget, setIsLoadingBudget] = useState(false);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(false);
  const router = useRouter();
  const user = session.user;

  const handleSignout = async () => {
    await signOut();
    router.push('/auth/signin');
  };

  const refreshUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const res = await fetch('/api/user');
      if (!res.ok) throw new Error('Failed to fetch users');
      const users = await res.json();
      setFetchedUsers(users);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const refreshExpenses = async () => {
    setIsLoadingExpenses(true);
    try {
      const res = await fetch('/api/expenses');
      if (!res.ok) throw new Error('Failed to fetch budgets');
      const expenses = await res.json();
      setFetchedExpenses(expenses);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingExpenses(false);
    }
  };

  const refreshBudget = async () => {
    setIsLoadingBudget(true);
    try {
      const res = await fetch('/api/budgets');
      if (!res.ok) throw new Error('Failed to fetch budgets');
      const budgets = await res.json();
      setFetchedBudget(budgets);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingBudget(false);
    }
  };

  const budgetPage = () => {
    router.push('/home/add-budget');
  };

  const expensesPage = () => {
    router.push('/home/add-expenses');
  };
  return (
    <>
      <section className="flex flex-wrap justify-start w-full">
        <div className="flex flex-col items-center justify-center gap-5 p-10 border border-red-400 h-fit w-fit">
          <h1 className="mb-5 text-3xl font-bold">Welcome to Spendly</h1>

          <section>
            <h2 className="mb-5 text-2xl font-semibold">Account Information</h2>

            <div className="flex flex-col gap-3">
              <p className="text-xl font-medium">
                User ID:{' '}
                <span className="text-lg font-normal">
                  {user?.id || 'Unknown'}
                </span>
              </p>

              <p className="text-xl font-medium">
                User Name:{' '}
                <span className="text-lg font-normal ">
                  {user?.name || 'Unknown'}
                </span>
              </p>
              <p className="text-xl font-medium">
                Email:{' '}
                <span className="text-lg font-normal ">
                  {user?.email || 'Unknown'}
                </span>
              </p>
            </div>
          </section>

          <div className="flex items-center justify-between w-full gap-5">
            <button
              onClick={handleSignout}
              className="px-5 py-3 mt-5 text-xl font-semibold border border-red-400"
            >
              Log Out
            </button>

            <button
              onClick={budgetPage}
              className="px-5 py-3 mt-5 text-xl font-semibold border border-red-400"
            >
              Budget Now
            </button>

            <button
              onClick={expensesPage}
              className="px-5 py-3 mt-5 text-xl font-semibold border border-red-400"
            >
              Add Expenses
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 p-10 border border-red-400 h-fit w-fit">
          <h1 className="mb-5 text-3xl font-bold">Registered User</h1>

          <section>
            <h2 className="mb-5 text-2xl font-semibold">Account Information</h2>

            <div className="flex flex-col items-center justify-center gap-5 w-[600px]">
              <ul className="flex flex-col w-full gap-5">
                {fetchedUser &&
                  fetchedUser.map((u) => (
                    <li key={u.id} className="flex items-center justify-end">
                      <div className="flex justify-between w-full gap-3">
                        <p className="w-full text-xl font-medium">
                          User Name:{' '}
                          <span className="text-lg font-normal ">
                            {u.name ?? 'Unknown'}
                          </span>
                        </p>

                        <p className="w-full text-xl font-medium">
                          Email:{' '}
                          <span className="text-lg font-normal ">
                            {u.email ?? 'Unknown'}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>

              <button
                type="submit"
                onClick={refreshUsers}
                disabled={isLoadingUsers}
                className="px-5 py-3 mt-5 text-xl font-semibold border border-red-400"
              >
                {isLoadingUsers ? 'Refreshing...' : 'Refresh Users'}
              </button>
            </div>
          </section>
        </div>

        {/* User Budgets */}
        <div className="flex flex-col items-center justify-center gap-5 p-10 border border-red-400 h-fit w-fit">
          <h1 className="mb-5 text-3xl font-bold">Your Current Budgets</h1>

          <section>
            <h2 className="mb-5 text-2xl font-semibold">Budget Information</h2>

            <div className="flex flex-col items-center justify-center gap-5 w-[600px]">
              <ul className="flex flex-col w-full gap-5">
                {fetchedBudget &&
                  fetchedBudget.map((b) => (
                    <li
                      key={b.budgetId}
                      className="flex items-center justify-end"
                    >
                      <div className="flex justify-between w-full gap-3">
                        <p className="w-full text-xl font-medium">
                          Period Type:{' '}
                          <span className="text-lg font-normal ">
                            {b.budgetPeriodType ?? 'Unknown'}
                          </span>
                        </p>

                        <p className="w-full text-xl font-medium">
                          Budget:{' '}
                          <span className="text-lg font-normal ">
                            {b.totalBudget ?? 'Unknown'}
                          </span>
                        </p>

                        <p className="w-full text-xl font-medium">
                          Expenses:{' '}
                          <span className="text-lg font-normal ">
                            {b.totalBudgetExpenses ?? 'Unknown'}
                          </span>
                        </p>

                        <p className="w-full text-xl font-medium">
                          Remaining Budget:{' '}
                          <span className="text-lg font-normal ">
                            {b.remainingBudget ?? 'Unknown'}
                          </span>
                        </p>

                        <p className="w-full text-xl font-medium">
                          Start Date:{' '}
                          <span className="text-lg font-normal ">
                            {b.budgetStartDate
                              ? new Date(b.budgetStartDate).toLocaleDateString()
                              : 'Unknown'}
                          </span>
                        </p>

                        <p className="w-full text-xl font-medium">
                          End Date:{' '}
                          <span className="text-lg font-normal ">
                            {b.budgetEndDate
                              ? new Date(b.budgetEndDate).toLocaleDateString()
                              : 'Unknown'}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>

              <button
                type="submit"
                onClick={refreshBudget}
                disabled={isLoadingBudget}
                className="px-5 py-3 mt-5 text-xl font-semibold border border-red-400"
              >
                {isLoadingBudget ? 'Refreshing...' : 'Refresh Budget'}
              </button>
            </div>
          </section>
        </div>

        {/* User Expenses */}
        <div className="flex flex-col items-center justify-center gap-5 p-10 border border-red-400 h-fit w-fit">
          <h1 className="mb-5 text-3xl font-bold">Your Current Expenses</h1>

          <section>
            <h2 className="mb-5 text-2xl font-semibold">
              Expenses Information
            </h2>

            <div className="flex flex-col items-center justify-center gap-5 w-[600px]">
              <ul className="flex flex-col w-full gap-5">
                {fetchedExpenses &&
                  fetchedExpenses.map((e) => (
                    <li
                      key={e.expenseId}
                      className="flex items-center justify-end"
                    >
                      <div className="flex justify-between w-full gap-3">
                        <p className="w-full text-xl font-medium">
                          Title:{' '}
                          <span className="text-lg font-normal ">
                            {e.expenseTitle}
                          </span>
                        </p>

                        <p className="w-full text-xl font-medium">
                          Category:{' '}
                          <span className="text-lg font-normal ">
                            {e.expenseCategory}
                          </span>
                        </p>

                        <p className="w-full text-xl font-medium">
                          Description:{' '}
                          <span className="text-lg font-normal ">
                            {e.expenseDescription}
                          </span>
                        </p>

                        <p className="w-full text-xl font-medium">
                          Amount:{' '}
                          <span className="text-lg font-normal ">
                            {e.expenseAmount}
                          </span>
                        </p>

                        <p className="w-full text-xl font-medium">
                          Date:{' '}
                          <span className="text-lg font-normal ">
                            {e.expenseDate
                              ? new Date(e.expenseDate).toLocaleDateString()
                              : 'Unknown'}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>

              <button
                type="submit"
                onClick={refreshExpenses}
                disabled={isLoadingExpenses}
                className="px-5 py-3 mt-5 text-xl font-semibold border border-red-400"
              >
                {isLoadingExpenses ? 'Refreshing...' : 'Refresh Expenses'}
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default UserHome;

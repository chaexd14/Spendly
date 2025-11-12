'use server';

import IncomePage from './IncomePage';

import { redirect } from 'next/navigation';
import {
  getIncome,
  getTotalIncome,
} from '../../../../lib/actions/income-actions';
import { getSessionWithRole } from '../../../../lib/session';

export default async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  // Fetch initial data
  const [userIncome, userTotalIncome] = await Promise.all([
    getIncome(session.user.id),
    getTotalIncome(session.user.id),
  ]);

  return (
    <div>
      <IncomePage
        initialIncomes={userIncome}
        initialTotalIncome={userTotalIncome}
      />
    </div>
  );
}

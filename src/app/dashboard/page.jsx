import DashboardPage from './DashboardPage';
import { getSessionWithRole } from '../../../lib/session';
import { redirect } from 'next/navigation';

import { getTotalIncome } from '../../../lib/actions/income-actions';
import { getBudget } from '../../../lib/actions/budgets-action';
import { getTotalSavings } from '../../../lib/actions/savings-actions';

export default async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  const [userIncome] = await Promise.all([getTotalIncome(session.user.id)]);
  const [userBudget] = await Promise.all([getBudget(session.user.id)]);
  const [userSavings] = await Promise.all([getTotalSavings(session.user.id)]);

  return (
    <div>
      <DashboardPage
        session={session}
        userIncome={userIncome}
        userBudget={userBudget}
        userSavings={userSavings}
      />
    </div>
  );
}

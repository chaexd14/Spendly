import SavingsPage from './SavingsPage';

import { redirect } from 'next/navigation';
import { getSessionWithRole } from '../../../../lib/session';
import {
  getSavings,
  getTotalSavings,
} from '../../../../lib/actions/savings-actions';

export default async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  const [userSavings] = await Promise.all([getSavings(session.user.id)]);
  const [userTotalSavings] = await Promise.all([
    getTotalSavings(session.user.id),
  ]);

  return (
    <div>
      <SavingsPage
        userSavings={userSavings}
        userTotalSavings={userTotalSavings}
      />
    </div>
  );
}

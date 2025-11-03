import IncomePage from './IncomePage';

import { redirect } from 'next/navigation';
import { getIncome } from '../../../../lib/actions/income-actions';
import { getSessionWithRole } from '../../../../lib/session';

export default async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  // Fetch initial data securely on the server
  const [userIncome] = await Promise.all([getIncome(session.user.id)]);

  return (
    <div>
      <IncomePage initialIncomes={userIncome} />
    </div>
  );
}

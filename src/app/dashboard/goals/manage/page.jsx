import GoalHistoryPage from './GoalHistoryPage';

import { getGoals } from '../../../../../lib/actions/goal-actions';
import { getSessionWithRole } from '../../../../../lib/session';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  // Fetch initial data
  const [userGoal] = await Promise.all([getGoals(session.user.id)]);

  return (
    <div>
      <GoalHistoryPage userGoal={userGoal} />
    </div>
  );
}

import ExpensesHistoryPage from './ExpensesHistoryPage';

import { getSessionWithRole } from '../../../../../lib/session';
import { getExpenses } from '../../../../../lib/actions/expenses-actions';

export default async function page() {
  const session = await getSessionWithRole();

  const userExpenses = await getExpenses(session.user.id);

  return (
    <>
      <ExpensesHistoryPage userExpenses={userExpenses} />
    </>
  );
}

import BudgetListPage from './BudgetListPage';

import { getBudget } from '../../../../../lib/actions/budgets-action';
import { getSessionWithRole } from '../../../../../lib/session';

export default async function page() {
  const session = await getSessionWithRole();
  const [userBudgets] = await Promise.all([getBudget(session.user.id)]);

  return (
    <>
      <BudgetListPage userBudgets={userBudgets} />
    </>
  );
}

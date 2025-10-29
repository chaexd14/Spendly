import UserHome from './UserHome';
import { redirect } from 'next/navigation';

import { getAllUser } from '../../../lib/actions/user-actions';
import { getBudget } from '../../../lib/actions/budgets-action';
import { getExpenses } from '../../../lib/actions/expenses-actions';
import { getIncome } from '../../../lib/actions/income-actions';
import { getSessionWithRole } from '../../../lib/session';

import { SideBar } from '@/components/sideBar/SideBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  // Fetch initial data securely on the server
  const [allUsers, userBudget, userExpenses, userIncome] = await Promise.all([
    getAllUser(),
    getBudget(session.user.id),
    getExpenses(session.user.id),
    getIncome(session.user.id),
  ]);

  return (
    <SidebarProvider>
      <section className="flex min-h-screen ">
        <SideBar session={session} />
        <main className="flex-1 p-5 overflow-y-auto">
          <div className="flex items-start gap-5">
            <SidebarTrigger />
            <UserHome
              session={session}
              initialUsers={allUsers}
              initialBudgets={userBudget}
              initialExpenses={userExpenses}
              initialIncomes={userIncome}
            />
          </div>
        </main>
      </section>
    </SidebarProvider>
  );
}

export default page;

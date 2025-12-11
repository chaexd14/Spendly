import AdminPage from './AdminPage';
import { getUsers } from '../../../../lib/actions/admin-actions';
import { getSessionWithRole } from '../../../../lib/session';

export default async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  const [userAccount] = await Promise.all([getUsers()]);
  return (
    <div>
      <AdminPage userAccount={userAccount} />
    </div>
  );
}

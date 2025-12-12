import AdminPage from './AdminPage';
import { getUsers, getUserCount } from '../../../../lib/actions/admin-actions';
import { getSessionWithRole } from '../../../../lib/session';

export default async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  const [userAccount] = await Promise.all([getUsers()]);
  const [userCount] = await Promise.all([getUserCount()]);

  return (
    <div>
      <AdminPage userAccount={userAccount} userCount={userCount} />
    </div>
  );
}

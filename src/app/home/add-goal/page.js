import AddGoalPage from './AddGoalPage';
import { auth } from '../../../../lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <>
      <AddGoalPage session={session} />
    </>
  );
}

export default page;

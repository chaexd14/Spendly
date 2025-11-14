'use server';
import AskSpendlyPage from './AskSpendlyPage';

import { getSessionWithRole } from '../../../../lib/session';

export default async function page() {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <>
      <AskSpendlyPage />
    </>
  );
}

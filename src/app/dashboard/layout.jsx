import { SideBar } from '@/components/sideBar/SideBar';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { getSessionWithRole } from '../../../lib/session';
import { redirect } from 'next/navigation';

export default async function layout({ children }) {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <SidebarProvider>
      <SideBar session={session} />

      <SidebarInset>
        <header className="flex items-center gap-2 border-b h-14">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

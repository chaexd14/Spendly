import { SideBar } from '@/components/sideBar/SideBar';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { getSessionWithRole } from '../../../lib/session';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';

export default async function Layout({ children }) {
  const session = await getSessionWithRole();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <SideBar session={session} />

          {/* Main Content */}
          <div className="flex flex-col flex-1">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white border-b">
              <div className="flex items-center gap-2 p-4">
                <SidebarTrigger />
              </div>
            </header>

            {/* Content */}
            <main className="flex-1 p-5">
              {children}
              <Toaster position="top-right" richColors expand />

              <div className="h-[30px]" />
            </main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

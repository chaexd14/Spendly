'use client';

import { signOut } from '../../../lib/actions/auth-actions';
import { useRouter } from 'next/navigation';

import {
  Wallet,
  PiggyBank,
  Banknote,
  CreditCard,
  Target,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';

import { NavUser } from './nav-user';
import { NavMain } from './nav-main';

import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { useState } from 'react';

// Menu items.
const items = [
  { title: 'Income', url: '#', icon: Banknote },
  { title: 'Budget', url: '#', icon: Wallet },
  { title: 'Expenses', url: '#', icon: CreditCard },
  { title: 'Goals', url: '#', icon: Target },
  { title: 'Savings', url: '#', icon: PiggyBank },
];

export function SideBar({ session }) {
  const { state } = useSidebar();
  const [isLoading, setIsLoading] = useState(false);

  const isCollapsed = state === 'collapsed';
  const router = useRouter();

  // --- Handlers ---
  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    router.push('/auth/signin');
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavUser session={session} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleSignOut} disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner className="w-4 h-4 mr-2 animate-spin" />
              {!isCollapsed && <span>Signing out...</span>}
            </>
          ) : (
            <>
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span>Sign Out</span>}
            </>
          )}
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

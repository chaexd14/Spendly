'use client';

import { signOut } from '../../../lib/actions/auth-actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  useSidebar, // ✅ Import this
} from '@/components/ui/sidebar';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { Wallet, PiggyBank, Banknote, CreditCard, Target } from 'lucide-react';
import { Collapsible, CollapsibleTrigger } from '../ui/collapsible';

export function SideBar({ session }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { state } = useSidebar(); // ✅ Detect current sidebar state
  const isCollapsed = state === 'collapsed';

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    router.push('/auth/signin');
  };

  const navItems = [
    {
      title: 'Income',
      url: '/dashboard/income',
      icon: Banknote,
    },
    {
      title: 'Budget',
      url: '/dashboard/budgets',
      icon: Wallet,
      items: [
        { title: 'Create Budget', url: '#' },
        { title: 'Manage Budgets', url: '#' },
      ],
    },
    {
      title: 'Expenses',
      url: '/dashboard/expenses',
      icon: CreditCard,
      items: [
        { title: 'Add Expense', url: '#' },
        { title: 'Expense History', url: '#' },
      ],
    },
    {
      title: 'Goals',
      url: '/dashboard/goals',
      icon: Target,
      items: [
        { title: 'Set Goal', url: '#' },
        { title: 'Track Goals', url: '#' },
      ],
    },
    {
      title: 'Savings',
      url: '/dashboard/savings',
      icon: PiggyBank,
      items: [
        { title: 'Add Savings', url: '#' },
        { title: 'Savings Overview', url: '#' },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavUser session={session} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <Collapsible asChild>
          <CollapsibleTrigger asChild>
            <Button
              onClick={handleSignOut}
              disabled={isLoading}
              className={`flex items-center justify-center w-full gap-2 ${
                isCollapsed ? 'px-2 py-2' : 'px-4 py-3'
              }`}
            >
              {isLoading ? (
                <>
                  <Spinner className="w-4 h-4 animate-spin" />
                  {!isCollapsed && <span>Signing out...</span>}
                </>
              ) : (
                <>
                  <LogOut className="w-5 h-5" />
                  {!isCollapsed && <span>Sign Out</span>}
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

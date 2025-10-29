'use client';

import {
  Wallet,
  PiggyBank,
  Banknote,
  CreditCard,
  Target,
  LogOut,
} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { ChevronRight } from 'lucide-react';

export function NavMain() {
  const items = [
    {
      title: 'Income',
      url: '#',
      icon: Banknote,
      items: [
        {
          title: 'Record Income',
        },
        {
          title: 'Manage Income',
        },
      ],
    },
    {
      title: 'Budget',
      url: '#',
      icon: Wallet,
      items: [
        {
          title: 'Create Budget',
        },
        {
          title: 'Manage Budgets',
        },
      ],
    },
    {
      title: 'Expenses',
      url: '#',
      icon: CreditCard,
      items: [
        {
          title: 'Add Expense',
        },
        {
          title: 'Expense History',
        },
      ],
    },
    {
      title: 'Goals',
      url: '#',
      icon: Target,
      items: [
        {
          title: 'Set Goal',
        },
        {
          title: 'Track Goals',
        },
      ],
    },
    {
      title: 'Savings',
      url: '#',
      icon: PiggyBank,
      items: [
        {
          title: 'Add Savings',
        },
        {
          title: 'Savings Overview',
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Actions</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

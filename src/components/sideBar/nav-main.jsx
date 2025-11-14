'use client';

import { ChevronRight } from 'lucide-react';
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

import { LayoutDashboard, Bot } from 'lucide-react';

export function NavMain({ items }) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Home</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuButton
            tooltip="Dashboard"
            className="px-3 py-5 text-base"
          >
            <LayoutDashboard />
            <a href="/dashboard">
              <span>Dashboard</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Ask Spendlyy</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuButton
            tooltip="Dashboard"
            className="px-3 py-5 text-base"
          >
            <Bot />
            <a href="/dashboard/ask-spendlyy">
              <span>Spendlyy</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Actions</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible key={item.title} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="px-3 py-5 text-base"
                  >
                    {item.icon && <item.icon />}
                    <a href={item.url}>
                      <span className="truncate">{item.title}</span>
                    </a>
                    {item.items && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {item.items && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((sub) => (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton
                            asChild
                            className="px-3 py-5 text-base"
                          >
                            <a href={sub.url} className="text-sm">
                              <span>{sub.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}

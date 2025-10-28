import { Wallet, PiggyBank, Banknote, CreditCard, Target } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
  { title: 'Income', url: '#', icon: Banknote },
  { title: 'Budget', url: '#', icon: Wallet },
  { title: 'Expenses', url: '#', icon: CreditCard },
  { title: 'Goals', url: '#', icon: Target },
  { title: 'Savings', url: '#', icon: PiggyBank },
];

export function SideBar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className="hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))] transition-colors"
            >
              <a href={item.url} className="flex items-center gap-2">
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

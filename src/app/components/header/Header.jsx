'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

import useRouteSegments from '@/hooks/useRouteSegments';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

export default function Header() {
  const segments = useRouteSegments();

  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="flex items-center h-16">
        <div className="p-5">
          <SidebarTrigger />
        </div>
        <Separator orientation="vertical" className="h-full w-[1px]" />
        <Breadcrumb className="flex gap-3 p-5">
          {segments.map((seg, i) => {
            const href =
              '/' +
              segments
                .slice(0, i + 1)
                .map((s) => s.raw)
                .join('/');

            return (
              <BreadcrumbItem key={i}>
                <div className="flex items-center justify-center gap-3">
                  <BreadcrumbLink asChild>
                    <Link href={href}>{seg.title}</Link>
                  </BreadcrumbLink>

                  {i < segments.length - 1 && <ChevronRight size={16} />}
                </div>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </div>
    </header>
  );
}

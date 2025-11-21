'use client';

import { usePathname } from 'next/navigation';

export default function useRouteSegments() {
  const pathname = usePathname();

  // lowercase raw path
  const rawSegments = pathname.split('/').filter(Boolean);

  return rawSegments.map((seg) => ({
    raw: seg, // "dashboard"
    title: seg.charAt(0).toUpperCase() + seg.slice(1), // "Dashboard"
  }));
}

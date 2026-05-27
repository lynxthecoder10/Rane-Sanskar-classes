'use client';

import Link from 'next/link';
import { BookOpen, LayoutDashboard, PlayCircle, Settings, User, ClipboardCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/resources', label: 'Study Materials', icon: BookOpen },
  { href: '/dashboard/videos', label: 'Class Videos', icon: PlayCircle },
  { href: '/dashboard/mock-tests', label: 'Mock Tests', icon: ClipboardCheck },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-2 p-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            className={[
              'flex items-center gap-3 px-4 py-3 font-semibold transition',
              isActive
                ? 'bg-[var(--logo-crimson)] text-white shadow-lg shadow-[var(--logo-crimson)]/20'
                : 'text-slate-300 hover:bg-white/[0.06] hover:text-white',
            ].join(' ')}
          >
            <Icon className={isActive ? 'h-5 w-5 text-[var(--logo-gold)]' : 'h-5 w-5 text-slate-500'} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

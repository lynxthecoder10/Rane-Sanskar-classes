'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, ShieldCheck, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '/', hash: '', icon: Home },
  { label: 'Fame', href: '/#results', hash: '#results', icon: Trophy },
  { label: 'Enquiry', href: '/#enquiry-form', hash: '#enquiry-form', icon: MessageCircle },
  { label: 'Portal', href: '/student-login', hash: '', icon: ShieldCheck },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);

    syncHash();
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);

    return () => {
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
    };
  }, []);

  const isActive = (href: string, hash: string) => {
    if (href === '/student-login') {
      return pathname.startsWith('/student-login') || pathname.startsWith('/dashboard');
    }

    if (hash) {
      return pathname === '/' && activeHash === hash;
    }

    return pathname === '/' && activeHash === '';
  };

  return (
    <nav
      aria-label="Mobile primary navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom-nav border-t border-amber-300/20 bg-[#07111f]/95 px-3 pt-2 shadow-[0_-18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
    >
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1 rounded-[28px] border border-white/10 bg-white/[0.04] p-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.hash);

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={(event) => {
                if (item.hash && pathname === '/') {
                  const target = document.querySelector(item.hash);

                  if (target) {
                    event.preventDefault();
                    window.history.pushState({}, '', item.hash);
                    window.dispatchEvent(new Event('popstate'));
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    if (item.hash === '#enquiry-form') {
                      window.dispatchEvent(new Event('enquiry-form-highlight'));
                    }
                  }
                }
              }}
              aria-current={active ? 'page' : undefined}
              className={[
                'flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-black uppercase tracking-wide',
                'active:scale-95 active:bg-opacity-80 transition-transform duration-100 ease-out select-none',
                active
                  ? 'brand-gold-gradient text-[#07111f] shadow-[0_8px_20px_rgba(245,183,27,0.24)]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.8 : 2.2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

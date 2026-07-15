'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const guestLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' }
];

const userLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/events/create', label: 'Add Event' },
  { href: '/events/manage', label: 'Manage Events' },
  { href: '/profile', label: 'Profile' },
];

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-sm font-medium transition hover:text-gray-900 ${
        pathname === href ? 'text-gray-900' : 'text-gray-500'
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const visibleNavLinks = user ? userLinks : guestLinks;

  async function handleLogout() {
    closeMenu();
    await logout();
  }

  const authLinks = loading ? null : user ? (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900"
    >
      <LogOut className="size-4" />
      Logout
    </button>
  ) : (
    <>
      <NavLink href="/login" label="Login" />
      <NavLink href="/signup" label="Register" />
    </>
  );

  const mobileAuthLinks = loading ? null : user ? (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 text-left text-sm font-medium text-gray-500 transition hover:text-gray-900"
    >
      <LogOut className="size-4" />
      Logout
    </button>
  ) : (
    <>
      <NavLink href="/login" label="Login" onClick={closeMenu} />
      <NavLink href="/signup" label="Register" onClick={closeMenu} />
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          EventHub
        </Link>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex flex-col gap-1.5 p-2 sm:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-gray-600 transition ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-600 transition ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-600 transition ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>

        <div className="hidden sm:flex sm:items-center sm:gap-8">
          {visibleNavLinks.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} />
          ))}

          <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
            {authLinks}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-200 px-4 pb-4 pt-2 sm:hidden">
          <div className="flex flex-col gap-3">
            {visibleNavLinks.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                onClick={closeMenu}
              />
            ))}

            <div className="flex flex-col gap-3 border-t border-gray-200 pt-3">
              {mobileAuthLinks}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
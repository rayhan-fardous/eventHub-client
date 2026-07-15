'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  { href: '/events/create', label: 'Add Event' },
  { href: '/events/manage', label: 'Manage Events' },
  { href: '/dashboard', label: 'Dashboard' },
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
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative text-sm font-medium transition-all duration-300 py-1.5 px-3 rounded-lg ${
        isActive
          ? 'text-brand-cyan bg-brand-cyan-glow/10 border border-brand-cyan/20'
          : 'text-brand-text-secondary hover:text-brand-text-primary hover:bg-white/5 border border-transparent'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 h-[2px] w-6 -translate-x-1/2 bg-gradient-to-r from-brand-indigo to-brand-cyan blur-[1px]" />
      )}
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
      className="flex items-center gap-1.5 text-sm font-medium text-brand-text-secondary transition-all duration-200 hover:text-red-400 py-1.5 px-3 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20 cursor-pointer"
    >
      <LogOut className="size-4" />
      Logout
    </button>
  ) : (
    <>
      <Link
        href="/login"
        className="text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary transition-colors py-1.5 px-3"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="text-sm font-medium text-brand-bg bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 active:scale-[0.98] transition-all duration-200 px-4 py-2 rounded-xl shadow-lg shadow-brand-indigo-glow/20"
      >
        Register
      </Link>
    </>
  );

  const mobileAuthLinks = loading ? null : user ? (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 w-full text-left text-sm font-medium text-brand-text-secondary hover:text-red-400 py-3 px-4 rounded-xl hover:bg-red-500/10 transition-colors cursor-pointer"
    >
      <LogOut className="size-4" />
      Logout
    </button>
  ) : (
    <div className="flex flex-col gap-3 px-1">
      <Link
        href="/login"
        onClick={closeMenu}
        className="text-center text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
      >
        Login
      </Link>
      <Link
        href="/register"
        onClick={closeMenu}
        className="text-center text-sm font-semibold text-brand-bg bg-gradient-to-r from-brand-indigo to-brand-cyan hover:brightness-110 py-3 px-4 rounded-xl shadow-md transition-colors"
      >
        Register
      </Link>
    </div>
  );

  return (
    <nav className="sticky top-4 z-50 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:w-[90%] lg:w-[80%] lg:max-w-[90rem] mx-auto rounded-2xl border border-brand-border bg-brand-bg/75 backdrop-blur-md shadow-xl shadow-brand-indigo-glow/5 overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Image
            src="/logo.png"
            alt="EventHub Logo"
            width={32}
            height={32}
            className="h-8 w-auto object-contain shrink-0"
          />
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-brand-indigo via-brand-indigo to-brand-cyan bg-clip-text text-transparent">
            EVENT<span className="text-brand-cyan">HUB</span>
          </span>
        </Link>

        {/* Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex flex-col justify-center items-center gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors md:hidden cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-brand-text-primary transition-all duration-300 ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-text-primary transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-text-primary transition-all duration-300 ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <div className="flex items-center gap-2">
            {visibleNavLinks.map(({ href, label }) => (
              <NavLink key={href} href={href} label={label} />
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-brand-border pl-5">
            {authLinks}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="border-t border-brand-border bg-brand-bg px-4 pb-8 pt-6 md:hidden animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {visibleNavLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="block w-full py-3 px-4 text-brand-text-secondary hover:text-brand-text-primary hover:bg-white/5 rounded-xl transition-colors font-medium"
              >
                {label}
              </Link>
            ))}

            <div className="mt-6 border-t border-brand-border pt-6">
              {mobileAuthLinks}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
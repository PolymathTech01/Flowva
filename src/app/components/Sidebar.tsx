'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';

const links: { title: string; href: string }[] = [
  {
    title: 'Rewards Hub',
    href: '/',
  },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/login';
  };

  return (
    <section className='flex font-sans h-screen overflow-hidden'>
      {/* Mobile Header */}
      <div className='lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between'>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='p-2 rounded-lg hover:bg-gray-100 transition'
          aria-label='Toggle menu'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-gray-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        <Image
          src='/flowva_logo.png'
          alt='Flowva Logo'
          width={100}
          height={32}
          className='h-8 w-auto'
        />
        <div className='w-10'></div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black/50 z-40'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <nav
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          h-screen w-64 p-6 flex flex-col shrink-0 overflow-y-auto
          bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo and close button for mobile sidebar */}
        <div className='flex items-center justify-between mb-6'>
          <Image
            src='/flowva_logo.png'
            alt='Flowva Logo'
            width={120}
            height={60}
            className='h-16 w-auto'
          />
          {/* Close button - only visible on mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition'
            aria-label='Close menu'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <ul>
          {links.map((link) => (
            <li key={link.title}>
              <Link
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className='flex items-center gap-3 px-4 p-3 mb-2 rounded-lg cursor-pointer duration-200 transition-all
                bg-[rgba(144,19,254,0.2)] text-[#9013FE]'
              >
                <svg
                  aria-hidden='true'
                  focusable='false'
                  className='w-4 h-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                >
                  <path
                    fill='currentColor'
                    d='M116.7 33.8c4.5-6.1 11.7-9.8 19.3-9.8l240 0c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152zm38.5 39.8c-3.3 2.5-4.2 7-2.1 10.5l57.4 95.6L63.3 192c-4.1 .3-7.3 3.8-7.3 8s3.2 7.6 7.3 8l192 16c.4 0 .9 0 1.3 0l192-16c4.1-.3 7.3-3.8 7.3-8s-3.2-7.6-7.3-8L301.5 179.8l57.4-95.6c2.1-3.5 1.2-8.1-2.1-10.5s-7.9-2-10.7 1L256 172.2 165.9 74.6c-2.8-3-7.4-3.4-10.7-1z'
                  ></path>
                </svg>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* User section at bottom */}
        {user && (
          <div className='mt-auto pt-4 border-t border-gray-200'>
            <div className='px-4 py-2 mb-2'>
              <p className='text-xs text-gray-500 truncate'>{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className='flex items-center gap-3 px-4 p-3 w-full rounded-lg cursor-pointer duration-200 transition-all
              hover:bg-red-50 text-gray-600 hover:text-red-600'
            >
              <LogOut className='w-4 h-4' />
              Sign Out
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto pt-16 lg:pt-0'>{children}</main>
    </section>
  );
}

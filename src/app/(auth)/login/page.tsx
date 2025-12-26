'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        router.push('/loading?redirect=/');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#9013FE] to-[#a855f7] flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-bold text-[#9013FE] mb-2'>
            Welcome Back
          </h1>
          <p className='text-gray-500 text-sm'>Log in to manage your tools</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg'>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className='space-y-4'>
          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='your@email.com'
              className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9013FE] focus:border-transparent transition'
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9013FE] focus:border-transparent transition pr-16'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-[#9013FE] text-sm font-medium hover:text-[#7a0dd6] transition'
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className='text-right'>
            <Link
              href='/forgot-password'
              className='text-[#9013FE] text-sm hover:underline'
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full py-3 bg-gradient-to-r from-[#9013FE] to-[#a855f7] text-white font-medium rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center my-6'>
          <div className='flex-1 border-t border-gray-200'></div>
          <span className='px-4 text-gray-400 text-sm'>or</span>
          <div className='flex-1 border-t border-gray-200'></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className='w-full py-3 border border-gray-200 rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <svg className='w-5 h-5' viewBox='0 0 24 24'>
            <path
              fill='#4285F4'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
              fill='#34A853'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
              fill='#FBBC05'
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
            />
            <path
              fill='#EA4335'
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
          </svg>
          <span className='text-gray-700 font-medium'>Sign in with Google</span>
        </button>

        {/* Sign Up Link */}
        <p className='text-center mt-6 text-gray-600 text-sm'>
          Don&apos;t have an account?{' '}
          <Link
            href='/signup'
            className='text-[#9013FE] font-medium hover:underline'
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

function LoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    // Simulate loading time then redirect
    const timer = setTimeout(() => {
      router.push(redirect);
    }, 2500);

    return () => clearTimeout(timer);
  }, [router, redirect]);

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center'>
      {/* Logo with bounce animation */}
      <div className='animate-bounce-slow mb-6'>
        <Image
          src='/flowva_logo.png'
          alt='Flowva Logo'
          width={120}
          height={120}
          className='object-contain'
          priority
        />
      </div>

      {/* Redirecting text */}
      <p className='text-[#9013FE] text-lg font-medium animate-pulse'>
        Redirecting...
      </p>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(-25px);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s infinite;
        }
      `}</style>
    </div>
  );
}

export default function Loading() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-white flex flex-col items-center justify-center'>
          <div className='animate-bounce-slow mb-6'>
            <Image
              src='/flowva_logo.png'
              alt='Flowva Logo'
              width={120}
              height={120}
              className='object-contain'
              priority
            />
          </div>
          <p className='text-[#9013FE] text-lg font-medium animate-pulse'>
            Redirecting...
          </p>
        </div>
      }
    >
      <LoadingContent />
    </Suspense>
  );
}

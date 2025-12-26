'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, Copy, Share2, Star, Users } from 'lucide-react';
import { useAuth, useUserRewards } from '@/hooks/useAuth';

// Rewards data
const rewards = [
  {
    id: 1,
    icon: '💵',
    iconBg: 'bg-green-100',
    title: '$5 Bank Transfer',
    description: 'The $5 equivalent will be transferred to your bank account.',
    points: 5000,
    status: 'locked',
  },
  {
    id: 2,
    icon: '💳',
    iconBg: 'bg-green-100',
    title: '$5 PayPal International',
    description:
      'Receive a $5 PayPal balance transfer directly to your PayPal account email.',
    points: 5000,
    status: 'locked',
  },
  {
    id: 3,
    icon: '🎁',
    iconBg: 'bg-orange-100',
    title: '$5 Virtual Visa Card',
    description:
      'Use your $5 prepaid card to shop anywhere Visa is accepted online.',
    points: 5000,
    status: 'locked',
  },
  {
    id: 4,
    icon: '🎁',
    iconBg: 'bg-pink-100',
    title: '$5 Apple Gift Card',
    description:
      'Redeem this $5 Apple Gift Card for apps, games, music, movies, and more on the App Store and iTunes.',
    points: 5000,
    status: 'locked',
  },
  {
    id: 5,
    icon: '🎁',
    iconBg: 'bg-pink-100',
    title: '$5 Google Play Card',
    description:
      'Use this $5 Google Play Gift Card to purchase apps, games, movies, books, and more on the Google Play Store.',
    points: 5000,
    status: 'locked',
  },
  {
    id: 6,
    icon: '🎁',
    iconBg: 'bg-yellow-100',
    title: '$5 Amazon Gift Card',
    description:
      'Get a $5 digital gift card to spend on your favorite tools or platforms.',
    points: 5000,
    status: 'locked',
  },
  {
    id: 7,
    icon: '🎁',
    iconBg: 'bg-yellow-100',
    title: '$10 Amazon Gift Card',
    description:
      'Get a $10 digital gift card to spend on your favorite tools or platforms.',
    points: 10000,
    status: 'locked',
  },
  {
    id: 8,
    icon: '📚',
    iconBg: 'bg-blue-100',
    title: 'Free Udemy Course',
    description: 'Coming Soon!',
    points: 0,
    status: 'coming-soon',
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('earn');
  const [rewardFilter, setRewardFilter] = useState('all');
  const { user, loading: authLoading, signOut } = useAuth();
  const { rewards: userRewards, loading: rewardsLoading } = useUserRewards();

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  // Use actual streak from database or default to 0
  const currentStreak = userRewards?.current_streak ?? 0;
  const pointsBalance = userRewards?.points_balance ?? 0;

  const filteredRewards = rewards.filter((reward) => {
    if (rewardFilter === 'all') return true;
    if (rewardFilter === 'unlocked') return reward.status === 'unlocked';
    if (rewardFilter === 'locked') return reward.status === 'locked';
    if (rewardFilter === 'coming-soon') return reward.status === 'coming-soon';
    return true;
  });

  const getFilterCount = (filter: string) => {
    if (filter === 'all') return rewards.length;
    return rewards.filter((r) => r.status === filter).length;
  };

  return (
    <main className='font-sans w-full bg-gray-50 px-4 lg:px-8 py-6 min-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-start w-full mb-6'>
        <div>
          <h1 className='text-xl md:text-[1.5rem] font-medium '>Rewards Hub</h1>
          <p className='text-gray-500 text-sm mt-1'>
            Earn points, unlock rewards, and celebrate your progress!
          </p>
        </div>
        <div className='relative'>
          <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition'>
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
                d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
              />
            </svg>
          </div>
          <span className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
            1
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-6 border-b border-gray-200 mb-6'>
        <button
          onClick={() => setActiveTab('earn')}
          className={`pb-3 text-sm font-medium transition ${
            activeTab === 'earn'
              ? 'text-[#9013FE] border-b-2 border-[#9013FE]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Earn Points
        </button>
        <button
          onClick={() => setActiveTab('redeem')}
          className={`pb-3 text-sm font-medium transition ${
            activeTab === 'redeem'
              ? 'text-[#9013FE] border-b-2 border-[#9013FE]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Redeem Rewards
        </button>
      </div>

      {/* Tab Content with Transition */}
      <div className='relative'>
        {/* Earn Points Tab */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            activeTab === 'earn'
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-[-20px] absolute inset-0 pointer-events-none'
          }`}
        >
          {activeTab === 'earn' && (
            <>
              {/* Your Rewards Journey Section */}
              <div className='mb-8'>
                <div className='flex items-center gap-2 mb-4'>
                  <h2 className=' text-lg md:text-2xl my-3 text-black border border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-3 font-semibold'>
                    Your Rewards Journey
                  </h2>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                  {/* Points Balance Card */}
                  <div className='bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden'>
                    <div className='flex items-center gap-2 p-4 bg-[#eef2ff] border-b border-gray-100'>
                      <div className='w-6 h-6 bg-[rgba(144,19,254,0.1)] rounded-full flex items-center justify-center'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4 text-[#9013FE]'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                      </div>
                      <span className='text-gray-700 font-medium'>
                        Points Balance
                      </span>
                    </div>

                    <div className='flex p-4 items-center justify-between'>
                      <span className='text-4xl font-bold text-[#9013FE]'>
                        {pointsBalance.toLocaleString()}
                      </span>
                      <div className='w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6 text-white'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                        </svg>
                      </div>
                    </div>

                    <div className='px-4'>
                      <div className='flex justify-between text-sm text-gray-600 mb-1'>
                        <span>Progress to $5 Gift Card</span>
                        <span>{pointsBalance.toLocaleString()}/5000</span>
                      </div>
                      <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-[#9013FE] rounded-full transition-all duration-500'
                          style={{
                            width: `${Math.min(
                              (pointsBalance / 5000) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className='flex items-center gap-2 text-sm text-gray-500 p-4'>
                      <span>🚀</span>
                      <span>Just getting started — keep earning points!</span>
                    </div>
                  </div>

                  {/* Daily Streak Card */}
                  <div className='bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden'>
                    <div className='flex items-center gap-2 p-4 bg-[#eef2ff] border-b border-gray-100'>
                      <div className='w-6 h-6 bg-[rgba(144,19,254,0.1)] rounded-full flex items-center justify-center'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4 text-[#9013FE]'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                      <span className='text-gray-700 font-medium'>
                        Daily Streak
                      </span>
                    </div>

                    <div className='p-4'>
                      <div className='text-4xl font-bold text-[#9013FE] mb-4'>
                        {currentStreak} day{currentStreak !== 1 ? 's' : ''}
                      </div>

                      <div className='flex justify-center gap-1 sm:gap-2 mb-4'>
                        {daysOfWeek.map((day, index) => (
                          <div
                            key={index}
                            className={`w-8 h-8 sm:w-10 sm:h-10 text-center rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                              index < currentStreak
                                ? 'bg-[#9013FE] text-white'
                                : index === currentStreak
                                ? 'border-2 border-[#9013FE] text-[#9013FE] bg-white'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      <p className='text-center text-sm text-gray-500 mb-4'>
                        Check in daily to to earn +5 points
                      </p>

                      <button className='w-full bg-[#9013FE] hover:bg-[#7a0fd6] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M13 10V3L4 14h7v7l9-11h-7z'
                          />
                        </svg>
                        Claim Today&apos;s Points
                      </button>
                    </div>
                  </div>

                  {/* Top Tool Spotlight Card */}
                  <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg cursor-pointer'>
                    {/* Gradient Header */}
                    <div className='bg-[linear-gradient(135deg,#9013FE_0%,#70D6FF_100%)] p-4 text-white relative overflow-hidden'>
                      {/* Decorative circle
              <div className='absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4'></div> */}

                      {/* Featured badge */}
                      <div className='mb-3 relative z-10'>
                        <span className='bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold'>
                          Featured
                        </span>
                      </div>

                      {/* Top Tool Spotlight with image */}
                      <div className='flex items-center justify-between mb-3 relative z-10'>
                        <h3 className='text-lg font-semibold'>
                          Top Tool Spotlight
                        </h3>
                        <div className='overflow-hidden relative rounded-full'>
                          <Image
                            src='/spotlight.png'
                            alt='Spotlight'
                            width={48}
                            height={48}
                            className='size-16 object-cover rounded-full'
                          />
                        </div>
                      </div>

                      <p className='text-xl font-bold relative z-10'>Reclaim</p>
                    </div>

                    {/* White Content Section */}
                    <div className='p-4'>
                      <div className='flex items-start gap-2 mb-4'>
                        <span>
                          <Calendar
                            size={34}
                            color='#9013fe'
                            className='p-0 m-0'
                          />
                        </span>

                        <div>
                          <p className='font-medium text-sm text-gray-900'>
                            Automate and Optimize Your Schedule
                          </p>
                          <p className='text-xs text-gray-500 mt-1 leading-relaxed'>
                            Reclaim.ai is an AI-powered calendar assistant that
                            automatically schedules your tasks, meetings, and
                            breaks to boost productivity. Free to try — earn
                            Flowva Points when you sign up!
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-4 w-4'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                            />
                          </svg>
                          Sign up
                        </button>
                        <button className='bg-[linear-gradient(45deg,#9013FE,#FF8687)] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-4 w-4'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
                            />
                          </svg>
                          Claim 50 pts
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earn More Points Section */}
              <div className='mb-8'>
                <div className='flex items-center gap-2 mb-4'>
                  <h2 className=' text-lg md:text-2xl my-3 text-black border border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-3 font-semibold'>
                    Earn More Points
                  </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  {/* Refer Card */}
                  <div className='transition-all hover:border-[#9013fe] hover:-translate-y-1.25 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] ease-linear duration-200 border border-[#e5e7eb] rounded-xl overflow-hidden '>
                    <div className='flex items-center gap-3  bg-white p-4'>
                      <div className='w-10 h-10 bg-[#e490e61a] rounded-full flex items-center justify-center'>
                        <Star color='#9013fe' />
                      </div>
                      <span className='font-medium text-gray-900 '>
                        Refer and win 10,000 points!
                      </span>
                    </div>

                    <p className='text-sm font-medium p-4 '>
                      Invite 3 friends by Nov 20 and earn a chance to be one of
                      5 winners of{' '}
                      <span className='text-[#9013fe] font-medium'>
                        10,000 points
                      </span>
                      .{' '}
                      <span className='font-medium'>
                        Friends must complete onboarding to qualify.
                      </span>
                    </p>
                  </div>

                  {/* Share Your Stack Card */}
                  <div className='transition-all hover:border-[#9013fe] hover:-translate-y-1.25 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] ease-linear duration-200 border border-[#e5e7eb] rounded-xl overflow-hidden'>
                    <div className='flex items-center justify-between bg-white p-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-[#9013fe1a] rounded-full flex items-center justify-center'>
                          <Share2 color={'#9013fe'} />
                        </div>
                        <div>
                          <p className='font-medium text-gray-900'>
                            Share Your Stack
                          </p>
                          <p className='text-sm text-gray-500'>Earn +25 pts</p>
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center justify-between p-4'>
                      <p className='text-sm font-medium'>
                        Share your tool stack
                      </p>
                      <button className='bg-[#eef2ff] hover:bg-[#9013fe] text-[#9013fe] px-4 py-2 rounded-full text-sm font-medium hover:text-white flex items-center gap-2 transition'>
                        <Share2 size={16} />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refer & Earn Section */}
              <div className='mb-8'>
                <div className='flex items-center gap-2 mb-4'>
                  <h2 className=' text-lg md:text-2xl my-3 text-black border border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-3 font-semibold'>
                    Refer & Earn
                  </h2>
                </div>

                <div className=''>
                  {/* Header */}
                  <div className='p-4 relative border border-b-[#f3f4f6] bg-[#eef2ff] border-t-0 border-r-0 border-l-0 flex gap-2.5 items-center '>
                    <Users color='#9013fe' />

                    <div>
                      <p className='text-xl font-semibold text-gray-700'>
                        Share Your Link
                      </p>
                      <p className='text-gray-500 text-sm'>
                        Invite friends and earn 25 points when they join!
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className='flex justify-around mb-8'>
                    <div className='text-center'>
                      <p className='text-3xl font-bold text-[#9013FE]'>0</p>
                      <p className='text-sm text-gray-500'>Referrals</p>
                    </div>
                    <div className='text-center'>
                      <p className='text-3xl font-bold text-[#9013FE]'>0</p>
                      <p className='text-sm text-gray-500'>Points Earned</p>
                    </div>
                  </div>

                  {/* Referral Link */}
                  <div className='mb-6'>
                    <p className='text-sm text-gray-600 mb-2'>
                      Your personal referral link:
                    </p>
                    <div className='flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden'>
                      <input
                        type='text'
                        readOnly
                        value='https://app.flowvahub.com/signup/?ref=alli9874'
                        className='flex-1 px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-600 bg-transparent outline-none min-w-0'
                      />
                      <button className='px-4 py-3 text-gray-400 hover:text-gray-600 transition'>
                        <Copy color='#9013fe' />
                      </button>
                    </div>
                  </div>
                  {/* Social Share Buttons */}
                  <div className='flex justify-center gap-4'>
                    {/* Facebook */}
                    <button className='w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center hover:opacity-90 transition'>
                      <svg
                        className='w-5 h-5 text-white'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                      </svg>
                    </button>
                    {/* X (Twitter) */}
                    <button className='w-10 h-10 bg-black rounded-full flex items-center justify-center hover:opacity-90 transition'>
                      <svg
                        className='w-5 h-5 text-white'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                      </svg>
                    </button>
                    {/* LinkedIn */}
                    <button className='w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center hover:opacity-90 transition'>
                      <svg
                        className='w-5 h-5 text-white'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                      </svg>
                    </button>
                    {/* WhatsApp */}
                    <button className='w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:opacity-90 transition'>
                      <svg
                        className='w-5 h-5 text-white'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Redeem Rewards Tab */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            activeTab === 'redeem'
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-[20px] absolute inset-0 pointer-events-none'
          }`}
        >
          {activeTab === 'redeem' && (
            <>
              {/* Redeem Your Points Section */}
              <div className='mb-8'>
                <div className='flex items-center gap-2 mb-4'>
                  <h2 className='text-lg md:text-2xl my-3 text-black border border-l-4 border-t-0 border-b-0 border-r-0 border-[#9301fe] pl-3 font-semibold'>
                    Redeem Your Points
                  </h2>
                </div>

                {/* Filter Tabs */}
                <div className='flex flex-wrap gap-6 mb-6'>
                  <button
                    onClick={() => setRewardFilter('all')}
                    className={`px-3 py-2 text-sm font-medium transition border-b-2 ${
                      rewardFilter === 'all'
                        ? 'text-[#9013FE] border-[#9013FE] bg-[rgba(144,19,254,0.08)]'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    All Rewards{' '}
                    <span
                      className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                        rewardFilter === 'all'
                          ? 'bg-[#9013FE] text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {getFilterCount('all')}
                    </span>
                  </button>
                  <button
                    onClick={() => setRewardFilter('unlocked')}
                    className={`px-3 py-2 text-sm font-medium transition border-b-2 ${
                      rewardFilter === 'unlocked'
                        ? 'text-[#9013FE] border-[#9013FE] bg-[rgba(144,19,254,0.08)]'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    Unlocked{' '}
                    <span
                      className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                        rewardFilter === 'unlocked'
                          ? 'bg-[#9013FE] text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {getFilterCount('unlocked')}
                    </span>
                  </button>
                  <button
                    onClick={() => setRewardFilter('locked')}
                    className={`px-3 py-2 text-sm font-medium transition border-b-2 ${
                      rewardFilter === 'locked'
                        ? 'text-[#9013FE] border-[#9013FE] bg-[rgba(144,19,254,0.08)]'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    Locked{' '}
                    <span
                      className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                        rewardFilter === 'locked'
                          ? 'bg-[#9013FE] text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {getFilterCount('locked')}
                    </span>
                  </button>
                  <button
                    onClick={() => setRewardFilter('coming-soon')}
                    className={`px-3 py-2 text-sm font-medium transition border-b-2 ${
                      rewardFilter === 'coming-soon'
                        ? 'text-[#9013FE] border-[#9013FE] bg-[rgba(144,19,254,0.08)]'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    Coming Soon{' '}
                    <span
                      className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                        rewardFilter === 'coming-soon'
                          ? 'bg-[#9013FE] text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {getFilterCount('coming-soon')}
                    </span>
                  </button>
                </div>

                {/* Rewards Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                  {filteredRewards.map((reward) => (
                    <div
                      key={reward.id}
                      className='bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg flex flex-col cursor-not-allowed items-center text-center'
                    >
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 ${reward.iconBg} rounded-2xl flex items-center justify-center mb-4 text-2xl`}
                      >
                        {reward.icon}
                      </div>

                      {/* Title */}
                      <h3 className='font-semibold text-gray-900 text-sm mb-2'>
                        {reward.title}
                      </h3>

                      {/* Description */}
                      <p className='text-gray-500 text-xs mb-4 flex-grow line-clamp-3'>
                        {reward.description}
                      </p>

                      {/* Points */}
                      <div className='flex items-center justify-center gap-1 mb-4'>
                        <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                        <span className='text-sm font-medium text-[#9013FE]'>
                          {reward.points.toLocaleString()} pts
                        </span>
                      </div>

                      {/* Action Button */}
                      {reward.status === 'locked' && (
                        <button className='w-full py-2.5 bg-[#d7e0ed] text-white text-sm font-medium rounded-lg cursor-not-allowed'>
                          Locked
                        </button>
                      )}
                      {reward.status === 'unlocked' && (
                        <button className='w-full py-2.5 bg-[#9013FE] text-white text-sm font-medium rounded-lg hover:bg-[#7a0dd6] transition'>
                          Redeem
                        </button>
                      )}
                      {reward.status === 'coming-soon' && (
                        <button className='w-full py-2.5 bg-[#c4b5fd] text-white text-sm font-medium rounded-lg cursor-not-allowed'>
                          Coming Soon
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

-- =============================================
-- Flowva Database Schema for Supabase
-- Run this in your Supabase SQL Editor
-- =============================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- User Rewards Table
-- Stores points balance and streak information
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_rewards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  points_balance INTEGER DEFAULT 0 NOT NULL,
  current_streak INTEGER DEFAULT 0 NOT NULL,
  longest_streak INTEGER DEFAULT 0 NOT NULL,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- =============================================
-- Points History Table
-- Tracks all point transactions
-- =============================================
CREATE TABLE IF NOT EXISTS public.points_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  points INTEGER NOT NULL,
  action_type TEXT CHECK (action_type IN ('earn', 'redeem')) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS on user_rewards
ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;

-- Users can only view their own rewards
CREATE POLICY "Users can view own rewards" ON public.user_rewards
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own rewards
CREATE POLICY "Users can insert own rewards" ON public.user_rewards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own rewards
CREATE POLICY "Users can update own rewards" ON public.user_rewards
  FOR UPDATE USING (auth.uid() = user_id);

-- Enable RLS on points_history
ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;

-- Users can only view their own points history
CREATE POLICY "Users can view own points history" ON public.points_history
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own points history
CREATE POLICY "Users can insert own points history" ON public.points_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- Indexes for better performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_user_rewards_user_id ON public.user_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_points_history_user_id ON public.points_history(user_id);
CREATE INDEX IF NOT EXISTS idx_points_history_created_at ON public.points_history(created_at);

-- =============================================
-- Function to automatically update updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on user_rewards
CREATE TRIGGER update_user_rewards_updated_at
  BEFORE UPDATE ON public.user_rewards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Function to create user rewards on signup
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_rewards (user_id, points_balance, current_streak, longest_streak, last_activity_date)
  VALUES (NEW.id, 0, 0, 0, CURRENT_DATE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create user_rewards when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- Insert dummy data for testing (optional)
-- Replace 'YOUR_USER_ID' with actual user UUID after signup
-- =============================================
-- INSERT INTO public.user_rewards (user_id, points_balance, current_streak, longest_streak, last_activity_date)
-- VALUES ('YOUR_USER_ID', 1250, 3, 7, CURRENT_DATE);

-- INSERT INTO public.points_history (user_id, points, action_type, description)
-- VALUES 
--   ('YOUR_USER_ID', 100, 'earn', 'Daily login bonus'),
--   ('YOUR_USER_ID', 250, 'earn', 'Completed profile'),
--   ('YOUR_USER_ID', 500, 'earn', 'Referred a friend'),
--   ('YOUR_USER_ID', 400, 'earn', 'Added first tool');

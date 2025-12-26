'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { UserRewards } from '@/types/database';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, loading, signOut };
}

export function useUserRewards() {
  const [rewards, setRewards] = useState<UserRewards | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setRewards(null);
      setLoading(false);
      return;
    }

    const fetchRewards = async () => {
      try {
        const { data, error } = await supabase
          .from('user_rewards')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          // If no record exists, create one
          if (error.code === 'PGRST116') {
            const { data: newData, error: insertError } = await supabase
              .from('user_rewards')
              .insert({
                user_id: user.id,
                points_balance: 0,
                current_streak: 0,
                longest_streak: 0,
                last_activity_date: new Date().toISOString().split('T')[0],
              })
              .select()
              .single();

            if (insertError) throw insertError;
            setRewards(newData);
          } else {
            throw error;
          }
        } else {
          setRewards(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [user, supabase]);

  const updatePoints = async (points: number, action: 'add' | 'subtract') => {
    if (!user || !rewards) return;

    const newBalance =
      action === 'add'
        ? rewards.points_balance + points
        : Math.max(0, rewards.points_balance - points);

    const { data, error } = await supabase
      .from('user_rewards')
      .update({ points_balance: newBalance })
      .eq('user_id', user.id)
      .select()
      .single();

    if (!error && data) {
      setRewards(data);
    }

    return { data, error };
  };

  const updateStreak = async (streak: number) => {
    if (!user || !rewards) return;

    const { data, error } = await supabase
      .from('user_rewards')
      .update({
        current_streak: streak,
        longest_streak: Math.max(streak, rewards.longest_streak),
        last_activity_date: new Date().toISOString().split('T')[0],
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (!error && data) {
      setRewards(data);
    }

    return { data, error };
  };

  return { rewards, loading, error, updatePoints, updateStreak };
}

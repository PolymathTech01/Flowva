export interface UserRewards {
  id: string;
  user_id: string;
  points_balance: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  created_at: string;
  updated_at: string;
}

export interface PointsHistory {
  id: string;
  user_id: string;
  points: number;
  action_type: 'earn' | 'redeem';
  description: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      user_rewards: {
        Row: UserRewards;
        Insert: Omit<UserRewards, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserRewards, 'id' | 'created_at' | 'updated_at'>>;
      };
      points_history: {
        Row: PointsHistory;
        Insert: Omit<PointsHistory, 'id' | 'created_at'>;
        Update: Partial<Omit<PointsHistory, 'id' | 'created_at'>>;
      };
    };
  };
}

# Flowva - Rewards Hub

A rewards and points management system built with Next.js and Supabase.

## Features

- 🔐 **Authentication**: Email/Password and Google OAuth sign-in
- 💰 **Points System**: Track and manage user points
- 🔥 **Daily Streaks**: Encourage daily engagement with streak tracking
- 🎁 **Rewards Redemption**: Redeem points for gift cards and other rewards
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Supabase Setup

1. Create a new project at [Supabase](https://supabase.com)

2. Go to **Project Settings > API** and copy:

   - Project URL
   - Anon/Public Key

3. Update `.env.local` with your credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. Run the database schema:
   - Go to **SQL Editor** in your Supabase dashboard
   - Copy and paste the contents of `supabase/schema.sql`
   - Click "Run" to create the tables

### 3. Enable Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Go to **APIs & Services > Credentials**
4. Create an **OAuth 2.0 Client ID**
5. Add authorized redirect URI:
   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```
6. In Supabase, go to **Authentication > Providers > Google**
7. Enable Google and add your Client ID and Secret

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Tables

#### `user_rewards`

Stores user points and streak information.

| Column             | Type      | Description             |
| ------------------ | --------- | ----------------------- |
| id                 | UUID      | Primary key             |
| user_id            | UUID      | Reference to auth.users |
| points_balance     | INTEGER   | Current points balance  |
| current_streak     | INTEGER   | Current daily streak    |
| longest_streak     | INTEGER   | Longest streak achieved |
| last_activity_date | DATE      | Last activity date      |
| created_at         | TIMESTAMP | Creation timestamp      |
| updated_at         | TIMESTAMP | Last update timestamp   |

#### `points_history`

Tracks all point transactions.

| Column      | Type      | Description             |
| ----------- | --------- | ----------------------- |
| id          | UUID      | Primary key             |
| user_id     | UUID      | Reference to auth.users |
| points      | INTEGER   | Points earned/spent     |
| action_type | TEXT      | 'earn' or 'redeem'      |
| description | TEXT      | Transaction description |
| created_at  | TIMESTAMP | Transaction timestamp   |

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   └── callback/       # OAuth callback handler
│   ├── components/
│   │   └── Sidebar.tsx     # Navigation sidebar
│   ├── loading/
│   │   └── page.tsx        # Loading/redirect screen
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── signup/
│   │   └── page.tsx        # Sign up page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Rewards Hub (main page)
├── hooks/
│   └── useAuth.ts          # Auth and rewards hooks
├── lib/
│   └── supabase/
│       ├── client.ts       # Browser Supabase client
│       ├── middleware.ts   # Auth middleware utilities
│       └── server.ts       # Server Supabase client
├── types/
│   └── database.ts         # TypeScript types
└── middleware.ts           # Next.js middleware for auth
```

## Environment Variables

| Variable                        | Description                 |
| ------------------------------- | --------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## License

MIT

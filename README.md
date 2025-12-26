# Flowva - Rewards Hub 🎁

A modern rewards and points management platform where users can earn points, maintain daily streaks, and redeem exciting rewards. Built with love using Next.js and Supabase.

![Flowva Banner](public/flowva_logo.png)

---

## 🌟 What is Flowva?

Flowva is a gamified rewards system designed to keep users engaged and motivated. Whether you're building a loyalty program, a productivity app, or just want to add some fun to your platform, Flowva provides the foundation for:

- **Earning Points** - Users accumulate points through various activities
- **Daily Streaks** - Encouraging consistent engagement with streak tracking
- **Reward Redemption** - Exchange points for gift cards, services, and more
- **Referral System** - Grow your community through word-of-mouth

---

## 🛠️ Tech Stack

| Technology         | Purpose              | Why We Chose It                                                                                                                     |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js 16**     | React Framework      | Server-side rendering, file-based routing, and excellent developer experience. The App Router makes organizing our pages intuitive. |
| **React 19**       | UI Library           | The latest React with improved performance and concurrent features for smooth user interactions.                                    |
| **TypeScript**     | Type Safety          | Catches bugs before they happen and makes the codebase self-documenting.                                                            |
| **Tailwind CSS 4** | Styling              | Utility-first CSS that lets us build beautiful UIs fast without leaving our JSX.                                                    |
| **Supabase**       | Backend-as-a-Service | Open-source Firebase alternative providing authentication, database, and real-time features out of the box.                         |
| **Lucide React**   | Icons                | Beautiful, consistent icon set that's lightweight and tree-shakeable.                                                               |

---

## 📁 Project Structure

```
flowva/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth pages (no sidebar)
│   │   │   ├── login/          # Login page
│   │   │   ├── signup/         # Registration page
│   │   │   └── loading/        # Loading/redirect screen
│   │   ├── (dashboard)/        # Main app (with sidebar)
│   │   │   └── page.tsx        # Rewards Hub homepage
│   │   ├── auth/
│   │   │   └── callback/       # OAuth callback handler
│   │   └── components/         # Shared components
│   │       └── Sidebar.tsx     # Navigation sidebar
│   ├── hooks/
│   │   └── useAuth.ts          # Authentication & rewards hooks
│   ├── lib/
│   │   └── supabase/           # Supabase client configuration
│   └── types/
│       └── database.ts         # TypeScript type definitions
├── supabase/
│   └── schema.sql              # Database schema
└── public/                     # Static assets
```

---

## ✨ Features

### 🔐 Authentication

- **Email & Password** - Traditional signup/login flow
- **Google OAuth** - One-click sign-in with Google
- **Protected Routes** - Automatic redirects for unauthenticated users
- **Session Persistence** - Stay logged in across browser sessions

### 💰 Points System

- Track user points balance in real-time
- Progress indicators toward redemption goals
- Points history tracking (coming soon)

### 🔥 Daily Streaks

- Visual streak calendar showing progress
- Longest streak tracking for motivation
- Daily check-in rewards

### 🎁 Rewards Marketplace

- Browse available rewards with filtering
- Lock/unlock status based on points
- Multiple reward categories:
  - Bank transfers
  - PayPal credits
  - Gift cards (Amazon, Apple, Google Play)
  - Virtual Visa cards
  - Course vouchers

### 📱 Responsive Design

- Mobile-first approach
- Hamburger menu for mobile navigation
- Adaptive layouts for all screen sizes

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/flowva.git
cd flowva
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Project Settings → API** and copy your credentials
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

4. Run the database schema:
   - Go to **SQL Editor** in Supabase dashboard
   - Copy the contents of `supabase/schema.sql`
   - Click **Run** to create the tables

### 4. Enable Google OAuth (Optional)

1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Set up OAuth 2.0 credentials
3. Add the redirect URL: `https://your-project.supabase.co/auth/v1/callback`
4. Enable Google provider in Supabase Authentication settings

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're ready to go! 🎉

---

## 🗄️ Database Schema

### user_rewards

Stores each user's points and streak information.

| Column               | Type    | Description                 |
| -------------------- | ------- | --------------------------- |
| `id`                 | UUID    | Primary key                 |
| `user_id`            | UUID    | Links to authenticated user |
| `points_balance`     | INTEGER | Current points              |
| `current_streak`     | INTEGER | Active streak count         |
| `longest_streak`     | INTEGER | Best streak achieved        |
| `last_activity_date` | DATE    | For streak calculation      |

### points_history

Logs all point transactions for auditing and analytics.

| Column        | Type    | Description                 |
| ------------- | ------- | --------------------------- |
| `id`          | UUID    | Primary key                 |
| `user_id`     | UUID    | Links to authenticated user |
| `points`      | INTEGER | Points earned/spent         |
| `action_type` | TEXT    | 'earn' or 'redeem'          |
| `description` | TEXT    | What the points were for    |

---

## 🔒 Security

- **Row Level Security (RLS)** - Users can only access their own data
- **Server-side validation** - All sensitive operations happen on the server
- **HTTP-only cookies** - Session tokens are protected from XSS attacks
- **Environment variables** - Secrets are never exposed to the client

---

## 📜 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

Have questions or need help?

- Open an issue on GitHub
- Check out the [Supabase docs](https://supabase.com/docs)
- Read the [Next.js documentation](https://nextjs.org/docs)

---

<p align="center">
  Made with ❤️ by the Flowva Team
</p>

# BRUSS Cup 2025 Tournament Website

A comprehensive esports tournament management system built with Next.js and Supabase.

## Features

- **Tournament Management**: Complete admin dashboard for managing teams, matches, and announcements
- **Team Registration**: Public team registration with approval workflow
- **Live Updates**: Real-time match results and tournament brackets
- **Admin Authentication**: Secure role-based access control for administrators

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   - Copy `.env.local` (already configured with your Supabase credentials)
   - The environment variables are already set up for your project

4. Run database migrations:
   \`\`\`bash
   # The database tables are already created in your Supabase project
   \`\`\`

5. **Create Admin Account** (for local development):
   \`\`\`bash
   npm run dev
   \`\`\`
   Then visit `http://localhost:3000/setup-admin` to create your admin account.

6. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Admin Access

For local development, you can create an admin account at `/setup-admin` with these default credentials:
- **Email**: bank.dz07@gmail.com  
- **Password**: 142536abdoobda

After creating the account:
1. Check your email for the confirmation link
2. Click the confirmation link
3. Log in at `/admin/login`

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── about/             # About page
│   ├── participate/       # Team registration
│   └── setup-admin/       # Admin account setup (dev only)
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   └── supabase/         # Supabase client configuration
└── scripts/              # Database scripts
\`\`\`

## Database Schema

The application uses the following main tables:
- `admin_users` - Administrator accounts with role-based access
- `teams` - Tournament team registrations
- `players` - Team member information
- `matches` - Tournament matches and results
- `announcements` - Public announcements
- `tournament_settings` - Configuration settings

## Security

- **Row Level Security (RLS)**: All database tables are protected with RLS policies
- **Role-based Access**: Admin users have different permission levels (admin, super_admin)
- **Authentication**: Secure email/password authentication via Supabase Auth
- **Environment Variables**: Sensitive configuration stored in environment variables

## Deployment

### ⚠️ IMPORTANT: Production Security

**Before deploying to production:**

1. **Change or remove the default admin account**:
   - Either change the password for bank.dz07@gmail.com
   - Or delete this account and create new admin accounts with secure credentials
   - Remove or restrict access to `/setup-admin` route

2. **Update environment variables**:
   - Use production Supabase credentials
   - Set secure `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` for your domain

3. **Review security settings**:
   - Ensure RLS policies are properly configured
   - Review admin user permissions
   - Test authentication flows

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

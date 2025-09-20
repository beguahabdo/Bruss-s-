-- Create admin users table for tournament administrators
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teams table
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  tag TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  captain_steam_id TEXT,
  captain_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create players table
CREATE TABLE IF NOT EXISTS public.players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  steam_id TEXT NOT NULL UNIQUE,
  nickname TEXT NOT NULL,
  discord_tag TEXT,
  role TEXT DEFAULT 'player' CHECK (role IN ('captain', 'player')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create matches table
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team1_id UUID REFERENCES public.teams(id),
  team2_id UUID REFERENCES public.teams(id),
  map TEXT NOT NULL,
  server_id TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'cancelled')),
  score_team1 INTEGER DEFAULT 0,
  score_team2 INTEGER DEFAULT 0,
  winner_id UUID REFERENCES public.teams(id),
  round_type TEXT NOT NULL CHECK (round_type IN ('group', 'quarterfinal', 'semifinal', 'final')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tournament_settings table
CREATE TABLE IF NOT EXISTS public.tournament_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.admin_users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournament_settings ENABLE ROW LEVEL SECURITY;

-- Admin users policies (only admins can manage admin users)
CREATE POLICY "admin_users_select" ON public.admin_users FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

CREATE POLICY "admin_users_insert" ON public.admin_users FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "admin_users_update" ON public.admin_users FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'super_admin')
);

-- Teams policies (admins can manage, public can view approved teams)
CREATE POLICY "teams_select_public" ON public.teams FOR SELECT USING (
  status = 'approved' OR EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

CREATE POLICY "teams_admin_all" ON public.teams FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Players policies (similar to teams)
CREATE POLICY "players_select_public" ON public.players FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.teams 
    WHERE teams.id = players.team_id AND teams.status = 'approved'
  ) OR EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

CREATE POLICY "players_admin_all" ON public.players FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Matches policies (public can view, admins can manage)
CREATE POLICY "matches_select_public" ON public.matches FOR SELECT USING (true);

CREATE POLICY "matches_admin_all" ON public.matches FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Announcements policies (public can view published, admins can manage all)
CREATE POLICY "announcements_select_public" ON public.announcements FOR SELECT USING (
  published = true OR EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

CREATE POLICY "announcements_admin_all" ON public.announcements FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Tournament settings policies (public can view, admins can manage)
CREATE POLICY "tournament_settings_select_public" ON public.tournament_settings FOR SELECT USING (true);

CREATE POLICY "tournament_settings_admin_all" ON public.tournament_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

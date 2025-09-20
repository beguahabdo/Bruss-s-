-- Insert default tournament settings
INSERT INTO public.tournament_settings (key, value, description) VALUES
('tournament_name', 'BRUSS Cup 2025', 'Tournament name displayed on the website'),
('tournament_start_date', '2025-03-15T18:00:00Z', 'Tournament start date and time'),
('registration_deadline', '2025-03-10T23:59:59Z', 'Registration deadline'),
('max_teams', '16', 'Maximum number of teams allowed'),
('entry_fee', '0', 'Entry fee amount (0 for free)'),
('stream_url', 'https://twitch.tv/bruss_esports', 'Main stream URL'),
('discord_url', 'https://discord.gg/bruss', 'Discord server invite'),
('rules_version', '1.0', 'Current rules version')
ON CONFLICT (key) DO NOTHING;

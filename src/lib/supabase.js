import { createClient } from '@supabase/supabase-js'

// Prefer reading from Vite env vars (set in `.env.local`)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://gpyovojpkayeqwfkiutr.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdweW92b2pwa2F5ZXF3ZmtpdXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2OTQwNjMsImV4cCI6MjA4MzI3MDA2M30.GWaBWcbMRliHSWuS1cY4b-k9D_oz70PGbCuugo3br1k'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Note: Keep `.env.local` out of version control (added to `.gitignore`).
// Restart Vite after changing `.env.local` so `import.meta.env` picks up values.

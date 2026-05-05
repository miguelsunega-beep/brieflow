import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://qpebnbzdeiffmgppjnzg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwZWJuYnpkZWlmZm1ncHBqbnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5ODU5ODgsImV4cCI6MjA5MzU2MTk4OH0._z5Ha3cKdRqZArdPQbmNQMfRQMbj1hINqzJ52HvT1AM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

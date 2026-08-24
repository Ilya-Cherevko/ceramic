import { createClient } from '@supabase/supabase-js';

// Замените на свои данные
const SUPABASE_URL = 'https://ggestrktvjleraztlawi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZXN0cmt0dmpsZXJhenRsYXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NzkyODIsImV4cCI6MjEwMzE1NTI4Mn0.5GfQH6nckdQpQ84Y4xycyuY0z7NoYr3if_O4ucbhJdw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
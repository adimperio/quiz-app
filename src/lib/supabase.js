import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yfikzurztmhvrumhbsyk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmaWt6dXJ6dG1odnJ1bWhic3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyNTE2MzksImV4cCI6MjEwMzgyNzYzOX0.Joz818CJaOofBMjRT7P2bp5zaeNMzO4K3HSgo2EAHfY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

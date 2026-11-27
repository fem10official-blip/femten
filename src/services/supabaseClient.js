import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lgybhtbmfnwolfbohhpv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxneWJodGJtZm53b2xmYm9oaHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU4MDgwNDUsImV4cCI6MjExMTM4NDA0NX0.s4FcjzL1KcszVFGnXE_dyB5Lq_LmHaq9K8sWWL9IyW8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

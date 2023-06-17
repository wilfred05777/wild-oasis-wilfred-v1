import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nprjwrlyinrzjlobymld.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcmp3cmx5aW5yempsb2J5bWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3MzQxMzAsImV4cCI6MjAwMjMxMDEzMH0._mW4dVhKMLAJ9OgtxQ6LAHaVQvRj7hXkYzQSkCiIk-c'
// const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or anon key. Please check your environment variables.');
}

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// console.log('Supabase client initialized:', {
//   supabase});
// Type definitions for our tables
export type Automation = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  file_url: string;
  created_at: string;
  downloads: number;
};

export type Visit = {
  id: string;
  ip_address: string;
  user_agent: string;
  page_path: string;
  timestamp: string;
};
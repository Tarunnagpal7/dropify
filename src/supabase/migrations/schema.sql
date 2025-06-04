/*
  # Initial Schema Setup for Dropify

  1. New Tables
    - `automations` - Stores metadata about automation files
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text, required)
      - `image_url` (text, required) - URL to preview image in Supabase Storage
      - `file_url` (text, required) - URL to automation file in Supabase Storage
      - `created_at` (timestamp)
    
    - `visits` - Tracks page visits for analytics
      - `id` (uuid, primary key)
      - `ip_address` (text)
      - `user_agent` (text)
      - `page_path` (text)
      - `timestamp` (timestamp)
    
    - `downloads` - Tracks file downloads
      - `id` (uuid, primary key)
      - `automation_id` (uuid, foreign key to automations.id)
      - `timestamp` (timestamp)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authentication
*/

-- Create automations table
CREATE TABLE IF NOT EXISTS automations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  file_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create visits table for analytics
CREATE TABLE IF NOT EXISTS visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text,
  user_agent text,
  page_path text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Create downloads table for tracking downloads
CREATE TABLE IF NOT EXISTS downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id uuid REFERENCES automations(id) ON DELETE CASCADE,
  timestamp timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Policy for public reads on automations
CREATE POLICY "Anyone can read automations"
  ON automations
  FOR SELECT
  TO public
  USING (true);

-- Policy for admins to insert automations (for production, you'd restrict this)
CREATE POLICY "Allow insert for now"
  ON automations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for visits analytics
CREATE POLICY "Allow visit tracking"
  ON visits
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for download tracking
CREATE POLICY "Allow download tracking"
  ON downloads
  FOR INSERT
  TO public
  WITH CHECK (true);
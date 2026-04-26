/*
  # Create contact_submissions table

  Stores form submissions from the "For teams" and "Affiliate Program" modals.

  ## New Tables
  - `contact_submissions`
    - `id` (uuid, primary key)
    - `type` (text) — 'teams' or 'affiliate'
    - `name` (text) — submitter's name
    - `email` (text) — submitter's email
    - `company_name` (text, nullable) — teams only
    - `company_website` (text, nullable) — teams only
    - `estimated_seats` (text, nullable) — teams only
    - `social_or_website` (text, nullable) — affiliate only
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled; unauthenticated users may insert their own rows (public contact form)
  - No SELECT policy for anon — submissions are read-only via service role
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  type             text        NOT NULL CHECK (type IN ('teams', 'affiliate')),
  name             text        NOT NULL DEFAULT '',
  email            text        NOT NULL DEFAULT '',
  company_name     text        NOT NULL DEFAULT '',
  company_website  text        NOT NULL DEFAULT '',
  estimated_seats  text        NOT NULL DEFAULT '',
  social_or_website text       NOT NULL DEFAULT '',
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

/*
  # Fix RLS policy on contact_submissions

  ## Changes
  - Drop the always-true INSERT policy on `contact_submissions`
  - Replace it with a constrained policy that validates submitted data:
    - `type` must be 'teams' or 'affiliate'
    - `name` must be non-empty
    - `email` must be non-empty

  ## Security
  - Eliminates the unrestricted WITH CHECK (true) clause
  - Public (anon + authenticated) inserts are still allowed for legitimate
    contact form submissions; junk rows with missing required fields are rejected
    at the policy level in addition to the existing column CHECK constraints
*/

DROP POLICY IF EXISTS "Anyone can submit a contact form" ON contact_submissions;

CREATE POLICY "Anyone can submit a valid contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    type IN ('teams', 'affiliate')
    AND length(trim(name))  > 0
    AND length(trim(email)) > 0
  );

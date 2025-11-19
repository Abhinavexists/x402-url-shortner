CREATE TABLE IF NOT EXISTS shortened_urls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  clicks INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_short_code ON shortened_urls(short_code);
CREATE INDEX IF NOT EXISTS idx_created_at ON shortened_urls(created_at DESC);

ALTER TABLE shortened_urls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON shortened_urls
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access" ON shortened_urls
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access" ON shortened_urls
  FOR UPDATE
  USING (true);

CREATE OR REPLACE FUNCTION increment_clicks(p_short_code VARCHAR)
RETURNS void AS $$
BEGIN
  UPDATE shortened_urls
  SET clicks = clicks + 1
  WHERE short_code = p_short_code;
END;
$$ LANGUAGE plpgsql;

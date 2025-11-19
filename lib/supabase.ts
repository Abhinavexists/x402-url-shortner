import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      shortened_urls: {
        Row: {
          id: string;
          original_url: string;
          short_code: string;
          created_at: string;
          clicks: number;
        };
        Insert: {
          id?: string;
          original_url: string;
          short_code: string;
          created_at?: string;
          clicks?: number;
        };
        Update: {
          id?: string;
          original_url?: string;
          short_code?: string;
          created_at?: string;
          clicks?: number;
        };
      };
    };
  };
};

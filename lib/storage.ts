import { supabase } from './supabase';
import { ShortenedUrl } from './types';

class URLStorage {
  generateShortCode(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async create(originalUrl: string): Promise<ShortenedUrl | null> {
    let shortCode = this.generateShortCode();
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const { data, error } = await supabase
        .from('shortened_urls')
        .insert({
          original_url: originalUrl,
          short_code: shortCode,
        })
        .select()
        .single();

      if (!error) {
        return {
          id: data.id,
          originalUrl: data.original_url,
          shortCode: data.short_code,
          createdAt: new Date(data.created_at),
          clicks: data.clicks,
        };
      }

      if (error.code === '23505') {
        shortCode = this.generateShortCode();
        attempts++;
      } else {
        console.error('Error creating shortened URL:', error);
        return null;
      }
    }

    return null;
  }

  async get(shortCode: string): Promise<ShortenedUrl | null> {
    const { data, error } = await supabase
      .from('shortened_urls')
      .select('*')
      .eq('short_code', shortCode)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      originalUrl: data.original_url,
      shortCode: data.short_code,
      createdAt: new Date(data.created_at),
      clicks: data.clicks,
    };
  }

  async incrementClicks(shortCode: string): Promise<void> {
    const { error } = await supabase.rpc('increment_clicks', {
      p_short_code: shortCode,
    });

    if (error) {
      const url = await this.get(shortCode);
      if (url) {
        await supabase
          .from('shortened_urls')
          .update({ clicks: url.clicks + 1 })
          .eq('short_code', shortCode);
      }
    }
  }

  async getAll(): Promise<ShortenedUrl[]> {
    const { data, error } = await supabase
      .from('shortened_urls')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.error('Error fetching URLs:', error);
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      originalUrl: item.original_url,
      shortCode: item.short_code,
      createdAt: new Date(item.created_at),
      clicks: item.clicks,
    }));
  }
}

export const urlStorage = new URLStorage();

import { NextResponse } from 'next/server';
import { urlStorage } from '@/lib/storage';

export async function GET() {
  try {
    const urls = await urlStorage.getAll();
    return NextResponse.json({ urls });
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch URLs' },
      { status: 500 }
    );
  }
}

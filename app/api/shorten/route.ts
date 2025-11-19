import { NextRequest, NextResponse } from 'next/server';
import { urlStorage } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const shortenedUrl = await urlStorage.create(url);

    if (!shortenedUrl) {
      return NextResponse.json(
        { error: 'Failed to create shortened URL' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      shortCode: shortenedUrl.shortCode,
      originalUrl: shortenedUrl.originalUrl,
      shortUrl: `${request.nextUrl.origin}/${shortenedUrl.shortCode}`,
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    return NextResponse.json(
      { error: 'Failed to shorten URL' },
      { status: 500 }
    );
  }
}

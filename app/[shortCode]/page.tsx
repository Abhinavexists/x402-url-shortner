import { redirect } from 'next/navigation';
import { urlStorage } from '@/lib/storage';

interface PageProps {
  params: Promise<{
    shortCode: string;
  }>;
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortCode } = await params;

  const urlData = await urlStorage.get(shortCode);

  if (!urlData) {
    redirect('/');
  }

  urlStorage.incrementClicks(shortCode);

  redirect(urlData.originalUrl);
}

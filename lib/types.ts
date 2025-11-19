export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}

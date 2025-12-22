import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import exifr from 'exifr';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isBrowser = () => typeof window !== 'undefined';

export async function readImageLocation(file: File) {
  // Only run on client side to avoid SSR issues
  if (!isBrowser()) {
    return null;
  }

  try {
    const gps = await exifr.gps(file);
    if (!gps || !gps.latitude || !gps.longitude) return null;
    return { lat: gps.latitude, lng: gps.longitude };
  } catch (error) {
    console.error('EXIF read error:', error);
    return null;
  }
}

export function formatTimeAgo(timestamp: any): string {
  const now = new Date();
  const time = new Date(timestamp.seconds * 1000);
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return diffInSeconds <= 1 ? 'just now' : `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes === 1
      ? '1 minute ago'
      : `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
  }

  // For older posts, show the actual date
  return time.toLocaleDateString();
}

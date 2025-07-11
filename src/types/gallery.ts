export interface Artist {
  id: string;
  name: {
    en: string;
    he: string;
  };
  bio: {
    en: string;
    he: string;
  };
  featuredImage: string;
  statement?: {
    en: string;
    he: string;
  };
  artworks: Artwork[];
}

export interface Artwork {
  id: string;
  title: {
    en: string;
    he: string;
  };
  description: {
    en: string;
    he: string;
  };
  imageUrl: string;
  year: number;
  medium: {
    en: string;
    he: string;
  };
  dimensions: string;
  price?: string;
  isAvailable?: boolean;
}

export type Language = 'en' | 'he';

export interface NavigationItem {
  href: string;
  label: {
    en: string;
    he: string;
  };
}
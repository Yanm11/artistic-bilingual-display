import { Language } from '@/types/gallery';

export interface GalleryImage {
  src: string;
}

// List of all gallery image files - update this array when adding new photos to public/gallery/
export const GALLERY_IMAGE_FILES = [
  'IMG_8295.JPG',
  'IMG_8299.JPG',
  'IMG_8300.JPG',
  'IMG_8324.JPG',
  'IMG_8327.JPG',
  'IMG_8333.JPG',
  'IMG_8334.JPG',
  'IMG_8338.JPG',
  'IMG_8343.JPG',
  'IMG_8344.JPG',
  'IMG_8345.JPG',
  'IMG_8346.JPG',
  'IMG_8349.JPG',
  'IMG_8352.JPG',
  'IMG_8359.JPG',
  'IMG_8367.JPG',
];

export const generateGalleryImages = (language: Language): GalleryImage[] => {
  return GALLERY_IMAGE_FILES.map((filename, index) => ({
    src: `/gallery/${filename}`
  }));
}; 
import { Cat } from '../App';

const CATAAS_BASE_URL = 'https://cataas.com';

// Cache to store the actual image blob URLs
const imageCache = new Map<string, string>();

export const generateCats = async (count: number = 15): Promise<Cat[]> => {
  const cats: Cat[] = [];
  
  for (let i = 0; i < count; i++) {
    // Generate a unique ID for this cat
    const id = `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Fetch the actual image data
      const response = await fetch(`${CATAAS_BASE_URL}/cat?width=400&height=400&${Math.random()}`);
      const blob = await response.blob();
      
      // Create a blob URL that we can reuse
      const blobUrl = URL.createObjectURL(blob);
      
      // Cache the blob URL
      imageCache.set(id, blobUrl);
      
      cats.push({
        id,
        url: blobUrl
      });
    } catch (error) {
      console.error('Failed to fetch cat image:', error);
      // Fallback to a direct URL if blob creation fails
      const fallbackUrl = `${CATAAS_BASE_URL}/cat?width=400&height=400&t=${i}`;
      cats.push({
        id,
        url: fallbackUrl
      });
    }
  }
  
  return cats;
};

// Get cached image URL
export const getCachedImageUrl = (id: string): string | undefined => {
  return imageCache.get(id);
};

// Clean up blob URLs when no longer needed
export const cleanupImageCache = () => {
  imageCache.forEach(url => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  });
  imageCache.clear();
};

// Preload images to improve UX
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
};
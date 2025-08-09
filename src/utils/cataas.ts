import { Cat } from '../App';

const CATAAS_BASE_URL = 'https://cataas.com';

export const generateCats = async (count: number = 15): Promise<Cat[]> => {
  const cats: Cat[] = [];

for (let i = 0; i < count; i++) {
    // Generate a unique but consistent ID for each cat
    const uniqueId = Math.floor(Math.random() * 10000);
    const id = `cat_${uniqueId}`;
    // Use the unique ID as a seed to get the same cat image consistently
    const url = `${CATAAS_BASE_URL}/cat?width=400&height=400&t=${ uniqueId }`;
    
    cats.push({
      id,
      url
    });
  }
  
  return cats;
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
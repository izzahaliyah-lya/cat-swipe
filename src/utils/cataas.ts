import { Cat } from '../App';

const CATAAS_BASE_URL = 'https://cataas.com';

// Generate unique IDs for cats
// let catIdCounter = 0;

export const generateCats = async (count: number = 15): Promise<Cat[]> => {
  const cats: Cat[] = [];
  
//   for (let i = 0; i < count; i++) {
//     const id = `cat_${catIdCounter++}_${Date.now()}`;
//     // Add random parameters to get different cats each time
//     const randomParams = [
//       `width=400&height=400&t=${Date.now()}_${i}`,
//       `width=400&height=400&blur=0&t=${Date.now()}_${i}`,
//       `width=400&height=400&brightness=0&t=${Date.now()}_${i}`,
//     ];
    
//     const randomParam = randomParams[Math.floor(Math.random() * randomParams.length)];
//     const url = `${CATAAS_BASE_URL}/cat?${randomParam}`;
    
//     cats.push({
//       id,
//       url
//     });
//   }
  
//   return cats;
// };

for (let i = 0; i < count; i++) {
    // Generate a unique but consistent ID for each cat
    const uniqueId = Math.random().toString(36).substring(2, 15);
    const id = `cat_${uniqueId}`;
    // Use the unique ID as a seed to get the same cat image consistently
    const url = `${CATAAS_BASE_URL}/cat/${uniqueId}?width=400&height=400`;
    
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
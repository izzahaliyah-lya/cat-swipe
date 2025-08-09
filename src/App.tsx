import React, { useState } from 'react';
import CardStack from './components/CardStack';
import Results from './components/Results';
import { Heart, X } from 'lucide-react';

export interface Cat {
  id: string;
  url: string;
  liked?: boolean;
}

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [likedCats, setLikedCats] = useState<Cat[]>([]);

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentCat = cats[currentIndex];
    if (currentCat) {
      const updatedCat = { ...currentCat, liked: direction === 'right' };
      
      if (direction === 'right') {
        setLikedCats(prev => [...prev, updatedCat]);
      }
      
      if (currentIndex + 1 >= cats.length) {
        setShowResults(true);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }
  };

  const resetApp = () => {
    setShowResults(false);
    setCurrentIndex(0);
    setLikedCats([]);
    setCats([]);
  };

  if (showResults) {
    return <Results likedCats={likedCats} onReset={resetApp} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Cat<span className="text-pink-200">Swipe</span>
          </h1>
          <p className="text-pink-100 text-lg">Find your purrfect match!</p>
        </div>

        {/* Card Stack */}
        <CardStack 
          cats={cats}
          setCats={setCats}
          currentIndex={currentIndex}
          onSwipe={handleSwipe}
        />

        {/* Swipe Instructions */}
        <div className="flex justify-center items-center mt-8 space-x-8">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <X className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-medium">Nope</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <span className="text-white font-medium">Like</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(currentIndex / Math.max(cats.length, 1)) * 100}%` }}
            />
          </div>
          <p className="text-center text-pink-100 mt-2 text-sm">
            {currentIndex} of {cats.length} cats
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
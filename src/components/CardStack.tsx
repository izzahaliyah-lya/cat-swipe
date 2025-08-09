import React, { useEffect } from 'react';
import Card from './Card';
import { Cat } from '../App';
import { generateCats } from '../utils/cataas';

interface CardStackProps {
  cats: Cat[];
  setCats: React.Dispatch<React.SetStateAction<Cat[]>>;
  currentIndex: number;
  onSwipe: (direction: 'left' | 'right') => void;
}

const CardStack: React.FC<CardStackProps> = ({ cats, setCats, currentIndex, onSwipe }) => {
  useEffect(() => {
    if (cats.length === 0) {
      generateCats(15).then(setCats);
    }
  }, [cats.length, setCats]);

  if (cats.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="relative h-96 w-full max-w-sm mx-auto">
      {cats.slice(currentIndex, currentIndex + 3).map((cat, index) => (
        <Card
          key={cat.id}
          cat={cat}
          index={index}
          onSwipe={index === 0 ? onSwipe : undefined}
          isTop={index === 0}
        />
      ))}
    </div>
  );
};

export default CardStack;
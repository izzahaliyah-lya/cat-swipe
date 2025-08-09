import React, { useState, useRef } from 'react';
import { Cat } from '../App';
import { useSwipe } from '../hooks/useSwipe';

interface CardProps {
  cat: Cat;
  index: number;
  onSwipe?: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

const Card: React.FC<CardProps> = ({ cat, index, onSwipe, isTop }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { transform, opacity, handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
    onSwipe,
    enabled: isTop
  });

  const zIndex = 10 - index;
  const scale = 1 - (index * 0.05);
  const translateY = index * 8;

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
      style={{
        zIndex,
        transform: `scale(${scale}) translateY(${translateY}px) ${transform}`,
        opacity: isTop ? opacity : 1,
        transition: isTop ? 'none' : 'transform 0.3s ease-out'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full w-full border-4 border-white">
        <div className="relative h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Loading...</div>
            </div>
          )}
          <img
            src={cat.url}
            alt={`Cat ${cat.id}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            draggable={false}
          />
          
          {/* Overlay indicators */}
          {isTop && (
            <>
              <div 
                className="absolute top-8 left-8 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg transform rotate-12 transition-all duration-200"
                style={{ 
                  opacity: Math.max(0, Math.min(1, -transform.split('(')[1]?.split('px')[0] / 50 || 0))
                }}
              >
                NOPE
              </div>
              <div 
                className="absolute top-8 right-8 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg transform -rotate-12 transition-all duration-200"
                style={{ 
                  opacity: Math.max(0, Math.min(1, (transform.split('(')[1]?.split('px')[0] || 0) / 50))
                }}
              >
                LIKE
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
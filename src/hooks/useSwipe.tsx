import { useState, useCallback } from 'react';

interface UseSwipeOptions {
  onSwipe?: (direction: 'left' | 'right') => void;
  enabled?: boolean;
  threshold?: number;
}

interface TouchPoint {
  x: number;
  y: number;
}

export const useSwipe = ({ onSwipe, enabled = true, threshold = 100 }: UseSwipeOptions) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState<TouchPoint>({ x: 0, y: 0 });
  const [currentPoint, setCurrentPoint] = useState<TouchPoint>({ x: 0, y: 0 });

  const getEventPoint = useCallback((event: React.TouchEvent | React.MouseEvent): TouchPoint => {
    if ('touches' in event && event.touches.length > 0) {
      return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    } else if ('clientX' in event) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }
    return { x: 0, y: 0 };
  }, []);

  const handleTouchStart = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    if (!enabled) return;
    
    event.preventDefault();
    const point = getEventPoint(event);
    setStartPoint(point);
    setCurrentPoint(point);
    setIsDragging(true);
  }, [enabled, getEventPoint]);

  const handleTouchMove = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    if (!enabled || !isDragging) return;
    
    event.preventDefault();
    const point = getEventPoint(event);
    setCurrentPoint(point);
  }, [enabled, isDragging, getEventPoint]);

  const handleTouchEnd = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    if (!enabled || !isDragging) return;
    
    event.preventDefault();
    const deltaX = currentPoint.x - startPoint.x;
    const deltaY = Math.abs(currentPoint.y - startPoint.y);
    
    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > deltaY) {
      if (onSwipe) {
        onSwipe(deltaX > 0 ? 'right' : 'left');
      }
    }
    
    setIsDragging(false);
    setStartPoint({ x: 0, y: 0 });
    setCurrentPoint({ x: 0, y: 0 });
  }, [enabled, isDragging, currentPoint, startPoint, threshold, onSwipe]);

  const deltaX = isDragging ? currentPoint.x - startPoint.x : 0;
  const deltaY = isDragging ? currentPoint.y - startPoint.y : 0;
  
  const rotation = deltaX * 0.1; // Subtle rotation based on swipe
  const opacity = Math.max(0.5, 1 - Math.abs(deltaX) / 300);
  
  const transform = isDragging 
    ? `translateX(${deltaX}px) translateY(${deltaY * 0.3}px) rotate(${rotation}deg)`
    : 'translateX(0px) translateY(0px) rotate(0deg)';

  return {
    transform,
    opacity,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isDragging
  };
};
import { useState, useEffect, useRef, useCallback } from 'react';
import ProgressBars from './ProgressBars';
import type { Story } from '../types';

const StoryViewer = ({ stories, initialIndex, onClose }: {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<number>();
  const imageRef = useRef<HTMLImageElement>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev < stories.length - 1 ? prev + 1 : 0));
    setProgress(0);
  }, [stories.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : stories.length - 1));
    setProgress(0);
  }, [stories.length]);


useEffect(() => {
  const timer = setInterval(() => {
    if (loaded && progress < 100) {
      setProgress(p => p + 1);
    } else if (progress >= 100) {
      handleNext();
    }
  }, 50); 

  return () => clearInterval(timer);
}, [loaded, handleNext ,progress]);


useEffect(() => {
  const preloadImages = () => {
    stories.forEach(story => {
      const img = new Image();
      img.src = story.image;
    });
  };
  preloadImages();
}, [stories]);

  const handleImageLoad = () => {
    setLoaded(true);
    if (imageRef.current) {
      imageRef.current.style.opacity = '1';
    }
  };

  return (
    <div className="story-viewer">
      <ProgressBars 
        stories={stories} 
        currentIndex={currentIndex}
        progress={progress}
      />
      
      <img
        ref={imageRef}
        src={stories[currentIndex].image}
        alt={`Story by ${stories[currentIndex].user}`}
        className="story-image"
        onLoad={handleImageLoad}
        style={{ opacity: 0, transition: 'opacity 0.3s' }}
      />

      <div className="navigation-controls">
        <div className="control left" onClick={handlePrev} />
        <div className="control right" onClick={handleNext} />
      </div>

      <button className="close-button" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default StoryViewer;


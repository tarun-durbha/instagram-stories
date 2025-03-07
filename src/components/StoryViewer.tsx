
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
  const [rotate, setRotate] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const prevUserRef = useRef<string | null>(null);
  const currentUser = stories[currentIndex].user;
  const groupStories = stories.filter(story => story.user === currentUser);
  const groupIndex = groupStories.findIndex(s => s.id === stories[currentIndex].id);
  const handleNext = useCallback(() => {
    const nextIndex = currentIndex < stories.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    setProgress(0);
    setLoaded(false);
    setIsMuted(true);
  }, [currentIndex, stories.length]);
  const handlePrev = useCallback(() => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : stories.length - 1;
    setCurrentIndex(prevIndex);
    setProgress(0);
    setLoaded(false);
    setIsMuted(true);
  }, [currentIndex, stories.length]);
  useEffect(() => {
    const currentStoryUser = stories[currentIndex].user;
    if (prevUserRef.current && prevUserRef.current !== currentStoryUser) {
      setRotate(true);
      const timeoutId = setTimeout(() => setRotate(false), 500);
      return () => clearTimeout(timeoutId);
    }
    prevUserRef.current = currentStoryUser;
  }, [currentIndex, stories]);
  useEffect(() => {
    if (stories[currentIndex].mediaType !== 'video') {
      const timer = setInterval(() => {
        if (loaded && progress < 100) {
          setProgress(p => p + 1);
        } else if (progress >= 100) {
          handleNext();
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [loaded, progress, handleNext, currentIndex, stories]);
  useEffect(() => {
    stories.forEach(story => {
      if (story.mediaType === 'image') {
        const img = new Image();
        img.src = story.image;
      }
    });
  }, [stories]);

  const handleMediaLoad = () => {
    setLoaded(true);
    if (mediaRef.current) {
      mediaRef.current.style.opacity = '1';
      if (mediaRef.current.tagName.toLowerCase() === 'video') {
        (mediaRef.current as HTMLVideoElement)
          .play()
          .catch(err => console.error('Video play error:', err));
      }
    }
  };

  const handleProgressBarClick = (index: number) => {
    const targetStory = groupStories[index];
    const overallIndex = stories.findIndex(s => s.id === targetStory.id);
    if (overallIndex !== -1) {
      setCurrentIndex(overallIndex);
      setProgress(0);
      setLoaded(false);
      setIsMuted(true);
    }
  };

  return (
    <div 
      className={`story-viewer ${rotate ? 'cube-effect' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Story viewer"
      data-current-index={currentIndex}
      style={{ backgroundColor: '#000' }}
    >
      <div className="story-viewer-header" role="banner" data-user={currentUser}>
        <img 
          src={stories[currentIndex].avatar} 
          alt={`Profile picture of ${currentUser}`}
          className="story-avatar"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="story-timestamp" aria-label="Time since story posted">
          53 minutes ago
        </div>
      </div>

      <ProgressBars 
        stories={groupStories} 
        currentIndex={groupIndex}
        progress={progress}
        onProgressBarClick={handleProgressBarClick}
      />

      {stories[currentIndex].mediaType === 'video' ? (
        <div className="video-container" style={{ position: 'relative' }}>
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={stories[currentIndex].image}
            className="story-image"
            onLoadedData={handleMediaLoad}
            onTimeUpdate={(e) => {
              const videoElem = e.currentTarget;
              if (videoElem.duration) {
                const computedProgress = (videoElem.currentTime / videoElem.duration) * 100;
                setProgress(computedProgress);
              }
            }}
            onEnded={handleNext}
            autoPlay
            muted={isMuted}
            playsInline
            controls={false}
            preload="auto"
            style={{ opacity: 0, transition: 'opacity 0.3s' }}
            aria-label={`Video story by ${currentUser}`}
          />
          <button 
            className="mute-toggle"
            onClick={(e) => {
              e.stopPropagation();
              if (isMuted) {
                setIsMuted(false);
                if (mediaRef.current && mediaRef.current.tagName.toLowerCase() === 'video') {
                  (mediaRef.current as HTMLVideoElement).muted = false;
                }
              } else {
                handleNext();
              }
            }}
            aria-label={isMuted ? "Unmute video" : "Next story"}
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              zIndex: 2,
              background: 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '70px',
              height: '70px',
              cursor: 'pointer'
            }}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      ) : (
        <img
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          src={stories[currentIndex].image}
          alt={`Story by ${currentUser}`}
          className="story-image"
          onLoad={handleMediaLoad}
          style={{ opacity: 0, transition: 'opacity 0.3s' }}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      )}

      <div className="navigation-controls">
        <div 
          className="control left" 
          onClick={handlePrev}
          role="button"
          aria-label="Previous story"
          tabIndex={0}
        />
        <div 
          className="control right" 
          onClick={handleNext}
          role="button"
          aria-label="Next story"
          tabIndex={0}
        />
      </div>

      <button 
        className="close-button" 
        onClick={onClose}
        aria-label="Close story viewer"
      >
        ×
      </button>
    </div>
  );
};

export default StoryViewer;

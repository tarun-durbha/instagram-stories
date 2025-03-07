import { useState, useEffect } from 'react';
import StoryList from './components/StoryList';
import StoryViewer from './components/StoryViewer';
import type { Story } from './types';
import Header from './components/Header';

const App = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/data/stories.json', { referrerPolicy: 'no-referrer' });
        const data = await response.json();
        console.log('data', data);
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleStoryOpen = (index: number) => {
    setActiveIndex(index);
    setStories((prev) =>
      prev.map((story, i) => (i === index ? { ...story, seen: true } : story))
    );
  };

  if (loading)
    return (
      <div className="loader-container" data-testid="loader">
        <div className="instagram-loader" aria-label="Loading stories"></div>
      </div>
    );

  if (!isMobile) {
    return (
      <div className="desktop-warning" role="alert">
        <p>
          This app is optimized for mobile view only. Please resize your browser
          window or view on a mobile device.
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="app" role="main" data-testid="app">
        <section aria-label="Story list">
          <StoryList stories={stories} onStoryClick={handleStoryOpen} />
        </section>
        {activeIndex !== null && (
          <section aria-label="Story viewer">
            <StoryViewer
              stories={stories}
              initialIndex={activeIndex}
              onClose={() => setActiveIndex(null)}
            />
          </section>
        )}
      </main>
    </>
  );
};

export default App;

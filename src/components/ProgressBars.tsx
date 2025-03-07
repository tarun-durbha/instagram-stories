import { Story } from '../types';

interface ProgressBarsProps {
  stories: Story[];
  currentIndex: number;
  progress: number;
  onProgressBarClick?: (index: number) => void;
}

const ProgressBars: React.FC<ProgressBarsProps> = ({ stories, currentIndex, progress, onProgressBarClick }) => (
  <div className="progress-container" role="list">
    {stories.map((_, i) => (
      <div 
        key={i} 
        className="progress-track"
        role="listitem"
        tabIndex={0}
        aria-label={`Story ${i + 1} progress, ${i === currentIndex ? progress : i < currentIndex ? 100 : 0}% complete`}
        data-story-index={i}
        onClick={() => onProgressBarClick && onProgressBarClick(i)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onProgressBarClick && onProgressBarClick(i);
          }
        }}
      >
        <div 
          className={`progress-bar ${i === currentIndex ? 'active' : ''}`}
          style={{ 
            width: i === currentIndex ? `${progress}%` : i < currentIndex ? '100%' : '0%',
            transition: i === currentIndex ? 'width 50ms linear' : 'none'
          }}
        />
      </div>
    ))}
  </div>
);

export default ProgressBars;

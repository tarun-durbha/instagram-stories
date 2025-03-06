import { Story } from '../types';
const ProgressBars = ({ stories, currentIndex, progress }: {
    stories: Story[];
    currentIndex: number;
    progress: number;
  }) => (
    <div className="progress-container">
      {stories.map((_, i) => (
        <div key={i} className="progress-track">
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
import React from 'react';
import Story from './Story';

interface Story {
  id: number;
  image: string;
  user: string;
}

interface StoryListProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onStoryClick }) => {
  return (
    <ul className="story-list" role="list">
      {stories.map((story, index) => (
        <li key={story.id} className='story-item'>
          <button
            onClick={() => onStoryClick(index)}
            className="story-thumbnail"
            aria-label={`View story by ${story.user}`}
          >
            <Story story={story} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default StoryList;

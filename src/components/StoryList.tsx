import React from 'react';
import Story from './Story';

interface Story {
  id: number;
  image: string;
}

interface StoryListProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onStoryClick }) => {
  return (
    <div className="story-list">
      {stories.map((story, index) => (
        <div
          key={story.id}
          onClick={() => onStoryClick(index)}
          className="story-thumbnail"
        >
          <Story story={story} />
        </div>
      ))}
    </div>
  );
};

export default StoryList;

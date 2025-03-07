
import React from 'react';
import type { Story as StoryType } from '../types';

interface StoryListProps {
  stories: StoryType[];
  onStoryClick: (index: number) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onStoryClick }) => {
  const grouped = stories.reduce((acc: { [user: string]: StoryType[] }, story) => {
    if (!acc[story.user]) {
      acc[story.user] = [];
    }
    acc[story.user].push(story);
    return acc;
  }, {} as { [user: string]: StoryType[] });

  const groupedStories = Object.values(grouped);

  return (
    <div className="story-list">
      {groupedStories.map((userStories) => {
        const overallIndex = stories.findIndex(s => s.user === userStories[0].user);
        const thumbnailSrc = userStories[0].mediaType === 'video'
          ? '/assets/video-placeholder.PNG'
          : userStories[0].image;

        return (
          <div
            key={userStories[0].user}
            className="story-thumbnail"
            onClick={() => onStoryClick(overallIndex)}
            data-user={userStories[0].user}
          >
            <div className="thumbnail-container">
              <img 
                src={thumbnailSrc}
                alt={`Story thumbnail for ${userStories[0].user}`}
                className="story-thumbnail-image"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <img 
                src={userStories[0].avatar}
                alt={`Avatar of ${userStories[0].user}`}
                className="story-avatar-overlay"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="story-username">
              {userStories[0].user}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StoryList;

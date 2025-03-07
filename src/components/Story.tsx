import React from 'react';

interface StoryProps {
  story: {
    id: number;
    image: string;
    user: string;
  };
}

const Story: React.FC<StoryProps> = ({ story }) => {
  return (
    <>
      <img 
        src={story.image} 
        alt={`Story by ${story.user}`} 
        className="story-img"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <div 
        className="story" 
        role="group" 
        aria-labelledby={`story-user-${story.id}`}
      >
        <div id={`story-user-${story.id}`} className="story-username">
          {story.user}
        </div>
      </div>
    </>
  );
};

export default Story;

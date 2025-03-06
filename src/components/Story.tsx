
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
      <img src={story.image} alt={`Story ${story.id}`} className="story-img" />
      <div className='story'>
        <div className="story-username">{story.user}</div>
      </div>
    </>

  );
};

export default Story;

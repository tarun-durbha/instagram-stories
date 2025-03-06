
export interface Story {
    id: number;
    user: string;
    avatar: string;
    image: string;
    seen: boolean;
  }
  
  
  interface StoryListProps {
    stories: Story[];
    onStoryClick: (index: number) => void;
  }
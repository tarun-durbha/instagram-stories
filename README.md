# React + TypeScript + Vite

# Instagram Stories

This project is a simplified version of Instagram Stories built with React and TypeScript. It demonstrates a mobile-first design with a strong focus on accessibility, semantic markup, performance, and security best practices. The project includes end-to-end tests for core functionality and innovative transition effects that enhance the user experience.

## Features

- **Mobile-First Design:**  
  Optimized for mobile devices with a responsive layout and a fallback message for desktop users.
  
- **Story List:**  
  - A horizontally scrollable list of composite story thumbnails.
  - Thumbnails are grouped by user so that if a user has multiple stories, only one thumbnail is shown.
  - Thumbnails display the first story’s image (or a fallback placeholder for videos) with an overlaid avatar and the username displayed below.
  
- **Full-Screen Story Viewer:**  
  - Opens in a modal-like dialog with smooth transitions.
  - Supports both image and video stories.
  - For image stories, a timer auto-advances the story after a set duration.
  - For video stories, progress is driven by the actual video duration (using the video's current time), and the video plays fully.
  - A continuous full rotation transition effect (full 360° rotation) is applied when switching from one user’s stories to another.
  
- **Interactive Progress Bars:**  
  - Visual progress indicators display only for the current user’s stories.
  - Progress bars are clickable (with keyboard support) to jump directly to a specific story in the user's group.
  
- **Video Interaction & Audio Toggle:**  
  - Video stories start muted (to support autoplay) but include an overlay disclaimer that reads “Touch to unmute.”  
  - If the video is muted and the user touches the overlay, it unmutes the video.
  - If the overlay is tapped again while the video is already unmuted, the viewer moves to the next story.
  
- **Lazy Loading & Preloading:**  
  - Images and videos load lazily to improve performance.
  - Preloading of images ensures smooth transitions between stories.
  
- **Accessibility Enhancements:**  
  - Uses semantic HTML elements (e.g., `<main>`, `<section>`, `<header>`, `<button>`) and ARIA roles/labels (e.g., `role="dialog"`, `aria-modal="true"`, `aria-label`) for improved screen reader support.
  - Interactive elements are keyboard-focusable and include data attributes for testing.
  
- **Security Best Practices:**  
  - Serves all content over HTTPS (via hosting platforms like Netlify or Vercel).
  - Implements a referrer policy (`no-referrer`) on image and video elements.
  - Can be extended with secure headers and a robust Content Security Policy (CSP) via a `_headers` file.
  - Dependencies are managed carefully and regularly audited.
  
- **Service Worker Integration (Optional):**  
  A service worker (located in the public folder) caches static assets for offline support and improved performance.
  
- **Testing:**  
  - **End-to-End Tests:** Cypress is used for full app interaction tests and component tests.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd instagram-stories
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Testing

- **End-to-End Tests with Cypress:**  
  Open Cypress in interactive mode:
  ```bash
  npm run cypress:open
  ```
  Or run tests in headless mode:
  ```bash
  npm run cypress:run
  ```

## Deployment

- **Build the Application:**
  ```bash
  npm run build
  ```
- **Deploy:**  
  This project is optimized for static hosting and works well on platforms like Netlify or Vercel.

## Design Choices & Best Practices

- **Semantic Markup & Accessibility:**  
  The code uses semantic HTML (e.g., `<main>`, `<section>`, `<header>`, `<button>`) and ARIA roles/labels to ensure an accessible experience. Interactive elements have proper keyboard focusability and are enhanced with data attributes for testing.
  
- **Performance:**  
  - Lazy loading (`loading="lazy"`) is used for images and videos.
  - Preloading of images and selective caching via a service worker (if enabled) help reduce load times and provide offline support.
  
- **Security:**  
  - Assets are fetched with a `referrerPolicy="no-referrer"` to protect user privacy.
  - The project can easily be extended to include secure HTTP headers and a Content Security Policy (CSP) using Netlify’s `_headers` file.
  - All content is served over HTTPS.
  
- **Scalability:**  
  The project is organized into modular components (StoryList, StoryViewer, ProgressBars, Header) with TypeScript providing static type checking. This structure ensures maintainability and scalability.
  
- **Enhanced User Experience for Videos:**  
  - Video stories play based on their actual duration rather than a fixed timer.
  - A touch overlay allows users to unmute videos—if already unmuted, a subsequent touch advances to the next story.
  - Continuous full rotation transitions (360°) are applied when switching between users, providing a dynamic and engaging transition effect.
  
- **Fallback Thumbnails for Videos:**  
  When a user’s first story is a video, a fallback thumbnail image is used in the story list so that the UI remains consistent.

## Future Improvements

- **Enhanced Offline Capabilities:**  
  Expand the service worker to cache additional assets or API responses.
- **Dynamic Data:**  
  Integrate a backend service for real-time stories and user interactions.
- **Additional Security Headers:**  
  Use platform-specific configurations (like Netlify’s `_headers` file) to enforce strict security policies.
- **Additional User Interactions:**  
  Implement more granular video controls or analytics for story interactions.
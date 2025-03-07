# React + TypeScript + Vite

# Instagram Stories

This project is a simplified version of Instagram Stories built with React and TypeScript. It demonstrates a mobile-first design with a strong focus on accessibility, semantic markup, performance, and security best practices. The project includes unit tests and end-to-end tests for core functionality.

## Features

- **Mobile-First Design:**  
  Optimized for mobile devices with a responsive layout and fallback message for desktop users.
- **Story List:**  
  A horizontally scrollable list of story thumbnails that are accessible via keyboard and screen readers.
- **Full-Screen Story Viewer:**  
  Opens in a modal-like dialog with smooth transitions and both automatic (every 5 seconds) and manual navigation.
- **Interactive Progress Bars:**  
  Visual progress indicators for each story that are clickable (with keyboard support) to jump directly to a story.
- **Lazy Loading & Preloading:**  
  Images load lazily to improve performance while preloading ensures smooth transitions.
- **Accessibility Enhancements:**  
  Semantic HTML elements (such as `<main>`, `<section>`, `<header>`, and `<button>`), ARIA roles and labels, and proper keyboard interactivity ensure that the app is accessible to users of all abilities.
- **Security Best Practices:**  
  - Uses HTTPS (via hosting on platforms like Netlify).  
  - Implements a referrer policy (`no-referrer`) for image requests.  
  - Can be extended with secure headers and a Content Security Policy (CSP) via Netlify’s `_headers` file.
- **Service Worker Integration (Optional):**  
  A service worker (located in the public folder) can be registered to cache static assets for offline support and improved performance.
- **Testing:**  
  - **End-to-End Tests:** Cypress is used for E2E tests, including both component tests and full app interaction tests.

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
  The code uses semantic HTML (e.g., `<main>`, `<section>`, `<header>`, `<button>`) and ARIA roles/labels (e.g., `role="dialog"`, `aria-label`) to ensure an accessible experience. Interactive elements have proper keyboard focusability and support.
  
- **Performance:**  
  - The use of lazy loading (`loading="lazy"`) for images and preloading techniques ensures a smooth user experience.
  - The service worker (if enabled) caches assets to reduce load times and support offline viewing.

- **Security:**  
  - Images are fetched with a `referrerPolicy="no-referrer"` to protect user privacy.
  - The project can be extended to include secure headers and a robust Content Security Policy (CSP) for additional security.
  - Dependencies are managed carefully and regularly audited.

- **Scalability:**  
  The project structure is modular, with separate components for the story list, story viewer, progress bars, and header. This structure, combined with TypeScript’s static type checking, ensures the codebase is maintainable and scalable.

## Future Improvements

- **Enhanced Offline Capabilities:**  
  Expanding the service worker to cache additional assets or API responses.
- **Dynamic Data:**  
  Integrate a backend service for real-time stories and user interactions.
- **Additional Security Headers:**  
  Use platform-specific configurations (like Netlify’s `_headers` file) to enforce strict security policies.

import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="header" role="banner" aria-label="Application Header">
      <div 
        className="header-time" 
        aria-live="polite" 
        data-current-time={currentTime}
      >
        {currentTime}
      </div>
      <div 
        className="header-logo" 
        aria-label="Instagram Logo" 
        data-testid="header-logo"
      >
        Instagram
      </div>
    </header>
  );
};

export default Header;

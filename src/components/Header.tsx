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
    <header className="header">
      <div className="header-time">{currentTime}</div>
      <div className="header-logo">Instagram</div>
    </header>
  );
};

export default Header;

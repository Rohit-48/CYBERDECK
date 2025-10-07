import React, { createContext, useContext, useState } from 'react';

const TutorialContext = createContext();

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within TutorialProvider');
  }
  return context;
};

export const TutorialProvider = ({ children }) => {
  const [tutorialActive, setTutorialActive] = useState(false);

  const startTutorial = () => {
    localStorage.removeItem('cyberdeck-tutorial-completed');
    setTutorialActive(true);
  };

  const resetTutorial = () => {
    localStorage.removeItem('cyberdeck-tutorial-completed');
    window.location.reload();
  };

  const value = {
    tutorialActive,
    startTutorial,
    resetTutorial,
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};


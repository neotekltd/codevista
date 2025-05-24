
import React, { createContext, useContext } from 'react';

const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {

  const appConfig = {
    formspreeEndpoint: "https://formspree.io/f/mkgrvpqn",
    appName: "Neotek LTD E-commerce Solutions",
  };

  return (
    <AppStateContext.Provider value={{ appConfig }}>
      {children}
    </AppStateContext.Provider>
  );
};

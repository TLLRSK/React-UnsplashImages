import { useContext, createContext, useState, useEffect } from "react";

// 1. Create Context
const AppContext = createContext();

// Checking dark mode
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true';

  if (storedDarkMode === null) {
      return prefersDarkMode;
  }

  return storedDarkMode || prefersDarkMode;
};

// 2. Create Provider
export const AppProvider = ({ children }) => {

  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState('cat');

  const toggleDarkTheme = () => {

    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme)

  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme])

  // 3. Return Context Provider
  return <AppContext.Provider value={{isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm}}>{children}</AppContext.Provider>;
};
// 4. Export Context
export const useGlobalContext = () => useContext(AppContext);

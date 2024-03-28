'use client';

import { BsMoonFill, BsSunFill } from 'react-icons/bs';

import { useState } from 'react';

const themes = {
  coffee: 'coffee',
  fantasy: 'fantasy',
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.coffee);

  const toggleTheme = () => {
    const newTheme = theme === themes.coffee ? themes.fantasy : themes.coffee;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-outline">
      {theme === 'coffee' ? (
        <BsSunFill className="h-4 w-4" />
      ) : (
        <BsMoonFill className="h-4 w-4 " />
      )}
    </button>
  );
};
export default ThemeToggle;

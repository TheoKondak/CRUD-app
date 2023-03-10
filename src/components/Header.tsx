import { useState } from 'react';

import { VscColorMode } from 'react-icons/vsc';
import toggleDarkMode from '../helper/toggleDarkMode';
import Logo from './Logo';

interface Header {
  logo: Logo;
  darkThemeByDefault: boolean;
}

const Header: React.FC<Header> = ({ logo, darkThemeByDefault }) => {
  const [isDark, setIsDark] = useState(darkThemeByDefault);

  const darkModeStatus = () => {
    toggleDarkMode();
    setIsDark(!isDark);
  };

  const { src, alt, width, height } = logo;
  return (
    <header id="header" className="p-2 rounded-none backdrop-blur-md shadow-lg flex justify-between h-10 w-full">
      <Logo src={isDark ? src[1] : src[0]} alt={alt} width={width} height={height} />
      <button onClick={darkModeStatus} aria-label="Toggle between Light and Dark mode" className="toggle-dark-mode flex items-center justify-center p-1.5 bg-primary-700 dark:bg-primary-200 rounded-2xl">
        <VscColorMode className="block w-4 h-4 text-primary-200 dark:text-primary-700" />
      </button>
    </header>
  );
};

export default Header;

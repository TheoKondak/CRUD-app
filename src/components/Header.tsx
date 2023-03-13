import { useState } from 'react';

import { VscColorMode } from 'react-icons/vsc';
import toggleDarkMode from '../helper/toggleDarkMode';
import Logo from './Logo';

interface Header {
  logo: Logo;
  isDarkTheme: boolean | null;
  setIsDarkTheme: Function;
}

const Header: React.FC<Header> = ({ logo, isDarkTheme, setIsDarkTheme }) => {
  // const [isDark, setIsDark] = useState(isDarkTheme);

  const darkModeStatus = () => {
    toggleDarkMode();
    setIsDarkTheme(!isDarkTheme);
  };

  const { src, alt, width, height } = logo;
  return (
    <header id="header" className="p-2 rounded-none backdrop-blur-md shadow-lg flex justify-between h-10 md:h-14 w-full">
      <Logo src={isDarkTheme ? src[1] : src[0]} alt={alt} width={width} height={height} className="" />
      <button onClick={darkModeStatus} aria-label="Toggle between Light and Dark mode" className="toggle-dark-mode flex items-center justify-center p-1.5 bg-slate-700 dark:bg-slate-100 rounded-2xl">
        <VscColorMode className="block w-4 h-4 text-primary-200 dark:text-slate-700" />
      </button>
    </header>
  );
};

export default Header;

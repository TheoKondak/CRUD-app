import React from 'react';

import { VscGithub } from 'react-icons/vsc';

const Footer: React.FC<Footer> = ({ settings }) => {
  const { copyrightInfo, githubLink, githubLinkOpensInNewTab } = settings;

  return (
    <footer className="w-full flex flex-col items-center justify-center gap-4 p-2 md:p-4 h-30 shadow-lg bg-primary-800 dark:bg-secondary-700">
      <div className="copyright-info text-xxs text-white dark:text-white">{copyrightInfo}</div>
      <div>
        {githubLink.length > 0 && (
          <a href={githubLink} target={githubLinkOpensInNewTab && '_blank'} className="text-white dark:text-white hover:text-companyColor" title="Visit the assignment on GitHub">
            <VscGithub />
          </a>
        )}
      </div>
    </footer>
  );
};

export default Footer;

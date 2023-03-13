import { VscBug } from 'react-icons/vsc';

const Logo: React.FC<Logo> = ({ src, alt, width, height }) => {
  return (
    <div className="logo-container pl-2">
      {src.length > 0 ? (
        <img src={src} alt={alt} width={width} height={height} className="xl:h-14 xl:w-full" />
      ) : (
        <span className="text-primary-800 dark:text-primary-200">
          <VscBug className="w-6 h-6 " />
        </span>
      )}
    </div>
  );
};

export default Logo;

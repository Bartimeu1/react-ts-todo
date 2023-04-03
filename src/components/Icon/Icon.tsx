import React from 'react';

interface IIcon {
  src: string;
  alt: string;
  className?: string;
}

const Icon: React.FC<IIcon> = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};

export default Icon;

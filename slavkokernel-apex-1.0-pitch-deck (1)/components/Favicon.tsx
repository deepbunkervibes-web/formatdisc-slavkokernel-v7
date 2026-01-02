import React, { useState } from 'react';
import { Link } from 'lucide-react';

interface FaviconProps {
  url: string;
  alt: string;
  className?: string;
  iconSize?: number;
}

export const Favicon: React.FC<FaviconProps> = ({ url, alt, className = 'w-4 h-4 object-contain', iconSize = 14 }) => {
  const [faviconError, setFaviconError] = useState(false);

  let hostname = '';
  try {
    hostname = new URL(url).hostname;
  } catch (e) {
    if (!faviconError) setFaviconError(true);
  }

  // Use higher resolution (sz=64) from Google's service
  const faviconSrc = hostname ? `https://www.google.com/s2/favicons?domain=${hostname}&sz=64` : '';

  if (faviconError || !faviconSrc) {
    return (
      <Link size={iconSize} className="text-zinc-500 group-hover:text-terminal-green transition-all shrink-0" />
    );
  }

  return (
    <img
      src={faviconSrc}
      alt={`Favicon for ${alt}`}
      className={`${className} transition-opacity duration-300`}
      onError={() => setFaviconError(true)}
      loading="lazy"
    />
  );
};
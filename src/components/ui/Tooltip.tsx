import * as React from 'react';import { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}>
      
            {children}
            {isVisible &&
      <div className={`absolute ${positionClasses[side]} z-50 px-2 py-1 text-xs font-medium text-white bg-black rounded shadow-lg whitespace-nowrap border border-white/10`}>
                    {content}
                    <div className={`absolute w-2 h-2 bg-black transform rotate-45 border border-l-0 border-t-0 border-white/10 ${side === 'top' ? 'bottom-[-5px] left-1/2 -translate-x-1/2 border-b border-r' :
        side === 'bottom' ? 'top-[-5px] left-1/2 -translate-x-1/2 border-t border-l' :
        side === 'left' ? 'right-[-5px] top-1/2 -translate-y-1/2 border-b border-r' :
        'left-[-5px] top-1/2 -translate-y-1/2 border-b border-l'}`
        }></div>
                </div>
      }
        </div>);

}
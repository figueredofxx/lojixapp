
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileTabContentProps {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}

const MobileTabContent: React.FC<MobileTabContentProps> = ({ 
  children, 
  isActive, 
  className 
}) => {
  return (
    <div 
      className={cn(
        "transition-opacity duration-200 ease-in-out",
        isActive ? "opacity-100" : "opacity-0 hidden",
        "pt-14 pb-20 px-4 md:pt-0 md:pb-0 md:px-0", // Fixed padding for mobile header/nav
        "h-[calc(100vh-3.5rem-5rem)] md:h-auto", // Fixed height: viewport - header - bottom nav
        "overflow-y-auto", // Allow internal scrolling when needed
        className
      )}
    >
      <div className="h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default MobileTabContent;

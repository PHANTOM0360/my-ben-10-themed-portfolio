import React, { useState, useEffect } from 'react';

// Define proper type for props
interface LoadingScreenProps {
  onLoadComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [colorScheme, setColorScheme] = useState(0);
  
  // Define color schemes for Ben (green), Gwen (purple/pink), and Kevin (greyish-white)
  const colorSchemes = [
    { 
      mainClass: 'bg-green-500 border-green-500 text-green-500', 
      shadow: 'rgba(20, 219, 0, 0.7)', 
      message: "Initializing Omnitrix interface...", 
      number: '', 
      scanLineColor: 'rgba(20, 219, 0, 0.9)',
      barColor: '#10B981' // Tailwind green-500 equivalent
    },
    { 
      mainClass: 'bg-pink-500 border-pink-500 text-pink-500', 
      shadow: 'rgba(219, 20, 180, 0.7)', 
      message: "Loading magic spells database...", 
      number: '', 
      scanLineColor: 'rgba(219, 20, 180, 0.9)',
      barColor: '#EC4899' // Tailwind pink-500 equivalent
    },
    { 
      mainClass: 'bg-gray-300 border-gray-300 text-gray-300', 
      shadow: 'rgba(0, 0, 0, 0.7)', 
      message: "Initializing Osmosian metal form...", 
      number: '11', 
      scanLineColor: 'rgba(255, 255, 255, 0.9)',
      barColor: '#FFFFFF' // Pure white for Kevin
    }
  ];
  
  useEffect(() => {
    // Track when the page has fully loaded
    const handleLoad = () => {
      // Start animating the progress bar to 100%
      const startTime = Date.now();
      const duration = 6000; // 6 seconds minimum for the animation to show all themes
      
      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(100, (elapsed / duration) * 100);
        setProgress(newProgress);
        
        // Change color scheme every ~2 seconds (33% of the loading time)
        setColorScheme(Math.floor((newProgress / 33) % 3));
        
        if (newProgress < 100) {
          requestAnimationFrame(animateProgress);
        } else {
          // When progress reaches 100%, wait a moment then hide the loader
          setTimeout(() => {
            setIsLoading(false);
            if (onLoadComplete) onLoadComplete();
          }, 300);
        }
      };
      
      requestAnimationFrame(animateProgress);
    };
    
    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [onLoadComplete]);
  
  
  if (!isLoading) return null;
  
  const currentScheme = colorSchemes[colorScheme];
  const [borderClass, bgClass, textClass] = currentScheme.mainClass.split(' ');
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Omnitrix/Alien Device Symbol */}
      <div className="mb-8">
        <div className={`w-24 h-24 rounded-full border-4 ${borderClass} flex items-center justify-center transition-colors duration-500`}>
          <div className={`w-16 h-16 ${bgClass} rounded-full pulse-glow flex items-center justify-center text-white font-bold text-2xl transition-colors duration-500`} 
               style={{
                 boxShadow: `0 0 15px 5px ${currentScheme.shadow}`
               }}>
            {currentScheme.number}
          </div>
        </div>
      </div>
      
      {/* Loading Bar Container */}
      <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden relative mb-4">
        {/* Animated Progress Bar */}
        <div 
          className={`h-full rounded-full loading-bar-glow transition-colors duration-500`}
          style={{ 
            width: `${progress}%`,
            backgroundColor: currentScheme.barColor,
            boxShadow: `0 0 10px 2px ${currentScheme.shadow}`
          }}
        ></div>
        
        {/* Scanning Line Effect - Now uses the theme-specific color */}
        <div 
          className="scan-line"
          style={{ background: currentScheme.scanLineColor }}
        ></div>
      </div>
      
      {/* Loading Text */}
      <div className={`${textClass} font-mono text-lg glitch-loading-text transition-colors duration-500`}
           style={{
             textShadow: `1px 0 0 ${currentScheme.shadow}, -1px 0 0 ${currentScheme.shadow}`
           }}>
        Loading... {Math.round(progress)}%
      </div>
      
      {/* Loading Message - changes based on character */}
      <div className={`${textClass} font-mono text-sm mt-2 max-w-xs text-center flicker-text transition-colors duration-500`}>
        {currentScheme.message}
      </div>

    </div>
  );
};

export default LoadingScreen;
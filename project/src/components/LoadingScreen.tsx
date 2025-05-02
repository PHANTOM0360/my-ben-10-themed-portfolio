import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [colorScheme, setColorScheme] = useState(0);
  
  const colorSchemes = [
    { 
      mainClass: 'bg-green-500 border-green-500 text-green-500', 
      shadow: 'rgba(20, 219, 0, 0.7)', 
      message: "Initializing Omnitrix interface...", 
      number: '', 
      scanLineColor: 'rgba(20, 219, 0, 0.9)',
      barColor: '#10B981'
    },
    { 
      mainClass: 'bg-pink-500 border-pink-500 text-pink-500', 
      shadow: 'rgba(219, 20, 180, 0.7)', 
      message: "Loading magic spells database...", 
      number: '', 
      scanLineColor: 'rgba(219, 20, 180, 0.9)',
      barColor: '#EC4899'
    },
    { 
      mainClass: 'bg-gray-300 border-gray-300 text-gray-300', 
      shadow: 'rgba(0, 0, 0, 0.7)', 
      message: "Initializing Osmosian metal form...", 
      number: '11', 
      scanLineColor: 'rgba(255, 255, 255, 0.9)',
      barColor: '#FFFFFF'
    }
  ];
  
  useEffect(() => {
    const handleLoad = () => {
      const startTime = Date.now();
      const duration = 6000;
      
      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(100, (elapsed / duration) * 100);
        setProgress(newProgress);
        
        setColorScheme(Math.floor((newProgress / 33) % 3));
        
        if (newProgress < 100) {
          requestAnimationFrame(animateProgress);
        } else {
          setTimeout(() => {
            setIsLoading(false);
            if (onLoadComplete) onLoadComplete();
          }, 300);
        }
      };
      
      requestAnimationFrame(animateProgress);
    };
    
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
      
      <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden relative mb-4">
        <div 
          className={`h-full rounded-full loading-bar-glow transition-colors duration-500`}
          style={{ 
            width: `${progress}%`,
            backgroundColor: currentScheme.barColor,
            boxShadow: `0 0 10px 2px ${currentScheme.shadow}`
          }}
        ></div>
        
        <div 
          className="scan-line"
          style={{ background: currentScheme.scanLineColor }}
        ></div>
      </div>
      
      <div className={`${textClass} font-mono text-lg glitch-loading-text transition-colors duration-500`}
           style={{
             textShadow: `1px 0 0 ${currentScheme.shadow}, -1px 0 0 ${currentScheme.shadow}`
           }}>
        Loading... {Math.round(progress)}%
      </div>
      
      <div className={`${textClass} font-mono text-sm mt-2 max-w-xs text-center flicker-text transition-colors duration-500`}>
        {currentScheme.message}
      </div>

    </div>
  );
};

export default LoadingScreen;
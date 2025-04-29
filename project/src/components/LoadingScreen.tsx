import React, { useState, useEffect } from 'react';

// Define prop types for the LoadingScreen component
interface LoadingScreenProps {
  onLoadComplete?: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Track when the page has fully loaded
    const handleLoad = () => {
      // Start animating the progress bar to 100%
      const startTime = Date.now();
      const duration = 2000; // 2 seconds minimum for the animation
      
      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(100, (elapsed / duration) * 100);
        setProgress(newProgress);
        
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
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Omnitrix Logo/Symbol */}
      <div className="mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center">
          <div className="w-16 h-16 bg-green-500 rounded-full pulse-glow"></div>
        </div>
      </div>
      
      {/* Loading Bar Container */}
      <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden relative mb-4">
        {/* Animated Progress Bar */}
        <div 
          className="h-full bg-green-500 rounded-full loading-bar-glow"
          style={{ width: `${progress}%` }}
        ></div>
        
        {/* Scanning Line Effect */}
        <div className="scan-line"></div>
      </div>
      
      {/* Loading Text */}
      <div className="text-green-500 font-mono text-lg glitch-loading-text">
        Loading... {Math.round(progress)}%
      </div>
      
      {/* Optional Loading Message */}
      <div className="text-green-400 font-mono text-sm mt-2 max-w-xs text-center flicker-text">
        Initializing interface...
      </div>

      {/* Regular CSS using style tag instead of styled-jsx to avoid text-stroke issues */}
      <style>{`
        .pulse-glow {
          box-shadow: 0 0 15px 5px rgba(20, 219, 0, 0.7);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 15px 5px rgba(20, 219, 0, 0.7); }
          50% { box-shadow: 0 0 25px 10px rgba(20, 219, 0, 0.9); }
          100% { box-shadow: 0 0 15px 5px rgba(20, 219, 0, 0.7); }
        }
        
        .loading-bar-glow {
          box-shadow: 0 0 10px 2px rgba(20, 219, 0, 0.7);
          transition: width 0.2s ease-out;
        }
        
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 5px;
          background: rgba(255, 255, 255, 0.7);
          animation: scan 2s linear infinite;
        }
        
        @keyframes scan {
          0% { left: 0; }
          100% { left: 100%; }
        }
        
        .glitch-loading-text {
          position: relative;
          animation: glitch 1s linear infinite alternate;
          /* Using text-shadow instead of text-stroke for better compatibility */
          text-shadow: 0 0 2px rgba(20, 219, 0, 0.7);
        }
        
        @keyframes glitch {
          0% { text-shadow: 1px 0 0 rgba(255, 0, 0, 0.5), -1px 0 0 rgba(0, 255, 0, 0.5); }
          25% { text-shadow: 1px 0 0 rgba(255, 0, 0, 0.5), -1px 0 0 rgba(0, 255, 0, 0.5); }
          26% { text-shadow: none; }
          50% { text-shadow: 1px 0 0 rgba(255, 0, 0, 0.5), -1px 0 0 rgba(0, 255, 0, 0.5); }
          75% { text-shadow: 1px 0 0 rgba(255, 0, 0, 0.5), -1px 0 0 rgba(0, 255, 0, 0.5); }
          76% { text-shadow: none; }
          100% { text-shadow: 1px 0 0 rgba(255, 0, 0, 0.5), -1px 0 0 rgba(0, 255, 0, 0.5); }
        }
        
        .flicker-text {
          animation: flicker 3s linear infinite;
        }
        
        @keyframes flicker {
          0% { opacity: 1; }
          5% { opacity: 0.8; }
          10% { opacity: 1; }
          15% { opacity: 0.3; }
          20% { opacity: 1; }
          70% { opacity: 1; }
          80% { opacity: 0.6; }
          90% { opacity: 1; }
          92% { opacity: 0.1; }
          93% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
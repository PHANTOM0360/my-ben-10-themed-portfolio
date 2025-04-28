import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeSwitcherProps {
  onThemeChange: (theme: 'ben' | 'gwen') => void;
  currentTheme: 'ben' | 'gwen';
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange, currentTheme }) => {
  const [isGwenActive, setIsGwenActive] = useState(currentTheme === 'gwen');
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionTheme, setTransitionTheme] = useState<'ben' | 'gwen'>(currentTheme);
  
  // Update internal state when prop changes
  useEffect(() => {
    setIsGwenActive(currentTheme === 'gwen');
  }, [currentTheme]);
  
  // Sound effects
  const playGwenActivation = () => {
    const sound = new Audio('/sounds/gwen-activation.wav');
    sound.volume = 0.5;
    sound.play().catch(err => console.log('Audio play failed:', err));
  };
  
  const playBenActivation = () => {
    const sound = new Audio('/sounds/open sound.mp3');
    sound.volume = 0.5;
    sound.play().catch(err => console.log('Audio play failed:', err));
  };

  const handleThemeToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (isGwenActive) {
      // Transitioning from Gwen to Ben
      setTransitionTheme('ben');
      playBenActivation();
      setIsGwenActive(false);
      onThemeChange('ben');
    } else {
      // Transitioning from Ben to Gwen
      setTransitionTheme('gwen');
      playGwenActivation();
      setIsGwenActive(true);
      onThemeChange('gwen');
    }
    
    // Allow animations to complete before enabling toggle again
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <div className="fixed top-4 right-4 z-20">
      {/* Transition Flash Effect */}
      <div 
        className={`gwen-activation-ripple ${isAnimating ? 'active' : ''}`}
        style={{
          background: transitionTheme === 'ben' 
            ? 'radial-gradient(circle, #00FF00 0%, rgba(0, 255, 0, 0) 70%)' 
            : 'radial-gradient(circle, var(--gwen-pink) 0%, rgba(255, 69, 160, 0) 70%)'
        }}
      />
      
      <motion.button
        className={`theme-switcher-btn p-2 rounded-full flex items-center justify-center 
                  ${isGwenActive ? 'bg-pink-500 shadow-gwen-glow' : 'bg-green-500 omnitrix-glow'}`}
        onClick={handleThemeToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={isAnimating}
      >
        <AnimatePresence mode="wait">
          {isGwenActive ? (
            <motion.div
              key="gwen"
              className="flex items-center gap-2 px-3 py-1 text-white font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-6 h-6 bg-pink-300 rounded-full"></div>
              <span>GWEN</span>
            </motion.div>
          ) : (
            <motion.div
              key="ben"
              className="flex items-center gap-2 px-3 py-1 text-white font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 bg-green-300 rounded-full"></div>
                <div className="absolute inset-1 bg-green-500 rounded-full"></div>
                <div className="absolute inset-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-200"></div>
                </div>
              </div>
              <span>BEN</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;
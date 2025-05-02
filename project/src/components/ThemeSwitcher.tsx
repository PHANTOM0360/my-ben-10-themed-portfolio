import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ThemeSwitcherProps {
  onThemeChange: (theme: 'ben' | 'gwen' | 'kevin') => void;
  currentTheme: 'ben' | 'gwen' | 'kevin';
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange, currentTheme }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionTheme, setTransitionTheme] = useState<'ben' | 'gwen' | 'kevin'>(currentTheme);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const playThemeActivation = (theme: 'ben' | 'gwen' | 'kevin') => {
    let soundPath;
    
    switch(theme) {
      case 'ben':
        soundPath = '/sounds/ben-activation.mp3';
        break;
      case 'gwen':
        soundPath = '/sounds/gwen-activation.mp3';
        break;
      case 'kevin':
        soundPath = '/sounds/kevin-activation.wav';
        break;
      default:
        return;
    }
    
    const sound = new Audio(soundPath);
    sound.volume = 0.5;
    sound.play().catch(err => console.log('Audio play failed:', err));
  };

  const cycleTheme = () => {
    if (isAnimating) return;
    
    let nextTheme: 'ben' | 'gwen' | 'kevin';
    
    switch(currentTheme) {
      case 'ben':
        nextTheme = 'gwen';
        break;
      case 'gwen':
        nextTheme = 'kevin';
        break;
      case 'kevin':
        nextTheme = 'ben';
        break;
      default:
        nextTheme = 'ben';
    }
    
    setIsAnimating(true);
    setTransitionTheme(nextTheme);
    playThemeActivation(nextTheme);
    onThemeChange(nextTheme);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  const getButtonStyle = (theme: 'ben' | 'gwen' | 'kevin') => {
    switch(theme) {
      case 'ben':
        return 'bg-green-500 omnitrix-glow';
      case 'gwen':
        return 'bg-pink-500 shadow-gwen-glow';
      case 'kevin':
        return 'bg-gray-700 shadow-kevin-glow';
      default:
        return '';
    }
  };

  const getCurrentThemeIcon = () => {
    switch(currentTheme) {
      case 'ben':
        return (
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 bg-green-300 rounded-full"></div>
            <div className="absolute inset-1 bg-green-500 rounded-full"></div>
            <div className="absolute inset-2 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-200"></div>
            </div>
          </div>
        );
      case 'gwen':
        return <div className="bg-pink-300 rounded-full w-6 h-6"></div>;
      case 'kevin':
        return (
          <div className="relative w-6 h-6 rounded-full" 
               style={{ 
                 background: 'linear-gradient(135deg, #333333, #666666)',
                 boxShadow: 'inset 0 0 3px rgba(0,0,0,0.7)'
               }}>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold" 
                 style={{ fontSize: '10px' }}>
              <span className="kevin-11-text">11</span>
            </div>
            <div className="absolute inset-0 rounded-full border border-gray-500 opacity-60"></div>
          </div>
        );
    }
  };

  const kevinGlowStyle = `
    .shadow-kevin-glow {
      box-shadow: 0 0 10px 3px rgba(200, 200, 220, 0.7);
      background: rgba(210, 210, 225, 0.3);
    }
  `;

  return (
    <div className="fixed top-4 right-4 z-20">
      <style>{kevinGlowStyle}</style>
      <div 
        className={`theme-activation-ripple ${isAnimating ? 'active' : ''}`}
        style={{
          background: transitionTheme === 'ben' 
            ? 'radial-gradient(circle, #00FF00 0%, rgba(0, 255, 0, 0) 70%)' 
            : transitionTheme === 'gwen'
              ? 'radial-gradient(circle, var(--gwen-pink) 0%, rgba(255, 69, 160, 0) 70%)'
              : 'radial-gradient(circle, #777777 0%, rgba(119, 119, 119, 0) 70%)'
        }}
      />
      
      <motion.button
        className={`theme-switcher-btn rounded-full flex items-center justify-center p-2 ${getButtonStyle(currentTheme)}`}
        onClick={cycleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={isAnimating}
      >
        <motion.div
          className="flex items-center gap-2 px-3 py-1 text-white font-bold"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {getCurrentThemeIcon()}
          <span>
            {currentTheme.toUpperCase()}
          </span>
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;
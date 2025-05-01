import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeSwitcherProps {
  onThemeChange: (theme: 'ben' | 'gwen' | 'kevin') => void;
  currentTheme: 'ben' | 'gwen' | 'kevin';
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange, currentTheme }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionTheme, setTransitionTheme] = useState<'ben' | 'gwen' | 'kevin'>(currentTheme);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard breakpoint for mobile
    };
    
    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Sound effects
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
        soundPath = '/sounds/kevin-activation.wav'; // Using the Kevin activation sound from your Kevin11EnergyDial
        break;
      default:
        return;
    }
    
    const sound = new Audio(soundPath);
    sound.volume = 0.5;
    sound.play().catch(err => console.log('Audio play failed:', err));
  };

  const handleThemeChange = (theme: 'ben' | 'gwen' | 'kevin') => {
    if (isAnimating || theme === currentTheme) return;
    
    setIsAnimating(true);
    setTransitionTheme(theme);
    playThemeActivation(theme);
    onThemeChange(theme);
    
    // Allow animations to complete before enabling toggle again
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  // Helper function to determine button style based on theme
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

  return (
    <div className="fixed top-4 right-4 z-20">
      {/* Transition Flash Effect */}
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
      
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
        {/* Ben Button */}
        <motion.button
          className={`theme-switcher-btn rounded-full flex items-center justify-center 
                    ${currentTheme === 'ben' ? getButtonStyle('ben') : 'bg-gray-600'}
                    ${isMobile ? 'w-10 h-10' : 'p-2'}`}
          onClick={() => handleThemeChange('ben')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isAnimating}
        >
          <motion.div
            className={`flex items-center gap-2 ${isMobile ? '' : 'px-3 py-1'} text-white font-bold`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`relative ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`}>
              <div className="absolute inset-0 bg-green-300 rounded-full"></div>
              <div className="absolute inset-1 bg-green-500 rounded-full"></div>
              <div className="absolute inset-2 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-200"></div>
              </div>
            </div>
            {!isMobile && <span>BEN</span>}
          </motion.div>
        </motion.button>
        
        {/* Gwen Button */}
        <motion.button
          className={`theme-switcher-btn rounded-full flex items-center justify-center 
                    ${currentTheme === 'gwen' ? getButtonStyle('gwen') : 'bg-gray-600'}
                    ${isMobile ? 'w-10 h-10' : 'p-2'}`}
          onClick={() => handleThemeChange('gwen')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isAnimating}
        >
          <motion.div
            className={`flex items-center gap-2 ${isMobile ? '' : 'px-3 py-1'} text-white font-bold`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`bg-pink-300 rounded-full ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`}></div>
            {!isMobile && <span>GWEN</span>}
          </motion.div>
        </motion.button>
        
        {/* Kevin Button with the Kevin 11 Logo */}
        <motion.button
          className={`theme-switcher-btn rounded-full flex items-center justify-center 
                    ${currentTheme === 'kevin' ? getButtonStyle('kevin') : 'bg-gray-600'}
                    ${isMobile ? 'w-10 h-10' : 'p-2'}`}
          onClick={() => handleThemeChange('kevin')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isAnimating}
        >
          <motion.div
            className={`flex items-center gap-2 ${isMobile ? '' : 'px-3 py-1'} text-white font-bold`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Kevin 11 Logo */}
            <div className={`relative ${isMobile ? 'w-4 h-4' : 'w-6 h-6'} rounded-full`} 
                 style={{ 
                   background: 'linear-gradient(135deg, #333333, #666666)',
                   boxShadow: 'inset 0 0 3px rgba(0,0,0,0.7)'
                 }}>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold" 
                   style={{ 
                     fontSize: isMobile ? '8px' : '10px',
                   }}>
                <span className="kevin-11-text">11</span>
              </div>
              <div className="absolute inset-0 rounded-full border border-gray-500 opacity-60"></div>
            </div>
            {!isMobile && <span>KEVIN</span>}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
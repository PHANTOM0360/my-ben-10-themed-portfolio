import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeSwitcherProps {
  onThemeChange: (theme: 'ben' | 'gwen' | 'kevin') => void;
  currentTheme: 'ben' | 'gwen' | 'kevin';
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange, currentTheme }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionTheme, setTransitionTheme] = useState<'ben' | 'gwen' | 'kevin'>(currentTheme);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
        soundPath = '/sounds/kevin-activation.wav';
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
    setIsMenuOpen(false);
    
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

  // Get current theme icon
  const getCurrentThemeIcon = () => {
    switch(currentTheme) {
      case 'ben':
        return (
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 bg-green-300 rounded-full"></div>
            <div className="absolute inset-1 bg-green-500 rounded-full"></div>
            <div className="absolute inset-2 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-200"></div>
            </div>
          </div>
        );
      case 'gwen':
        return <div className="bg-pink-300 rounded-full w-5 h-5"></div>;
      case 'kevin':
        return (
          <div className="relative w-5 h-5 rounded-full" 
               style={{ 
                 background: 'linear-gradient(135deg, #333333, #666666)',
                 boxShadow: 'inset 0 0 3px rgba(0,0,0,0.7)'
               }}>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold" 
                 style={{ fontSize: '8px' }}>
              <span className="kevin-11-text">11</span>
            </div>
            <div className="absolute inset-0 rounded-full border border-gray-500 opacity-60"></div>
          </div>
        );
    }
  };

  // Add CSS for Kevin's glow effect directly in the component
  const kevinGlowStyle = `
    .shadow-kevin-glow {
      box-shadow: 0 0 10px 3px rgba(200, 200, 220, 0.7);
      background: rgba(210, 210, 225, 0.3);
    }
  `;

  return (
    <div className="fixed top-4 right-4 z-20" ref={menuRef}>
      <style>{kevinGlowStyle}</style>
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
      
      {isMobile ? (
        <div className="relative">
          {/* Mobile Circular Menu Button */}
          <motion.button
            className={`rounded-full flex items-center justify-center w-12 h-12 
                      ${getButtonStyle(currentTheme)}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isAnimating}
          >
            {getCurrentThemeIcon()}
          </motion.button>
          
          {/* Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="absolute top-14 right-0 bg-gray-800 rounded-lg shadow-lg overflow-hidden w-36"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Ben Option */}
                <motion.button
                  className={`w-full py-3 px-4 flex items-center gap-3 ${currentTheme === 'ben' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                  onClick={() => handleThemeChange('ben')}
                  whileTap={{ scale: 0.95 }}
                  disabled={isAnimating}
                >
                  <div className="relative w-5 h-5">
                    <div className="absolute inset-0 bg-green-300 rounded-full"></div>
                    <div className="absolute inset-1 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-2 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-200"></div>
                    </div>
                  </div>
                  <span className="text-white font-bold">BEN</span>
                </motion.button>
                
                {/* Gwen Option */}
                <motion.button
                  className={`w-full py-3 px-4 flex items-center gap-3 ${currentTheme === 'gwen' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                  onClick={() => handleThemeChange('gwen')}
                  whileTap={{ scale: 0.95 }}
                  disabled={isAnimating}
                >
                  <div className="bg-pink-300 rounded-full w-5 h-5"></div>
                  <span className="text-white font-bold">GWEN</span>
                </motion.button>
                
                {/* Kevin Option */}
                <motion.button
                  className={`w-full py-3 px-4 flex items-center gap-3 ${currentTheme === 'kevin' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                  onClick={() => handleThemeChange('kevin')}
                  whileTap={{ scale: 0.95 }}
                  disabled={isAnimating}
                >
                  <div className={`relative w-5 h-5 rounded-full ${currentTheme === 'kevin' ? 'shadow-kevin-glow' : ''}`}
                       style={{ 
                         background: 'linear-gradient(135deg, #333333, #666666)',
                         boxShadow: 'inset 0 0 3px rgba(0,0,0,0.7)'
                       }}>
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold" 
                         style={{ fontSize: '8px' }}>
                      <span className="kevin-11-text">11</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border border-gray-500 opacity-60"></div>
                  </div>
                  <span className="text-white font-bold">KEVIN</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Desktop view stays the same
        <div className="flex flex-row gap-2">
          {/* Ben Button */}
          <motion.button
            className={`theme-switcher-btn rounded-full flex items-center justify-center p-2
                      ${currentTheme === 'ben' ? getButtonStyle('ben') : 'bg-gray-600'}`}
            onClick={() => handleThemeChange('ben')}
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
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 bg-green-300 rounded-full"></div>
                <div className="absolute inset-1 bg-green-500 rounded-full"></div>
                <div className="absolute inset-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-200"></div>
                </div>
              </div>
              <span>BEN</span>
            </motion.div>
          </motion.button>
          
          {/* Gwen Button */}
          <motion.button
            className={`theme-switcher-btn rounded-full flex items-center justify-center p-2
                      ${currentTheme === 'gwen' ? getButtonStyle('gwen') : 'bg-gray-600'}`}
            onClick={() => handleThemeChange('gwen')}
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
              <div className="bg-pink-300 rounded-full w-6 h-6"></div>
              <span>GWEN</span>
            </motion.div>
          </motion.button>
          
          {/* Kevin Button */}
          <motion.button
            className={`theme-switcher-btn rounded-full flex items-center justify-center p-2
                      ${currentTheme === 'kevin' ? getButtonStyle('kevin') : 'bg-gray-600'}`}
            onClick={() => handleThemeChange('kevin')}
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
                                <div className="relative w-6 h-6">
                    {currentTheme === 'kevin' && (
                      <div className="absolute -inset-1 rounded-full shadow-kevin-glow opacity-70 z-0"></div>
                    )}
                    <div className="absolute inset-0 rounded-full z-10"
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
                  </div>
              <span>KEVIN</span>
            </motion.div>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
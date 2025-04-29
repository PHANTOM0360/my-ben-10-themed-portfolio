import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OmnitrixDial from './components/OmnitrixDial';
import ThemeSwitcher from './components/ThemeSwitcher';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import GwenEnergyOrb from './components/GwenEnergyOrb';
import LoadingScreen from './components/LoadingScreen';
import type { SectionType } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<SectionType | null>(null);
  const [isOmnitrixActive, setIsOmnitrixActive] = useState(false);
  const [isGwenActive, setIsGwenActive] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'ben' | 'gwen'>('ben');
  const [isRippleActive, setIsRippleActive] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Explicitly typed callback function for the loading screen
  const handleLoadComplete = (): void => {
    setIsPageLoaded(true);
  };

  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section);
  };

  const handleOmnitrixActivation = (active: boolean) => {
    setIsOmnitrixActive(active);
  };

  const handleGwenActivation = (active: boolean) => {
    setIsGwenActive(active);
  };

  const handleThemeChange = (theme: 'ben' | 'gwen') => {
    // Activate the ripple effect for transition
    setIsRippleActive(true);
    
    // Short delay to allow ripple to start
    setTimeout(() => {
      setCurrentTheme(theme);
      
      // When switching to Gwen theme, deactivate Omnitrix
      if (theme === 'gwen') {
        setIsOmnitrixActive(false);
      } else {
        setIsGwenActive(false);
      }
      
      // Reset active section
      setActiveSection(null);
    }, 300);

    // Remove the ripple after transition completes
    setTimeout(() => {
      setIsRippleActive(false);
    }, 1800);
  };

  const renderSection = () => {
    if ((!isOmnitrixActive && !isGwenActive) || !activeSection) return null;

    const isGwenTheme = currentTheme === 'gwen' && isGwenActive;
    const cardClass = isGwenTheme ? 'gwen-card' : '';
    const textClass = isGwenTheme ? 'gwen-text' : '';

    switch (activeSection) {
      case 'about':
        return <AboutSection gwenTheme={isGwenTheme} cardClass={cardClass} textClass={textClass} />;
      case 'projects':
        return <ProjectsSection gwenTheme={isGwenTheme} cardClass={cardClass} textClass={textClass} />;
      case 'skills':
        return <SkillsSection gwenTheme={isGwenTheme} cardClass={cardClass} textClass={textClass} />;
      case 'contact':
        return <ContactSection gwenTheme={isGwenTheme} cardClass={cardClass} textClass={textClass} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onLoadComplete={handleLoadComplete} />
      
      {/* Main App - Only rendered when loading is complete */}
      {isPageLoaded && (
        <div className={`min-h-screen w-full ${currentTheme === 'gwen' ? 'gwen-theme' : ''} flex flex-col items-center relative overflow-hidden`}>
          {/* Theme transition ripple effect */}
          <div className={`${currentTheme === 'gwen' ? 'gwen-activation-ripple' : 'ben-activation-ripple'} ${isRippleActive ? 'active' : ''}`}></div>
          
          {/* Background Effects */}
          {currentTheme === 'ben' ? (
            <div className="ben-background">
              <div className={`ben-energy ${isOmnitrixActive ? 'active' : ''}`}></div>
              <div className="ben-tech-grid"></div>
              <div className="ben-hologram"></div>
              <div className="ben-tech-circuit"></div>
              <div className="ben-tech-pulse"></div>
              {/* Dynamically generate particles */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className="ben-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${5 + Math.random() * 10}s`
                  }}
                ></div>
              ))}
              {/* Hexagonal grid cells */}
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={`hex-${i}`}
                  className="ben-hexagon"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                ></div>
              ))}
              {/* Tech lines */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={`line-${i}`}
                  className="ben-tech-line"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${100 + Math.random() * 200}px`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animationDelay: `${Math.random() * 3}s`,
                    opacity: 0.5 + Math.random() * 0.5
                  }}
                ></div>
              ))}
            </div>
          ) : (
            <div className="gwen-background">
              <div className={`gwen-energy ${isGwenActive ? 'active' : ''}`}></div>
              <div className="gwen-mana-swirl"></div>
              <div className="gwen-mana-swirl"></div>
              <div className="gwen-mana-swirl"></div>
              <div className="gwen-mana-swirl"></div>
              {/* Dynamically generate particles */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className="gwen-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${5 + Math.random() * 10}s`
                  }}
                ></div>
              ))}
            </div>
          )}
          
          {/* Theme Switcher */}
          <ThemeSwitcher onThemeChange={handleThemeChange} currentTheme={currentTheme} />
          
          {/* Header with conditional image based on theme */}
          <header className="w-full py-6 px-4 text-center relative z-10">
            <div className="max-w-[600px] mx-auto">
              {currentTheme === 'ben' ? (
                <img 
                  src="/images/ARKAPRAVA-CHOWDHURY-4-24-2025.png" 
                  alt="Arkaprava Chowdhury - Ben Theme" 
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(20, 219, 0, 0.7))' }}
                />
              ) : (
                <img 
                  src="/images/gwen chowdhury.png" 
                  alt="Arkaprava Chowdhury - Gwen Theme" 
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 69, 160, 0.7))' }}
                />
              )}
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 w-full flex flex-col items-center justify-start pt-8 pb-20 px-4 relative z-10">
            <div className="mb-12">
              {currentTheme === 'ben' ? (
                <OmnitrixDial 
                  onSectionChange={handleSectionChange}
                  activeSection={activeSection}
                  onActivation={handleOmnitrixActivation}
                  className={isOmnitrixActive ? "omnitrix-glow" : ""}
                />
              ) : (
                <GwenEnergyOrb
                  onSectionChange={handleSectionChange}
                  activeSection={activeSection}
                  onActivation={handleGwenActivation}
                  isActive={isGwenActive}
                  className=""
                />
              )}
            </div>
            
            {/* Content section */}
            <motion.div
              key={`${activeSection}-${currentTheme}`}
              className="w-full flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {renderSection()}
            </motion.div>
          </main>
          
          {/* Footer */}
          <footer className="w-full py-4 text-center text-gray-400 text-sm relative z-10">
            <p 
              className={currentTheme === 'ben' ? "ben-futuristic-text" : ""}
              data-text={`© ${new Date().getFullYear()} - Arkaprava Chowdhury`}
            >
              © {new Date().getFullYear()} - Arkaprava Chowdhury
            </p>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Kevin11EnergyDial from './components/Kevin11EnergyDial';
import OmnitrixDial from './components/OmnitrixDial';
import ThemeSwitcher from './components/ThemeSwitcher';
import GwenEnergyOrb from './components/GwenEnergyOrb';
import LoadingScreen from './components/LoadingScreen';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import type { SectionType } from './types';

function App() {

  const [activeSection, setActiveSection] = useState<SectionType | null>(null);
  const [isOmnitrixActive, setIsOmnitrixActive] = useState(false);
  const [isGwenActive, setIsGwenActive] = useState(false);
  const [isKevinActive, setIsKevinActive] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'ben' | 'gwen' | 'kevin'>('ben');
  const [isRippleActive, setIsRippleActive] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const handleLoadComplete = (): void => {
    setIsPageLoaded(true);
  };

  const handleSectionChange = (section: SectionType | null) => {
    setActiveSection(section);
  };

  const handleOmnitrixActivation = (active: boolean) => {
    setIsOmnitrixActive(active);
  };

  const handleGwenActivation = (active: boolean) => {
    setIsGwenActive(active);
  };

  const handleKevinActivation = (active: boolean) => {
    setIsKevinActive(active);
  };

  const handleThemeChange = (theme: 'ben' | 'gwen' | 'kevin') => {
    setIsRippleActive(true);
    
    setTimeout(() => {
      setCurrentTheme(theme);
      
      if (theme === 'ben') {
        setIsGwenActive(false);
        setIsKevinActive(false);
      } else if (theme === 'gwen') {
        setIsOmnitrixActive(false);
        setIsKevinActive(false);
      } else if (theme === 'kevin') {
        setIsOmnitrixActive(false);
        setIsGwenActive(false);
      }
      
      setActiveSection(null);
    }, 300);

    setTimeout(() => {
      setIsRippleActive(false);
    }, 1800);
  };

  const renderSection = () => {
    if ((!isOmnitrixActive && !isGwenActive && !isKevinActive) || !activeSection) return null;

    const isGwenTheme = currentTheme === 'gwen' && isGwenActive;
    const isKevinTheme = currentTheme === 'kevin' && isKevinActive;
    
    let cardClass = '';
    let textClass = '';
    
    if (isGwenTheme) {
      cardClass = 'gwen-card';
      textClass = 'gwen-text';
    } else if (isKevinTheme) {
      cardClass = 'kevin-card';
      textClass = 'kevin-text';
    }

    switch (activeSection) {
      case 'about':
        return (
          <AboutSection 
            gwenTheme={isGwenTheme} 
            kevinTheme={isKevinTheme} 
            cardClass={cardClass} 
            textClass={textClass} 
          />
        );
      case 'projects':
        return (
          <ProjectsSection 
            gwenTheme={isGwenTheme} 
            kevinTheme={isKevinTheme} 
            cardClass={cardClass} 
            textClass={textClass} 
          />
        );
      case 'skills':
        return (
          <SkillsSection 
            gwenTheme={isGwenTheme} 
            kevinTheme={isKevinTheme} 
            cardClass={cardClass} 
            textClass={textClass} 
          />
        );
      case 'contact':
        return (
          <ContactSection 
            gwenTheme={isGwenTheme} 
            kevinTheme={isKevinTheme} 
            cardClass={cardClass} 
            textClass={textClass} 
          />
        );
      default:
        return null;
    }
  };

  const getThemeBackgroundClass = () => {
    switch (currentTheme) {
      case 'ben':
        return 'ben-theme';
      case 'gwen':
        return 'gwen-theme';
      case 'kevin':
        return 'kevin-theme';
      default:
        return '';
    }
  };

  return (
    <>
      <LoadingScreen onLoadComplete={handleLoadComplete} />
      
      {isPageLoaded && (
        <div className={`min-h-screen w-full ${getThemeBackgroundClass()} flex flex-col items-center relative overflow-hidden`}>
          <div 
            className={`
              ${currentTheme === 'ben' ? 'ben-activation-ripple' : ''}
              ${currentTheme === 'gwen' ? 'gwen-activation-ripple' : ''}
              ${currentTheme === 'kevin' ? 'kevin-activation-ripple' : ''}
              ${isRippleActive ? 'active' : ''}
            `}
          ></div>
          
          {currentTheme === 'ben' && (
            <div className="ben-background">
              <div className={`ben-energy ${isOmnitrixActive ? 'active' : ''}`}></div>
              <div className="ben-tech-grid"></div>
              <div className="ben-hologram"></div>
              <div className="ben-tech-circuit"></div>
              <div className="ben-tech-pulse"></div>
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
          )}
          
          {currentTheme === 'gwen' && (
            <div className="gwen-background">
              <div className={`gwen-energy ${isGwenActive ? 'active' : ''}`}></div>
              <div className="gwen-mana-swirl"></div>
              <div className="gwen-mana-swirl"></div>
              <div className="gwen-mana-swirl"></div>
              <div className="gwen-mana-swirl"></div>
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
          
          {currentTheme === 'kevin' && (
            <div className="kevin-background">
              <div className={`kevin-energy ${isKevinActive ? 'active' : ''}`}></div>
              <div className="kevin-electricity"></div>
              <div className="kevin-electricity"></div>
              <div className="kevin-electricity"></div>
              
              <div className="kevin-texture-overlay"></div>
              
              <div 
                className={`kevin-background-diamond ${
                  isKevinActive && activeSection === 'about' ? 'active' : ''
                }`}
              ></div>
              <div 
                className={`kevin-background-brass ${
                  isKevinActive && activeSection === 'skills' ? 'active' : ''
                }`}
              ></div>
              <div 
                className={`kevin-background-rock1 ${
                  isKevinActive && activeSection === 'projects' ? 'active' : ''
                }`}
              ></div>
              <div 
                className={`kevin-background-rock2 ${
                  isKevinActive && activeSection === 'contact' ? 'active' : ''
                }`}
              ></div>
              
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i}
                  className="kevin-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${5 + Math.random() * 10}s`
                  }}
                ></div>
              ))}
              
              {Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={`crack-${i}`}
                  className="kevin-crack"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${50 + Math.random() * 150}px`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                ></div>
              ))}
              
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={`metal-particle-${i}`}
                  className="kevin-metal-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                ></div>
              ))}
              
              <div className={`kevin-energy-glow ${isKevinActive ? 'active' : ''}`}></div>
            </div>
          )}
          
          <ThemeSwitcher onThemeChange={handleThemeChange} currentTheme={currentTheme} />
          
          <header className="w-full py-6 px-4 text-center relative z-10">
            <div className="max-w-[600px] mx-auto">
              {currentTheme === 'ben' && (
                <img 
                  src="/images/ARKAPRAVA-CHOWDHURY-4-24-2025.png" 
                  alt="Arkaprava Chowdhury - Ben Theme" 
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(20, 219, 0, 0.7))' }}
                />
              )}
              
              {currentTheme === 'gwen' && (
                <img 
                  src="/images/gwen chowdhury.png" 
                  alt="Arkaprava Chowdhury - Gwen Theme" 
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 69, 160, 0.7))' }}
                />
              )}
              
              {currentTheme === 'kevin' && (
                <img 
                  src="/images/kevin chowdhury.png" 
                  alt="Arkaprava Chowdhury - Kevin Theme" 
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(120, 120, 120, 0.8))' }}
                />
              )}
            </div>
          </header>
          
          <main className="flex-1 w-full flex flex-col items-center justify-start pt-8 pb-20 px-4 relative z-10">
            <div className="mb-12">
              {currentTheme === 'ben' && (
                <OmnitrixDial 
                  onSectionChange={handleSectionChange}
                  activeSection={activeSection}
                  onActivation={handleOmnitrixActivation}
                  className={isOmnitrixActive ? "omnitrix-glow" : ""}
                />
              )}
              
              {currentTheme === 'gwen' && (
                <GwenEnergyOrb
                  onSectionChange={handleSectionChange}
                  activeSection={activeSection}
                  onActivation={handleGwenActivation}
                  isActive={isGwenActive}
                  className=""
                />
              )}
              
              {currentTheme === 'kevin' && (
                <Kevin11EnergyDial
                  onSectionChange={handleSectionChange}
                  activeSection={activeSection}
                  onActivation={handleKevinActivation}
                  isActive={isKevinActive}
                  className={isKevinActive ? "kevin-glow" : ""}
                />
              )}
            </div>
            
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
          </main>
          
          <footer className="w-full py-4 text-center relative z-10">
            <p 
              className={`text-sm ${
                currentTheme === 'ben' ? 'text-green-300' : 
                currentTheme === 'gwen' ? 'text-pink-300' : 
                'text-gray-400'
              }`}
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
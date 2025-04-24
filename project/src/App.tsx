import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OmnitrixDial from './components/OmnitrixDial';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import type { SectionType } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<SectionType | null>(null);
  const [isOmnitrixActive, setIsOmnitrixActive] = useState(false);

  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section);
  };

  const handleOmnitrixActivation = (active: boolean) => {
    setIsOmnitrixActive(active);
  };

  const renderSection = () => {
    if (!isOmnitrixActive || !activeSection) return null;

    switch (activeSection) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-omnitrix-green-900 via-black to-omnitrix-green-900 flex flex-col items-center relative overflow-hidden">
      {/* Glitch Background Effects */}
      <div className="glitch-container">
        <div className="glitch-bg"></div>
        <div className="glitch-line"></div>
        <div className="glitch-line"></div>
        <div className="glitch-line"></div>
        <div className="glitch-line"></div>
        <div className="glitch-scanline"></div>
        <div className="glitch-flicker"></div>
      </div>
      
      {/* Header */}
      <header className="w-full py-6 px-4 text-center relative z-10">
        <div className="max-w-[600px] mx-auto">
          <img 
            src="/src/images/ARKAPRAVA-CHOWDHURY-4-24-2025.png" 
            alt="Arkaprava Chowdhury" 
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 0 10px rgba(20, 219, 0, 0.7))' }}
          />
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 w-full flex flex-col items-center justify-start pt-8 pb-20 px-4 relative z-10">
        <div className="mb-12">
          <OmnitrixDial 
            onSectionChange={handleSectionChange}
            activeSection={activeSection}
            onActivation={handleOmnitrixActivation}
            className={isOmnitrixActive ? "omnitrix-glow" : ""}
          />
        </div>
        
        {/* Content section */}
        <motion.div
          key={activeSection}
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
        <p className="glitch-text" data-text={`© ${new Date().getFullYear()} - Arkaprava Chowdhury`}>
          © {new Date().getFullYear()} - Arkaprava Chowdhury
        </p>
      </footer>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { sectionIcons } from '../data/sectionIcons';
import type { SectionType } from '../types';

const ACTIVATION_SOUND_URL = '/sounds/gwen-activation.wav';
const ROTATION_SOUND_URL = '/sounds/gwen-rotate.wav';
const SELECTION_SOUND_URL = '/sounds/gwen-select.wav';

interface GwenEnergyOrbProps {
  onSectionChange: (section: SectionType) => void;
  activeSection: SectionType | null;
  onActivation: (active: boolean) => void;
  isActive: boolean;
  className?: string;
}

const GwenEnergyOrb: React.FC<GwenEnergyOrbProps> = ({
  onSectionChange,
  activeSection,
  onActivation,
  isActive,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionType | null>(null);
  const [isSlammed, setIsSlammed] = useState(false);
  
  const playActivation = () => {
    const sound = new Audio(ACTIVATION_SOUND_URL);
    sound.volume = 0.5;
    sound.play();
  };
  
  const playRotation = () => {
    const sound = new Audio(ROTATION_SOUND_URL);
    sound.volume = 0.4;
    sound.play();
  };
  
  const playSelection = () => {
    const sound = new Audio(SELECTION_SOUND_URL);
    sound.volume = 0.5;
    sound.play();
  };

  useEffect(() => {
    if (activeSection) {
      const index = sectionIcons.findIndex(icon => icon.id === activeSection);
      if (index !== -1) {
        setCurrentIndex(index);
        setSelectedSection(activeSection);
      }
    }
  }, [activeSection]);

  const handleActivation = () => {
    playActivation();
    
    if (isSlammed) {
      setIsSlammed(false);
      onActivation(false);
      onSectionChange(null as any);
      setSelectedSection(null);
      return;
    }
    
    const newState = !isActive;
    
    if (!newState) {
      onActivation(false);
      onSectionChange(null as any);
      setSelectedSection(null);
    } else {
      onActivation(true);
    }
  };

  const handleRotate = (direction: 'left' | 'right') => {
    if (isRotating || !isActive || isSlammed) return;
    
    setIsRotating(true);
    playRotation();
    
    let newIndex = currentIndex;
    if (direction === 'left') {
      newIndex = (currentIndex - 1 + sectionIcons.length) % sectionIcons.length;
    } else {
      newIndex = (currentIndex + 1) % sectionIcons.length;
    }
    
    setCurrentIndex(newIndex);
    
    if (isSlammed) {
      const newSection = sectionIcons[newIndex].id;
      onSectionChange(newSection);
      setSelectedSection(newSection);
    }
    
    setTimeout(() => {
      setIsRotating(false);
    }, 600);
  };
  
  const handleSectionSelect = () => {
    if (!isActive || isSlammed) return;
    
    playSelection();
    const currentSection = sectionIcons[currentIndex].id;
    
    setSelectedSection(currentSection);
    onSectionChange(currentSection);
    
    setIsSlammed(true);
    
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 300);
  };
  
  return (
    <div className={`relative w-80 h-80 ${className}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className={`w-56 h-56 rounded-full flex items-center justify-center cursor-pointer 
                    ${isActive 
                      ? 'bg-pink-500 shadow-gwen-glow' 
                      : 'bg-pink-800'}`}
          onClick={handleActivation}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: isActive 
              ? ['0 0 15px #FF45A0', '0 0 35px #FF45A0', '0 0 15px #FF45A0'] 
              : '0 0 10px #FF45A0',
            y: isActive ? 0 : -20
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse"
            },
            y: {
              duration: 0.4,
              type: "spring"
            }
          }}
        >
          {isActive ? (
            <div className="relative w-48 h-48 flex items-center justify-center rounded-full overflow-hidden">
              <motion.div 
                className="relative z-10 w-40 h-40 rounded-full bg-pink-600 flex items-center justify-center overflow-hidden"
                animate={{
                  boxShadow: ['0 0 10px rgba(255,69,160,0.7) inset', '0 0 20px rgba(255,69,160,0.9) inset', '0 0 10px rgba(255,69,160,0.7) inset']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={sectionIcons[currentIndex].name} 
                    alt={sectionIcons[currentIndex].id} 
                    className="section-icon w-20 h-20 z-20"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-pink-600 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-pink-400 opacity-80"></div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      {isActive && !isSlammed && (
        <>
          <motion.div className="absolute bottom-[-3rem] md:bottom-auto md:left-[-4rem] md:top-1/2 left-1/4 transform md:-translate-y-1/2 -translate-x-1/2 w-12 h-12">
            <motion.button
              className="w-full h-full rounded-full bg-pink-600 flex items-center justify-center shadow-gwen-glow"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={() => handleRotate('left')}
              disabled={isRotating}
              style={{ opacity: isRotating ? 0.5 : 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="text-white" size={24} />
            </motion.button>
          </motion.div>
          
          <motion.div className="absolute bottom-[-3rem] md:bottom-auto md:right-[-4rem] md:top-1/2 right-1/4 transform md:-translate-y-1/2 translate-x-1/2 w-12 h-12">
            <motion.button
              className="w-full h-full rounded-full bg-pink-600 flex items-center justify-center shadow-gwen-glow"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={() => handleRotate('right')}
              disabled={isRotating}
              style={{ opacity: isRotating ? 0.5 : 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="text-white" size={24} />
            </motion.button>
          </motion.div>
        </>
      )}
      
      {isActive && !isSlammed && (
        <div className="absolute bottom-[-7rem] md:bottom-[-4rem] left-0 right-0 flex justify-center">
          <motion.button
            className="bg-pink-500 text-white px-8 py-3 rounded-full shadow-gwen-glow hover:bg-pink-400 transition-colors font-bold text-lg w-32"
            onClick={handleSectionSelect}
            whileTap={{ scale: 0.95 }}
          >
            Magic!
          </motion.button>
        </div>
      )}
      
      {isSlammed && (
        <div className="absolute bottom-[-2rem] left-0 right-0 z-20">
          <p className="text-pink-400 font-bold text-lg text-center">
            Click orb to close
          </p>
        </div>
      )}
      
      {!isActive && (
        <div className="absolute bottom-[-4rem] left-0 right-0 flex justify-center">
          <p className="text-pink-500 font-bold text-lg animate-pulse">
            Press the orb to use!
          </p>
        </div>
      )}
    </div>
  );
};

export default GwenEnergyOrb;
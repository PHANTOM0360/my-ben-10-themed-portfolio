import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SectionType } from '../types';
import { sectionIcons } from '../data/sectionIcons';

const SOUNDS = {
  ACTIVATION: '/sounds/kevin-activation.mp3',
  ROTATION: '/sounds/kevin-activation.mp3',
  SELECTION: '/sounds/kevin-deactivate.mp3',
  DEACTIVATION: '/sounds/kevin-deactivate.mp3'
} as const;

type SoundType = keyof typeof SOUNDS;

const TEXTURES = {
  'about': 'diamond',
  'skills': 'brass',
  'projects': 'rock1',
  'contact': 'red-rock'
} as const;

type TextureType = typeof TEXTURES[keyof typeof TEXTURES];


const COLORS = {
  'diamond': {
    base: '#CFFAFE',
    highlight: '#E0FFFF',
    shadow: '#A0C4CF',
    iconColor: '#204652',
    textColor: '#0F3C4B'
  },
  'brass': {
    base: '#B8860B',
    highlight: '#FFD700',
    shadow: '#8B7500',
    iconColor: '#FFE866',
    textColor: '#FFFFFF'
  },
  'rock1': {
    base: '#6E6E6E',
    highlight: '#A9A9A9',
    shadow: '#3A3A3A',
    iconColor: '#DFDFDF',
    textColor: '#FFFFFF'
  },
  'red-rock': {
    base: '#8B2323',
    highlight: '#CD5C5C',
    shadow: '#4B0000',
    iconColor: '#FFD1D1',
    textColor: '#FFFFFF'
  }
} as const;

interface Kevin11EnergyDialProps {
  onSectionChange: (section: SectionType) => void;
  activeSection: SectionType | null;
  onActivation: (active: boolean) => void;
  isActive: boolean;
  className?: string;
}


interface IconStyle {
  filter: string;
  color?: string;
}

interface TextColorStyle {
  color: string;
  textShadow?: string;
}

const Kevin11EnergyDial: React.FC<Kevin11EnergyDialProps> = ({
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
  const [cracksVisible, setCracksVisible] = useState(false);
  const [energyPulse, setEnergyPulse] = useState(false);
  const [transformActive, setTransformActive] = useState(false);
  const [isSpreadingTexture, setIsSpreadingTexture] = useState(false);
  const [spreadProgress, setSpreadProgress] = useState(0);
  const transformTimeout = useRef<NodeJS.Timeout | null>(null);
  const spreadAnimationRef = useRef<NodeJS.Timeout | null>(null);
  
  const playSound = (soundType: SoundType) => {
    try {
      const sound = new Audio(SOUNDS[soundType]);
      sound.volume = 0.5;
      sound.play();
    } catch (err) {
      console.log('Audio play failed:', err);
    }
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

 
  useEffect(() => {
    return () => {
      if (transformTimeout.current) clearTimeout(transformTimeout.current);
      if (spreadAnimationRef.current) clearTimeout(spreadAnimationRef.current);
    };
  }, []);


  useEffect(() => {
    if (isActive) {
      setCracksVisible(true);
      document.body.classList.add('kevin-activated');
      setTransformActive(true);
      
      transformTimeout.current = setTimeout(() => {
        setTransformActive(false);
      }, 2000);
      
      setTimeout(() => {
        setEnergyPulse(true);
        setTimeout(() => setEnergyPulse(false), 800);
      }, 100);
    } else {
      setIsSpreadingTexture(false);
      setSpreadProgress(0);
      if (spreadAnimationRef.current) {
        clearTimeout(spreadAnimationRef.current);
        spreadAnimationRef.current = null;
      }
      
      setCracksVisible(false);
      setTransformActive(false);
      document.body.classList.remove('kevin-activated');
    }
  }, [isActive]);


  useEffect(() => {
    if (isActive && isSlammed) {
      const currentTexture = getCurrentTexture();
      
      
      document.body.classList.remove(
        'kevin-texture-diamond',
        'kevin-texture-brass',
        'kevin-texture-rock1',
        'kevin-texture-red-rock'
      );
      
      
      document.body.classList.add(`kevin-texture-${currentTexture}`);
      
      document.querySelectorAll('.kevin-background-diamond, .kevin-background-brass, .kevin-background-rock1, .kevin-background-red-rock')
        .forEach(bg => {
          bg.classList.toggle('active', bg.classList.contains(`kevin-background-${currentTexture}`));
        });
      
      setTransformActive(true);
      
      if (transformTimeout.current) clearTimeout(transformTimeout.current);
      transformTimeout.current = setTimeout(() => setTransformActive(false), 2000);
    } else if (!isActive) {
    
      document.body.classList.remove(
        'kevin-texture-diamond',
        'kevin-texture-brass',
        'kevin-texture-rock1',
        'kevin-texture-red-rock'
      );
      
      document.querySelectorAll('.kevin-background-diamond, .kevin-background-brass, .kevin-background-rock1, .kevin-background-red-rock')
        .forEach(bg => bg.classList.remove('active'));
    }
  }, [isActive, isSlammed, currentIndex]);

 
  useEffect(() => {
    if (isSpreadingTexture) {
      const runSpreadAnimation = () => {
        setSpreadProgress(prev => {
          const newProgress = prev + 2;
          
          if (newProgress >= 100) {
            setIsSpreadingTexture(false);
            return 100;
          }
          
          spreadAnimationRef.current = setTimeout(runSpreadAnimation, 30);
          return newProgress;
        });
      };
      
      spreadAnimationRef.current = setTimeout(runSpreadAnimation, 30);
    }
    
    return () => {
      if (spreadAnimationRef.current) clearTimeout(spreadAnimationRef.current);
    };
  }, [isSpreadingTexture]);

  const handleActivation = () => {
    playSound('ACTIVATION');
    
    if (isSlammed) {
      setIsSlammed(false);
      onActivation(false);
      onSectionChange(null as unknown as SectionType);
      setSelectedSection(null);
      playSound('DEACTIVATION');
      return;
    }
    
    const newState = !isActive;
    
    if (!newState) {
      onActivation(false);
      onSectionChange(null as unknown as SectionType);
      setSelectedSection(null);
    } else {
      setEnergyPulse(true);
      setTimeout(() => setEnergyPulse(false), 1000);
      onActivation(true);
    }
  };

  const handleRotate = (direction: 'left' | 'right') => {
    if (isRotating || !isActive || isSlammed) return;
    
    setIsRotating(true);
    playSound('ROTATION');
    
    setEnergyPulse(true);
    setTimeout(() => setEnergyPulse(false), 600);
    
    const newIndex = direction === 'left'
      ? (currentIndex - 1 + sectionIcons.length) % sectionIcons.length
      : (currentIndex + 1) % sectionIcons.length;
    
    setCurrentIndex(newIndex);
    
    if (isSlammed) {
      const newSection = sectionIcons[newIndex].id;
      onSectionChange(newSection);
      setSelectedSection(newSection);
    }
    
    setTimeout(() => setIsRotating(false), 600);
  };
  
  const handleSectionSelect = () => {
    if (!isActive || isSlammed) return;
    
    playSound('SELECTION');
    const currentSection = sectionIcons[currentIndex].id;
    
    setSelectedSection(currentSection);
    onSectionChange(currentSection);
    
    setIsSpreadingTexture(true);
    setSpreadProgress(0);
    setIsSlammed(true);
    
    setEnergyPulse(true);
    setTimeout(() => setEnergyPulse(false), 1000);
    
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 300);
  };
  
  // Helper functions for styles
  const getCurrentTexture = (): TextureType => {
    const currentId = sectionIcons[currentIndex].id as keyof typeof TEXTURES;
    return TEXTURES[currentId] || 'diamond';
  };
  
  const getCurrentColors = () => {
    const currentTexture = getCurrentTexture();
    return COLORS[currentTexture];
  };
  
  const getTextureStyle = () => {
    if (!isActive) return '';
    const currentTexture = getCurrentTexture();
    return `${currentTexture}-texture`;
  };
  
  const getCustomGradient = () => {
    if (!isActive) return 'linear-gradient(135deg, #4A4A4A 0%, #2D2D2D 50%, #3D3D3D 100%)';
    
    const colors = getCurrentColors();
    return `linear-gradient(135deg, ${colors.highlight} 0%, ${colors.base} 50%, ${colors.shadow} 100%)`;
  };
  

  const getIconStyle = (): IconStyle => {
    if (!isActive) return { filter: 'brightness(0) invert(1)' };
    
    const colors = getCurrentColors();
    return { 
      filter: 'none',
      color: colors.iconColor
    };
  };
  
  const getTextColorStyle = (): TextColorStyle => {
    if (!isActive) return { color: '#FFFFFF' };
    
    const colors = getCurrentColors();
    return {
      color: colors.textColor,
      textShadow: colors.textColor === '#FFFFFF' ? 
        '0 0 10px rgba(0,0,0,0.8), 0 0 5px rgba(0,0,0,0.5)' : 
        '0 0 10px rgba(255,255,255,0.8), 0 0 5px rgba(255,255,255,0.5)'
    };
  };
  
  const getSpreadingClipPath = () => {
    if (!isSpreadingTexture && spreadProgress === 0) return 'circle(0% at center)';
    if (!isSpreadingTexture && spreadProgress === 100) return 'circle(150% at center)';
    return `circle(${spreadProgress}% at center)`;
  };
  
  const metalGradient = 'linear-gradient(135deg, #4A4A4A 0%, #2D2D2D 50%, #3D3D3D 100%)';
  const inactiveButtonStyle = {
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.2)',
    background: metalGradient
  };
  

  const pulseGlow = {
    animation: 'none', 
    WebkitAnimation: 'none'
  };
  
  return (
    <div className="relative w-96 h-96 ${className}">
      <div 
        className="absolute inset-0 z-30 pointer-events-none opacity-0"
        style={{
          background: 'none',
          transition: 'opacity 0.6s ease-in-out'
        }}
      />
      

      <div className="kevin-background-diamond absolute inset-0 opacity-0 transition-opacity duration-1000 z-0"></div>
      <div className="kevin-background-brass absolute inset-0 opacity-0 transition-opacity duration-1000 z-0"></div>
      <div className="kevin-background-rock1 absolute inset-0 opacity-0 transition-opacity duration-1000 z-0"></div>
      <div className="kevin-background-red-rock absolute inset-0 opacity-0 transition-opacity duration-1000 z-0"></div>
      

      <motion.div 
  className="absolute inset-0 pointer-events-none z-10 rounded-full overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: cracksVisible ? 0.5 : 0 }}
  transition={{ duration: 0.8 }}
  style={{
    backgroundImage: 'linear-gradient(90deg, transparent 98%, rgba(255,255,255,0.1) 98%, transparent 100%), linear-gradient(0deg, transparent 98%, rgba(255,255,255,0.1) 98%, transparent 100%)',
    backgroundSize: '20px 20px',
    mixBlendMode: 'overlay',
    borderRadius: '50%' 
  }}
/>
      
      <AnimatePresence>
        {(isSlammed || isSpreadingTexture) && (
          <motion.div 
            className={`fixed inset-0 z-0 ${getTextureStyle()}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: getCustomGradient(),
              clipPath: getSpreadingClipPath(),
              transition: 'clip-path 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
        )}
      </AnimatePresence>
      
      
      <AnimatePresence>
        {isSpreadingTexture && (
          <motion.div
            className="absolute top-1/2 left-1/2 rounded-full z-5 pointer-events-none"
            initial={{ width: 0, height: 0, x: '-50%', y: '-50%', opacity: 0 }}
            animate={{ 
              width: [0, 400, 1200], 
              height: [0, 400, 1200],
              x: '-50%',
              y: '-50%',
              opacity: [0, 0.7, 0.3]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2, 
              ease: "easeOut",
              times: [0, 0.3, 1]
            }}
            style={{
              background: `radial-gradient(circle, ${getCurrentColors().highlight} 0%, ${getCurrentColors().base} 50%, transparent 70%)`,
              mixBlendMode: 'overlay',
              filter: 'blur(3px)'
            }}
          />
        )}
      </AnimatePresence>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          className={`w-72 h-72 rounded-full flex items-center justify-center cursor-pointer overflow-hidden`}
          style={{
            background: getCustomGradient(),
            boxShadow: isActive 
              ? 'inset 0 0 25px rgba(0,0,0,0.4), 0 0 30px rgba(255,255,255,0.6)'
              : 'inset 0 0 15px rgba(0,0,0,0.5), 0 0 15px rgba(255,255,255,0.3)',
            transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            ...pulseGlow
          }}
          onClick={handleActivation}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: isActive 
              ? [
                  'inset 0 0 25px rgba(0,0,0,0.4), 0 0 25px rgba(255,255,255,0.4)', 
                  'inset 0 0 25px rgba(0,0,0,0.4), 0 0 45px rgba(255,255,255,0.7)', 
                  'inset 0 0 25px rgba(0,0,0,0.4), 0 0 25px rgba(255,255,255,0.4)'
                ] 
              : 'inset 0 0 15px rgba(0,0,0,0.5), 0 0 15px rgba(255,255,255,0.3)'
          }}
          transition={{
            boxShadow: {
              duration: 3,
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" 
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
              mixBlendMode: 'overlay'
            }}
            animate={{
              background: isActive ? [
                'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
                'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)',
                'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)'
              ] : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)'
            }}
            transition={{
              duration: 4,
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
  className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" 
  style={{
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    mixBlendMode: 'soft-light',
    opacity: 0.6,
    borderRadius: '50%'
  }}
  animate={{
    backgroundPosition: isActive ? [
      'center',
      'center top',
      'center'
    ] : 'center'
  }}
  transition={{
    duration: 8,
    repeat: isActive ? Infinity : 0,
    repeatType: "reverse"
  }}
/>
          
          <AnimatePresence>
  {cracksVisible && (
    <motion.div 
      className="absolute inset-0 pointer-events-none z-20 rounded-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        backgroundImage: 'linear-gradient(90deg, transparent 97%, rgba(200,200,200,0.2) 97%, transparent 100%), linear-gradient(45deg, transparent 97%, rgba(200,200,200,0.2) 97%, transparent 100%)',
        backgroundSize: '20px 20px, 30px 30px',
        backgroundPosition: 'center',
        mixBlendMode: 'overlay',
        borderRadius: '50%' 
      }}
    />
  )}
</AnimatePresence>
          
          {isActive ? (

            <motion.div 
              className="relative w-60 h-60 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.02, 1],
                rotate: isRotating ? [0, currentIndex > (currentIndex + 1) % sectionIcons.length ? -180 : 180] : 0 
              }}
              transition={{ 
                scale: { 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse" 
                },
                rotate: { 
                  duration: isRotating ? 0.6 : 0,
                  ease: "easeInOut" 
                }
              }}
            >
              <motion.div 
                className={`relative z-10 w-52 h-52 rounded-full flex items-center justify-center overflow-hidden ${getTextureStyle()}`}
                style={{
                  background: getCustomGradient(),
                  boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                animate={{ 
                  boxShadow: [
                    'inset 0 0 15px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.3)',
                    'inset 0 0 20px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.5)',
                    'inset 0 0 15px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.3)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >

                <motion.div 
                  className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" 
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)',
                    mixBlendMode: 'overlay'
                  }}
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)',
                      'radial-gradient(circle at 32% 32%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%)',
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.div 
                  className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" 
                  style={{
                    background: 'radial-gradient(circle at 70% 70%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 60%)',
                    mixBlendMode: 'multiply'
                  }}
                />
                
                <motion.div 
                  className="w-full h-full flex items-center justify-center z-20"
                  animate={{
                    y: [0, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                   <motion.img 
                    src={sectionIcons[currentIndex].name}
                    alt={sectionIcons[currentIndex].id} 
                    className="section-icon w-24 h-24 object-contain"
                    style={{
                      ...getIconStyle(),
                      filter: 'blur(0.5px)'
                    }}
                    animate={{
                      filter: [
                        'blur(0.5px)',
                        'blur(0px)',
                        'blur(0.5px)'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
  
            <motion.div 
              className="relative w-60 h-60 flex items-center justify-center"
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
            >
              <div 
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                  background: metalGradient,
                  transition: 'all 0.4s ease-in-out'
                }}
              >
                <div 
                  className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" 
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)',
                    mixBlendMode: 'overlay'
                  }}
                />
                
                <motion.span 
                  className="text-gray-200 text-9xl font-bold" 
                  style={{ 
                    textShadow: '0 0 15px rgba(255,255,255,0.7)',
                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))'
                  }}
                  animate={{
                    textShadow: [
                      '0 0 15px rgba(255,255,255,0.7)',
                      '0 0 25px rgba(255,255,255,0.9)',
                      '0 0 15px rgba(255,255,255,0.7)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  11
                </motion.span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isActive && !isSlammed && (
          <>
            <motion.div className="absolute bottom-[-3rem] md:bottom-auto md:left-[-4rem] md:top-1/2 left-1/4 transform md:-translate-y-1/2 -translate-x-1/2 w-16 h-16">
              <motion.button
                className="w-full h-full rounded-full flex items-center justify-center shadow-lg"
                initial={{ opacity: 0, y: 20, x: 0, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, x: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleRotate('left')}
                disabled={isRotating}
                style={{ 
                  opacity: isRotating ? 0.5 : 1,
                  background: metalGradient,
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{
                  scale: 1.1
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="text-gray-200" size={30} />
              </motion.button>
            </motion.div>
            
            <motion.div className="absolute bottom-[-3rem] md:bottom-auto md:right-[-4rem] md:top-1/2 right-1/4 transform md:-translate-y-1/2 translate-x-1/2 w-16 h-16">
              <motion.button
                className="w-full h-full rounded-full flex items-center justify-center shadow-lg"
                initial={{ opacity: 0, y: 20, x: 0, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, x: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleRotate('right')}
                disabled={isRotating}
                style={{ 
                  opacity: isRotating ? 0.5 : 1,
                  background: metalGradient,
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{
                  scale: 1.1
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="text-gray-200" size={30} />
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
      {isActive && !isSlammed && (
          <motion.div 
            className="absolute bottom-[-7rem] md:bottom-[-4rem] left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className="text-gray-200 px-8 py-3 rounded-full shadow-lg font-bold text-xl w-40"
              onClick={handleSectionSelect}
              style={{
                background: metalGradient,
                boxShadow: '0 0 15px rgba(255,255,255,0.3), inset 0 0 10px rgba(0,0,0,0.3)'
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(255,255,255,0.5), inset 0 0 10px rgba(0,0,0,0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 15px rgba(255,255,255,0.3), inset 0 0 10px rgba(0,0,0,0.3)',
                  '0 0 25px rgba(255,255,255,0.5), inset 0 0 10px rgba(0,0,0,0.3)',
                  '0 0 15px rgba(255,255,255,0.3), inset 0 0 10px rgba(0,0,0,0.3)'
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              ABSORB!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      

      <AnimatePresence>
      {isSlammed && (
          <motion.div 
            className="absolute bottom-[-2rem] md:bottom-[-2rem] left-0 right-0 z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            <motion.p 
              className="font-bold text-xl text-center px-6 py-3 rounded-full backdrop-blur-md"
              style={{
                ...getTextColorStyle(),
                width: 'fit-content',
                margin: '0 auto',
               
              }}
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              Touch to de-absorb the substance
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
      {!isActive && (
          <motion.div 
            className="absolute bottom-[-3rem] md:bottom-[-4rem] left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className="text-gray-300 font-bold text-xl"
              style={{ 
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))'
              }}
              animate={{
                textShadow: [
                  '0 0 10px rgba(255,255,255,0.5)',
                  '0 0 20px rgba(255,255,255,0.8)',
                  '0 0 10px rgba(255,255,255,0.5)'
                ],
                y: [0, -5, 0]
              }}
              transition={{
                textShadow: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              Touch to absorb power!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Kevin11EnergyDial;
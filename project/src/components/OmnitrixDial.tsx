import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { sectionIcons } from '../data/sectionIcons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SectionType } from '../types';

const ACTIVATION_SOUND_URL = '/sounds/open sound.mp3';
const ROTATION_SOUND_URL = '/sounds/rotation sound.mp3';
const SELECTION_SOUND_URL = '/sounds/activate sound.mp3';
const BACKGROUND_MUSIC_URL = '/sounds/background music.mp3';
const DEACTIVATION_SOUND_URL = '/sounds/deactivate sound.mp3'; // New sound effect

interface OmnitrixDialProps {
  onSectionChange: (section: SectionType) => void;
  activeSection: SectionType | null;
  onActivation: (active: boolean) => void;
  className?: string;
}

const OmnitrixDial: React.FC<OmnitrixDialProps> = ({
  onSectionChange,
  activeSection,
  onActivation,
  className,
}) => {
  const [isActivated, setIsActivated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SectionType | null>(null);
  // Add rotation angle state for the outer ring
  const [outerRotationAngle, setOuterRotationAngle] = useState(0);
  
  // New states for enhanced activation/deactivation
  const [isSlammed, setIsSlammed] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [displayShape, setDisplayShape] = useState<'diamond' | 'hourglass'>('hourglass');
  const [displayColor, setDisplayColor] = useState<'green' | 'white' | 'red'>('green');
  const [isBlinking, setIsBlinking] = useState(false);
  
  const [playActivation] = useSound(ACTIVATION_SOUND_URL, { volume: 0.5 });
  const [playRotation] = useSound(ROTATION_SOUND_URL, { volume: 0.4 });
  const [playSelection] = useSound(SELECTION_SOUND_URL, { volume: 0.5 });
  const [playDeactivation] = useSound(DEACTIVATION_SOUND_URL, { volume: 0.5 }); // New sound hook
  const [playBackgroundMusic, { stop: stopBackgroundMusic }] = useSound(BACKGROUND_MUSIC_URL, { 
    volume: 0.2,
    loop: true,
    playbackRate: 1
  });

  useEffect(() => {
    if (isActivated && !isSlammed) {
      playBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
    
    return () => {
      stopBackgroundMusic();
    };
  }, [isActivated, isSlammed, playBackgroundMusic, stopBackgroundMusic]);

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
    // If currently in slammed state, start deactivation sequence
    if (isSlammed) {
      startDeactivationSequence();
      return;
    }
    
    // Normal activation logic
    playActivation();
    const newState = !isActivated;
    setIsActivated(newState);
    
    if (!newState) {
      onActivation(false);
      onSectionChange(null as any);
      setSelectedSection(null);
    } else {
      const initialSection = sectionIcons[currentIndex].id;
      onSectionChange(initialSection);
      setSelectedSection(initialSection);
      // When activating, set the display shape to diamond
      setDisplayShape('diamond');
    }
  };

  // Fixed deactivation sequence
  const startDeactivationSequence = () => {
    // Play deactivation sound immediately and ensure component state reflects deactivation
    setIsDeactivating(true);
    
    // Ensure sound plays by placing it outside of any async operations
    // This is the key fix - making sure playDeactivation() executes synchronously
    playDeactivation();
    
    // Change shape to hourglass for deactivation
    setDisplayShape('hourglass');
    
    // Start blinking animation
    setIsBlinking(true);
    
    // Red blinking sequence (blink 3 times)
    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
      setDisplayColor(prev => prev === 'red' ? 'white' : 'red');
      blinkCount++;
      
      if (blinkCount >= 15) { // 3 complete blinks (on-off cycles)
        clearInterval(blinkInterval);
        setIsBlinking(false);
        setDisplayColor('red');
        
        // After solid red state, return to completely inactive state
        setTimeout(() => {
          setIsSlammed(false);
          setIsDeactivating(false);
          setDisplayColor('green');
          setIsActivated(false); // Complete deactivation
          onActivation(false);
          onSectionChange(null as any);
          setSelectedSection(null);
        }, 1000);
      }
    }, 200);
  };

  const handleRotate = (direction: 'left' | 'right') => {
    if (isRotating || !isActivated || isSlammed) return;
    
    setIsRotating(true);
    playRotation();
    
    let newIndex = currentIndex;
    if (direction === 'left') {
      newIndex = (currentIndex - 1 + sectionIcons.length) % sectionIcons.length;
      // Rotate outer ring left by 45 degrees
      setOuterRotationAngle(prev => prev - 45);
    } else {
      newIndex = (currentIndex + 1) % sectionIcons.length;
      // Rotate outer ring right by 45 degrees
      setOuterRotationAngle(prev => prev + 45);
    }
    
    setCurrentIndex(newIndex);
    const newSection = sectionIcons[newIndex].id;
    onSectionChange(newSection);
    setSelectedSection(newSection);
    
    setTimeout(() => {
      setIsRotating(false);
    }, 600);
  };
  
  const handleSectionSelect = () => {
    if (!isActivated || isSlammed) return;
    
    playSelection();
    const currentSection = sectionIcons[currentIndex].id;
    
    setSelectedSection(currentSection);
    onSectionChange(currentSection);
    onActivation(true);
    
    // Set to slammed state
    setIsSlammed(true);
    setDisplayShape('hourglass');
    setDisplayColor('white');
    
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 300);
  };
  
  // Helper function to determine current shape display
  const getShapeClipPath = () => {
    if (displayShape === 'diamond') {
      return 'polygon(50% 0%, 83% 50%, 50% 100%, 15% 50%)';
    } else { // hourglass
      return 'polygon(20% 0%, 80% 0%, 60% 50%, 80% 100%, 20% 100%, 40% 50%)';
    }
  };
  
  // Helper function to determine current color
  const getDisplayColor = () => {
    switch(displayColor) {
      case 'white': return 'bg-white';
      case 'red': return 'bg-red-500';
      case 'green':
      default: return 'bg-omnitrix-green-400';
    }
  };
  
  // Helper for glow effect
  const getGlowEffect = () => {
    if (displayColor === 'red' && !isBlinking) {
      return 'animate-red-glow-pulse';
    } else if (isBlinking) {
      return 'animate-blink-pulse';
    } else {
      return 'animate-glow-pulse';
    }
  };
  
  return (
    <div className="relative w-80 h-80">
      {/* Outer ring and inner ring with green accents that will rotate */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: outerRotationAngle }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full bg-omnitrix-black-800 flex items-center justify-center border-4 border-omnitrix-black-900 shadow-lg">
          {/* Inner ring */}
          <div className="w-72 h-72 rounded-full bg-omnitrix-gray-700 flex items-center justify-center relative border-2 border-omnitrix-black-900 shadow-omnitrix-inner">
            {/* Green accents/buttons around dial */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-omnitrix-green-400 shadow-omnitrix-glow"></div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-omnitrix-green-400 shadow-omnitrix-glow"></div>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-omnitrix-green-400 shadow-omnitrix-glow"></div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-omnitrix-green-400 shadow-omnitrix-glow"></div>
          </div>
        </div>
      </motion.div>
      
      {/* Core of the Omnitrix - Kept separate from outer rotation */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className={`w-56 h-56 bg-omnitrix-gray-800 rounded-full flex items-center justify-center cursor-pointer border-2 border-omnitrix-black-900 ${isRotating ? 'animate-rotate-snap' : ''}`}
          onClick={handleActivation}
          whileTap={{ scale: 0.95 }}
        >
          {isActivated ? (
            // Dynamic display based on current state
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="relative w-[200px] h-[200px]">
                {/* Black circular base with clipping */}
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
                  {/* Dynamic shape and color */}
                  <motion.div 
                    className={`w-[220px] h-[220px] ${getDisplayColor()} ${getGlowEffect()}`}
                    animate={{ 
                      clipPath: getShapeClipPath() 
                    }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut" 
                    }}
                    style={{
                      clipPath: getShapeClipPath()
                    }}
                  >
                    {!isSlammed && displayShape === 'diamond' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-omnitrix-black-400 font-bold text-xl transform -rotate-0">
                          <img 
                            src={sectionIcons[currentIndex].name} 
                            alt={sectionIcons[currentIndex].id} 
                            className="section-icon w-21 h-20"
                          />
                        </span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            // Default inactive state (hourglass)
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="relative w-[200px] h-[200px]">
                {/* Black circular base with clipping */}
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
                  {/* Green hourglass inside */}
                  <div className="w-[220px] h-[220px] bg-omnitrix-green-400 animate-glow-pulse" style={{
                    clipPath: 'polygon(20% 0%, 80% 0%, 60% 50%, 80% 100%, 20% 100%, 40% 50%)'
                  }}></div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Rotation controls - only visible when activated but not slammed */}
{isActivated && !isSlammed && !isDeactivating && (
  <>
    {/* Container for arrow buttons positioned below the dial with more vertical space */}
    <div className="absolute bottom-[-5rem] left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-16">
      <button 
        onClick={() => handleRotate('left')}
        className="w-12 h-12 bg-omnitrix-green-400 rounded-full flex items-center justify-center shadow-omnitrix-glow hover:bg-omnitrix-green-300 transition-colors"
        aria-label="Rotate left"
      >
        <ChevronLeft className="w-8 h-8 text-black" strokeWidth={3} />
      </button>
      <button 
        onClick={() => handleRotate('right')}
        className="w-12 h-12 bg-omnitrix-green-400 rounded-full flex items-center justify-center shadow-omnitrix-glow hover:bg-omnitrix-green-300 transition-colors"
        aria-label="Rotate right"
      >
        <ChevronRight className="w-8 h-8 text-black" strokeWidth={3} />
      </button>
    </div>
    
    {/* Select button - moved even further down for more spacing */}
    <button 
      onClick={handleSectionSelect}
      className="absolute bottom-[-10rem] left-1/2 transform -translate-x-1/2 bg-omnitrix-green-400 text-black px-8 py-3 rounded-full shadow-omnitrix-glow hover:bg-omnitrix-green-300 transition-colors font-bold text-lg"
      aria-label="Select section"
    >
      Slam!
    </button>
  </>
)}
      
      {/* Instructions */}
      {!isActivated && (
        <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-omnitrix-green-400 font-bold text-lg animate-pulse">
            Press the omnitrix to use!
          </p>
        </div>
      )}
      
      {/* Deactivation instructions */}
      {isSlammed && !isDeactivating && (
        <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white font-bold text-lg animate-pulse">
            Press the omnitrix to deactivate!
          </p>
        </div>
      )}
      
      {/* During deactivation */}
      {isDeactivating && (
        <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-red-500 font-bold text-lg animate-pulse">
            Deactivating...
          </p>
        </div>
      )}
    </div>
  );
};

export default OmnitrixDial;
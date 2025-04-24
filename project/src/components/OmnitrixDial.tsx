import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { sectionIcons } from '../data/sectionIcons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SectionType } from '../types';

const ACTIVATION_SOUND_URL = '/src/sounds/open sound.mp3';
const ROTATION_SOUND_URL = '/src/sounds/rotation sound.mp3';
const SELECTION_SOUND_URL = '/src/sounds/activate sound.mp3';
const BACKGROUND_MUSIC_URL = '/src/sounds/background music.mp3';

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
  
  const [playActivation] = useSound(ACTIVATION_SOUND_URL, { volume: 0.5 });
  const [playRotation] = useSound(ROTATION_SOUND_URL, { volume: 0.4 });
  const [playSelection] = useSound(SELECTION_SOUND_URL, { volume: 0.5 });
  const [playBackgroundMusic, { stop: stopBackgroundMusic }] = useSound(BACKGROUND_MUSIC_URL, { 
    volume: 0.2,
    loop: true,
    playbackRate: 1
  });

  useEffect(() => {
    if (isActivated) {
      playBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
    
    return () => {
      stopBackgroundMusic();
    };
  }, [isActivated, playBackgroundMusic, stopBackgroundMusic]);

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
    }
  };

  const handleRotate = (direction: 'left' | 'right') => {
    if (isRotating || !isActivated) return;
    
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
    if (!isActivated) return;
    
    playSelection();
    const currentSection = sectionIcons[currentIndex].id;
    
    setSelectedSection(currentSection);
    onSectionChange(currentSection);
    onActivation(true);
    
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 300);
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
            // Diamond shape when activated
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="relative w-[200px] h-[200px]">
                {/* Black circular base with clipping */}
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
                  {/* Green diamond inside */}
                  <div className="w-[130px] h-[220px] bg-omnitrix-green-400 animate-glow-pulse" style={{
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                  }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-omnitrix-black-400 font-bold text-xl transform -rotate-0">
                      <img 
  src={sectionIcons[currentIndex].name} 
  alt={sectionIcons[currentIndex].id} 
  className="section-icon w-21 h-20"
  
/>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Square box with hourglass when not activated
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
      
      {/* Rotation controls */}
      {isActivated && (
  <>
    <button 
      onClick={() => handleRotate('left')}
      className="absolute left-[-4rem] top-1/2 -translate-y-1/2 w-12 h-12 bg-omnitrix-green-400 rounded-full flex items-center justify-center shadow-omnitrix-glow hover:bg-omnitrix-green-300 transition-colors"
      aria-label="Rotate left"
    >
      <ChevronLeft className="w-8 h-8 text-black" strokeWidth={3} />
    </button>
    <button 
      onClick={() => handleRotate('right')}
      className="absolute right-[-4rem] top-1/2 -translate-y-1/2 w-12 h-12 bg-omnitrix-green-400 rounded-full flex items-center justify-center shadow-omnitrix-glow hover:bg-omnitrix-green-300 transition-colors"
      aria-label="Rotate right"
    >
      <ChevronRight className="w-8 h-8 text-black" strokeWidth={3} />
    </button>
    
    {/* Select button - moved down a bit more */}
    <button 
      onClick={handleSectionSelect}
      className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 bg-omnitrix-green-400 text-black px-8 py-3 rounded-full shadow-omnitrix-glow hover:bg-omnitrix-green-300 transition-colors font-bold text-lg"
      aria-label="Select section"
    >
      Slam!
    </button>
  </>
)}
  {!isActivated && (
      <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-omnitrix-green-400 font-bold text-lg animate-pulse">
          Press the omnitrix to use!
        </p>
      </div>
    )}
  </div>
);
};

export default OmnitrixDial;
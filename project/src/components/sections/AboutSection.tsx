import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { Download } from 'lucide-react';

interface AboutSectionProps {
  gwenTheme?: boolean;
  kevinTheme?: boolean;
  cardClass?: string;
  textClass?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ 
  gwenTheme = false, 
  kevinTheme = false,
  cardClass = '', 
  textClass = '' 
}) => {
  const { name, title, bio, imageUrl, resumeUrl } = portfolioData.about;

  return (
    <motion.div 
      className={`p-6 ${
        gwenTheme 
          ? 'bg-pink-900' 
          : kevinTheme 
            ? 'bg-gray-800' 
            : 'bg-omnitrix-black-700'
      } bg-opacity-80 rounded-xl shadow-lg max-w-4xl w-full text-white ${cardClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={`text-3xl font-bold mb-6 ${
        gwenTheme 
          ? 'text-pink-400' 
          : kevinTheme 
            ? 'text-gray-400' 
            : 'text-omnitrix-green-400'
      } tracking-wider ${textClass}`}>
        About Me
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {imageUrl && (
          <div className="flex-shrink-0">
            <div className={`w-58 h-48 rounded-xl overflow-hidden border-2 ${
              gwenTheme 
                ? 'border-pink-400 shadow-gwen-glow' 
                : kevinTheme 
                  ? 'border-gray-500 shadow-kevin-glow'
                  : 'border-omnitrix-green-400 shadow-omnitrix-glow'
            }`}>
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        <div className="flex-grow">
          <h3 className={`text-2xl font-bold text-white mb-2 ${textClass}`}>{name}</h3>
          <p className={`text-xl ${
            gwenTheme 
              ? 'text-pink-300' 
              : kevinTheme 
                ? 'text-gray-300' 
                : 'text-omnitrix-green-300'
          } mb-4 ${textClass}`}>{title}</p>
          
          <div className="space-y-4">
            <p className={`text-gray-200 leading-relaxed ${textClass}`}>{bio}</p>
            
            {resumeUrl && (
              <motion.a
                href={resumeUrl}
                download
                className={`inline-flex items-center px-4 py-2 mt-4 ${
                  gwenTheme 
                    ? 'bg-pink-500 hover:bg-pink-600' 
                    : kevinTheme 
                      ? 'bg-gray-600 hover:bg-gray-700'
                      : 'bg-omnitrix-green-500 hover:bg-omnitrix-green-600'
                } text-white font-medium rounded-lg transition-colors duration-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;
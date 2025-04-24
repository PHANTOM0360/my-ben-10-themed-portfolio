import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

const AboutSection: React.FC = () => {
  const { name, title, bio, imageUrl } = portfolioData.about;

  return (
    <motion.div 
      className="p-6 bg-omnitrix-black-700 bg-opacity-80 rounded-xl shadow-lg max-w-4xl w-full text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-omnitrix-green-400 tracking-wider">About Me</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {imageUrl && (
          <div className="flex-shrink-0">
            <div className="w-58 h-48 rounded-xl overflow-hidden border-2 border-omnitrix-green-400 shadow-omnitrix-glow">
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-xl text-omnitrix-green-300 mb-4">{title}</p>
          
          <div className="space-y-4">
            <p className="text-gray-200 leading-relaxed">{bio}</p>
            
            <div className="pt-4">
              <a 
                href="#contact" 
                className="inline-block bg-omnitrix-green-500 hover:bg-omnitrix-green-600 text-black font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-md"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;
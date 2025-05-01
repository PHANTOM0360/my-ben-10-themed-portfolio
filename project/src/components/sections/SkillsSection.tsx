import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

interface SkillsSectionProps {
  gwenTheme?: boolean;
  kevinTheme?: boolean;
  cardClass?: string;
  textClass?: string;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  gwenTheme = false,
  kevinTheme = false,
  cardClass = '',
  textClass = ''
}) => {
  const { skills } = portfolioData;

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
        Skills
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skillCategory, catIndex) => (
          <motion.div 
            key={catIndex}
            className={`${
              gwenTheme 
                ? 'bg-pink-950' 
                : kevinTheme 
                  ? 'bg-gray-900' 
                  : 'bg-omnitrix-black-800'
            } p-4 rounded-lg border ${
              gwenTheme 
                ? 'border-pink-500' 
                : kevinTheme 
                  ? 'border-gray-600'
                  : 'border-omnitrix-green-500'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: catIndex * 0.1 }}
          >
            <h3 className={`text-xl font-bold mb-4 ${
              gwenTheme 
                ? 'text-pink-300' 
                : kevinTheme 
                  ? 'text-gray-300' 
                  : 'text-omnitrix-green-300'
            } ${textClass}`}>
              {skillCategory.category}
            </h3>
            
            <div className="space-y-4">
              {skillCategory.items.map((skill, skillIndex) => (
                <div key={skillIndex} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${textClass}`}>{skill.name}</span>
                    <span className={`text-xs ${
                      gwenTheme 
                        ? 'text-pink-400' 
                        : kevinTheme 
                          ? 'text-gray-400' 
                          : 'text-omnitrix-green-400'
                    }`}>
                      {skill.level}/10
                    </span>
                  </div>
                  
                  <div className={`w-full ${
                    gwenTheme 
                      ? 'bg-pink-900' 
                      : kevinTheme 
                        ? 'bg-gray-800' 
                        : 'bg-omnitrix-black-600'
                  } rounded-full h-2`}>
                    <motion.div 
                      className={`${
                        gwenTheme 
                          ? 'bg-pink-500' 
                          : kevinTheme 
                            ? 'bg-gray-500' 
                            : 'bg-omnitrix-green-500'
                      } h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level * 10}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + skillIndex * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsSection;

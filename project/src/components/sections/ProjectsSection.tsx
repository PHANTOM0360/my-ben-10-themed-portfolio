import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

interface ProjectsSectionProps {
  gwenTheme?: boolean;
  kevinTheme?: boolean;
  cardClass?: string;
  textClass?: string;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  gwenTheme = false,
  kevinTheme = false,
  cardClass = '',
  textClass = ''
}) => {
  const { projects } = portfolioData;

  const handleProjectClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener noreferrer');
    }
  };

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
        Projects
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className={`${
              gwenTheme 
                ? 'bg-pink-950' 
                : kevinTheme 
                  ? 'bg-gray-900' 
                  : 'bg-omnitrix-black-800'
            } rounded-lg overflow-hidden border ${
              gwenTheme 
                ? 'border-pink-500 hover:shadow-gwen-glow' 
                : kevinTheme 
                  ? 'border-gray-600 hover:shadow-kevin-glow'
                  : 'border-omnitrix-green-500 hover:shadow-omnitrix-glow'
            } shadow-md transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleProjectClick(project.link)}
            role="link"
            aria-label={`View ${project.title} project`}
          >
            {project.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
            
            <div className="p-4">
              <h3 className={`text-xl font-bold ${
                gwenTheme 
                  ? 'text-pink-400' 
                  : kevinTheme 
                    ? 'text-gray-400' 
                    : 'text-omnitrix-green-400'
              } mb-2 ${textClass}`}>
                {project.title}
              </h3>
              <p className={`text-gray-300 mb-3 text-sm ${textClass}`}>{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className={`px-2 py-1 ${
                      gwenTheme 
                        ? 'bg-pink-900 text-pink-300' 
                        : kevinTheme 
                          ? 'bg-gray-800 text-gray-300'
                          : 'bg-omnitrix-black-600 text-omnitrix-green-300'
                    } text-xs rounded-md ${textClass}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div 
                className={`inline-block ${
                  gwenTheme 
                    ? 'bg-pink-500 hover:bg-pink-600' 
                    : kevinTheme 
                      ? 'bg-gray-600 hover:bg-gray-700'
                      : 'bg-omnitrix-green-500 hover:bg-omnitrix-green-600'
                } text-white text-sm font-bold py-1 px-4 rounded transition-colors duration-300`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProjectClick(project.link);
                }}
              >
                View Project
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsSection;

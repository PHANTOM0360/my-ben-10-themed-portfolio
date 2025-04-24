import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;

  return (
    <motion.div 
      className="p-6 bg-omnitrix-black-700 bg-opacity-80 rounded-xl shadow-lg max-w-4xl w-full text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-omnitrix-green-400 tracking-wider">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className="bg-omnitrix-black-800 rounded-lg overflow-hidden border border-omnitrix-green-500 shadow-md hover:shadow-omnitrix-glow transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
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
              <h3 className="text-xl font-bold text-omnitrix-green-400 mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-3 text-sm">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-1 bg-omnitrix-black-600 text-omnitrix-green-300 text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-omnitrix-green-500 hover:bg-omnitrix-green-600 text-black text-sm font-bold py-1 px-4 rounded transition-colors duration-300"
                >
                  View Project
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
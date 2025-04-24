import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { AtSign, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { contact } = portfolioData;

  const getIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="p-6 bg-omnitrix-black-700 bg-opacity-80 rounded-xl shadow-lg max-w-4xl w-full text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-omnitrix-green-400 tracking-wider">Contact</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="w-10 h-10 rounded-full bg-omnitrix-green-500 flex items-center justify-center text-black">
              <AtSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <a href={`mailto:${contact.email}`} className="text-white hover:text-omnitrix-green-300 transition-colors">
                {contact.email}
              </a>
            </div>
          </motion.div>
          
          {contact.phone && (
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-10 h-10 rounded-full bg-omnitrix-green-500 flex items-center justify-center text-black">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <a href={`tel:${contact.phone}`} className="text-white hover:text-omnitrix-green-300 transition-colors">
                  {contact.phone}
                </a>
              </div>
            </motion.div>
          )}
          
          {contact.location && (
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full bg-omnitrix-green-500 flex items-center justify-center text-black">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-white">{contact.location}</p>
              </div>
            </motion.div>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4 text-omnitrix-green-300">Connect</h3>
          <div className="flex flex-wrap gap-4">
            {contact.socials.map((social, index) => (
              <motion.a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-omnitrix-black-600 hover:bg-omnitrix-black-500 px-4 py-2 rounded-lg transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              >
                <span className="text-omnitrix-green-400">
                  {getIconComponent(social.icon)}
                </span>
                <span>{social.name}</span>
              </motion.a>
            ))}
          </div>
          
          <motion.div 
            className="mt-8 p-4 bg-omnitrix-black-800 rounded-lg border border-omnitrix-green-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <h4 className="text-lg font-bold mb-2 text-omnitrix-green-400">Send a Message</h4>
            <p className="text-gray-300 text-sm mb-4">
              You can contact me I don't bite like Wild-Mutt.
            </p>
            <a 
              href={`mailto:${contact.email}?subject=Portfolio Contact`}
              className="inline-block w-full bg-omnitrix-green-500 hover:bg-omnitrix-green-600 text-black font-bold py-2 px-4 rounded text-center transition-colors"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactSection;
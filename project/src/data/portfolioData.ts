import { PortfolioData } from '../types';


export const portfolioData: PortfolioData = {
  about: {
    name: 'Arkaprava Chowdhury',
    title: 'Web Developer & Designer',
    bio: 'I am a creative developer skilled in building sleek, responsive web apps with React, JavaScript, and Tailwind. I blend design and code, backed by experience in Node.js, Python, and tools like Figma and Framer. I love crafting clean interfaces and smooth user experiences.',
    imageUrl: '/images/profile.webp',
    resumeUrl: '/files/arkaprava_chowdhury_resume.pdf',
  },
  projects: [
    {
      id: '1',
      title: 'Diversion Hackathon Website',
      description: 'A retro-themed event website for Diversion 2K25 hackathon, built with React and Framer, featuring smooth animations, interactive event schedules, and a nostalgic pixel-art design to capture the essence of old-school computing.',
      technologies: ['React', 'Framer'],
      imageUrl: '/images/diversion.webp',
      link: 'https://blissful-button-030765.framer.app/' 
    },
    {
      id: '2',
      title: 'Indiana Jones Portfolio',
      description: 'An adventurous Indiana Jones-themed portfolio, my first-ever web development project, built with HTML, CSS, and JavaScript—featuring treasure map navigation, animated artifacts, and a classic cinematic vibe.',
      technologies: ['HTML', 'Javascript', 'CSS'],
      imageUrl: '/images/indiana jones portfolio.webp',
      link: 'https://phantom0360.github.io/MyIndianaJonesPortfolio/' 
    },
    {
      id: '3',
      title: 'Ben 10 Portfolio Website',
      description: 'A Ben 10-themed interactive portfolio built with React, Node.js, Framer Motion, and Tailwind CSS—featuring dynamic theme switching for characters, with Gwen and Kevin 11 modes coming soon for an evolving hero experience.',
      technologies: ['React', 'Node JS', 'Framer Motion', 'Tailwind CSS'],
      imageUrl: '/images/ben 10 portfolio.webp',
      link: 'https://my-ben-10-themed-portfolio-gyhr.vercel.app/' 
    },

    {
      id: '4',
      title: 'MCR Fan Page',
      description: 'A My Chemical Romance fan page created while learning HTML, CSS, and JavaScript—featuring nostalgic visuals, band info, and interactive elements to celebrate the iconic emo era.',
      technologies: ['HTML', 'Javascript', 'CSS'],
      imageUrl: '/images/mcr fan page.webp',
      link: 'https://phantom0360.github.io/Mcr-fan-page/' 
    }
  ],
  skills: [
    {
      category: 'Frontend',
      items: [
        { name: 'React', level: 9 },
        { name: 'JavaScript', level: 9 },
        { name: 'TypeScript', level: 8 },
        { name: 'HTML/CSS', level: 9 },
        { name: 'Tailwind CSS', level: 7 }
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', level: 2 },
        { name: 'Python', level: 7 },
        { name: 'MongoDB', level: 6 },
        { name: 'C', level: 8 }
      ]
    },
    {
      category: 'Tools',
      items: [
        { name: 'VS Code', level: 8 },
        { name: 'Git', level: 7 },
        { name: 'Figma', level: 8 },
        { name: 'Framer', level: 9 }
      ]
    },
    {
      category: 'Extra',
      items: [
        { name: 'Photoshop', level: 7 },
        { name: 'Canva', level: 9 },
        { name: 'Digital Art', level: 9 },
      ]
    }
  ],
  contact: {
    email: 'arkaprava2099@gmail.com',
    location: 'Kolkata, West Bengal',
    socials: [
      { name: 'GitHub', url: 'https://github.com/PHANTOM0360', icon: 'github' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/arkaprava-chowdhury-449918220/', icon: 'linkedin' },
      { name: 'Twitter', url: 'https://x.com/ArkapravaChowd9', icon: 'twitter' }
    ]
  }
};
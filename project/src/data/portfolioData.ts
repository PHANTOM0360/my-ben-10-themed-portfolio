import { PortfolioData } from '../types';

// Replace this with your actual portfolio data
export const portfolioData: PortfolioData = {
  about: {
    name: 'Arkaprava Chowdhury',
    title: 'Web Developer & Designer',
    bio: 'I am a creative developer skilled in building sleek, responsive web apps with React, JavaScript, and Tailwind. I blend design and code, backed by experience in Node.js, Python, and tools like Figma and Framer. I love crafting clean interfaces and smooth user experiences.',
    imageUrl: '/images/profile.jpg',
    resumeUrl: '/files/arkaprava_chowdhury_resume.pdf', // Add your resume file path here
  },
  projects: [
    {
      id: '1',
      title: 'Diversion Hackathon Website',
      description: 'A full-featured online store built with React and Node.js, featuring user authentication, product listings, and secure payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A productivity tool that helps users organize tasks, set deadlines, and track progress. Features include drag-and-drop functionality and real-time updates.',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      imageUrl: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    {
      id: '3',
      title: 'Portfolio Website',
      description: 'A responsive portfolio website showcasing my work and skills. Features smooth animations and a clean, modern design.',
      technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
      imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
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
        { name: 'Tailwind CSS', level: 8 }
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', level: 7 },
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
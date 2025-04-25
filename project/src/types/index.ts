export type SectionType = 'about' | 'projects' | 'skills' | 'contact';

export interface SectionIcon {
  id: SectionType;
  name: string;
  description?: string;
  image?: string;
}

export interface PortfolioData {
  about: {
    name: string;
    title: string;
    bio: string;
    imageUrl?: string;
    resumeUrl?: string;
  };
  projects: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl?: string;
    link?: string;
  }[];
  skills: {
    category: string;
    items: {
      name: string;
      level: number; // 1-10
    }[];
  }[];
  contact: {
    email: string;
    phone?: string;
    location?: string;
    socials: {
      name: string;
      url: string;
      icon: string;
    }[];
  };
}
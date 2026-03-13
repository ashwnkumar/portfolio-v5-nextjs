export type SocialLink = {
  platform: string;
  username?: string;
  url: string;
  label: string;
  icons?: {
    line: string;
    fill: string;
  };
};

export type NavItem = {
  label: string;
  href: string;
};

export type ExperienceType = {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
};

export type ProjectType = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  live: string | null;
  preview: string;
  images: string[];
  featured: boolean;
  order: number;
  content?: string;
  frontmatter?: any;
};

export type StudioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  aspectRatio: string;
  image: string;
  order: number;
};

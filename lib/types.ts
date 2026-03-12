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
}

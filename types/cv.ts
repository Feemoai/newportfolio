export interface Contact {
  phone: string;
  email: string;
  linkedin: string;
  website: string;
}

export interface Personal {
  full_name: string;
  first_name: string;
  headline: string;
  location: string;
  status: string;
  contacts: Contact;
}

export interface Education {
  institution: string;
  degree: string;
  start_date: string;
  end_date: string | null;
  status: string;
  focus: string[];
  score: { value: number; scale: number } | null;
  achievements: string[];
}

export interface Experience {
  organization: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
  highlights: string[];
  category: "community" | "organization" | "leadership" | "volunteer";
}

export interface Achievement {
  title: string;
  event: string;
  year: number;
  details: string;
  icon: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface Skills {
  languages: SkillItem[];
  frameworks: SkillItem[];
  web_development: SkillItem[];
  tools: SkillItem[];
  design: SkillItem[];
}

export interface LanguageSpoken {
  name: string;
  level: string;
  flag: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  keyFeatures: string[];
  stack: string[];
  image: string;
  link: string;
  featured: boolean;
  year: number;
}

export interface GalleryItem {
  title: string;
  description: string;
  image: string;
  year: number;
  size?: "large" | "tall" | "wide" | "medium";
}

export interface CV {
  personal: Personal;
  summary: string;
  education: Education[];
  experience: Experience[];
  achievements: Achievement[];
  skills: Skills;
  languages: LanguageSpoken[];
  projects: Project[];
  gallery: GalleryItem[];
}

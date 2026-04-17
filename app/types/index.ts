export type Lang = 'en' | 'es' | 'it' | 'pt';

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
}

export interface ExperienceItem {
  year: string;
  title: string;
  subtitle: string;
  desc: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface MethodStep {
  id: string;
  title: string;
  desc: string;
}

export interface TranslationSchema {
  navHome: string;
  navAbout: string;
  navServices: string;
  navSkills: string;
  navProcess: string;
  navExperience: string;
  navPortfolios: string;
  navTestimonials: string;
  navContact: string;
  btnContact: string;
  btnCV: string;
  btnBuyService: string;
  btnHireMe: string;
  btnLiveDemo: string;
  introLabel: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  aboutSubtitle: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  skillsSubtitle: string;
  skillsTitle: string;
  skillCategories: SkillCategory[];
  servicesSubtitle: string;
  servicesTitle: string;
  servicesDesc: string;
  service1: string;
  service2: string;
  service3: string;
  service4: string;
  processSubtitle: string;
  processTitle: string;
  processSteps: MethodStep[];
  experienceSubtitle: string;
  experienceTitle: string;
  eduTitle: string;
  workTitle: string;
  education: ExperienceItem[];
  work: ExperienceItem[];
  portfolioSubtitle: string;
  portfolioTitle: string;
  portfolioDesc: string;
  testimonialSubtitle: string;
  testimonialTitle: string;
  testimonials: Testimonial[];
  contactSubtitle: string;
  contactTitle: string;
  contactDesc2: string;
  footerText: string;
  proj1Title: string;
  proj1Desc: string;
  proj2Title: string;
  proj2Desc: string;
  proj3Title: string;
  proj3Desc: string;
  proj4Title: string;
  proj4Desc: string;
  proj5Title: string;
  proj5Desc: string;
  proj6Title: string;
  proj6Desc: string;
  sourceCode: string;
}

export interface Project {
  emoji: string;
  title: string;
  desc: string;
  github: string;
  demo?: string;
}

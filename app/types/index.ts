export type Lang = 'en' | 'es' | 'it' | 'pt';

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
}

export interface TranslationSchema {
  navHome: string;
  navServices: string;
  navPortfolios: string;
  navFreelance: string; // Keep for now or remove if certain
  navContact: string;
  btnContact: string;
  btnBuyService: string;
  btnHireMe: string;
  introLabel: string;
  servicesSubtitle: string;
  servicesTitle: string;
  servicesDesc: string;
  service1: string;
  service2: string;
  service3: string;
  service4: string;
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
  link: string;
}

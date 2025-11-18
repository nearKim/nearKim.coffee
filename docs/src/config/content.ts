/**
 * Content configuration for the personal website
 * Centralized location for all content to keep components clean
 */

export const personalInfo = {
  name: 'In Keun Kim',
  title: 'Software Engineer',
  subtitle: 'Building reliable, high-performance AI platforms with robust software engineering.',
  bio: 'Backend and ML engineer with 6+ years of experience specializing in AI infrastructure and high-throughput distributed systems. I build maintainable software grounded in Domain-Driven Design, SOLID principles, and Test-Driven Development.',
};

export const socialLinks = [
  { href: 'https://github.com/nearKim', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/nearkim', label: 'LinkedIn' },
  { href: 'mailto:ik2619@columbia.edu', label: 'Email' },
];

export const technicalInterests = [
  {
    title: 'Systems for AI',
    description: 'Building the infrastructure that trains, deploys, and serves ML models at scale.'
  },
  {
    title: 'Robust Software Engineering',
    description: 'From SOLID principles to functional programming—crafting maintainable code that accelerates team velocity.'
  },
  {
    title: 'Real-time & Distributed Systems',
    description: 'Stream processing with Kafka, large-scale data pipelines with Hadoop and Spark.'
  },
];

export const files = {
  resumeUrl: '/resume.pdf',
  portfolioUrl: '/portfolio.pdf',
};

import React, { useState, useEffect, useCallback } from 'react';
import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Code2,
  Terminal,
  FileText,
  Briefcase
} from 'lucide-react';
import { personalInfo, socialLinks, technicalInterests, files } from '@site/src/config/content';
import styles from './index.module.css';

// Types
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

class FileDownloadError extends Error {
  constructor(public readonly fileName: string, message: string) {
    super(message);
    this.name = 'FileDownloadError';
  }
}

// Utility Functions
const createResult = <T,>(value: T): Result<T> => ({ ok: true, value });
const createError = <E,>(error: E): Result<never, E> => ({ ok: false, error });

const downloadFile = async (url: string, fileName: string): Promise<Result<void, FileDownloadError>> => {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    return { ok: true, value: undefined };
  } catch (error) {
    return { ok: false, error: new FileDownloadError(fileName, `Failed to download ${fileName}`) };
  }
};

// Custom Hooks
const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { isVisible, setRef };
};

// Social icon mapping
const getSocialIcon = (label: string) => {
  const iconMap: Record<string, ReactNode> = {
    'GitHub': <Github size={20} />,
    'LinkedIn': <Linkedin size={20} />,
    'Email': <Mail size={20} />,
  };
  return iconMap[label] || <Mail size={20} />;
};

// Components
const HeroSection: React.FC = () => {
  const [downloadingResume, setDownloadingResume] = useState(false);
  const [downloadingPortfolio, setDownloadingPortfolio] = useState(false);
  const scrollY = useScrollPosition();

  const handleDownload = useCallback(async (
    type: 'resume' | 'portfolio',
    handler: () => Promise<Result<void, FileDownloadError>>
  ) => {
    const setLoading = type === 'resume' ? setDownloadingResume : setDownloadingPortfolio;
    setLoading(true);

    const result = await handler();
    if (result.ok === false) {
      console.error(result.error.message);
    }

    setLoading(false);
  }, []);

  const handleResumeDownload = useCallback(
    () => downloadFile(files.resumeUrl, 'resume.pdf'),
    []
  );

  const handlePortfolioDownload = useCallback(
    () => downloadFile(files.portfolioUrl, 'portfolio.pdf'),
    []
  );

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent} style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div className={styles.heroText}>
          <h1 className={styles.heroName}>{personalInfo.name}</h1>
          <h2 className={styles.heroTitle}>{personalInfo.title}</h2>
          <p className={styles.heroSubtitle}>{personalInfo.subtitle}</p>
        </div>

        <div className={styles.actionButtons}>
          <button
            className={`${styles.actionButton} ${styles.primary}`}
            onClick={() => handleDownload('resume', handleResumeDownload)}
            disabled={downloadingResume}
            aria-label="Download Resume"
          >
            <FileText size={20} />
            <span>Resume</span>
          </button>

          <button
            className={`${styles.actionButton} ${styles.secondary}`}
            onClick={() => handleDownload('portfolio', handlePortfolioDownload)}
            disabled={downloadingPortfolio}
            aria-label="View Portfolio"
          >
            <Briefcase size={20} />
            <span>Portfolio</span>
          </button>
        </div>

        <div className={styles.socialLinks}>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={link.label}
            >
              {getSocialIcon(link.label)}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <ChevronDown className={styles.bounce} />
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => {
  const { isVisible, setRef } = useIntersectionObserver(0.2);

  return (
    <section className={styles.aboutSection} ref={setRef}>
      <div className={`${styles.aboutContent} ${isVisible ? styles.fadeIn : ''}`}>
        <div className={styles.aboutGrid}>
          <div className={styles.bioSection}>
            <h2 className={styles.sectionTitle}>
              <Code2 className={styles.titleIcon} />
              About
            </h2>
            <p className={styles.bioText}>{personalInfo.bio}</p>
          </div>

          <div className={styles.interestsSection}>
            <h3 className={styles.subsectionTitle}>
              <Terminal className={styles.titleIcon} />
              Technical Interests
            </h3>
            <ul className={styles.interestsList}>
              {technicalInterests.map((interest, index) => (
                <li
                  key={index}
                  className={styles.interestItem}
                  style={{
                    animationDelay: isVisible ? `${index * 0.1}s` : '0s'
                  }}
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home(): ReactNode {
  return (
    <Layout
      title={personalInfo.name}
      description={personalInfo.bio}>
      <HeroSection />
      <AboutSection />
    </Layout>
  );
}

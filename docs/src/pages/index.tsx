import React, {type ReactNode, useState} from 'react';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import {EnvelopeSimpleIcon} from '@phosphor-icons/react/EnvelopeSimple';
import {GithubLogoIcon} from '@phosphor-icons/react/GithubLogo';
import {LinkedinLogoIcon} from '@phosphor-icons/react/LinkedinLogo';
import {FileTextIcon} from '@phosphor-icons/react/FileText';
import {BrandyIcon} from '@phosphor-icons/react/Brandy';
import {CoffeeIcon} from '@phosphor-icons/react/Coffee';
import {CatIcon} from '@phosphor-icons/react/Cat';
import {
  name,
  title,
  affiliation,
  degree,
  minor,
  school,
  advisorName,
  advisorUrl,
  photoSrcLight,
  photoSrcDark,
  photoAlt,
  description,
  bioLead,
  bioInterest,
  bioCareerLead,
  companyName,
  companyUrl,
  bioCareerTrail,
  bioCareerImpact,
  asideLead,
  asideItems,
  socialLinks,
  resumeUrl,
  research,
  industry,
} from '@site/src/config/content';
import styles from './index.module.css';

const linkIcons = {
  mail: EnvelopeSimpleIcon,
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
} as const;

const asideIcons = {
  whisky: BrandyIcon,
  coffee: CoffeeIcon,
  cat: CatIcon,
} as const;

function paragraphs(text: string | string[]): string[] {
  return Array.isArray(text) ? text : [text];
}

/** Bold the site owner in an author list so a reader can find them at a glance. */
function authorList(list: string): ReactNode[] {
  return list
    .split(name)
    .flatMap((part, i) =>
      i === 0
        ? [part]
        : [
            <strong key={i} className={styles.pubSelf}>
              {name}
            </strong>,
            part,
          ],
    );
}

function Portrait(): ReactNode {
  const [failed, setFailed] = useState(false);

  /**
   * This page is server-rendered, so a missing image fires its error event
   * before hydration attaches onError, and React never replays it. Re-check the
   * already-settled state when the node mounts, or the fallback never runs and
   * the browser shows a broken-image icon with the alt text.
   */
  const catchAlreadyFailed = (img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  };

  return (
    <div className={styles.portraitFrame}>
      {!failed ? (
        <ThemedImage
          ref={catchAlreadyFailed}
          className={styles.portrait}
          sources={{light: photoSrcLight, dark: photoSrcDark}}
          alt={photoAlt}
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className={styles.portraitPlaceholder}
          role="img"
          aria-label={name}>
          <span className={styles.monogram}>IK</span>
        </div>
      )}
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title={name} description={description}>
      <main className={styles.page}>
        <div className={styles.layout}>
          <header className={styles.header}>
            <h1 className={styles.name}>{name}</h1>
          </header>

          <aside className={styles.sidebar}>
            <Portrait />

            <div className={styles.sidebarMeta}>
              <p className={styles.sidebarTitle}>{title}</p>
              <p className={styles.sidebarAffiliation}>{affiliation}</p>
              <p className={styles.education}>
                <span className={styles.degree}>{degree}</span>
                <span className={styles.educationDetail}>{minor}</span>
                <span className={styles.educationDetail}>{school}</span>
              </p>
            </div>

            <nav className={styles.sideLinks} aria-label="Contact">
              {socialLinks.map((link) => {
                const Icon = linkIcons[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={
                      link.href.startsWith('mailto:') ? undefined : '_blank'
                    }
                    rel={
                      link.href.startsWith('mailto:')
                        ? undefined
                        : 'noopener noreferrer'
                    }
                    className={styles.sideLink}>
                    <Icon
                      className={styles.linkIcon}
                      size={16}
                      weight="duotone"
                      aria-hidden
                    />
                    {link.label}
                  </a>
                );
              })}
              <a
                href={resumeUrl}
                className={styles.sideLink}
                target="_blank"
                rel="noopener noreferrer">
                <FileTextIcon
                  className={styles.linkIcon}
                  size={16}
                  weight="duotone"
                  aria-hidden
                />
                CV
              </a>
            </nav>
          </aside>

          <div className={styles.content}>
            <section className={styles.section} aria-labelledby="about-heading">
              <h2 id="about-heading" className={styles.sectionTitle}>
                About
              </h2>
              <p className={styles.bio}>
                {bioLead}{' '}
                <a href={advisorUrl} target="_blank" rel="noopener noreferrer">
                  {advisorName}
                </a>
                .
              </p>
              <p className={styles.bio}>{bioInterest}</p>
              <p className={styles.bio}>
                {bioCareerLead}{' '}
                <a href={companyUrl} target="_blank" rel="noopener noreferrer">
                  {companyName}
                </a>
                {bioCareerTrail}
              </p>
              <p className={styles.bio}>{bioCareerImpact}</p>
              <p className={styles.aside}>
                {asideLead}
                <br />
                {asideItems.map((item, i, all) => {
                  const Icon = asideIcons[item.icon];
                  return (
                    <React.Fragment key={item.label}>
                      {i > 0 && (i === all.length - 1 ? ', and ' : ', ')}
                      <span className={styles.asideItem}>
                        <Icon
                          className={styles.asideIcon}
                          size={16}
                          weight="duotone"
                          aria-hidden
                        />
                        {item.label}
                      </span>
                    </React.Fragment>
                  );
                })}
                .
              </p>
            </section>

            <section
              className={styles.section}
              aria-labelledby="research-heading">
              <h2 id="research-heading" className={styles.sectionTitle}>
                Research
              </h2>
              <ol className={styles.pubList}>
                {research.map((item, index) => (
                  <li key={item.title} className={styles.pubItem}>
                    [{index + 1}] {authorList(item.authors)}, “
                    <span className={styles.pubTitle}>{item.title}</span>,”{' '}
                    <em className={styles.pubVenue}>{item.venue}</em>,{' '}
                    {item.year}.
                    {item.links.map((link) => (
                      <React.Fragment key={link.label}>
                        {' '}
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.pubLink}>
                          [{link.label}]
                        </a>
                      </React.Fragment>
                    ))}
                  </li>
                ))}
              </ol>
            </section>


            <section
              className={styles.section}
              aria-labelledby="experience-heading">
              <h2 id="experience-heading" className={styles.sectionTitle}>
                Professional Experience
              </h2>
              <ul className={styles.workList}>
                {industry.map((item) => (
                  <li key={item.title} className={styles.workItem}>
                    <h3 className={styles.workTitle}>{item.title}</h3>
                    {paragraphs(item.description).map((paragraph) => (
                      <p key={paragraph} className={styles.workDescription}>
                        {paragraph}
                      </p>
                    ))}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}

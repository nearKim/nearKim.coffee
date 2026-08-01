/**
 * Site content. Flat constants — edit text here, layout stays in index.tsx.
 */

export const name = 'In Keun Kim';
export const title = 'M.S. in Computer Science · Dec 2026';
export const affiliation = 'Columbia University';
export const degree = 'B.S. in Industrial Engineering';
export const minor = 'Minor in Computer Science';
export const school = 'Seoul National University';
export const advisorName = 'Professor Baishakhi Ray';
export const advisorUrl = 'https://www.rayb.info/';
/** Portraits live in static/img; the dark variant swaps in with the dark theme. */
export const photoSrcLight = '/img/portrait-light.webp';
export const photoSrcDark = '/img/portrait-dark.webp';
export const photoAlt = 'Portrait of In Keun Kim';
/**
 * Search/social meta only. Kept separate from bio because engines truncate
 * around 160 characters, and the About copy is longer than that.
 */
export const description =
  'M.S. student at Columbia researching trustworthy AI for software engineering with Professor Baishakhi Ray.';

/** First About sentence ends before the advisor name; the page links `advisorName`. */
export const bioLead =
  'I am an M.S. student in Computer Science at Columbia University, advised by';

export const bioInterest =
  'I am currently interested in trustworthy AI for software engineering, particularly cybersecurity software agents and methods for validating AI-generated software changes.';

/** Career sentence wraps `companyName` / `companyUrl` as a link. */
export const bioCareerLead =
  'Before Columbia, I spent more than six years as a software engineer, primarily at';
export const companyName = 'Toss';
export const companyUrl = 'https://toss.im/en/team';
export const bioCareerTrail =
  ', a financial super app used by more than half of South Korea’s population.';
export const bioCareerImpact =
  'I built production systems for real-time fraud detection, personalized advertising recommendation and inference, and unified multi-model LLM serving, among others.';

export const asideLead = 'Outside research, I enjoy';
export const asideItems = [
  {label: 'scotch whisky', icon: 'whisky' as const},
  {label: 'specialty coffee', icon: 'coffee' as const},
  {label: 'cats', icon: 'cat' as const},
];

export const socialLinks = [
  {href: 'mailto:ik2619@columbia.edu', label: 'Email', icon: 'mail' as const},
  {href: 'https://github.com/nearKim', label: 'GitHub', icon: 'github' as const},
  {
    href: 'https://www.linkedin.com/in/nearkim',
    label: 'LinkedIn',
    icon: 'linkedin' as const,
  },
];

export const resumeUrl = '/resume.pdf';
export const portfolioUrl = '/portfolio.pdf';

/** Public research only; double-anonymous manuscripts stay out of the site. */
export const research = [
  {
    authors:
      'Elaine Ang, Sam Weldon, In Keun Kim, Kevin Durand, Kostis Kaffes, and Eugene Wu',
    title: 'BranchBench: Aligning Database Branching with Agentic Demands',
    venue: 'arXiv preprint',
    year: 2026,
    links: [{label: 'arXiv', href: 'https://arxiv.org/abs/2604.17180'}],
  },
];
export const industry = [
  {
    title: 'Personalized Advertisement Inference Platform',
    description: [
      'Built and operated a production deep-learning inference path that served personalized ads at over 6,000 requests per second with p95 latency under 70 milliseconds, including traffic splitting for online experiments and hourly model rollout without downtime.',
      'Led an architecture redesign that cut more than 1,500 lines of duplicated serving logic, reduced pod memory by 25 percent, and shortened new API delivery from about a day to under three hours—making it practical to ship and validate model and ranking changes on a tight loop.',
    ],
  },
  {
    title: 'Real-Time Fraud Detection System',
    description:
      'Owned real-time fraud scoring and transaction blocking that protected users under strict latency budgets (p95 ≈ 200 ms, p99.9 ≈ 600 ms) while scoring against more than 1 TB of live features—turning model decisions into reliable, low-latency controls in a high-stakes financial environment.',
  },
  {
    title: 'LLM Serving Platform',
    description:
      'Built a unified platform for serving in-house and hosted language models with shared request interfaces, retrieval over internal knowledge, and batching—so product teams could evaluate and ship model-backed features without each owning a separate serving stack.',
  },
];

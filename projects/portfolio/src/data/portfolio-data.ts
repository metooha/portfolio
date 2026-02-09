import hobby1Image from "@/assets/10d0cda067425d00b1609b442126311a8c2ef767.png"
import hobby2Image from "@/assets/10d0cda067425d00b1609b442126311a8c2ef767.png"
import hobby5Image from "@/assets/567818549e99611135158f0a0441ebe5b9e55fbc.png"
import hobby7Image from "@/assets/c159c06a416c7949298dd8b48d728f465f8a4227.png"

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  year: string;
  client: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Hobby {
  id: string;
  name: string;
  metric: string;
  description: string;
  image: string;
}

export interface OtherWork {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "E-Commerce Platform Redesign",
    subtitle: "Transforming the digital shopping experience",
    description: "A complete redesign of a major e-commerce platform serving over 2 million users",
    image: "https://images.unsplash.com/photo-1666723043169-22e29545675c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2ODY5Nzc2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "UX/UI Design",
    year: "2024",
    client: "TechRetail Inc.",
    role: "Lead Product Designer",
    challenge: "The existing platform had a 68% cart abandonment rate and poor mobile experience. Users struggled with navigation and checkout processes.",
    solution: "Implemented a user-centered design approach with extensive user testing, streamlined checkout flow, and responsive mobile-first design. Created a comprehensive design system for consistency.",
    results: [
      "Reduced cart abandonment by 35%",
      "Increased mobile conversions by 52%",
      "Improved user satisfaction scores from 3.2 to 4.7/5",
      "Decreased checkout time by 40%"
    ]
  },
  {
    id: "2",
    title: "Healthcare App for Seniors",
    subtitle: "Empowering elderly users with technology",
    description: "Mobile application designed to help seniors manage medications and appointments",
    image: "https://images.unsplash.com/photo-1760071744047-5542cbfda184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRmb2xpbyUyMGRlc2lnbnxlbnwxfHx8fDE3Njg2NzQ1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Mobile Design",
    year: "2023",
    client: "HealthCare Solutions",
    role: "Senior UX Designer",
    challenge: "Creating an intuitive interface for users aged 65+ with varying levels of tech literacy and potential vision/motor skill limitations.",
    solution: "Conducted extensive research with target users, implemented large touch targets, high contrast colors, simple navigation patterns, and voice command features.",
    results: [
      "95% task completion rate among senior users",
      "Featured in Apple App Store's Apps We Love",
      "80% daily active user retention",
      "Winner of Accessibility Design Award 2023"
    ]
  },
  {
    id: "3",
    title: "FinTech Dashboard Analytics",
    subtitle: "Data visualization for financial insights",
    description: "Complex analytics dashboard for institutional investors and financial advisors",
    image: "https://images.unsplash.com/photo-1759322945173-76b604965b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwc2V0dXB8ZW58MXx8fHwxNzY4NzU1MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Data Visualization",
    year: "2024",
    client: "InvestTech Global",
    role: "Product Designer & Data Viz Specialist",
    challenge: "Presenting complex financial data in an accessible, actionable format for users managing multi-million dollar portfolios.",
    solution: "Designed interactive data visualizations with customizable views, real-time updates, and predictive analytics. Implemented progressive disclosure to manage information density.",
    results: [
      "Reduced decision-making time by 45%",
      "Increased platform adoption by 78%",
      "$12M in new client acquisitions attributed to platform",
      "Industry recognition: Best FinTech Dashboard 2024"
    ]
  },
  {
    id: "4",
    title: "Smart Home IoT Integration",
    subtitle: "Seamless control of connected devices",
    description: "Unified interface for controlling smart home devices across multiple brands",
    image: "https://images.unsplash.com/photo-1631248971944-690bb58735b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwb2ZmaWNlJTIwc3BhY2V8ZW58MXx8fHwxNzY4NzMyNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "IoT Design",
    year: "2023",
    client: "SmartLife Technologies",
    role: "Lead UX/UI Designer",
    challenge: "Creating a cohesive experience for devices from 15+ manufacturers with different protocols and capabilities.",
    solution: "Developed a universal design language, created intuitive grouping and automation features, and implemented contextual controls based on device type and location.",
    results: [
      "Connected 500K+ homes in first year",
      "4.8/5 average user rating",
      "Partnerships with 23 major device manufacturers",
      "Featured in TechCrunch's Best of CES"
    ]
  },
  {
    id: "5",
    title: "Educational Platform for Kids",
    subtitle: "Making learning fun and interactive",
    description: "Gamified learning platform for elementary school students",
    image: "https://images.unsplash.com/photo-1735639013995-086e648eaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3Njg3Mzg2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "EdTech",
    year: "2023",
    client: "LearnPlay Education",
    role: "Senior Product Designer",
    challenge: "Balancing educational effectiveness with engaging gameplay for ages 6-12 while maintaining parental controls.",
    solution: "Designed progressive difficulty systems, reward mechanics, collaborative features, and comprehensive parent dashboards. Conducted extensive testing with students and teachers.",
    results: [
      "Used by 1.2M students across 5,000 schools",
      "Average 30-minute daily engagement",
      "Improved test scores by 23% on average",
      "Partnered with major education publishers"
    ]
  },
  {
    id: "6",
    title: "Corporate Sustainability Tracker",
    subtitle: "Monitoring environmental impact at scale",
    description: "Enterprise platform for tracking and reporting corporate sustainability metrics",
    image: "https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5fGVufDF8fHx8MTc2ODY1Nzc1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Enterprise Software",
    year: "2024",
    client: "GreenMetrics Corp",
    role: "Lead Designer",
    challenge: "Creating a comprehensive yet intuitive system for tracking complex sustainability data across global operations.",
    solution: "Designed modular reporting system, automated data collection workflows, and AI-powered insights dashboard. Focused on compliance and regulatory reporting features.",
    results: [
      "Adopted by 150+ Fortune 500 companies",
      "Saved average 200 hours/month in reporting",
      "Helped clients reduce carbon footprint by 18%",
      "Compliance rate improved to 99.7%"
    ]
  }
];

export const workExperience: WorkExperience[] = [
  {
    id: "1",
    title: "Senior Product Designer",
    company: "TechCorp Global",
    period: "2022 - Present",
    description: "Leading design initiatives for enterprise SaaS products serving Fortune 500 clients.",
    achievements: [
      "Led redesign of flagship product resulting in 40% increase in user engagement",
      "Established company-wide design system adopted across 12 products",
      "Mentored team of 5 junior designers",
      "Facilitated cross-functional workshops with engineering and product teams"
    ]
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "StartupHub Inc.",
    period: "2020 - 2022",
    description: "Designed user experiences for fast-paced startup environment across web and mobile platforms.",
    achievements: [
      "Designed 0-to-1 mobile app that reached 500K downloads in 6 months",
      "Conducted user research with 200+ participants to inform product decisions",
      "Reduced customer support tickets by 35% through improved UX",
      "Collaborated with developers to implement design system in React"
    ]
  },
  {
    id: "3",
    title: "Junior UX Designer",
    company: "DesignStudio Agency",
    period: "2018 - 2020",
    description: "Worked on diverse client projects ranging from e-commerce to healthcare applications.",
    achievements: [
      "Contributed to 25+ client projects across various industries",
      "Developed wireframes and prototypes using Figma and Adobe XD",
      "Conducted usability testing and presented findings to stakeholders",
      "Won Best Junior Designer award 2019"
    ]
  }
];

export const hobbies: Hobby[] = [
  {
    id: "1",
    name: "Countries Visited",
    metric: "32+",
    description: "Countries explored across 6 continents",
    image: hobby1Image
  },
  {
    id: "2",
    name: "Distance Ridden",
    metric: "4,345 mi.",
    description: "Mountain biking trails conquered",
    image: hobby2Image
  },
  {
    id: "3",
    name: "Plants Growing",
    metric: "140+",
    description: "Varieties of plants in collection",
    image: "https://images.unsplash.com/photo-1759322945173-76b604965b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwc2V0dXB8ZW58MXx8fHwxNzY4NzU1MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "4",
    name: "National Parks",
    metric: "18",
    description: "National parks visited and hiked",
    image: "https://images.unsplash.com/photo-1631248971944-690bb58735b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwb2ZmaWNlJTIwc3BhY2V8ZW58MXx8fHwxNzY4NzMyNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "5",
    name: "Wipe Outs",
    metric: "100+",
    description: "Snowboarding crashes survived",
    image: hobby5Image
  },
  {
    id: "6",
    name: "Fish Caught",
    metric: "30+",
    description: "Fish caught and released",
    image: "https://images.unsplash.com/photo-1735639013995-086e648eaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3Njg3Mzg2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "7",
    name: "Board Games",
    metric: "32",
    description: "Board games in collection",
    image: hobby7Image
  },
  {
    id: "8",
    name: "Fur Baby",
    metric: "1",
    description: "Beloved furry companion",
    image: "https://images.unsplash.com/photo-1760071744047-5542cbfda184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRmb2xpbyUyMGRlc2lnbnxlbnwxfHx8fDE3Njg2NzQ1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export const otherWork: OtherWork[] = [
  {
    id: "1",
    title: "Brand Identity Projects",
    description: "Collection of logo designs and brand guidelines for startups and small businesses",
    image: "https://images.unsplash.com/photo-1666723043169-22e29545675c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2ODY5Nzc2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Branding"
  },
  {
    id: "2",
    title: "Illustration Series",
    description: "Digital illustrations for editorial content and marketing materials",
    image: "https://images.unsplash.com/photo-1760071744047-5542cbfda184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRmb2xpbyUyMGRlc2lnbnxlbnwxfHx8fDE3Njg2NzQ1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Illustration"
  },
  {
    id: "3",
    title: "Icon Sets",
    description: "Custom icon libraries for various projects and products",
    image: "https://images.unsplash.com/photo-1759322945173-76b604965b2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwc2V0dXB8ZW58MXx8fHwxNzY4NzU1MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Icons"
  },
  {
    id: "4",
    title: "Motion Graphics",
    description: "Animated explainer videos and product demonstrations",
    image: "https://images.unsplash.com/photo-1631248971944-690bb58735b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwb2ZmaWNlJTIwc3BhY2V8ZW58MXx8fHwxNzY4NzMyNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Motion"
  }
];
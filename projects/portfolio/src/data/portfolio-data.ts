import hobby1Image from "@/assets/10d0cda067425d00b1609b442126311a8c2ef767.png"
import hobby2Image from "@/assets/10d0cda067425d00b1609b442126311a8c2ef767.png"
import hobby5Image from "@/assets/567818549e99611135158f0a0441ebe5b9e55fbc.png"
import hobby7Image from "@/assets/c159c06a416c7949298dd8b48d728f465f8a4227.png"

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
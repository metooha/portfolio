import hobby1Image from "@/app/assets/pages/about/hobbies/countries-visited.png"
import hobby2Image from "@/app/assets/pages/about/hobbies/distance-ridden.png"
import hobby5Image from "@/app/assets/pages/about/hobbies/wipe-outs.png"
import hobby7Image from "@/app/assets/pages/about/hobbies/board-games.png"

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

export type OtherWorkMediaType = "image" | "video";

export interface OtherWorkMedia {
  src: string;
  type: OtherWorkMediaType;
  /** Short caption shown beneath the media in the detail gallery. */
  caption?: string;
  /** Optional gallery section label for grouped projects. */
  section?: string;
  /** Span two columns in the gallery grid for hero/wide pieces. */
  wide?: boolean;
  /** Show native video controls instead of gif-style autoplay loop. */
  controls?: boolean;
}

export interface OtherWork {
  id: string;
  title: string;
  /** Short blurb for the Other Work card. */
  description: string;
  /** Cover image for card + detail header. */
  image: string;
  category: string;
  /** Role played on the project (detail header). */
  role?: string;
  /** Year or range (detail header). */
  year?: string;
  /** Longer narrative for the detail page overview. */
  overview?: string;
  /** Gallery of images and videos shown on the detail page. */
  media: OtherWorkMedia[];
}

const otherWorkAssetModules = import.meta.glob(
  "../assets/pages/other-work/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,svg,gif,GIF,mp4,MP4}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

/** Resolve an other-work asset by its path relative to the `other-work/` folder. */
function owAsset(relPath: string): string {
  const suffix = `/other-work/${relPath}`;
  const key = Object.keys(otherWorkAssetModules).find((k) => k.endsWith(suffix));
  if (!key) {
    console.warn(`[portfolio-data] Other work asset not found: ${relPath}`);
    return "";
  }
  return otherWorkAssetModules[key];
}

/** Build a gallery media item, inferring image vs. video from the extension. */
function owMedia(
  relPath: string,
  caption?: string,
  opts: { section?: string; wide?: boolean; controls?: boolean } = {},
): OtherWorkMedia {
  return {
    src: owAsset(relPath),
    type: /\.(mp4|mov)$/i.test(relPath) ? "video" : "image",
    caption,
    section: opts.section,
    wide: opts.wide,
    controls: opts.controls,
  };
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
    id: "wm-illustration",
    title: "WM Brand Illustration & Motion",
    description:
      "A library of branded illustrations, isometric process diagrams, and animated social content that told Waste Management's sustainability story.",
    image: owAsset("wm/wm-cover.jpg"),
    category: "Illustration & Motion",
    role: "Illustrator & Motion Designer",
    year: "Waste Management",
    overview:
      "Beyond the design system work, I created the visual storytelling layer for WM's sustainability and national-accounts messaging: custom scenes, isometric process diagrams, and animated pieces for social and the app store. Everything stayed on-brand while making dense operational content feel approachable.",
    media: [
      owMedia("wm/illustrations/SustyForum-Hero3.svg", "Sustainability Forum hero", { wide: true }),
      owMedia("wm/illustrations/iosmetric-square-processes.jpg", "Isometric process diagram"),
      owMedia("wm/illustrations/iosmetric-triangle-processes.jpg", "Isometric process diagram"),
      owMedia("wm/illustrations/wm-1@2x-100.jpg", "Brand illustration"),
      owMedia("wm/illustrations/wm-2@2x-100.jpg", "Brand illustration"),
      owMedia("wm/illustrations/National_Accounts-03.jpg", "National Accounts hero illustration"),
      owMedia("wm/illustrations/wm.5@2x-100.jpg", "Brand illustration"),
      owMedia("wm/illustrations/wm-7@2x-100.jpg", "Brand illustration"),
      owMedia("wm/illustrations/Earth-Day-Instagram.png", "Earth Day social post"),
      owMedia("wm/video/App Store Preview_iPhone_V2 2.mp4", "App Store preview animation", { controls: true }),
      owMedia("wm/video/earth day.MP4", "Earth Day motion piece", { controls: true }),
    ],
  },
  {
    id: "academy-catalogs",
    title: "Academy Sports Catalog Design",
    description:
      "Quarterly direct mail catalogs across golf, fishing, and hunting—from concept through print production, balancing brand consistency with category-specific storytelling.",
    image: owAsset("academy/catalogs/cover.jpg"),
    category: "Print & Branding",
    role: "Brand Designer",
    year: "Academy Sports + Outdoors",
    overview:
      "Academy Sports + Outdoors needed quarterly direct mail catalogs spanning diverse sporting categories. I designed cohesive campaigns from conception through print production, maintaining brand consistency while bringing each sport's unique story to life.",
    media: [
      owMedia("academy/catalogs/golf/1.jpg", "Golf catalog cover", { section: "Golf", wide: true }),
      owMedia("academy/catalogs/golf/2-3.jpg", "Golf catalog interior", { section: "Golf" }),
      owMedia("academy/catalogs/golf/4-5.jpg", "Golf catalog spread", { section: "Golf" }),
      owMedia("academy/catalogs/golf/6.jpg", "Golf catalog back", { section: "Golf" }),
      owMedia("academy/catalogs/fresh-water/1.jpg", "Fresh water catalog cover", {
        section: "Fresh Water Fishing",
        wide: true,
      }),
      owMedia("academy/catalogs/fresh-water/2-3.jpg", "Fresh water catalog interior", {
        section: "Fresh Water Fishing",
      }),
      owMedia("academy/catalogs/fresh-water/4-5.jpg", "Fresh water catalog spread", {
        section: "Fresh Water Fishing",
      }),
      owMedia("academy/catalogs/fresh-water/6.jpg", "Fresh water catalog back", {
        section: "Fresh Water Fishing",
      }),
      owMedia("academy/catalogs/saltwater/1.jpg", "Saltwater catalog cover", {
        section: "Saltwater Fishing",
        wide: true,
      }),
      owMedia("academy/catalogs/saltwater/2-3.jpg", "Saltwater catalog interior", {
        section: "Saltwater Fishing",
      }),
      owMedia("academy/catalogs/saltwater/4-5.jpg", "Saltwater catalog spread", {
        section: "Saltwater Fishing",
      }),
      owMedia("academy/catalogs/saltwater/6.jpg", "Saltwater catalog back", {
        section: "Saltwater Fishing",
      }),
      owMedia("academy/catalogs/ducks-unlimited/1.jpg", "Ducks Unlimited cover", {
        section: "Ducks Unlimited",
        wide: true,
      }),
      owMedia("academy/catalogs/ducks-unlimited/2-3.jpg", "Ducks Unlimited interior", {
        section: "Ducks Unlimited",
      }),
      owMedia("academy/catalogs/ducks-unlimited/4-5.jpg", "Ducks Unlimited spread", {
        section: "Ducks Unlimited",
      }),
      owMedia("academy/catalogs/ducks-unlimited/6.jpg", "Ducks Unlimited back", {
        section: "Ducks Unlimited",
      }),
    ],
  },
  {
    id: "academy-social",
    title: "Academy Sports Social & Infographics",
    description:
      "Animated social campaigns and sport infographics spanning back-to-school, seasonal, and category launches for Academy Sports + Outdoors.",
    image: owAsset("academy/academy-sports-outdoors-logo.png"),
    category: "Motion & Social",
    role: "Brand Designer",
    year: "Academy Sports + Outdoors",
    overview:
      "Fast-turn social content and product infographics built to move across a huge sporting-goods catalog. I designed animated posts for seasonal moments and category pushes, plus reference infographics that made gear decisions easy for shoppers.",
    media: [
      owMedia("academy/social/Baseball-Gloves.gif", "Baseball gloves animation", { section: "Social" }),
      owMedia("academy/social/Softball2.gif", "Softball campaign animation", { section: "Social" }),
      owMedia("academy/social/Uniforms.gif", "Team uniforms animation", { section: "Social" }),
      owMedia("academy/social/Brooks2.gif", "Brooks running animation", { section: "Social" }),
      owMedia("academy/social/tennis.gif", "Tennis category animation", { section: "Social" }),
      owMedia("academy/social/Backpacks.mp4", "Back-to-school backpacks", { section: "Social" }),
      owMedia("academy/social/Gifts Under $40 1200X628.mp4", "Gifts under $40 promo", { section: "Social" }),
      owMedia("academy/social/Merry Christmast 2_3.mp4", "Holiday campaign", { section: "Social" }),
      owMedia("academy/social/christmas-gifts.jpg", "Holiday gifting post", { section: "Social" }),
      owMedia("academy/social/merry-christmas.jpg", "Merry Christmas post", { section: "Social" }),
      owMedia("academy/infographics/camping-checklist-full.jpg", "Camping checklist infographic", {
        section: "Infographics",
        wide: true,
      }),
      owMedia("academy/infographics/football-Helmet-2.png", "Football helmet fit infographic", {
        section: "Infographics",
        wide: true,
      }),
    ],
  },
  {
    id: "hallyu",
    title: "Hallyu K-Beauty Campaign",
    description:
      "Illustrated identity and animated social content for a K-beauty line, blending Korean floral motifs with playful product animation.",
    image: owAsset("hallyu/hallyu-cover.jpg"),
    category: "Illustration & Motion",
    role: "Illustrator & Motion Designer",
    year: "Hallyu Beauty",
    overview:
      "A K-beauty and K-pop inspired campaign: a plum-blossom brand mark, illustrated product moments, and looping social animations for launches and Valentine's promotions. The goal was a look that felt both premium and shareable.",
    media: [
      owMedia("hallyu/Hallyu_illustrations.jpg", "Campaign illustration set", { wide: true }),
      owMedia("hallyu/Blush-Animation-pink.gif", "Blush product animation"),
      owMedia("hallyu/Cilo-lip.gif", "Lip product animation"),
      owMedia("hallyu/V-DAY-Sale-Social.gif", "Valentine's Day sale post"),
      owMedia("hallyu/BTS-Carousel-Insta.gif", "Instagram carousel animation"),
      owMedia("hallyu/bts.jpg", "BTS collection artwork"),
      owMedia("hallyu/bts-2.jpg", "BTS collection artwork"),
    ],
  },
  {
    id: "logos",
    title: "Logo & Mark Design",
    description:
      "Custom logo marks for small businesses and passion brands, from illustrative wildlife to playful wordmarks.",
    image: owAsset("logos/logos-cover.jpg"),
    category: "Branding",
    role: "Logo Designer",
    year: "Freelance",
    overview:
      "A set of logo marks created for small businesses and personal brands. Each one starts from the owner's story and lands on a mark that's flexible enough for signage, apparel, and digital, with an illustrative streak I keep coming back to.",
    media: [
      owMedia("logos/crawdad-kings.jpg", "Crawdad Kings mark"),
      owMedia("logos/mcfly-rods@.jpg", "McFly Rods mark"),
      owMedia("logos/couch-coasters.jpg", "Couch Coasters mark"),
    ],
  },
  {
    id: "portraits",
    title: "Portrait & Caricature Illustration",
    description:
      "Personal digital portrait and caricature commissions celebrating weddings, milestones, and friends.",
    image: owAsset("drawings/personal-cover.jpg"),
    category: "Illustration",
    role: "Illustrator",
    year: "Personal & Commissions",
    overview:
      "Personal illustration work: digital portraits and caricatures made for weddings, gifts, and milestones. These pieces keep my drawing skills sharp and are where I experiment with color, likeness, and character before it shows up in client work.",
    media: [
      owMedia("drawings/hiromi.png", "Wedding portrait", { wide: true }),
      owMedia("drawings/john.jpg", "Portrait commission", { wide: true }),
      owMedia("drawings/michelle.jpg", "Portrait commission", { wide: true }),
      owMedia("drawings/takako.jpg", "Portrait commission", { wide: true }),
      owMedia("drawings/yuko-and-mayumi.jpeg", "Portrait commission", { wide: true }),
      owMedia("drawings/samurai-blue.jpg", "Samurai character illustration"),
      owMedia("drawings/samuri-red.jpg", "Samurai character illustration"),
      owMedia("drawings/Chris&Ghanda.jpg", "Couple caricature", { wide: true }),
    ],
  },
];
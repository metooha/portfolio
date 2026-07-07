export interface Prototype {
  id: string;
  name: string;
  description: string;
  url: string;
}

export const prototypes: Prototype[] = [
  {
    id: "px-sub-theme-editor",
    name: "Partner Experience Kit",
    description:
      "Living Design 3.5 theme editor and component library for creating and previewing sub-themes.",
    url: "https://metooha.github.io/px-sub-theme-editor/",
  },
  {
    id: "font-compare",
    name: "Font Compare",
    description: "Side-by-side font comparison tool for Walmart and Sam's Club type systems.",
    url: "https://metooha.github.io/font-compare/",
  },
  {
    id: "auto-reorder",
    name: "Auto Reorder",
    description:
      "Walmart Auto Reorder prototype for replenishment onboarding, purchase history, and order management.",
    url: "https://metooha.github.io/auto-reorder/",
  },
  {
    id: "walmart-connect",
    name: "Walmart Connect",
    description:
      "Walmart Connect advertising platform UI prototype for campaign management, analytics, and ad center workflows.",
    url: "https://metooha.github.io/walmart-connect/",
  },
];

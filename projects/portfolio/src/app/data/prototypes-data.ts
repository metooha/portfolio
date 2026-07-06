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
];

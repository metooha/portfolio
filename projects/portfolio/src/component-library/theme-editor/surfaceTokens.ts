export const BASE_SURFACE_TOKENS = [
  {
    token: '--ld-semantic-color-surface',
    label: 'Surface',
    description: 'Default page and card backgrounds.',
    components: ['Page', 'Card', 'Modal', 'Sheet'],
  },
  {
    token: '--ld-semantic-color-surface-subtle',
    label: 'Surface · subtle',
    description: 'Subtle gray backgrounds for sections, tables, and menus.',
    components: ['Table', 'Menu', 'Banner'],
  },
  {
    token: '--ld-semantic-color-fill-brand-subtle',
    label: 'Fill · brand subtle',
    description: 'Light brand-tinted backgrounds for headers and highlights.',
    components: ['Page Header', 'Category Nav'],
  },
] as const;

/**
 * Lints CSS for design-token compliance.
 *
 * Component/pattern CSS must reference the LD design tokens via
 * `var(--ld-...)` — raw hex colors and named CSS color keywords are
 * banned so the system can re-theme without code edits. Theme files
 * under `src/themes/**` define the tokens themselves and are exempt.
 */
module.exports = {
  plugins: ['stylelint-declaration-strict-value'],
  rules: {},
  overrides: [
    {
      files: ['src/components/**/*.css', 'src/patterns/**/*.css'],
      rules: {
        // Ban any `#RGB`, `#RRGGBB`, `#RRGGBBAA` literal.
        'color-no-hex': true,
        // Require a token (a `var(--...)` reference) for every color-bearing
        // property. Permits `transparent`, `currentColor`, and `inherit`
        // because they don't reify a specific color value.
        'scale-unlimited/declaration-strict-value': [
          ['/color/', 'fill', 'stroke', 'background', 'background-color', 'border', 'border-color', 'box-shadow', 'outline-color'],
          {
            ignoreValues: ['transparent', 'currentColor', 'inherit', 'none', 'unset', 'initial'],
            disableFix: true,
          },
        ],
      },
    },
  ],
};

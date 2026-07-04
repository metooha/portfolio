import type { CSSProperties, SVGProps } from "react";

type SocialIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const defaultStyle = (size: number): CSSProperties => ({
  width: size,
  height: size,
  display: "block",
});

export function InstagramIcon({ size = 20, style, ...props }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      style={{ ...defaultStyle(size), ...style }}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MailIcon({ size = 20, style, ...props }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      style={{ ...defaultStyle(size), ...style }}
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function LinkedInIcon({ size = 20, style, ...props }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ ...defaultStyle(size), ...style }}
      {...props}
    >
      <path d="M6.5 8.5h3v11h-3v-11zm1.5-6a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM9.5 8.5h2.9v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v6.46h-3v-5.73c0-1.37-.03-3.13-1.9-3.13-1.9 0-2.19 1.49-2.19 3.03v5.83h-3v-11z" />
    </svg>
  );
}

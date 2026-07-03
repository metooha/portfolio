import * as React from 'react';
import {Body, Caption, Heading} from '@/living-design/components/Text/Text';
import {Illustration, IllustrationType, IllustrationName} from '@/living-design/utils/Illustration';
import {MEDIA_SVGS, MEDIA_IMAGES} from '@/living-design/media';

// ---------------------------------------------------------------------------
// Page Wrapper
// ---------------------------------------------------------------------------
export function PageWrapper({title, description, children, category}: {title: string; description: string; children: React.ReactNode; category?: string}) {
  return (
    <div style={{ minWidth: 0 }}>
      {/* Hero Section */}
      <div style={{
        backgroundColor: '#F0F5FF',
        padding: '32px 40px 24px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'flex-start',
          maxWidth: '1400px',
          margin: '0 auto',
          minWidth: 0,
        }}>
          <div style={{ flex: '0 1 440px', minWidth: 0, maxWidth: '480px' }}>
            {category && (
              <Caption as="span" weight="alt" style={{
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '12px',
                color: '#74767C',
                display: 'block',
                marginBottom: '16px',
              }}>
                {category}
              </Caption>
            )}
            <Heading as="h1" size="large" style={{
              fontSize: '48px',
              fontWeight: 700,
              lineHeight: '1.2',
              color: '#2E2F32',
              margin: 0,
            }}>
              {title}
            </Heading>
          </div>
          <div style={{ flex: '1 1 360px', minWidth: 0, paddingTop: 0 }}>
            <Body as="p" size="large" color="subtle" style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#74767C',
              margin: 0,
              maxWidth: '520px',
              width: '100%',
              whiteSpace: 'normal',
              overflowWrap: 'anywhere',
            }}>
              {description}
            </Body>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div style={{ padding: '32px 40px 48px', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Example Card
// ---------------------------------------------------------------------------
export function ExampleCard({children}: {children: React.ReactNode}) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '32px',
      borderRadius: '8px',
      border: '1px solid #E6E6E8',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      containerType: 'inline-size',
    }}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Example Section
// ---------------------------------------------------------------------------
export function ExampleSection({title, description, children}: {title?: string; description?: string; children: React.ReactNode}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      {(title || description) && (
        <div style={{ marginBottom: '16px' }}>
          {title && (
            <Heading
              as="h2"
              size="small"
              style={{
                margin: description ? '0 0 8px 0' : '0',
                display: 'block',
                lineHeight: '1.2'
              }}
            >
              {title}
            </Heading>
          )}
          {description && (
            <Body as="p" size="medium" color="subtle" style={{ margin: 0, lineHeight: '1.5' }}>
              {description}
            </Body>
          )}
        </div>
      )}
      <ExampleCard>{children}</ExampleCard>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Use Case Section
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Icon Grid – renders a grid of icons from a font class prefix
// ---------------------------------------------------------------------------
export function IconGrid({icons, cssClass}: {icons: string[]; cssClass: string}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))',
        gap: '12px',
      }}
    >
      {icons.map((iconName) => (
        <div
          key={iconName}
          title={iconName}
          style={{
            minHeight: '92px',
            padding: '12px 8px',
            border: '1px solid #E6E6E8',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            textAlign: 'center',
          }}
        >
          <i
            aria-hidden="true"
            className={`${cssClass} ${cssClass}-${iconName}`}
            style={{fontSize: '24px'}}
          />
          <span style={{fontSize: '12px', lineHeight: 1.3, color: '#4A4D53'}}>{iconName}</span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Illustration Grid – renders a grid of inline SVG illustrations
// ---------------------------------------------------------------------------
export function IllustrationGrid<T extends IllustrationType>({
  type,
  items,
  minCellPx = 180,
}: {
  type: T;
  items: Array<{name: string; width: number; height: number}>;
  minCellPx?: number;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minCellPx}px, 1fr))`,
        gap: '16px',
      }}
    >
      {items.map(({name, width, height}) => {
        const aspectRatio = width > 0 && height > 0 ? `${width} / ${height}` : '1 / 1';
        return (
          <div
            key={name}
            title={name}
            style={{
              padding: '16px 12px',
              border: '1px solid #E6E6E8',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              background: '#fff',
            }}
          >
            <Illustration
              type={type}
              name={name as IllustrationName<T>}
              style={{width: '100%', aspectRatio}}
            />
            <span style={{fontSize: '12px', color: '#4A4D53', textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-word'}}>
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Media Grid – renders a grid of brand-media assets (inline SVG + PNG)
// ---------------------------------------------------------------------------
export type MediaGridItem = {
  /** Key into MEDIA_SVGS / MEDIA_IMAGES for the active theme. */
  name: string;
  kind: 'svg' | 'png';
  width: number;
  height: number;
};

export type MediaGridBackground = 'split' | 'dark' | 'light';

// Light: pure white. Dark: medium-gray (#3A3D44) — matches the kit's existing
// subtle-text gray and gives white inverse art enough contrast without
// resorting to near-black. Split renders both halves on every tile so any
// asset is visible without per-asset background guessing.
const MEDIA_BACKGROUNDS: Record<MediaGridBackground, {
  cell: string;
  border: string;
  label: string;
}> = {
  split: {
    cell:
      'linear-gradient(90deg, #ffffff 0%, #ffffff 50%, #3A3D44 50%, #3A3D44 100%)',
    border: '#E6E6E8',
    label: '#4A4D53',
  },
  dark:  { cell: '#3A3D44', border: '#3A3D44', label: '#E6E6E8' },
  light: { cell: '#ffffff', border: '#E6E6E8', label: '#4A4D53' },
};

export function MediaGrid({
  themeKey,
  items,
  minCellPx = 180,
  background = 'split',
}: {
  /** Media theme key (e.g. `wcp`, `walmart-business`, `sams-club-maverick`). */
  themeKey: string;
  items: MediaGridItem[];
  minCellPx?: number;
  /** Tile background mode. Toggled by the consumer via a toolbar control. */
  background?: MediaGridBackground;
}) {
  const svgsForTheme = MEDIA_SVGS[themeKey] ?? {};
  const imagesForTheme = MEDIA_IMAGES[themeKey] ?? {};
  const bg = MEDIA_BACKGROUNDS[background];
  return (
    <>
      {/* Force inline SVGs to fill their parent box and contain via the
          intrinsic viewBox. Required because the pipeline strips width/height
          from the SVG root to give CSS full control over sizing. */}
      <style>{`.ld-media-cell-svg svg { width: 100%; height: 100%; display: block; }`}</style>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${minCellPx}px, 1fr))`,
          gap: '16px',
        }}
      >
      {items.map(({name, kind}) => {
        return (
          <div
            key={name}
            title={name}
            style={{
              padding: '12px',
              border: `1px solid ${bg.border}`,
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: '12px',
              background: background === 'dark' ? bg.cell : '#fff',
            }}
          >
            {/* Media frame uses the active background mode. Fixed aspect ratio
                keeps titles aligned across rows regardless of source asset
                dimensions. */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 10',
                borderRadius: '6px',
                overflow: 'hidden',
                background: bg.cell,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                boxSizing: 'border-box',
              }}
            >
              {kind === 'svg' ? (
                <span
                  aria-hidden="true"
                  className="ld-media-cell-svg"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                  dangerouslySetInnerHTML={{__html: svgsForTheme[name] ?? ''}}
                />
              ) : (
                <img
                  src={imagesForTheme[name]}
                  alt={name}
                  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                />
              )}
            </div>
            <span
              style={{
                fontSize: '12px',
                color: bg.label,
                textAlign: 'center',
                lineHeight: 1.3,
                wordBreak: 'break-word',
              }}
            >
              {name}
            </span>
          </div>
        );
      })}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Use Case Section
// ---------------------------------------------------------------------------
export function UseCaseSection({title, description, children}: {title: string; description?: string; children: React.ReactNode}) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Heading 
          as="h3" 
          size="small" 
          style={{ 
            margin: description ? '0 0 16px 0' : '0',
            display: 'block',
            lineHeight: '1.2'
          }}
        >
          {title}
        </Heading>
        {description && (
          <Body as="p" size="medium" color="subtle" style={{ margin: 0, lineHeight: '1.5' }}>
            {description}
          </Body>
        )}
      </div>
      <ExampleCard>{children}</ExampleCard>
    </div>
  );
}

export const docsCardStyle: React.CSSProperties = {
  display: 'grid',
  gap: 16,
  minWidth: 0,
  padding: 16,
  border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
  borderRadius: 8,
  background: 'var(--ld-semantic-color-surface, #ffffff)',
  boxSizing: 'border-box',
};

export const docsCardHeaderStyle: React.CSSProperties = {
  display: 'grid',
  gap: 8,
  minWidth: 0,
};

export function DocsCard({
  title,
  description,
  children,
  style,
  onDark = false,
}: {
  title?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
  /** Render the header text in inverse colors for dark preview surfaces. */
  onDark?: boolean;
}) {
  return (
    <div style={{...docsCardStyle, ...style}}>
      {(title || description) && (
        <div style={{...docsCardHeaderStyle, marginBottom: description ? 8 : 0}}>
          {title && (
            <Body as="h3" size="medium" weight="alt" color={onDark ? 'inverse' : undefined} style={{margin: 0}}>
              {title}
            </Body>
          )}
          {description && (
            <Body
              as="p"
              size="small"
              color={onDark ? 'inverse' : 'subtle'}
              style={{margin: 0, lineHeight: '1.5', overflowWrap: 'anywhere'}}
            >
              {description}
            </Body>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export function DocsGrid({
  children,
  minColumnWidth = 260,
  gap = 24,
}: {
  children: React.ReactNode;
  minColumnWidth?: number;
  gap?: number;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${minColumnWidth}px, 100%), 1fr))`,
        gap,
        alignItems: 'stretch',
      }}
    >
      {children}
    </div>
  );
}

export function ComponentConfigurationCard({
  controls,
  preview,
  stack = false,
}: {
  controls: React.ReactNode;
  preview: React.ReactNode;
  /**
   * Stack the controls above a full-width preview instead of placing them
   * side by side. Use for wide previews (DataTable, table footers, page-width
   * patterns) that need more than ~50% of the card to read clearly.
   *
   * @default false
   */
  stack?: boolean;
}) {
  return (
    <div style={{...docsCardStyle, gap: 24, padding: 20, overflow: 'visible'}}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: stack
            ? '1fr'
            : 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: 24,
          alignItems: 'start',
          overflow: 'visible',
        }}
      >
        <div style={{display: 'grid', gap: 16, minWidth: 0}}>{controls}</div>
        <div style={{minWidth: 0, overflow: 'visible'}}>{preview}</div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Example Section
// ---------------------------------------------------------------------------
export function GuidelinesSection({
  description,
  defaultValue,
  children,
}: {
  description: React.ReactNode;
  defaultValue?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <ExampleSection>
      <div
        style={{
          border: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
          borderRadius: 8,
          backgroundColor: 'var(--ld-semantic-color-surface, #ffffff)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 8,
            padding: '24px 24px 20px',
          }}
        >
          <Heading as="h2" size="small" style={{margin: 0}}>
            Component Guidelines
          </Heading>
          <Body
            as="p"
            size="medium"
            color="subtle"
            style={{margin: 0, lineHeight: '1.5'}}
          >
            Implementation notes, content expectations, and default behavior for
            this component.
          </Body>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 16,
            padding: '20px 24px 24px',
            minWidth: 0,
            borderTop:
              '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
          }}
        >
          <div style={{display: 'grid', gap: 6, minWidth: 0}}>
            <Body as="span" size="small" weight="alt">
              Usage guidance
            </Body>
            <Body
              as="p"
              size="medium"
              color="subtle"
              style={{margin: 0, lineHeight: '1.5', overflowWrap: 'anywhere'}}
            >
              {description}
            </Body>
          </div>

          {defaultValue !== undefined && (
            <div
              style={{
                display: 'grid',
                gap: 6,
                paddingTop: 16,
                minWidth: 0,
                borderTop:
                  '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
              }}
            >
              <Body as="span" size="small" weight="alt">
                Default value
              </Body>
              <code
                style={{
                  alignSelf: 'start',
                  maxWidth: '100%',
                  borderRadius: 4,
                  backgroundColor:
                    'var(--ld-semantic-color-fill-subtle, #f5f5f6)',
                  color: 'var(--ld-semantic-color-text, #2e2f32)',
                  fontSize: 13,
                  lineHeight: '20px',
                  padding: '4px 8px',
                  overflowWrap: 'anywhere',
                  whiteSpace: 'normal',
                }}
              >
                {defaultValue}
              </code>
            </div>
          )}

          {children && (
            <div
              style={{
                paddingTop: 16,
                minWidth: 0,
                borderTop:
                  '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
              }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </ExampleSection>
  );
}

// ---------------------------------------------------------------------------
// Use Case Section
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Icon Grid – renders a grid of icons from a font class prefix
// ---------------------------------------------------------------------------

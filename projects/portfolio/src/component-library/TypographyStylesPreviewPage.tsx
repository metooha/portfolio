import React from 'react';
import { Body, Caption, Display, Heading } from '@/app/components/Text/Text';
import { CaseStudyHeroText, PageTitleText } from '@/app/components/CaseStudyText/CaseStudyText';
import '@/app/components/CaseStudyText/CaseStudyText.css';

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ld-semantic-spacing-200, 1rem)',
};

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ld-semantic-spacing-600, 3rem)',
  padding: 'var(--ld-semantic-spacing-400, 2rem)',
  background: 'var(--ld-semantic-color-fill, #ffffff)',
  minHeight: '100%',
  boxSizing: 'border-box',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ld-semantic-spacing-100, 0.5rem)',
  paddingBottom: 'var(--ld-semantic-spacing-300, 1.5rem)',
  borderBottom: '1px solid var(--ld-semantic-color-separator, #e3e4e5)',
};

const semanticColors = ['brand', 'subtle', 'positive', 'warning', 'negative', 'info'] as const;

function StyleRow({
  label,
  tokenHint,
  children,
  showDivider = true,
}: {
  label: string;
  tokenHint?: string;
  children: React.ReactNode;
  showDivider?: boolean;
}) {
  return (
    <div
      style={{
        ...rowStyle,
        borderBottom: showDivider ? rowStyle.borderBottom : undefined,
        paddingBottom: showDivider ? rowStyle.paddingBottom : 0,
      }}
    >
      <Caption as="p" color="subtlest" UNSAFE_style={{ margin: 0 }}>
        {label}
        {tokenHint ? ` · ${tokenHint}` : ''}
      </Caption>
      {children}
    </div>
  );
}

function CategorySection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section style={sectionStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-semantic-spacing-100, 0.5rem)' }}>
        <Heading as="h2" size="medium" weight="default">
          {title}
        </Heading>
        <Body as="p" size="medium" color="subtle" UNSAFE_style={{ margin: 0 }}>
          {description}
        </Body>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ld-semantic-spacing-300, 1.5rem)' }}>
        {children}
      </div>
    </section>
  );
}

/** Live typography preview for the theme editor — reflects token overrides from the Text styles panel. */
export function TypographyStylesPreviewPage() {
  return (
    <div style={pageStyle}>
      <CategorySection
        title="Display"
        description="Largest type for hero moments, page titles, and marketing surfaces."
      >
        <StyleRow label="Hero" tokenHint="fluid min/max">
          <CaseStudyHeroText UNSAFE_style={{ margin: 0 }}>Northstar Financial</CaseStudyHeroText>
        </StyleRow>
        <StyleRow label="Page title">
          <PageTitleText UNSAFE_style={{ margin: 0 }}>
            Building a cohesive design system for multi-product rollout
          </PageTitleText>
        </StyleRow>
        <StyleRow label="Display large" tokenHint="weight default">
          <Display as="p" size="large" weight="default" UNSAFE_style={{ margin: 0 }}>
            Hero headline
          </Display>
        </StyleRow>
        <StyleRow label="Display large" tokenHint="weight alt">
          <Display as="p" size="large" weight="alt" UNSAFE_style={{ margin: 0 }}>
            Marketing headline
          </Display>
        </StyleRow>
        <StyleRow label="Display small" tokenHint="weight default" showDivider={false}>
          <Display as="p" size="small" weight="default" UNSAFE_style={{ margin: 0 }}>
            Section headline
          </Display>
        </StyleRow>
      </CategorySection>

      <CategorySection
        title="Heading"
        description="Section and subsection titles. Case study section headings map to these tokens."
      >
        <StyleRow label="Heading large" tokenHint="weight default">
          <Heading as="p" size="large" weight="default" UNSAFE_style={{ margin: 0 }}>
            Problem Space
          </Heading>
        </StyleRow>
        <StyleRow label="Heading large" tokenHint="weight alt">
          <Heading as="p" size="large" weight="alt" UNSAFE_style={{ margin: 0 }}>
            Goals
          </Heading>
        </StyleRow>
        <StyleRow label="Heading medium" tokenHint="weight default">
          <Heading as="p" size="medium" weight="default" UNSAFE_style={{ margin: 0 }}>
            Audit & alignment
          </Heading>
        </StyleRow>
        <StyleRow label="Heading medium" tokenHint="weight alt">
          <Heading as="p" size="medium" weight="alt" UNSAFE_style={{ margin: 0 }}>
            Northstar Financial
          </Heading>
        </StyleRow>
        <StyleRow label="Heading small" tokenHint="weight default" showDivider={false}>
          <Heading as="p" size="small" weight="default" UNSAFE_style={{ margin: 0 }}>
            Foundations
          </Heading>
        </StyleRow>
      </CategorySection>

      <CategorySection
        title="Body"
        description="Running text, ledes, meta labels, and bullet copy."
      >
        <StyleRow label="Body large" tokenHint="weight default">
          <Body as="p" size="large" UNSAFE_style={{ margin: 0 }}>
            Northstar needed a unified experience across banking, investing, and insurance products.
          </Body>
        </StyleRow>
        <StyleRow label="Body medium" tokenHint="weight default">
          <Body as="p" size="medium" UNSAFE_style={{ margin: 0 }}>
            Inventory existing patterns across three product areas and rank by reuse potential.
          </Body>
        </StyleRow>
        <StyleRow label="Body medium" tokenHint="weight alt">
          <Body as="p" size="medium" weight="alt" UNSAFE_style={{ margin: 0 }}>
            Role: Lead Product Designer
          </Body>
        </StyleRow>
        <StyleRow label="Body medium" tokenHint="color subtle">
          <Body as="p" size="medium" color="subtle" UNSAFE_style={{ margin: 0 }}>
            Design Systems, Product Design
          </Body>
        </StyleRow>
        <StyleRow label="Body small" tokenHint="weight default" showDivider={false}>
          <Body as="p" size="small" UNSAFE_style={{ margin: 0 }}>
            Dense UI label text
          </Body>
        </StyleRow>
      </CategorySection>

      <CategorySection
        title="Caption"
        description="Timestamps, helper text, and badge labels."
      >
        <StyleRow label="Caption" tokenHint="weight default">
          <Caption as="p" UNSAFE_style={{ margin: 0 }}>
            Updated 2 minutes ago · Caption text
          </Caption>
        </StyleRow>
        <StyleRow label="Caption" tokenHint="weight alt" showDivider={false}>
          <Caption as="p" weight="alt" UNSAFE_style={{ margin: 0 }}>
            1.0
          </Caption>
        </StyleRow>
      </CategorySection>

      <CategorySection
        title="Semantic text colors"
        description="Body medium samples using semantic color tokens."
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 'var(--ld-semantic-spacing-200, 1rem)',
          }}
        >
          {semanticColors.map((color) => (
            <div
              key={color}
              style={{
                padding: 'var(--ld-semantic-spacing-200, 1rem)',
                borderRadius: 'var(--ld-primitive-scale-border-radius-200, 1rem)',
                background: 'var(--ld-semantic-color-surface-subtle, #f7f8f8)',
              }}
            >
              <Caption as="p" color="subtlest" UNSAFE_style={{ margin: '0 0 8px' }}>
                {color}
              </Caption>
              <Body as="p" size="medium" color={color} UNSAFE_style={{ margin: 0 }}>
                Sample text
              </Body>
            </div>
          ))}
        </div>
      </CategorySection>
    </div>
  );
}

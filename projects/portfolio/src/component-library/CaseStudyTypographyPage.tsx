import * as React from 'react';
import { TypographyStylesPreviewPage } from './TypographyStylesPreviewPage';
import { ExampleSection, PageWrapper } from './shared';

export default function CaseStudyTypographyPage() {
  return (
    <PageWrapper
      title="Case Study Typography"
      category="Case Study Patterns"
      description="Fluid hero type, page titles, section headings, body copy, and badge labels used across portfolio case studies. Tokens map to the Text styles panel in Theme Editor."
    >
      <ExampleSection
        title="Type scale"
        description="CaseStudyHeroText, PageTitleText, Heading, Body, Caption, and CaseStudyBadge styles with semantic color samples."
      >
        <div
          style={{
            border: '1px solid #E6E6E8',
            borderRadius: 8,
            overflow: 'auto',
            maxHeight: 'min(80vh, 900px)',
          }}
        >
          <TypographyStylesPreviewPage />
        </div>
      </ExampleSection>
    </PageWrapper>
  );
}

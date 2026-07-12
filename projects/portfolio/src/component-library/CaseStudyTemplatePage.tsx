import * as React from 'react';
import { CaseStudyTemplatePreview } from './CaseStudyTemplatePreview';
import { ExampleSection, PageWrapper } from './shared';

export default function CaseStudyTemplatePage() {
  return (
    <PageWrapper
      title="Case Study Template"
      category="Case Study Patterns"
      description="The full case study page shell: hero, overview, metadata, sticky section navigation, and content sections. Compose individual building blocks inside CaseStudyTemplate for new portfolio case studies."
    >
      <ExampleSection
        title="Northstar preview"
        description="Interactive preview of CaseStudyTemplate with hero, overview, page nav, SectionHeading, ValuePropGrid, BulletList, and MetricGroup sections."
      >
        <div
          style={{
            border: '1px solid #E6E6E8',
            borderRadius: 8,
            overflow: 'hidden',
            height: 'min(80vh, 900px)',
            background: '#fff',
          }}
        >
          <CaseStudyTemplatePreview />
        </div>
      </ExampleSection>
    </PageWrapper>
  );
}

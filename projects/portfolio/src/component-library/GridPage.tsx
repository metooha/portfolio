import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Grid, GridColumn} from '@/app/components/Grid/Grid';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

function Cell({children}: {children: React.ReactNode}) {
  return (
    <div style={{
      background: 'var(--ld-semantic-color-fill-brand-subtle, #ebf0ff)',
      borderRadius: 8,
      padding: '16px',
      textAlign: 'center',
    }}>
      <Body as="span" size="small" weight="alt">{children}</Body>
    </div>
  );
}

export default function GridPage() {
  return (
    <PageWrapper
      title="Grid"
      category="Layout"
      description="A responsive 12-column grid. Compose layouts with Grid and GridColumn, setting the column span per breakpoint (sm, md, lg, xl, xxl)."
    >
      <ExampleSection title="Equal columns" description="Three columns that span four of twelve at the medium breakpoint and stack on small screens.">
        <Grid hasGutter>
          <GridColumn sm={12} md={4}><Cell>md 4</Cell></GridColumn>
          <GridColumn sm={12} md={4}><Cell>md 4</Cell></GridColumn>
          <GridColumn sm={12} md={4}><Cell>md 4</Cell></GridColumn>
        </Grid>
      </ExampleSection>

      <ExampleSection title="Asymmetric layout" description="Mix spans to build content + sidebar layouts.">
        <Grid hasGutter>
          <GridColumn sm={12} md={8}><Cell>md 8 · main</Cell></GridColumn>
          <GridColumn sm={12} md={4}><Cell>md 4 · aside</Cell></GridColumn>
        </Grid>
      </ExampleSection>

      <ExampleSection title="Twelve columns" description="The full column track. Each cell spans one column at large.">
        <Grid hasGutter>
          {Array.from({length: 12}, (_, i) => (
            <GridColumn key={i} sm={6} md={3} lg={1}><Cell>{i + 1}</Cell></GridColumn>
          ))}
        </Grid>
      </ExampleSection>

      <GuidelinesSection
        description="Use the Grid for page and section layout on a shared 12-column track. Always set the small (sm) span so content reflows sensibly on narrow screens, then add md/lg/xl overrides for wider viewports. Enable hasGutter for consistent spacing between columns."
        defaultValue="hasGutter={false}  sm={12}"
      />
    </PageWrapper>
  );
}

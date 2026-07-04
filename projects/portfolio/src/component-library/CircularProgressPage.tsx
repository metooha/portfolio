import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Slider} from '@/app/components/Slider/Slider';
import {CircularProgress} from '@/app/components/CircularProgress/CircularProgress';
import {ComponentConfigurationCard, DocsCard, DocsGrid, ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const CENTER: React.CSSProperties = {display: 'flex', justifyContent: 'center'};

export default function CircularProgressPage() {
  const [value, setValue] = React.useState(64);

  return (
    <PageWrapper
      title="Circular Progress"
      category="Data Visualization"
      description="A full-ring progress indicator for determinate values — completion, utilization, or a score plotted from 0 to 100 percent."
    >
      <ExampleSection title="Component Configuration" description="Drag to change the value. color='auto' shifts the ring from negative to warning to positive.">
        <ComponentConfigurationCard
          controls={
            <div style={{display: 'grid', gap: 8, maxWidth: 320}}>
              <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Value: {value}</Body>
              <Slider ariaLabel="Progress value" min={0} max={100} value={[value]} onValueChange={(v) => setValue(v[0])} />
            </div>
          }
          preview={
            <DocsCard title="Auto status color">
              <div style={CENTER}>
                <CircularProgress value={value} color="auto" label="Complete" />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Status colors" description="Pin an explicit status, or use a categorical data color for dashboards.">
        <DocsGrid minColumnWidth={200}>
          <DocsCard title="Positive"><div style={CENTER}><CircularProgress value={92} color="positive" size={130} label="Synced" /></div></DocsCard>
          <DocsCard title="Warning"><div style={CENTER}><CircularProgress value={48} color="warning" size={130} label="Storage" /></div></DocsCard>
          <DocsCard title="Negative"><div style={CENTER}><CircularProgress value={12} color="negative" size={130} label="Left" /></div></DocsCard>
          <DocsCard title="Data"><div style={CENTER}><CircularProgress value={70} color="data" size={130} label="Series" /></div></DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use Circular Progress for determinate completion where the ring shape reinforces 'how much is done'. For indeterminate waits use a Spinner instead, and for linear step-by-step flows use Progress Indicator. Keep the center label to one or two words."
        defaultValue="min={0}  max={100}  color='data'  size={160}"
      />
    </PageWrapper>
  );
}

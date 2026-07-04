import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Slider} from '@/app/components/Slider/Slider';
import {Gauge} from '@/app/components/Gauge/Gauge';
import {ComponentConfigurationCard, DocsCard, DocsGrid, ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const CENTER: React.CSSProperties = {display: 'flex', justifyContent: 'center'};

export default function GaugePage() {
  const [value, setValue] = React.useState(72);

  return (
    <PageWrapper
      title="Gauge"
      category="Data Visualization"
      description="A 270° arc that plots a single value within a range. Ideal for scores, health readouts, and utilization where a partial dial reads more naturally than a full ring."
    >
      <ExampleSection title="Component Configuration" description="Drag to change the value. With color='auto', the arc shifts from negative to warning to positive.">
        <ComponentConfigurationCard
          controls={
            <div style={{display: 'grid', gap: 8, maxWidth: 320}}>
              <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Value: {value}</Body>
              <Slider
                ariaLabel="Gauge value"
                min={0}
                max={100}
                value={[value]}
                onValueChange={(v) => setValue(v[0])}
              />
            </div>
          }
          preview={
            <DocsCard title="Auto status color">
              <div style={CENTER}>
                <Gauge value={value} color="auto" label="Score" />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection title="Status colors" description="Pin an explicit status, or use a categorical data color for dashboards.">
        <DocsGrid minColumnWidth={200}>
          <DocsCard title="Positive"><div style={CENTER}><Gauge value={88} color="positive" size={130} label="Uptime" /></div></DocsCard>
          <DocsCard title="Warning"><div style={CENTER}><Gauge value={52} color="warning" size={130} label="Load" /></div></DocsCard>
          <DocsCard title="Negative"><div style={CENTER}><Gauge value={18} color="negative" size={130} label="Battery" /></div></DocsCard>
          <DocsCard title="Data"><div style={CENTER}><Gauge value={64} color="data" size={130} label="Series" /></div></DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description="Use a Gauge for a single value against a known range where the shape communicates 'how full'. Choose color='auto' for good/bad readings, an explicit status for fixed meaning, or color='data' when it's one series among many. Keep the center label short."
        defaultValue="min={0}  max={100}  color='data'  size={160}"
      />
    </PageWrapper>
  );
}

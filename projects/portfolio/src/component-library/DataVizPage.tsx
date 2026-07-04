import * as React from 'react';

import {Body} from '@/app/components/Text/Text';
import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {Slider} from '@/app/components/Slider/Slider';
import {Gauge, type GaugeColor} from '@/app/components/Gauge/Gauge';
import {
  CircularProgress,
  type CircularProgressColor,
} from '@/app/components/CircularProgress/CircularProgress';
import {
  AreaChart,
  BarChart,
  DonutChart,
  LineChart,
  PieChart,
} from '@/app/components/DataViz';
import {
  ComponentConfigurationCard,
  DocsCard,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

// ---------------------------------------------------------------------------
// Shared layout helpers
// ---------------------------------------------------------------------------

function VizGrid({children}: {children: React.ReactNode}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))',
        gap: 24,
        justifyItems: 'center',
        alignItems: 'center',
        minWidth: 0,
      }}
    >
      {children}
    </div>
  );
}

const SAMPLE_VALUES = [25, 50, 75, 100];

// ── Categorical chart sample data ───────────────────────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const AREA_SERIES = [
  {label: 'Category', colorIndex: 0, data: [42, 70, 58, 49, 52, 60, 55, 72, 64, 30, 38, 47]},
  {label: 'Category', colorIndex: 1, data: [28, 40, 30, 36, 45, 55, 60, 58, 62, 64, 50, 38]},
  {label: 'Category', colorIndex: 2, data: [35, 58, 78, 48, 44, 62, 50, 60, 88, 70, 46, 22]},
  {label: 'Category', colorIndex: 3, data: [80, 26, 18, 30, 48, 60, 64, 55, 40, 36, 58, 30]},
  {label: 'Category', colorIndex: 4, data: [22, 30, 24, 28, 26, 30, 28, 34, 30, 58, 42, 26]},
];

const LINE_SERIES = [
  {label: 'Solid line', colorIndex: 0, data: [55, 62, 30, 38, 60, 70, 44, 64, 30, 80, 52, 58], endDot: true},
  {label: 'Dashed line', colorIndex: 0, dashed: true, data: [48, 52, 28, 44, 52, 58, 50, 56, 36, 72, 46, 50]},
];

const PIE_DATA = Array.from({length: 8}, (_, i) => ({label: 'Category', value: 1, colorIndex: i}));

const BAR_SERIES = [0, 1, 2, 3, 4].map((colorIndex) => ({
  label: 'Category',
  colorIndex,
  data: MONTHS.map(() => 20),
}));

const HBAR_LABELS = Array.from({length: 10}, () => 'Label');
const HBAR_SERIES = [0, 1, 2, 3, 4].map((colorIndex) => ({
  label: 'Category',
  colorIndex,
  data: HBAR_LABELS.map(() => 20),
}));

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

type VizKind = 'gauge' | 'circular';

export default function DataVizPage() {
  const [kind, setKind] = React.useState<VizKind>('gauge');
  const [value, setValue] = React.useState(72);
  const [color, setColor] = React.useState<GaugeColor>('auto');

  const Preview = kind === 'gauge' ? Gauge : CircularProgress;

  return (
    <PageWrapper
      title="Data Viz"
      category="PATTERNS"
      description="Data-visualization patterns built on the LD chart categorical palette and semantic tokens. Circular charts (Gauge, Circular Progress) surface a single value; categorical charts (area, line, pie, donut, bar) compare series and composition. All are theme-aware and responsive."
    >
      <ExampleSection
        title="Component Configuration"
        description="Switch between the Gauge and Circular Progress, drag the value, and try each color mode. The 'auto' mode derives the status color from the value: low → negative, mid → warning, high → positive."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Component
                </Body>
                <ButtonGroup aria-label="Select component">
                  <Button
                    size="small"
                    variant={kind === 'gauge' ? 'primary' : 'secondary'}
                    aria-pressed={kind === 'gauge'}
                    onClick={() => setKind('gauge')}
                  >
                    Gauge
                  </Button>
                  <Button
                    size="small"
                    variant={kind === 'circular' ? 'primary' : 'secondary'}
                    aria-pressed={kind === 'circular'}
                    onClick={() => setKind('circular')}
                  >
                    Circular Progress
                  </Button>
                </ButtonGroup>
              </div>

              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Color
                </Body>
                <ButtonGroup aria-label="Select color mode">
                  {(['data', 'auto', 'negative', 'warning', 'positive'] as GaugeColor[]).map(
                    (c) => (
                      <Button
                        key={c}
                        size="small"
                        variant={color === c ? 'primary' : 'secondary'}
                        aria-pressed={color === c}
                        onClick={() => setColor(c)}
                      >
                        {c}
                      </Button>
                    ),
                  )}
                </ButtonGroup>
              </div>

              <div style={{display: 'grid', gap: 8, minWidth: 0, maxWidth: 320}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Value
                </Body>
                <Slider
                  ariaLabel="Adjust score"
                  min={0}
                  max={100}
                  value={[value]}
                  valueLabel={`${value}%`}
                  onValueChange={(next) => setValue(next[0])}
                />
              </div>
            </>
          }
          preview={
            <DocsCard
              title="Preview"
              description="Exposed as role=meter (Gauge) / role=progressbar (Circular Progress) with aria-valuenow, valuemin, and valuemax."
            >
              <div style={{display: 'flex', justifyContent: 'center', padding: 16}}>
                <Preview
                  value={value}
                  color={color as GaugeColor & CircularProgressColor}
                  label="Score"
                />
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Gauge"
        description="A 270° arc with the gap centered at the bottom. Use it for scores and health metrics. The 'auto' color mode reflects the value; a single data-viz color reads as one series in a dashboard."
      >
        <div style={{display: 'grid', gap: 24, minWidth: 0}}>
          <DocsCard title="Status color" description="color='auto' — the fill color tracks the value.">
            <VizGrid>
              {SAMPLE_VALUES.map((v) => (
                <Gauge key={v} value={v} color="auto" label="Score" />
              ))}
            </VizGrid>
          </DocsCard>
          <DocsCard title="Data color" description="color='data' — a single data-viz categorical hue.">
            <VizGrid>
              {SAMPLE_VALUES.map((v) => (
                <Gauge key={v} value={v} color="data" label="Score" />
              ))}
            </VizGrid>
          </DocsCard>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Circular Progress"
        description="A full 360° ring that fills clockwise from the top. Use it for completion and progress toward a goal."
      >
        <div style={{display: 'grid', gap: 24, minWidth: 0}}>
          <DocsCard title="Status color" description="color='auto' — the fill color tracks the value.">
            <VizGrid>
              {SAMPLE_VALUES.map((v) => (
                <CircularProgress key={v} value={v} color="auto" label="Score" />
              ))}
            </VizGrid>
          </DocsCard>
          <DocsCard title="Data color" description="color='data' — a single data-viz categorical hue.">
            <VizGrid>
              {SAMPLE_VALUES.map((v) => (
                <CircularProgress key={v} value={v} color="data" label="Score" />
              ))}
            </VizGrid>
          </DocsCard>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Area chart"
        description="Multi-series trends over time with gradient fills and a dual Y axis. Best for comparing volume across categories."
      >
        <AreaChart series={AREA_SERIES} xLabels={MONTHS} smooth showRightAxis />
      </ExampleSection>

      <ExampleSection
        title="Line chart"
        description="Compare values over time. Solid and dashed strokes distinguish series; choose sharp (straight) or smooth (curved) lines. An optional end dot marks the latest point."
      >
        <div style={{display: 'grid', gap: 32, minWidth: 0}}>
          <DocsCard title="Sharp" description="curve='sharp' — straight segments between points.">
            <LineChart series={LINE_SERIES} xLabels={MONTHS} curve="sharp" />
          </DocsCard>
          <DocsCard title="Smooth" description="curve='smooth' — rounded curves between points.">
            <LineChart series={LINE_SERIES} xLabels={MONTHS} curve="smooth" />
          </DocsCard>
        </div>
      </ExampleSection>

      <ExampleSection
        title="Pie & donut charts"
        description="Show part-to-whole composition across up to 10 categories. Use a donut to surface a key total in the center."
      >
        <div
          style={{
            display: 'grid',
            gap: 40,
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            alignItems: 'center',
            minWidth: 0,
          }}
        >
          <PieChart data={PIE_DATA} size={220} />
          <DonutChart data={PIE_DATA} size={220} centerValue="1,204" centerLabel="items" />
        </div>
      </ExampleSection>

      <ExampleSection
        title="Bar chart"
        description="Stacked bars compare composition across categories — vertically (per-bar totals on top) or horizontally (totals at the end)."
      >
        <div style={{display: 'grid', gap: 32, minWidth: 0}}>
          <DocsCard title="Vertical (stacked)" description="orientation='vertical'">
            <BarChart series={BAR_SERIES} labels={MONTHS} orientation="vertical" />
          </DocsCard>
          <DocsCard title="Horizontal (stacked)" description="orientation='horizontal'">
            <BarChart series={HBAR_SERIES} labels={HBAR_LABELS} orientation="horizontal" />
          </DocsCard>
        </div>
      </ExampleSection>

      <GuidelinesSection
        description="Use Gauge for a value measured within a range (scores, health, ratings) and Circular Progress for completion toward a goal. Reach for the 'auto' color mode when the value carries good/bad meaning, and a 'data' categorical color when the ring is one series among several in a dashboard. Always pass a meaningful label or aria-label so the reading is announced; the value, min, and max are exposed through ARIA. Keep size and thickness consistent across a set of gauges so they read as a group, and avoid using more than one status color in a single comparison. For categorical charts (area, line, pie, donut, bar), use the LD chart categorical tokens (--ld-semantic-color-chart-categorical-1…8): assign colors in palette order and keep the same color mapped to the same category across every chart on a screen; limit a single chart to the 8 categorical colors and group the long tail into an 'Other' category beyond that. Always pair charts with a legend and never rely on color alone — labels and values carry the meaning. Each chart exposes role='img' and an aria-label describing its series and values."
        defaultValue="color='data', size=160, thickness=12"
      />
    </PageWrapper>
  );
}

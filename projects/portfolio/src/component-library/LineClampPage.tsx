import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Button, ButtonGroup} from '@/app/components/Button/Button';
import {LineClamp} from '@/app/components/LineClamp/LineClamp';
import {ComponentConfigurationCard, DocsCard, ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const SAMPLE =
  'Line Clamp truncates overflowing text to a fixed number of lines and appends an ellipsis. It is handy for cards, list rows, and previews where content length varies but the layout must stay consistent across every item in a collection.';

const LINE_OPTIONS = [1, 2, 3];

export default function LineClampPage() {
  const [lines, setLines] = React.useState(2);
  return (
    <PageWrapper
      title="Line Clamp"
      category="Core Components"
      description="A utility that limits text to a set number of visible lines, truncating the overflow with an ellipsis."
    >
      <ExampleSection title="Component Configuration" description="Choose how many lines to show before truncating.">
        <ComponentConfigurationCard
          controls={
            <>
              <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>Lines</Body>
              <ButtonGroup aria-label="Number of lines">
                {LINE_OPTIONS.map((n) => (
                  <Button
                    key={n}
                    size="small"
                    variant={lines === n ? 'primary' : 'secondary'}
                    aria-pressed={lines === n}
                    onClick={() => setLines(n)}
                  >
                    {n} {n === 1 ? 'line' : 'lines'}
                  </Button>
                ))}
              </ButtonGroup>
            </>
          }
          preview={
            <DocsCard title={`${lines}-line clamp`}>
              <div style={{maxWidth: 320}}>
                <LineClamp lines={lines}>{SAMPLE}</LineClamp>
              </div>
            </DocsCard>
          }
        />
      </ExampleSection>

      <GuidelinesSection
        description="Use Line Clamp to keep uneven text from breaking a grid or list layout. Prefer it for secondary content like descriptions and previews, and make the full text reachable elsewhere (a detail view or tooltip) so nothing is permanently hidden."
        defaultValue="lines={2}"
      />
    </PageWrapper>
  );
}

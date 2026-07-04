import * as React from 'react';

import {Button, ButtonGroup} from '@/app/components/Button';
import {Checkbox} from '@/app/components/Checkbox';
import {Body} from '@/app/components/Text/Text';
import {UploadFile, type UploadedFile} from '@/app/components/UploadFile/UploadFile';
import {
  ComponentConfigurationCard,
  DocsCard,
  DocsGrid,
  ExampleSection,
  GuidelinesSection,
  PageWrapper,
} from './shared';

type Scenario = 'empty' | 'uploading' | 'success' | 'errors' | 'mixed';

const SCENARIOS: Array<{value: Scenario; label: string; description: string}> = [
  {
    value: 'empty',
    label: 'Empty',
    description: 'Default drop zone with no files selected.',
  },
  {
    value: 'uploading',
    label: 'Uploading',
    description: 'Files in progress show a spinner and a red cancel control.',
  },
  {
    value: 'success',
    label: 'Success',
    description: 'Uploaded files show a green check and a trash remove control.',
  },
  {
    value: 'errors',
    label: 'Errors',
    description: 'Invalid files show a red icon, red filename, and an "Unsupported file type" tag.',
  },
  {
    value: 'mixed',
    label: 'Mixed',
    description: 'A list combining uploading, error, and success states.',
  },
];

function makeFile(
  id: string,
  name: string,
  size: number,
  status: UploadedFile['status'] = 'success',
  errorText?: string,
): UploadedFile {
  return {id, name, size, status, errorText};
}

const KB = 1024;
const MB = 1024 * 1024;

const FILES_BY_SCENARIO: Record<Scenario, UploadedFile[]> = {
  empty: [],
  uploading: [
    makeFile('u-1', 'filename.csv', 415 * KB, 'uploading'),
    makeFile('u-2', 'report-q3.xlsx', Math.round(1.4 * MB), 'uploading'),
  ],
  success: [
    makeFile('s-1', 'filename.csv', 415 * KB, 'success'),
    makeFile('s-2', 'budget-2026.xlsx', 220 * KB, 'success'),
  ],
  errors: [
    makeFile('e-1', 'filename.csv', 415 * KB, 'error'),
    makeFile('e-2', 'filename.pdf', 415 * KB, 'error'),
  ],
  mixed: [
    makeFile('m-1', 'filename.csv', 415 * KB, 'uploading'),
    makeFile('m-2', 'filename.csv', 415 * KB, 'error'),
    makeFile('m-3', 'filename.csv', 415 * KB, 'success'),
  ],
};

function getScenarioConfig(value: Scenario) {
  return SCENARIOS.find((item) => item.value === value) ?? SCENARIOS[0];
}

export default function UploadFilePage() {
  const [scenario, setScenario] = React.useState<Scenario>('empty');
  const [invalid, setInvalid] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const selectedConfig = getScenarioConfig(scenario);

  return (
    <PageWrapper
      title="WCP Upload File"
      category="WCP Components"
      description="File upload component with drag-and-drop, browse picker, per-file status (uploading, success, error), and inline error messaging."
    >
      <ExampleSection
        title="Component Configuration"
        description="Use the controls to preview how scenarios, top-level error messaging, and disabled state affect the UploadFile."
      >
        <ComponentConfigurationCard
          controls={
            <>
              <div style={{display: 'grid', gap: 8, minWidth: 0}}>
                <Body as="h3" size="medium" weight="alt" style={{margin: 0}}>
                  Scenario
                </Body>
                <Body as="p" size="small" color="subtle" style={{margin: 0, lineHeight: '1.5'}}>
                  Choose a populated file list to preview the drop zone alongside file rows in each status.
                </Body>
              </div>

              <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
                <ButtonGroup aria-label="UploadFile scenario">
                  {SCENARIOS.map((item) => (
                    <Button
                      key={item.value}
                      size="small"
                      variant={scenario === item.value ? 'primary' : 'secondary'}
                      aria-pressed={scenario === item.value}
                      onClick={() => setScenario(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>

              <div style={{display: 'grid', gap: 16}}>
                <Checkbox
                  label="Top-level error message"
                  checked={invalid}
                  onChange={(event) => setInvalid(event.target.checked)}
                />
                <Checkbox
                  label="Disabled"
                  checked={disabled}
                  onChange={(event) => setDisabled(event.target.checked)}
                />
              </div>
            </>
          }
          preview={
            <DocsCard
              title={`${selectedConfig.label} preview`}
              description={selectedConfig.description}
            >
              <UploadFile
                files={FILES_BY_SCENARIO[scenario]}
                onChange={() => {}}
                invalid={invalid}
                errorMessage={invalid ? 'Please note the errors below, and try again' : undefined}
                disabled={disabled}
              />
            </DocsCard>
          }
        />
      </ExampleSection>

      <ExampleSection
        title="Drop zone states"
        description="The drop zone has consistent affordances across resting, error, and disabled states. Helper text and accepted file types can be customized."
      >
        <DocsGrid>
          <DocsCard
            title="Default"
            description="Resting state with the cloud icon, prompt, Browse button, and helper text."
          >
            <UploadFile files={[]} onChange={() => {}} />
          </DocsCard>

          <DocsCard
            title="Invalid"
            description="A top-level error banner sits above the drop zone and the border turns red."
          >
            <UploadFile
              files={[]}
              onChange={() => {}}
              invalid
              errorMessage="Please note the errors below, and try again"
            />
          </DocsCard>

          <DocsCard
            title="Disabled"
            description="The drop zone and Browse button are non-interactive and drop events are ignored."
          >
            <UploadFile files={[]} onChange={() => {}} disabled />
          </DocsCard>

          <DocsCard
            title="Custom helper text"
            description="helperText and accept can be customized for different file-type expectations."
          >
            <UploadFile
              files={[]}
              onChange={() => {}}
              helperText="PDF, DOCX | 10 MB max per file"
              accept=".pdf,.doc,.docx"
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection
        title="File row states"
        description="Each uploaded file renders as a row below the drop zone. Trailing controls switch based on the file's status."
      >
        <DocsGrid minColumnWidth={320}>
          <DocsCard
            title="Uploading"
            description="A spinner indicates progress; the red circle button cancels the upload."
          >
            <UploadFile files={FILES_BY_SCENARIO.uploading} onChange={() => {}} />
          </DocsCard>

          <DocsCard
            title="Success"
            description="A green check confirms upload; the trash button removes the file."
          >
            <UploadFile files={FILES_BY_SCENARIO.success} onChange={() => {}} />
          </DocsCard>

          <DocsCard
            title="Errors"
            description="Errored files use the red exclamation icon, red filename, and an inline reason tag."
          >
            <UploadFile
              files={FILES_BY_SCENARIO.errors}
              onChange={() => {}}
              invalid
              errorMessage="Please note the errors below, and try again"
            />
          </DocsCard>

          <DocsCard
            title="Mixed states"
            description="A single list can combine uploading, error, and success rows."
          >
            <UploadFile files={FILES_BY_SCENARIO.mixed} onChange={() => {}} />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <GuidelinesSection
        description={
          <>
            Use UploadFile for bulk file ingestion flows such as XLS or CSV uploads. Set <code>accept</code> and update
            <code> helperText</code> together so the helper text always reflects the file types you actually allow. Drive
            row state from your upload pipeline by setting each file&apos;s <code>status</code> to{' '}
            <code>uploading</code>, <code>success</code>, or <code>error</code>, and provide an{' '}
            <code>errorText</code> on error rows that explains the reason. Use the top-level <code>invalid</code> and{' '}
            <code>errorMessage</code> props when one or more rows in the current batch have failed validation. Wire{' '}
            <code>onCancel</code> to stop in-flight uploads and <code>onRemove</code> for completed files; if either is
            omitted the component falls back to mutating the <code>files</code> array via <code>onChange</code>.
          </>
        }
        defaultValue="maxFiles={10} helperText='XLS, CSV | 5 MB max per file'"
      />
    </PageWrapper>
  );
}

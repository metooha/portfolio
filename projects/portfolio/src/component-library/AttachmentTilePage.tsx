import * as React from 'react';
import {Icon} from '@/app/components/Icons/Icons';
import {AttachmentTile} from '@/app/components/AttachmentTile/AttachmentTile';
import {ExampleSection, GuidelinesSection, PageWrapper, DocsGrid, DocsCard} from './shared';

const THUMB =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#0053e2"/></svg>`,
  );

export default function AttachmentTilePage() {
  return (
    <PageWrapper
      title="Attachment Tile"
      category="AI & Agents"
      description="A compact, removable chip representing an attached file or image. The icon variant pairs a pictogram with a title and description; the image variant shows a thumbnail."
    >
      <ExampleSection title="Variants" description="The trailing remove button appears on hover or keyboard focus.">
        <DocsGrid minColumnWidth={260}>
          <DocsCard title="Icon variant">
            <AttachmentTile
              variant="icon"
              leading={<Icon name="Image" decorative />}
              title="quarterly-report.pdf"
              description="2.4 MB"
              onRemove={() => {}}
            />
          </DocsCard>
          <DocsCard title="Image variant">
            <AttachmentTile
              variant="image"
              image={<img src={THUMB} alt="Uploaded thumbnail" />}
              onRemove={() => {}}
            />
          </DocsCard>
        </DocsGrid>
      </ExampleSection>

      <ExampleSection title="Disabled">
        <AttachmentTile
          variant="icon"
          leading={<Icon name="Image" decorative />}
          title="processing.csv"
          description="Uploading…"
          disabled
        />
      </ExampleSection>

      <GuidelinesSection
        description="Use Attachment Tiles to show files a user has attached — in a Prompt Composer, a message, or a form. Choose the image variant for photos and the icon variant for documents, showing the file name and a short detail (size or type). Always wire onRemove so attachments can be removed before sending."
        defaultValue="variant='icon'  disabled={false}"
      />
    </PageWrapper>
  );
}

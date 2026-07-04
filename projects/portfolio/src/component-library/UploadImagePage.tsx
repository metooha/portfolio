import * as React from 'react';
import {Body} from '@/app/components/Text/Text';
import {Button} from '@/app/components/Button/Button';
import {UploadImage, UploadedImage} from '@/app/components/UploadImage/UploadImage';
import {A11yAnnouncementProvider} from '@/app/components/A11yAnnouncement';
import {PageWrapper, ExampleSection} from './shared';

function makePlaceholders(count: number): UploadedImage[] {
  return Array.from({length: count}, (_, i) => ({
    id: String(i + 1),
    src: `https://placehold.co/96x96/E8F0FE/5B73C8?text=img${i + 1}`,
    file: new File([], `${i + 1}.jpg`),
  }));
}

function DemoCard({title, note, children}: {title: string; note?: string; children: React.ReactNode}) {
  return (
    <div style={{
      border: '1px solid #E6E6E8',
      borderRadius: '8px',
      padding: '20px',
    }}>
      <Body as="p" size="medium" style={{margin: '0 0 4px', fontWeight: 600}}>{title}</Body>
      {note && (
        <Body as="p" size="small" style={{margin: '0 0 12px', color: '#74767C'}}>{note}</Body>
      )}
      {children}
    </div>
  );
}

export default function UploadImagePage() {
  const [images, setImages] = React.useState<UploadedImage[]>([]);
  const [invalid, setInvalid] = React.useState(false);
  const uploadWrapperRef = React.useRef<HTMLDivElement>(null);

  const [twoImages] = React.useState(() => makePlaceholders(2));
  const [fullImages] = React.useState(() => makePlaceholders(5));

  function handleClearAll() {
    setImages([]);
    // After the add button re-renders, move focus to it
    requestAnimationFrame(() => {
      uploadWrapperRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    });
  }

  return (
    <A11yAnnouncementProvider>
    <PageWrapper
      title="WCP Upload Image"
      category="WCP COMPONENTS"
      description="Photo upload component with preview tiles, remove actions, and error states for product reviews and returns."
    >
      <ExampleSection title="Interactive Demo" description={'Click the + tile to upload real images. Uploaded thumbnails appear with an \u00d7 button to remove them.'}>
        <div style={{maxWidth: 480}}>
          <div ref={uploadWrapperRef}>
            <UploadImage
              images={images}
              onChange={setImages}
              invalid={invalid}
              errorMessage={invalid ? 'Please upload a valid image file' : undefined}
            />
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 16}}>
            <label style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#2E2F32', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={invalid}
                onChange={(e) => setInvalid(e.target.checked)}
              />
              Error state
            </label>
            {images.length > 0 && (
              <Button
                variant="secondary"
                size="small"
                onClick={handleClearAll}
              >
                Clear all ({images.length})
              </Button>
            )}
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title="States">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
        }}>
          <DemoCard title="Empty" note="No images, shows single wide dashed tile">
            <UploadImage images={[]} onChange={() => {}} />
          </DemoCard>

          <DemoCard title="Error / Invalid" note="invalid prop set, error shown above">
            <UploadImage
              images={[]}
              onChange={() => {}}
              invalid
              errorMessage="Please upload a valid image file"
            />
          </DemoCard>

          <DemoCard title="With 2 images" note="Pre-populated with 2 placeholder images">
            <UploadImage images={twoImages} onChange={() => {}} />
          </DemoCard>

          <DemoCard title="Full (5 images)" note="Pre-populated with 5 placeholder images">
            <UploadImage images={fullImages} onChange={() => {}} maxImages={5} />
          </DemoCard>
        </div>
      </ExampleSection>
    </PageWrapper>
    </A11yAnnouncementProvider>
  );
}

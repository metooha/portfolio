import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselPagination,
  CarouselProgressBar,
  CarouselSection,
  CarouselHeaderPrevious,
  CarouselHeaderNext,
} from '../components/Carousel/Carousel';
import {Card, CardContent, CardHeader} from '../components/Card/Card';
import {Body} from '../components/Text/Text';
import {LinkButton} from '../components/LinkButton/LinkButton';
import {Tag} from '../components/Tag/Tag';
import {ExampleSection, GuidelinesSection, PageWrapper} from './shared';

const SLIDES = [
  {id: '1', title: 'First slide', body: 'Carousel primitive composes a horizontal scroller with optional pagination and progress.'},
  {id: '2', title: 'Second slide', body: 'Each `CarouselItem` is a slide. Items can be any width — the carousel snaps to each.'},
  {id: '3', title: 'Third slide', body: 'Use `CarouselPrevious` and `CarouselNext` for buttons; `CarouselPagination` for dots; `CarouselProgressBar` for a fill.'},
  {id: '4', title: 'Fourth slide', body: 'Use the higher-level `FlashDealsCarousel`, `NewArrivalsCarousel`, etc. patterns when you need product rows.'},
];

// ---------------------------------------------------------------------------
// Card type demos
// ---------------------------------------------------------------------------

function ArticleCard() {
  return (
    <Card>
      <CardContent>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <p style={{
            fontFamily: 'var(--ld-semantic-font-caption-family, inherit)',
            fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)',
            fontWeight: 'var(--ld-semantic-font-caption-weight-alt, 700)',
            color: 'var(--ld-semantic-color-text, #2e2f32)',
            margin: 0,
          }}>
            Article Category
          </p>
          <p style={{
            fontFamily: 'var(--ld-semantic-font-body-medium-family, inherit)',
            fontSize: 'var(--ld-semantic-font-body-medium-size, 1rem)',
            fontWeight: 'var(--ld-semantic-font-body-medium-weight-alt, 700)',
            lineHeight: 'var(--ld-semantic-font-body-medium-lineheight, 1.5rem)',
            color: 'var(--ld-semantic-color-text, #2e2f32)',
            margin: 0,
          }}>
            Title
          </p>
          <p style={{
            fontFamily: 'var(--ld-semantic-font-body-medium-family, inherit)',
            fontSize: 'var(--ld-semantic-font-body-medium-size, 1rem)',
            color: 'var(--ld-semantic-color-text-subtle, #515357)',
            margin: 0,
          }}>
            &ldquo;Lorem ipsum dolor sit amet consectetur. Non aliquam aliquet vehicula dolor id ut donec in. Viverra mi semper sit id.&rdquo;
          </p>
          <LinkButton size="small">Read more</LinkButton>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductCard() {
  return (
    <Card>
      <CardContent>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <Tag color="brand" variant="primary" size="small">Best seller</Tag>
          <div style={{
            height: 120,
            background: 'var(--ld-semantic-color-fill-subtle, #f8f8f8)',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ld-semantic-color-text-subtlest, #74767c)',
            fontSize: '0.75rem',
          }}>
            Image
          </div>
          <p style={{
            fontFamily: 'var(--ld-semantic-font-body-medium-family, inherit)',
            fontSize: 'var(--ld-semantic-font-body-medium-size, 1rem)',
            color: 'var(--ld-semantic-color-text, #2e2f32)',
            margin: 0,
          }}>
            Product name and description, up to two lines.
          </p>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 2}}>
            <sup style={{fontSize: '0.875rem', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2e2f32)'}}>$</sup>
            <span style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2e2f32)'}}>00</span>
            <sup style={{fontSize: '0.875rem', fontWeight: 700, color: 'var(--ld-semantic-color-text, #2e2f32)'}}>00</sup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReviewCard() {
  return (
    <Card>
      <CardContent>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <p style={{
            fontFamily: 'var(--ld-semantic-font-caption-family, inherit)',
            fontSize: 'var(--ld-semantic-font-caption-size, 0.75rem)',
            fontWeight: 'var(--ld-semantic-font-caption-weight-alt, 700)',
            color: 'var(--ld-semantic-color-text, #2e2f32)',
            margin: 0,
          }}>
            Eyebrow
          </p>
          <p style={{
            fontFamily: 'var(--ld-semantic-font-body-medium-family, inherit)',
            fontSize: 'var(--ld-semantic-font-body-medium-size, 1rem)',
            fontWeight: 'var(--ld-semantic-font-body-medium-weight-alt, 700)',
            color: 'var(--ld-semantic-color-text, #2e2f32)',
            margin: 0,
          }}>
            Title
          </p>
          <p style={{
            fontFamily: 'var(--ld-semantic-font-body-medium-family, inherit)',
            fontSize: 'var(--ld-semantic-font-body-medium-size, 1rem)',
            color: 'var(--ld-semantic-color-text-subtle, #515357)',
            margin: 0,
          }}>
            &ldquo;Lorem ipsum dolor sit amet consectetur. Non aliquam aliquet vehicula dolor id ut donec.&rdquo;
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function SlideCard({title, body}: {title: string; body: string}) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Body as="p" size="medium">{body}</Body>
      </CardContent>
    </Card>
  );
}

export default function CarouselPage() {
  return (
    <PageWrapper
      title="Carousel"
      category="Core Components"
      description="Generic horizontal-scroll primitive. Compose your own scrolling content row from CarouselContent + CarouselItem, with optional Previous/Next buttons, dot pagination, and a progress bar."
    >
      <ExampleSection title="Default" description="Carousel + CarouselContent + CarouselItem with side navigation buttons.">
        <Carousel aria-label="Default carousel example">
          <CarouselContent>
            {SLIDES.map((s) => (
              <CarouselItem key={s.id} UNSAFE_style={{flex: '0 0 320px'}}>
                <SlideCard title={s.title} body={s.body} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </ExampleSection>

      <ExampleSection
        title="Dot pagination — black outlined"
        description="`CarouselPagination` renders one dot per slide. The active dot is a filled black pill; inactive dots are white with a black outline for accessible contrast."
      >
        <Carousel aria-label="Dot pagination carousel example">
          <CarouselContent>
            {SLIDES.map((s) => (
              <CarouselItem key={s.id} cols={1}>
                <SlideCard title={s.title} body={s.body} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPagination />
        </Carousel>
      </ExampleSection>

      <ExampleSection
        title="Section with title + View All (pagination)"
        description="`CarouselSection` adds a bold section heading row. Pass a `LinkButton` as `actions` for an optional call-to-action. Use `cols={1}` so one card fills the viewport on mobile."
      >
        <Carousel>
          <CarouselSection
            title="Title"
            actions={<LinkButton size="small">View All</LinkButton>}
          >
            <CarouselContent>
              {SLIDES.map((s) => (
                <CarouselItem key={s.id} cols={1}>
                  <SlideCard title={s.title} body={s.body} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPagination />
          </CarouselSection>
        </Carousel>
      </ExampleSection>

      <ExampleSection
        title="Section with icon-button navigation in header"
        description="Place `CarouselHeaderPrevious` and `CarouselHeaderNext` in the `actions` slot for inline icon-button controls instead of overlaid arrows. Works because both components read from the parent `Carousel` context."
      >
        <Carousel>
          <CarouselSection
            title="Title"
            actions={
              <>
                <CarouselHeaderPrevious />
                <CarouselHeaderNext />
              </>
            }
          >
            <CarouselContent>
              {SLIDES.map((s) => (
                <CarouselItem key={s.id} cols={3}>
                  <SlideCard title={s.title} body={s.body} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </CarouselSection>
        </Carousel>
      </ExampleSection>

      <ExampleSection
        title="Two-up layout (2 cards visible)"
        description="Use `cols={2}` to show two cards side by side on desktop. On mobile they each snap to full width so only one card is visible at a time."
      >
        <Carousel>
          <CarouselContent>
            {SLIDES.map((s) => (
              <CarouselItem key={s.id} cols={2}>
                <SlideCard title={s.title} body={s.body} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPagination />
        </Carousel>
      </ExampleSection>

      <ExampleSection
        title="Card type variants"
        description="Carousel items can contain any content. These examples use existing `Tag`, `Card`, and `LinkButton` components — article, product tile, and review card."
      >
        <Carousel>
          <CarouselSection
            title="Featured"
            actions={<LinkButton size="small">View All</LinkButton>}
          >
            <CarouselContent>
              <CarouselItem cols={1}>
                <ArticleCard />
              </CarouselItem>
              <CarouselItem cols={1}>
                <ProductCard />
              </CarouselItem>
              <CarouselItem cols={1}>
                <ReviewCard />
              </CarouselItem>
              <CarouselItem cols={1}>
                <ArticleCard />
              </CarouselItem>
            </CarouselContent>
            <CarouselPagination />
          </CarouselSection>
        </Carousel>
      </ExampleSection>

      <ExampleSection title="With progress bar" description="`CarouselProgressBar` shows a thin fill that grows as the user advances.">
        <Carousel aria-label="Progress bar carousel example">
          <CarouselContent>
            {SLIDES.map((s) => (
              <CarouselItem key={s.id} UNSAFE_style={{flex: '0 0 320px'}}>
                <SlideCard title={s.title} body={s.body} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselProgressBar />
        </Carousel>
      </ExampleSection>

      <ExampleSection title="Variable-width items" description="Items don't need a fixed width — set per-slide widths and the carousel snaps to each.">
        <Carousel aria-label="Variable-width carousel example">
          <CarouselContent>
            <CarouselItem UNSAFE_style={{flex: '0 0 200px'}}>
              <SlideCard title="Narrow" body="200px wide." />
            </CarouselItem>
            <CarouselItem UNSAFE_style={{flex: '0 0 320px'}}>
              <SlideCard title="Medium" body="320px wide." />
            </CarouselItem>
            <CarouselItem UNSAFE_style={{flex: '0 0 440px'}}>
              <SlideCard title="Wide" body="440px wide — fills more of the viewport." />
            </CarouselItem>
            <CarouselItem UNSAFE_style={{flex: '0 0 200px'}}>
              <SlideCard title="Narrow again" body="Mix any widths in one row." />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </ExampleSection>
      <GuidelinesSection
        description="Use Carousel for horizontal-scrolling content rows where users benefit from snap navigation. Use `cols={1}` for single-card mobile patterns with dot pagination. Use `CarouselSection` with `actions` to add a title header and either a View All link or inline icon-button navigation. Use `cols={2}` or `cols={3}` for multi-card grids that collapse to single-card on mobile. For equal-height cards, `CarouselItem` already stretches its direct child to fill the row height. Max recommended slides for pagination variant: 5."
        defaultValue="(uncontrolled — snaps to each CarouselItem)"
      />
    </PageWrapper>
  );
}


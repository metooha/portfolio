import { useParams, useNavigate } from "react-router-dom";
import { LinkButton } from "@/app/components/LinkButton/LinkButton";
import { ChevronLeftIcon } from "@/app/components/Icons/Icons";
import { Tag } from "@/app/components/Tag/Tag";
import { PageContainer } from "@/app/components/layout";
import { Body, Heading } from "@/app/components/Text/Text";
import { otherWork, type OtherWorkMedia } from "@/app/data/portfolio-data";
import "./other-work-detail.css";

function MediaFrame({ item }: { item: OtherWorkMedia }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl bg-gray-50 shadow-sm">
        {item.type === "video" ? (
          <video
            src={item.src}
            className="w-full h-auto block"
            controls={item.controls}
            autoPlay={!item.controls}
            loop={!item.controls}
            muted={!item.controls}
            playsInline
            preload="metadata"
          />
        ) : (
          <img src={item.src} alt={item.caption ?? ""} loading="lazy" className="w-full h-auto block" />
        )}
      </div>
      {item.caption && (
        <figcaption className="mt-2">
          <Body as="span" size="small" color="subtle">
            {item.caption}
          </Body>
        </figcaption>
      )}
    </figure>
  );
}

function MediaGallery({ media }: { media: OtherWorkMedia[] }) {
  const heroMedia = media.filter((m) => m.wide);
  const gridMedia = media.filter((m) => !m.wide);

  return (
    <>
      {heroMedia.length > 0 && (
        <div className="space-y-8 mb-8">
          {heroMedia.map((item) => (
            <MediaFrame key={item.src} item={item} />
          ))}
        </div>
      )}

      {gridMedia.length > 0 && (
        <div className="[column-count:1] sm:[column-count:2] lg:[column-count:3] [column-gap:2rem]">
          {gridMedia.map((item) => (
            <div key={item.src} className="mb-8 break-inside-avoid">
              <MediaFrame item={item} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export function OtherWorkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const work = otherWork.find((item) => item.id === id);

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Body as="p" size="medium">
          Work not found
        </Body>
      </div>
    );
  }

  const hasMediaSections = work.media.some((m) => m.section);
  const mediaSections = hasMediaSections
    ? work.media.reduce<{ title: string; media: OtherWorkMedia[] }[]>((sections, item) => {
        const title = item.section ?? "Gallery";
        const existingSection = sections.find((section) => section.title === title);
        if (existingSection) {
          existingSection.media.push(item);
        } else {
          sections.push({ title, media: [item] });
        }
        return sections;
      }, [])
    : [{ title: "", media: work.media }];

  const metaItems = [
    work.role && { label: "Role", value: work.role },
    work.year && { label: "Context", value: work.year },
    { label: "Category", value: work.category },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="min-h-screen pt-16">
      <PageContainer className="py-12" maxWidth="max-w-[1660px]">
        <LinkButton
          size="small"
          leading={<ChevronLeftIcon size="small" decorative />}
          onClick={() => navigate("/work")}
          UNSAFE_className="other-work-back-link mb-8"
        >
          <span className="other-work-back-link__text">Back to Other Work</span>
        </LinkButton>

        <div className="max-w-3xl mb-8">
          <Tag color="gray" size="small" UNSAFE_className="mb-4">
            {work.category}
          </Tag>
          <Heading as="h1" size="large" weight="default" UNSAFE_className="text-4xl md:text-5xl mb-4">
            {work.title}
          </Heading>
          <Body as="p" size="large" color="subtle" UNSAFE_className="mb-0">
            {work.overview ?? work.description}
          </Body>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-200 pt-6 mb-12 max-w-3xl">
          {metaItems.map((meta) => (
            <div key={meta.label}>
              <dt className="mb-1">
                <Body as="span" size="small" color="subtle">
                  {meta.label}
                </Body>
              </dt>
              <dd className="m-0">
                <Body as="span" size="medium">
                  {meta.value}
                </Body>
              </dd>
            </div>
          ))}
        </dl>

        {mediaSections.map((section) => (
          <section key={section.title || "gallery"} className="mb-16 last:mb-0">
            {section.title && (
              <Heading as="h2" size="medium" weight="default" UNSAFE_className="mb-6">
                {section.title}
              </Heading>
            )}
            <MediaGallery media={section.media} />
          </section>
        ))}
      </PageContainer>
    </div>
  );
}

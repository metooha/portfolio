import React, { useState } from "react";
import { Body, Heading } from "@/app/components/Text/Text";
import { useWmSyncedScroll } from "./sections/shared/useWmSyncedScroll";

const GREEN = "#00693C";
const SEPARATOR = "var(--ld-semantic-color-separator, #e3e4e5)";

/* -------------------------------------------------------------------------- */
/* Hover-reveal card — flips from a plain wireframe placeholder to the real   */
/* designed card. Used for both the "reskin" and "new" card-type galleries.   */
/* -------------------------------------------------------------------------- */

export interface CardFace {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  cta?: string;
  imageRound?: boolean;
}

export function HoverRevealCard({ label, back }: { label: string; back: CardFace }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full aspect-[3/4] cursor-pointer"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      tabIndex={0}
      role="group"
      aria-label={`${label} card, flips to show the final design`}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front: wireframe placeholder */}
        <div
          className="absolute inset-0 rounded-xl p-5 flex flex-col gap-3"
          style={{ backfaceVisibility: "hidden", border: `1.5px solid ${GREEN}`, background: "#ffffff" }}
        >
          <Body as="p" size="small" weight="alt">
            {label}
          </Body>
          <div className="flex-1 rounded-md" style={{ background: "repeating-linear-gradient(135deg, #e3e3e3, #e3e3e3 10px, #ececec 10px, #ececec 20px)" }} />
          <div className="h-3 rounded-full w-3/5" style={{ background: "#e0a300" }} />
          <div className="h-2 rounded-full w-full" style={{ background: "#d6d6d6" }} />
          <div className="h-2 rounded-full w-4/5" style={{ background: "#d6d6d6" }} />
        </div>

        {/* Back: real design */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", border: `1px solid ${SEPARATOR}`, background: "#ffffff" }}
        >
          {back.image && (
            <div className={`w-full h-2/5 shrink-0 ${back.imageRound ? "flex items-center justify-center pt-5" : ""}`}>
              {back.imageRound ? (
                <img src={back.image} alt={back.imageAlt ?? ""} className="size-20 rounded-full object-cover" />
              ) : (
                <img src={back.image} alt={back.imageAlt ?? ""} className="w-full h-full object-cover" />
              )}
            </div>
          )}
          <div className="p-5 flex flex-col gap-1.5 flex-1 min-h-0">
            {back.eyebrow && (
              <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px", color: GREEN }}>
                {back.eyebrow}
              </Body>
            )}
            <Body as="p" size="medium" weight="alt" UNSAFE_className="leading-[1.25]">
              {back.title}
            </Body>
            {back.description && (
              <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.5] line-clamp-3">
                {back.description}
              </Body>
            )}
            {back.cta && (
              <Body as="p" size="small" weight="alt" UNSAFE_className="mt-auto underline" UNSAFE_style={{ color: GREEN }}>
                {back.cta}
              </Body>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardFlipGrid({ cards }: { cards: { label: string; back: CardFace }[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cards.map((card) => (
        <HoverRevealCard key={card.label} label={card.label} back={card.back} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tag taxonomy — the component-group pill grid, organized by spectrum.       */
/* -------------------------------------------------------------------------- */

export function TagTaxonomyGrid({ columns }: { columns: { label: string; tags: string[] }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {columns.map((column) => (
        <div key={column.label}>
          <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="uppercase tracking-[0.1em] mb-3" UNSAFE_style={{ fontSize: "10px" }}>
            {column.label}
          </Body>
          <div className="flex flex-wrap gap-2">
            {column.tags.map((tag) => (
              <span
                key={tag}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-full"
                style={{ background: GREEN, color: "#e9f722" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Component anatomy spec — simplified stand-in for a component's Figma       */
/* properties panel: which fields are required vs. optional.                  */
/* -------------------------------------------------------------------------- */

export function ComponentAnatomySpec({
  componentName,
  description,
  fields,
}: {
  componentName: string;
  description: string;
  fields: { name: string; note: string }[];
}) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${SEPARATOR}` }}>
      <div className="px-6 py-5" style={{ background: "var(--ld-semantic-color-fill-subtle, #f8f8f8)", borderBottom: `1px solid ${SEPARATOR}` }}>
        <Body as="p" size="small" weight="alt" UNSAFE_className="mb-1">
          {componentName}
        </Body>
        <Body as="p" size="small" color="subtlest" UNSAFE_className="leading-[1.5]">
          {description}
        </Body>
      </div>
      <div>
        {fields.map((field, index) => (
          <div
            key={field.name}
            className="flex items-center justify-between gap-4 px-6 py-3"
            style={{ borderTop: index === 0 ? undefined : `1px solid ${SEPARATOR}` }}
          >
            <Body as="p" size="small" weight="alt">
              {field.name}
            </Body>
            <Body as="p" size="small" UNSAFE_style={{ color: "#c324b8", fontSize: "11px" }} UNSAFE_className="text-right shrink-0">
              {field.note}
            </Body>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page template grid — five-column spectrum from transactional to brand-led. */
/* -------------------------------------------------------------------------- */

export interface PageTemplateColumn {
  groups: string[][];
}

export function PageTemplateGrid({ columns, leftLabel, rightLabel }: { columns: PageTemplateColumn[]; leftLabel: string; rightLabel: string }) {
  return (
    <div>
      <div className="flex justify-between mb-4 pb-2" style={{ borderBottom: `2px solid ${SEPARATOR}` }}>
        <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px" }}>
          {leftLabel}
        </Body>
        <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px" }}>
          {rightLabel}
        </Body>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-2">
            {column.groups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className={`flex flex-col gap-1.5 ${group.length > 1 ? "rounded-lg p-1.5" : ""}`}
                style={group.length > 1 ? { border: `1.5px solid ${GREEN}` } : undefined}
              >
                {group.map((card) => (
                  <div key={card} className="rounded-md px-3 py-4 text-center" style={{ background: "#dae4e1" }}>
                    <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: GREEN, fontSize: "12px", lineHeight: 1.3 }}>
                      {card}
                    </Body>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Synced compare slider — draggable, scroll-synced before/after reveal.      */
/* Reused for both the annotated wireframe walkthrough and the proposed-vs-   */
/* live comparison in Compromises.                                            */
/* -------------------------------------------------------------------------- */

export interface CompareAnnotation {
  title: string;
  text: string;
  top: string;
  left?: string;
  right?: string;
}

const scrollbarHide = "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

function AnnotationPin({ annotation }: { annotation: CompareAnnotation }) {
  return (
    <div
      className="absolute z-10 flex items-start gap-2 max-w-[240px]"
      style={{ top: annotation.top, left: annotation.left, right: annotation.right }}
    >
      <span className="mt-1.5 size-2 rounded-full shrink-0" style={{ background: "#0026FF" }} aria-hidden="true" />
      <div className="rounded-lg px-3 py-2" style={{ background: "#EFF2FF", border: "1px solid #C7D2FE" }}>
        <Body as="p" size="small" weight="alt" UNSAFE_style={{ color: "#0026FF", fontSize: "12px" }} UNSAFE_className="mb-0.5">
          {annotation.title}
        </Body>
        <Body as="p" size="small" UNSAFE_style={{ color: "#0026FF", fontSize: "12px", lineHeight: 1.4 }}>
          {annotation.text}
        </Body>
      </div>
    </div>
  );
}

export function SyncedCompareSlider({
  leftLabel,
  rightLabel,
  left,
  right,
  frameHeight = 700,
  contentWidth = 1180,
  annotations,
}: {
  leftLabel: string;
  rightLabel: string;
  left: React.ReactNode;
  right: React.ReactNode;
  frameHeight?: number;
  contentWidth?: number;
  annotations?: CompareAnnotation[];
}) {
  const [splitX, setSplitX] = useState(Math.round(contentWidth / 2));
  const { leftScrollRef, rightScrollRef, syncScrollFromLeft, syncScrollFromRight } = useWmSyncedScroll();

  const handleDrag = (deltaX: number) => {
    setSplitX((prev) => Math.max(0, Math.min(contentWidth, prev + deltaX)));
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex justify-between px-1" style={{ width: "100%" }}>
        <Body as="p" size="small" weight="alt" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px", color: GREEN }}>
          {leftLabel}
        </Body>
        <Body as="p" size="small" weight="alt" color="subtlest" UNSAFE_className="uppercase tracking-[0.1em]" UNSAFE_style={{ fontSize: "10px" }}>
          {rightLabel}
        </Body>
      </div>
      <div className={`w-full overflow-x-auto overflow-y-hidden rounded-2xl ${scrollbarHide}`} style={{ border: `1px solid ${SEPARATOR}` }}>
        <div className="relative" style={{ height: frameHeight, minWidth: contentWidth }}>
          {/* Left/background layer, full width */}
          <div
            ref={leftScrollRef}
            onScroll={syncScrollFromLeft}
            className={`absolute inset-0 overflow-y-auto overflow-x-hidden ${scrollbarHide}`}
          >
            <div style={{ width: contentWidth }}>{left}</div>
          </div>

          {/* Right/foreground layer, clipped to splitX */}
          <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: splitX }}>
            <div
              ref={rightScrollRef}
              onScroll={syncScrollFromRight}
              className={`h-full overflow-y-auto overflow-x-hidden ${scrollbarHide}`}
              style={{ width: contentWidth }}
            >
              <div className="relative" style={{ width: contentWidth }}>
                {right}
                {annotations?.map((annotation) => <AnnotationPin key={annotation.title} annotation={annotation} />)}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0" style={{ left: splitX, width: 2, background: "#023625" }} aria-hidden="true" />
          <DragHandle onDrag={handleDrag} splitX={splitX} />
        </div>
      </div>
    </div>
  );
}

function DragHandle({ onDrag, splitX }: { onDrag: (deltaX: number) => void; splitX: number }) {
  const [dragStart, setDragStart] = useState<number | null>(null);

  return (
    <button
      type="button"
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 rounded-full size-12 cursor-grab active:cursor-grabbing touch-none select-none border-0 p-0 appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      style={{ left: splitX, background: "rgba(25,25,25,0.55)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
      onPointerDown={(e) => {
        e.preventDefault();
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setDragStart(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragStart === null) return;
        onDrag(e.clientX - dragStart);
        setDragStart(e.clientX);
      }}
      onPointerUp={(e) => {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        setDragStart(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onDrag(60);
        if (e.key === "ArrowLeft") onDrag(-60);
      }}
      aria-label="Drag to compare the two versions"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" className="mx-auto" fill="none">
        <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Golden rules card — three-up photo card grid used in the recycling mockup. */
/* -------------------------------------------------------------------------- */

export function GoldenRulesGrid({ cards }: { cards: { image: string; imageAlt: string; text: string; negative?: boolean }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.text} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${SEPARATOR}` }}>
          <div className="relative aspect-[4/3]">
            <img src={card.image} alt={card.imageAlt} className="w-full h-full object-cover" />
            {card.negative && (
              <span className="absolute top-2 right-2 size-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">×</span>
            )}
          </div>
          <div className="p-4">
            <Body as="p" size="small" weight="alt" UNSAFE_className="leading-[1.4]">
              {card.text}
            </Body>
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Material chip row — accepted / not-accepted materials, as a labeled row of */
/* pills rather than a full icon grid.                                        */
/* -------------------------------------------------------------------------- */

export function MaterialChipRow({ label, materials, positive }: { label: string; materials: string[]; positive: boolean }) {
  return (
    <div>
      <Body
        as="p"
        size="small"
        weight="alt"
        UNSAFE_className="uppercase tracking-[0.1em] mb-3"
        UNSAFE_style={{ fontSize: "10px", color: positive ? "#1d8202" : "#c92a2a" }}
      >
        {label}
      </Body>
      <div className="flex flex-wrap gap-2">
        {materials.map((material) => (
          <span
            key={material}
            className="text-[12px] px-3 py-1.5 rounded-full"
            style={{
              background: positive ? "#eaf3e6" : "#fdecec",
              color: positive ? "#1d5f02" : "#a11919",
            }}
          >
            {material}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Recycling page mockup — a condensed version of the proposed page, used as  */
/* the left panel of the Compromises comparison slider.                      */
/* -------------------------------------------------------------------------- */

export function RecyclingMockup({
  heroImage,
  goldenRules,
  accepted,
  notAccepted,
}: {
  heroImage: string;
  goldenRules: { image: string; imageAlt: string; text: string; negative?: boolean }[];
  accepted: string[];
  notAccepted: string[];
}) {
  return (
    <div className="bg-white">
      <div className="relative h-[280px]">
        <img src={heroImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-end p-8" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}>
          <Heading as="h3" size="large" weight="alt" UNSAFE_style={{ color: "#ffffff" }}>
            Recycling 101
          </Heading>
          <Body as="p" size="medium" UNSAFE_style={{ color: "rgba(255,255,255,0.85)" }}>
            An inspiring statement about why recycling right is important.
          </Body>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-8">
        <div>
          <Heading as="h4" size="small" weight="alt" UNSAFE_className="mb-4">
            The Golden Rules of Recycling
          </Heading>
          <GoldenRulesGrid cards={goldenRules} />
        </div>
        <div className="flex flex-col gap-6">
          <MaterialChipRow label="Accepted in your bin" materials={accepted} positive />
          <MaterialChipRow label="Not accepted in your bin" materials={notAccepted} positive={false} />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Side-by-side compare — two labeled columns in a bordered frame, each with  */
/* its own fixed-height scroll. Same pattern as the other case studies' before/*/
/* after comparisons, generalized to accept any content (image or component). */
/* -------------------------------------------------------------------------- */

export function SideBySideCompare({
  leftLabel,
  rightLabel,
  left,
  right,
  height = 560,
}: {
  leftLabel: string;
  rightLabel: string;
  left: React.ReactNode;
  right: React.ReactNode;
  height?: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { label: leftLabel, content: left },
        { label: rightLabel, content: right },
      ].map((col) => (
        <div key={col.label} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${SEPARATOR}` }}>
          <div className="px-4 py-2" style={{ background: "#000000" }}>
            <Body
              as="p"
              size="small"
              weight="alt"
              UNSAFE_className="uppercase tracking-[0.1em]"
              UNSAFE_style={{ fontSize: "10px", color: "#ffffff" }}
            >
              {col.label}
            </Body>
          </div>
          <div className="w-full overflow-y-auto" style={{ height }}>
            {col.content}
          </div>
        </div>
      ))}
    </div>
  );
}

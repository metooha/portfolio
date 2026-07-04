import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import svgPaths from "../svg/svg-wznnermhqa";
import imgDSf1Landing2 from "@/app/assets/pages/case-study/wm-rebrand/dsf1-landing2.png";
import img from "@/app/assets/pages/case-study/wm-rebrand/wm-rebrand-asset-80347242.png";
import imgWireframe1 from "@/app/assets/pages/case-study/wm-rebrand/wireframe1.png";
import imgWireframe1_2x from "figma:asset/8f0e182098872906bfe1ae2e5c8753c973347910@2x.png";

import { COMPARISON_FRAME_H, COMPARISON_CONTENT_H, COMPARISON_WIDTH, LEFT_PANEL_MAX_WIDTH, scrollbarHide } from "./shared/wmComparisonConstants";
import { useWmSyncedScroll } from "./shared/useWmSyncedScroll";

function Left({ scrollRef, onScroll }: { scrollRef: React.RefObject<HTMLDivElement | null>; onScroll: () => void }) {
  return (
    <div
      ref={scrollRef}
      className={`absolute overflow-y-auto overflow-x-hidden right-0 top-0 w-[1184px] scroll-smooth ${scrollbarHide}`}
      style={{ height: COMPARISON_FRAME_H }}
      onScroll={onScroll}
      data-name="Left"
    >
      <div className="relative right-[-0.3px] top-0 w-[1184.352px]" style={{ height: COMPARISON_CONTENT_H }} data-name="D.SF.1 - Landing 2">
        <img alt="Design" className="absolute inset-0 max-w-none object-cover object-top pointer-events-none size-full" src={imgDSf1Landing2} />
      </div>
    </div>
  );
}

function Image15({ scrollRef, onScroll }: { scrollRef: React.RefObject<HTMLDivElement | null>; onScroll: () => void }) {
  return (
    <div className="absolute left-px right-[-1px] top-0" style={{ height: COMPARISON_FRAME_H }} data-name="Image 2">
      <Left scrollRef={scrollRef} onScroll={onScroll} />
    </div>
  );
}

/* Design callout: light blue card + blue title/body text + directional dashed arrow.
   direction="left"  → ←--- [card]  (default)
   direction="up"    → vertical line above, card to the right  (The Main Story)
   direction="down"  → [card] with line going down-left below  (Pathing) */

function DesignCallout({
  className,
  title,
  text,
  direction = "left",
  "data-name": dataName,
}: {
  className?: string;
  title?: string;
  text: string;
  direction?: "left" | "up" | "down";
  "data-name"?: string;
}) {
  const card = (
    <div className="shrink-0 rounded-xl bg-[#EFF2FF] border border-[#C7D2FE] px-4 py-3 max-w-[260px]">
      {title && (
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[13px] leading-[1.3] text-[#0026FF] mb-1.5">{title}</p>
      )}
      <p className="font-['Inter:Regular',sans-serif] text-[13px] leading-[1.5] text-[#0026FF]">{text}</p>
    </div>
  );

  if (direction === "up") {
    /* Vertical dashed line going up on the left, card aligned to its bottom */
    return (
      <div className={`flex min-h-[500px] items-start justify-center gap-2 text-left ${className ?? ""}`} data-name={dataName}>
        <div className="flex flex-col items-center shrink-0" aria-hidden>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="shrink-0">
            <path d="M1 7L7 1L13 7" stroke="#0026FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="shrink-0 border-l-2 border-dashed border-[#0026FF]" style={{ height: 120 }} />
        </div>
        {card}
      </div>
    );
  }

  if (direction === "down") {
    /* L-shaped: horizontal dashed line at top extends left from card, vertical goes down with ↓ arrowhead */
    return (
      <div className={`flex flex-row items-start gap-0 text-left ${className ?? ""}`} data-name={dataName}>
        <div className="shrink-0 mt-[30px]" aria-hidden>
          <svg width="86" height="101" viewBox="0 0 86 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.52345 0.749997L5.52345 -3.4532e-06L4.77345 -3.48598e-06L4.77345 0.749997L5.52345 0.749997ZM4.99311 100.28C5.28601 100.573 5.76088 100.573 6.05377 100.28L10.8267 95.5074C11.1196 95.2145 11.1196 94.7396 10.8267 94.4467C10.5338 94.1538 10.059 94.1538 9.76608 94.4467L5.52344 98.6893L1.2808 94.4467C0.987911 94.1538 0.513035 94.1538 0.220142 94.4467C-0.0727504 94.7396 -0.0727504 95.2145 0.220142 95.5074L4.99311 100.28ZM84.5232 0.75L85.2732 0.749772L85.273 3.27645e-08L84.5232 0L84.5232 0.75ZM83.7734 1.41023C83.7736 1.82444 84.1094 2.16013 84.5237 2.16C84.9379 2.15987 85.2736 1.82399 85.2734 1.40977L84.5234 1.41L83.7734 1.41023ZM85.2734 1.18977C85.2732 0.775558 84.9373 0.439874 84.5231 0.44C84.1089 0.440126 83.7732 0.776015 83.7734 1.19023L84.5234 1.19L85.2734 1.18977ZM83.7733 0.970228C83.7734 1.38444 84.1093 1.72013 84.5235 1.72C84.9377 1.71987 85.2734 1.38399 85.2733 0.969772L84.5233 0.97L83.7733 0.970228ZM80.7613 -1.64447e-07C80.3471 -1.82553e-07 80.0113 0.335786 80.0113 0.75C80.0113 1.16421 80.3471 1.5 80.7613 1.5L80.7613 0.75L80.7613 -1.64447e-07ZM76.9994 1.5C77.4137 1.5 77.7494 1.16421 77.7494 0.75C77.7494 0.335786 77.4137 -3.10778e-07 76.9994 -3.28884e-07L76.9994 0.75L76.9994 1.5ZM69.4757 -6.5776e-07C69.0614 -6.75865e-07 68.7257 0.335786 68.7257 0.749999C68.7257 1.16421 69.0614 1.5 69.4757 1.5L69.4757 0.749999L69.4757 -6.5776e-07ZM65.7138 1.5C66.128 1.5 66.4638 1.16421 66.4638 0.749999C66.4638 0.335786 66.128 -8.04091e-07 65.7138 -8.22197e-07L65.7138 0.749999L65.7138 1.5ZM58.19 -1.15107e-06C57.7758 -1.16918e-06 57.44 0.335785 57.44 0.749999C57.44 1.16421 57.7758 1.5 58.19 1.5L58.19 0.749999L58.19 -1.15107e-06ZM54.4281 1.5C54.8423 1.5 55.1781 1.16421 55.1781 0.749999C55.1781 0.335785 54.8423 -1.2974e-06 54.4281 -1.31551e-06L54.4281 0.749999L54.4281 1.5ZM46.9043 -1.64439e-06C46.4901 -1.66249e-06 46.1543 0.335785 46.1543 0.749998C46.1543 1.16421 46.4901 1.5 46.9043 1.5L46.9043 0.749998L46.9043 -1.64439e-06ZM43.1424 1.5C43.5566 1.5 43.8924 1.16421 43.8924 0.749998C43.8924 0.335785 43.5566 -1.79072e-06 43.1424 -1.80882e-06L43.1424 0.749998L43.1424 1.5ZM35.6186 -2.1377e-06C35.2044 -2.1558e-06 34.8686 0.335784 34.8686 0.749998C34.8686 1.16421 35.2044 1.5 35.6186 1.5L35.6186 0.749998L35.6186 -2.1377e-06ZM31.8567 1.5C32.2709 1.5 32.6067 1.16421 32.6067 0.749998C32.6067 0.335784 32.2709 -2.28403e-06 31.8567 -2.30214e-06L31.8567 0.749998L31.8567 1.5ZM24.3329 -2.63101e-06C23.9187 -2.64912e-06 23.5829 0.335784 23.5829 0.749997C23.5829 1.16421 23.9187 1.5 24.3329 1.5L24.3329 0.749997L24.3329 -2.63101e-06ZM20.571 1.5C20.9852 1.5 21.321 1.16421 21.321 0.749997C21.321 0.335784 20.9852 -2.77734e-06 20.571 -2.79545e-06L20.571 0.749997L20.571 1.5ZM13.0472 -3.12432e-06C12.633 -3.14243e-06 12.2972 0.335783 12.2972 0.749997C12.2972 1.16421 12.633 1.5 13.0472 1.5L13.0472 0.749997L13.0472 -3.12432e-06ZM9.28534 1.5C9.69955 1.5 10.0353 1.16421 10.0353 0.749997C10.0353 0.335783 9.69955 -3.27066e-06 9.28534 -3.28876e-06L9.28534 0.749997L9.28534 1.5ZM4.77344 5.31724C4.77344 5.73145 5.10923 6.06724 5.52344 6.06724C5.93766 6.06724 6.27344 5.73145 6.27344 5.31724L5.52344 5.31724L4.77344 5.31724ZM6.27344 9.88448C6.27344 9.47027 5.93766 9.13448 5.52344 9.13448C5.10923 9.13448 4.77344 9.47027 4.77344 9.88448L5.52344 9.88448L6.27344 9.88448ZM4.77344 19.019C4.77344 19.4332 5.10923 19.769 5.52344 19.769C5.93766 19.769 6.27344 19.4332 6.27344 19.019L5.52344 19.019L4.77344 19.019ZM6.27344 23.5862C6.27344 23.172 5.93766 22.8362 5.52344 22.8362C5.10923 22.8362 4.77344 23.172 4.77344 23.5862L5.52344 23.5862L6.27344 23.5862ZM4.77344 32.7207C4.77344 33.1349 5.10923 33.4707 5.52344 33.4707C5.93766 33.4707 6.27344 33.1349 6.27344 32.7207L5.52344 32.7207L4.77344 32.7207ZM6.27344 37.2879C6.27344 36.8737 5.93766 36.5379 5.52344 36.5379C5.10923 36.5379 4.77344 36.8737 4.77344 37.2879L5.52344 37.2879L6.27344 37.2879ZM4.77344 45.7148C4.77344 46.1291 5.10923 46.4648 5.52344 46.4648C5.93766 46.4648 6.27344 46.1291 6.27344 45.7148L5.52344 45.7148L4.77344 45.7148ZM6.27344 49.5745C6.27344 49.1603 5.93766 48.8245 5.52344 48.8245C5.10923 48.8245 4.77344 49.1603 4.77344 49.5745L5.52344 49.5745L6.27344 49.5745ZM4.77344 57.2938C4.77344 57.708 5.10923 58.0438 5.52344 58.0438C5.93766 58.0438 6.27344 57.708 6.27344 57.2938L5.52344 57.2938L4.77344 57.2938ZM6.27344 61.1535C6.27344 60.7392 5.93766 60.4035 5.52344 60.4035C5.10923 60.4035 4.77344 60.7392 4.77344 61.1535L5.52344 61.1535L6.27344 61.1535ZM4.77344 68.8728C4.77344 69.287 5.10923 69.6228 5.52344 69.6228C5.93766 69.6228 6.27344 69.287 6.27344 68.8728L5.52344 68.8728L4.77344 68.8728ZM6.27344 72.7324C6.27344 72.3182 5.93766 71.9824 5.52344 71.9824C5.10923 71.9824 4.77344 72.3182 4.77344 72.7324L5.52344 72.7324L6.27344 72.7324ZM4.77344 80.4517C4.77344 80.8659 5.10923 81.2017 5.52344 81.2017C5.93766 81.2017 6.27344 80.8659 6.27344 80.4517L5.52344 80.4517L4.77344 80.4517ZM6.27344 84.3114C6.27344 83.8972 5.93766 83.5614 5.52344 83.5614C5.10923 83.5614 4.77344 83.8972 4.77344 84.3114L5.52344 84.3114L6.27344 84.3114ZM4.77344 92.0307C4.77344 92.4449 5.10923 92.7807 5.52344 92.7807C5.93766 92.7807 6.27344 92.4449 6.27344 92.0307L5.52344 92.0307L4.77344 92.0307ZM6.27344 95.8903C6.27344 95.4761 5.93766 95.1403 5.52344 95.1403C5.10923 95.1403 4.77344 95.4761 4.77344 95.8903L5.52344 95.8903L6.27344 95.8903ZM84.5234 1.41L85.2734 1.40977L85.2734 1.18977L84.5234 1.19L83.7734 1.19023L83.7734 1.41023L84.5234 1.41ZM84.5233 0.97L85.2733 0.969772L85.2732 0.749772L84.5232 0.75L83.7732 0.750228L83.7733 0.970228L84.5233 0.97ZM84.5232 0.75L84.5232 0L80.7613 -1.64447e-07L80.7613 0.75L80.7613 1.5L84.5232 1.5L84.5232 0.75ZM76.9994 0.75L76.9994 -3.28884e-07L69.4757 -6.5776e-07L69.4757 0.749999L69.4757 1.5L76.9994 1.5L76.9994 0.75ZM65.7138 0.749999L65.7138 -8.22197e-07L58.19 -1.15107e-06L58.19 0.749999L58.19 1.5L65.7138 1.5L65.7138 0.749999ZM54.4281 0.749999L54.4281 -1.31551e-06L46.9043 -1.64439e-06L46.9043 0.749998L46.9043 1.5L54.4281 1.5L54.4281 0.749999ZM43.1424 0.749998L43.1424 -1.80882e-06L35.6186 -2.1377e-06L35.6186 0.749998L35.6186 1.5L43.1424 1.5L43.1424 0.749998ZM31.8567 0.749998L31.8567 -2.30214e-06L24.3329 -2.63101e-06L24.3329 0.749997L24.3329 1.5L31.8567 1.5L31.8567 0.749998ZM20.571 0.749997L20.571 -2.79545e-06L13.0472 -3.12432e-06L13.0472 0.749997L13.0472 1.5L20.571 1.5L20.571 0.749997ZM9.28534 0.749997L9.28534 -3.28876e-06L5.52345 -3.4532e-06L5.52345 0.749997L5.52345 1.5L9.28534 1.5L9.28534 0.749997ZM5.52345 0.749997L4.77345 0.749997L4.77344 5.31724L5.52344 5.31724L6.27344 5.31724L6.27345 0.749997L5.52345 0.749997ZM5.52344 9.88448L4.77344 9.88448L4.77344 19.019L5.52344 19.019L6.27344 19.019L6.27344 9.88448L5.52344 9.88448ZM5.52344 23.5862L4.77344 23.5862L4.77344 32.7207L5.52344 32.7207L6.27344 32.7207L6.27344 23.5862L5.52344 23.5862ZM5.52344 37.2879L4.77344 37.2879L4.77344 41.8552L5.52344 41.8552L6.27344 41.8552L6.27344 37.2879L5.52344 37.2879ZM5.52344 41.8552L4.77344 41.8552L4.77344 45.7148L5.52344 45.7148L6.27344 45.7148L6.27344 41.8552L5.52344 41.8552ZM5.52344 49.5745L4.77344 49.5745L4.77344 57.2938L5.52344 57.2938L6.27344 57.2938L6.27344 49.5745L5.52344 49.5745ZM5.52344 61.1535L4.77344 61.1535L4.77344 68.8728L5.52344 68.8728L6.27344 68.8728L6.27344 61.1535L5.52344 61.1535ZM5.52344 72.7324L4.77344 72.7324L4.77344 80.4517L5.52344 80.4517L6.27344 80.4517L6.27344 72.7324L5.52344 72.7324ZM5.52344 84.3114L4.77344 84.3114L4.77344 92.0307L5.52344 92.0307L6.27344 92.0307L6.27344 84.3114L5.52344 84.3114ZM5.52344 95.8903L4.77344 95.8903L4.77344 99.75L5.52344 99.75L6.27344 99.75L6.27344 95.8903L5.52344 95.8903Z" fill="#0026FF"/>
          </svg>
        </div>
        {card}
      </div>
    );
  }

  /* Default: left-pointing horizontal arrow */
  return (
    <div className={`flex items-center gap-0 text-left ${className ?? ""}`} data-name={dataName}>
      <div className="flex items-center shrink-0" aria-hidden>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="shrink-0">
          <path d="M7 1L1 7L7 13" stroke="#0026FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="w-10 shrink-0 border-t-2 border-dashed border-[#0026FF]" />
      </div>
      {card}
    </div>
  );
}

/* Callout 1 — Clear Sub-navigation (top of wireframe, subnav area) */

function Callout() {
  return (
    <div className="absolute left-[360px] top-[425px] z-10" data-name="Callout 1">
      <DesignCallout
        title="Clear Sub-navigation"
        text="It's possible that a story will take more than one page. The subnav is meant to be placed beneath the hero and to stay on scroll. Not as an anchor link, but as a link to a different page."
        data-name="Callout 1"
      />
    </div>
  );
}

/* Callout 2 — Primary CTA (Reserve Your Spot section, button area) */

function Callout1() {
  return (
    <div className="absolute left-[390px] top-[815px] z-10" data-name="Callout 2">
      <DesignCallout
        title="Primary CTA"
        text="When these tales contain an action that you want users to do, make it easy for them to identify and understand the action."
        data-name="Callout 2"
      />
    </div>
  );
}

/* Callout 3 — The Main Story (video / media section, vertical arrow pointing up) */

function Callout2() {
  return (
    <div className="absolute left-[96px] top-[1240px] z-10" data-name="Callout 3">
      <DesignCallout
        title="The Main Story"
        text="There's lots of room to build the story you want to tell by combining current and new components."
        direction="up"
        data-name="Callout 3"
      />
    </div>
  );
}

/* Callout 4 — Pathing (right side, card grid section, L-shaped arrow going down) */

function Callout3() {
  return (
    <div className="absolute right-[61px] top-[1903px] z-10" data-name="Callout 4">
      <DesignCallout
        title="Pathing"
        text="We can assure that there are no dead ends by using the Grids and Pathing components, and that a user always has something new to investigate."
        direction="down"
        data-name="Callout 4"
      />
    </div>
  );
}

function Image16({ className, scrollRef, onScroll }: { className?: string; scrollRef?: React.RefObject<HTMLDivElement | null>; onScroll?: () => void }) {
  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className={`${className ?? "bg-[#f4f4f4] h-full overflow-x-clip overflow-y-auto relative shrink-0 w-[587px]"} ${scrollbarHide} scroll-smooth`}
      data-name="Image 1"
    >
      <div className="relative w-[1185px]" style={{ height: COMPARISON_CONTENT_H }} data-name="Wireframe 1">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover object-left-top pointer-events-none size-full"
          src={imgWireframe1}
          srcSet={`${imgWireframe1} 1x, ${imgWireframe1_2x} 2x`}
        />
        <Callout />
        <Callout1 />
        <Callout2 />
        <Callout3 />
      </div>
    </div>
  );
}

function Frame97() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[27.176px] left-[calc(50%+0.35px)] top-[calc(50%-0.41px)] w-[36.706px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.7059 27.1765">
        <g id="Frame 1618872789">
          <path clipRule="evenodd" d={svgPaths.p10075300} fill="var(--fill-0, white)" fillRule="evenodd" id="caretLeftSmall" />
          <path clipRule="evenodd" d={svgPaths.pb462e00} fill="var(--fill-0, white)" fillRule="evenodd" id="caretLeftSmall_2" />
        </g>
      </svg>
    </div>
  );
}

function CircleCaretLeft({ onDrag, splitX }: { onDrag: (deltaX: number) => void; splitX: number }) {
  const dragStart = useRef<{ x: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = { x: e.clientX };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const deltaX = e.clientX - dragStart.current.x;
    dragStart.current = { x: e.clientX };
    onDrag(deltaX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    dragStart.current = null;
  };

  return (
    <button
      type="button"
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-[rgba(25,25,25,0.4)] rounded-[1000px] size-[80px] cursor-grab active:cursor-grabbing touch-none select-none border-0 p-0 appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(25,25,25,0.4)]"
      style={{ left: splitX + 1 }}
      data-name="circleCaret/left"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          onDrag(150);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          onDrag(-150);
        }
      }}
      aria-label="Drag left to hide the wireframe, drag right to show it"
    >
      <div aria-hidden="true" className="absolute border border-[#f8f8f8] border-solid inset-[-0.5px] pointer-events-none rounded-[1000.5px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" />
      <Frame97 />
      <div className="absolute border border-[#e8e8e8] border-solid inset-0 rounded-[100px] pointer-events-none" data-name="border" />
    </button>
  );
}

function RightImage({
  leftPanelWidth,
  onDrag,
  leftScrollRef,
  onLeftScroll,
}: {
  leftPanelWidth: number;
  onDrag: (deltaX: number) => void;
  leftScrollRef: React.RefObject<HTMLDivElement | null>;
  onLeftScroll: () => void;
}) {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 h-[700px]" style={{ height: COMPARISON_FRAME_H }} data-name="Right Image">
      <div className="h-full overflow-hidden shrink-0 transition-[width] duration-75" style={{ width: leftPanelWidth }}>
        <Image16 className="bg-[#f4f4f4] h-full overflow-x-clip overflow-y-auto relative w-full min-w-0" scrollRef={leftScrollRef} onScroll={onLeftScroll} />
      </div>
      <div className="bg-[#023625] h-full shrink-0 w-[2px]" data-name="Line" />
      <CircleCaretLeft onDrag={onDrag} splitX={leftPanelWidth} />
    </div>
  );
}

function Comparison() {
  const [leftPanelWidth, setLeftPanelWidth] = useState(Math.round(LEFT_PANEL_MAX_WIDTH / 2));
  const { leftScrollRef, rightScrollRef, syncScrollFromLeft, syncScrollFromRight } = useWmSyncedScroll();

  const handleCaretDrag = (deltaX: number) => {
    const step = Math.sign(deltaX) * Math.min(Math.abs(deltaX) * 1.8, 400);
    setLeftPanelWidth((prev) => Math.max(0, Math.min(LEFT_PANEL_MAX_WIDTH, prev + step)));
  };

  return (
    <div className={`w-full max-w-[1180px] overflow-x-auto overflow-y-hidden rounded-[16px] ${scrollbarHide}`}>
      <div className="relative rounded-[16px] min-w-[1180px]" style={{ height: COMPARISON_FRAME_H }} data-name="Comparison">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Image15 scrollRef={rightScrollRef} onScroll={syncScrollFromRight} />
          <RightImage leftPanelWidth={leftPanelWidth} onDrag={handleCaretDrag} leftScrollRef={leftScrollRef} onLeftScroll={syncScrollFromLeft} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[16px]" />
      </div>
    </div>
  );
}

export function WmCaseStudyComparisonSection() {
  return <Comparison />;
}

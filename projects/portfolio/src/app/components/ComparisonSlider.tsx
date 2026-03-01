import React, { useRef, useState } from "react";

const scrollbarHide =
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

function useSyncedScroll() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  const syncFromLeft = () => {
    if (syncing.current || !leftRef.current || !rightRef.current) return;
    syncing.current = true;
    rightRef.current.scrollTop = leftRef.current.scrollTop;
    requestAnimationFrame(() => { syncing.current = false; });
  };

  const syncFromRight = () => {
    if (syncing.current || !leftRef.current || !rightRef.current) return;
    syncing.current = true;
    leftRef.current.scrollTop = rightRef.current.scrollTop;
    requestAnimationFrame(() => { syncing.current = false; });
  };

  return { leftRef, rightRef, syncFromLeft, syncFromRight };
}

interface CaretProps {
  onDrag: (deltaX: number) => void;
  splitX: number;
}

function DragHandle({ onDrag, splitX }: CaretProps) {
  const dragStart = useRef<{ x: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = { x: e.clientX };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const delta = e.clientX - dragStart.current.x;
    dragStart.current = { x: e.clientX };
    onDrag(delta);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    dragStart.current = null;
  };

  return (
    <button
      type="button"
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-[rgba(25,25,25,0.4)] rounded-full size-[80px] cursor-grab active:cursor-grabbing touch-none select-none border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      style={{ left: splitX + 1 }}
      aria-label="Drag to compare before and after"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); onDrag(150); }
        if (e.key === "ArrowLeft")  { e.preventDefault(); onDrag(-150); }
      }}
    >
      {/* Double caret icon */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="37"
        height="28"
        fill="none"
        viewBox="0 0 37 28"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 14L20 7v14L14 14Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23 14L17 7v14l6-7Z"
          fill="white"
        />
      </svg>
      <div className="absolute inset-0 rounded-full border border-[#e8e8e8] pointer-events-none" />
    </button>
  );
}

interface ComparisonSliderProps {
  /** Image shown on the LEFT panel (e.g. proposed / wireframe) */
  leftImage: string;
  /** Image shown on the RIGHT panel (e.g. live site / current) */
  rightImage: string;
  /** Viewport height in px. Defaults to 700. */
  height?: number;
  /**
   * Actual image content height in px (enables scrolling for tall images).
   * Defaults to match height (no scroll).
   */
  contentHeight?: number;
  /** Max width of the comparison viewport. Defaults to 1180. */
  maxWidth?: number;
  labels?: {
    left?: string;
    right?: string;
  };
  className?: string;
  /** Optional left-panel children (e.g. annotation overlays) */
  leftOverlay?: React.ReactNode;
}

export function ComparisonSlider({
  leftImage,
  rightImage,
  height = 700,
  contentHeight,
  maxWidth = 1180,
  labels,
  className = "",
  leftOverlay,
}: ComparisonSliderProps) {
  const [leftPanelWidth, setLeftPanelWidth] = useState(maxWidth);
  const { leftRef, rightRef, syncFromLeft, syncFromRight } = useSyncedScroll();
  const actualContentH = contentHeight ?? height;

  const handleDrag = (deltaX: number) => {
    const step = Math.sign(deltaX) * Math.min(Math.abs(deltaX) * 1.8, 400);
    setLeftPanelWidth((prev) => Math.max(0, Math.min(maxWidth, prev + step)));
  };

  return (
    <div className={`w-full overflow-x-auto overflow-y-hidden rounded-2xl ${scrollbarHide} ${className}`} style={{ maxWidth }}>
      <div className="relative rounded-2xl" style={{ height, minWidth: maxWidth }}>
        <div className="overflow-clip relative rounded-[inherit] size-full">
          {/* Right panel (shown behind — acts as "before") */}
          <div
            className="absolute left-px right-[-1px] top-0"
            style={{ height }}
          >
            <div
              ref={rightRef}
              onScroll={syncFromRight}
              className={`absolute overflow-y-auto overflow-x-hidden right-0 top-0 w-full scroll-smooth ${scrollbarHide}`}
              style={{ height }}
            >
              <div className="relative w-full" style={{ height: actualContentH }}>
                <img
                  alt={labels?.right ?? "After"}
                  className="absolute inset-0 max-w-none object-cover object-top pointer-events-none size-full"
                  src={rightImage}
                />
              </div>
            </div>
          </div>

          {/* Left panel overlay (the "after" / proposed state) */}
          <div
            className="absolute content-stretch flex items-center left-0 top-0"
            style={{ height }}
          >
            <div
              className="h-full overflow-hidden shrink-0 transition-[width] duration-75"
              style={{ width: leftPanelWidth }}
            >
              <div
                ref={leftRef}
                onScroll={syncFromLeft}
                className={`bg-[#f4f4f4] h-full overflow-x-clip overflow-y-auto relative w-full min-w-0 scroll-smooth ${scrollbarHide}`}
              >
                <div className="relative w-full" style={{ height: actualContentH, minWidth: maxWidth }}>
                  <img
                    alt={labels?.left ?? "Before"}
                    className="absolute inset-0 max-w-none object-cover object-left-top pointer-events-none size-full"
                    src={leftImage}
                  />
                  {leftOverlay}
                </div>
              </div>
            </div>

            {/* Divider line */}
            <div className="bg-[#023625] h-full shrink-0 w-[2px]" />

            {/* Drag handle */}
            <DragHandle onDrag={handleDrag} splitX={leftPanelWidth} />
          </div>
        </div>

        {/* Optional labels */}
        {(labels?.left || labels?.right) && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-between px-4 pointer-events-none">
            {labels.left && (
              <span className="bg-black/50 text-white text-sm px-3 py-1 rounded-full font-['Inter:Medium',sans-serif]">
                {labels.left}
              </span>
            )}
            {labels.right && (
              <span className="bg-black/50 text-white text-sm px-3 py-1 rounded-full font-['Inter:Medium',sans-serif]">
                {labels.right}
              </span>
            )}
          </div>
        )}

        {/* Border overlay */}
        <div
          aria-hidden="true"
          className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-2xl"
        />
      </div>
    </div>
  );
}

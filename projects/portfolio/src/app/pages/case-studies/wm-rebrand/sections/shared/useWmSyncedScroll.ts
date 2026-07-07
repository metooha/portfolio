import { useRef } from "react";

export function useWmSyncedScroll() {
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const isSyncingScroll = useRef(false);

  const syncScrollFromLeft = () => {
    if (isSyncingScroll.current || !leftScrollRef.current || !rightScrollRef.current) return;
    isSyncingScroll.current = true;
    rightScrollRef.current.scrollTop = leftScrollRef.current.scrollTop;
    requestAnimationFrame(() => {
      isSyncingScroll.current = false;
    });
  };

  const syncScrollFromRight = () => {
    if (isSyncingScroll.current || !leftScrollRef.current || !rightScrollRef.current) return;
    isSyncingScroll.current = true;
    leftScrollRef.current.scrollTop = rightScrollRef.current.scrollTop;
    requestAnimationFrame(() => {
      isSyncingScroll.current = false;
    });
  };

  return { leftScrollRef, rightScrollRef, syncScrollFromLeft, syncScrollFromRight };
}

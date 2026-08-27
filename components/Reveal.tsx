"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * One-shot scroll reveal. Renders visible by default (progressive
 * enhancement): only after mount, and only when the visitor has not asked
 * for reduced motion, does it hide-then-reveal on intersection. If the
 * observer never fires for any reason, content stays visible — it must
 * never get stuck at opacity:0.
 */
export function Reveal({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    setHidden(true);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHidden(false);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(16px)" : "none",
        transition: "opacity var(--motion-duration-slow) var(--motion-ease-standard), transform var(--motion-duration-slow) var(--motion-ease-standard)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

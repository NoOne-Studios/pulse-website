import { DeliveryModePill } from "./DeliveryModePill";
import { ImageSlot } from "./ImageSlot";

interface ServiceItem {
  pill: string;
  title: string;
  body: string;
  brief: string;
  brandPill?: boolean;
}

/**
 * Count-driven grid: the column count is a function of the service count,
 * never a fixed 4-across with a hole. `auto-fit / minmax(150px, 1fr)` is
 * what survives 200% text zoom without a track clipping — see the design
 * doc's own measured note under "Homepage — accessibility variants".
 */
export function ServiceRow({ heading, sub, items }: { heading: string; sub: string; items: ServiceItem[] }) {
  // Count-driven floor: at exactly 3 items (the doctor-dark state), the
  // design calls for a single stack at 390px, never a 2-up grid with an
  // orphan third card. A 150px floor lets two ~185px tracks fit at 390px
  // width, which is exactly the bug — raising the floor above half the
  // mobile viewport forces one column there while still yielding an even
  // 3-across (or 4-across) row once the viewport is wide enough.
  const minCardWidth = items.length <= 3 ? 220 : 150;

  return (
    <div className="page-section">
      <div className="container">
        <h2 style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-h2-en)", lineHeight: "var(--leading-h2-en)", fontWeight: 700 }}>
          {heading}
        </h2>
        <p style={{ margin: "0 0 var(--space-md)", fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{sub}</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))`,
            gap: "var(--space-sm)",
            alignItems: "stretch",
            overflowWrap: "break-word",
          }}
        >
          {items.map((item) => (
            <div
              key={item.title}
              style={{
                border: "1px solid var(--color-border-default)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-md)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-xs)",
              }}
            >
              <ImageSlot ratio="3/4" label="PHOTO" brief={item.brief} />
              <DeliveryModePill label={item.pill} brand={Boolean(item.brandPill)} />
              <div style={{ fontSize: "var(--step-h3-en)", fontWeight: 600, lineHeight: "var(--leading-h3-en)" }}>
                {item.title}
              </div>
              <p style={{ margin: 0, fontSize: "var(--step-body-en)", lineHeight: "var(--leading-body-en)" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

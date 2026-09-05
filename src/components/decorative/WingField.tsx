"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * The brand wing, drawn as a mesh of points that answers the pointer.
 *
 * Point fields are one of the most worn-out things on the web, and the reason
 * they read as filler is that they are usually a random cloud: the shape means
 * nothing, so the motion means nothing either. These points are sampled along
 * three nested arcs — the same silhouette as the logo's wing and the same one
 * `SectionSurface` draws statically — so what moves under the cursor is the
 * organisation's own mark rather than generic confetti.
 *
 * Constraints that keep it from becoming noise:
 *
 * - 54 points. Enough to read as a wing, few enough that the O(n²) neighbour
 *   pass costs nothing.
 * - Two colours, both from the brand ramp. No glow, no additive blending.
 * - Nothing animates unless the pointer moves. There is no ambient drift, so a
 *   page left open is a still image.
 * - `prefers-reduced-motion` stops it entirely — the canvas is never mounted,
 *   not merely slowed, so no frame loop runs at all.
 *
 * Purely decorative: `aria-hidden`, no pointer events of its own, and it
 * carries no information the page does not state in text.
 */

/** Sampling weights for the three arcs: scale of the wing, points on it. */
const RINGS: ReadonlyArray<readonly [scale: number, count: number]> = [
  [1, 20],
  [0.72, 20],
  [0.46, 14],
];

/** Beyond this distance the pointer has no effect. Squared, to skip a sqrt. */
const REACH_SQ = 12_000;
/** How hard a point is pushed, and how quickly it returns and settles. */
const PUSH = 1.9;
const RETURN = 0.045;
const DAMPING = 0.86;
/** Points closer than this are joined by a line. */
const LINK = 74;

interface Point {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function WingField({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: Point[] = [];
    let width = 0;
    let height = 0;
    /* The pending frame id doubles as the "already running" guard. An earlier
       version kept a separate `settling` flag that only `draw` could clear, so
       a single dropped frame — a backgrounded tab, a suspended compositor —
       left the flag raised and the field ignored the pointer from then on.
       Clearing the id at the top of `draw` cannot wedge that way. */
    let frame = 0;
    /* Far outside the canvas rather than (0, 0), which is one of its corners:
       an unmoved pointer must be beyond every point's reach. */
    let pointerX = -9999;
    let pointerY = -9999;

    const build = () => {
      const box = host.getBoundingClientRect();
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = width * 0.18;
      const cy = height * 0.36;
      points = RINGS.flatMap(([scale, count], ring) =>
        Array.from({ length: count }, (_, i) => {
          const t = (i / (count - 1)) * Math.PI * 1.15 - 0.35;
          const x = cx + Math.cos(t) * width * 0.36 * scale * 1.05;
          const y = cy + Math.sin(t) * height * 0.42 * scale;
          return {
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            r: 1.6 + (RINGS.length - 1 - ring) * 0.5,
          };
        }),
      );
    };

    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);

      let moving = false;
      for (const p of points) {
        const dx = p.x - pointerX;
        const dy = p.y - pointerY;
        const d2 = dx * dx + dy * dy;
        if (d2 < REACH_SQ && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const force = ((REACH_SQ - d2) / REACH_SQ) * PUSH;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
        p.vx += (p.ox - p.x) * RETURN;
        p.vy += (p.oy - p.y) * RETURN;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        if (Math.abs(p.vx) > 0.01 || Math.abs(p.vy) > 0.01) moving = true;
      }

      ctx.lineWidth = 1;
      for (let a = 0; a < points.length; a++) {
        for (let b = a + 1; b < points.length; b++) {
          const dx = points[a].x - points[b].x;
          const dy = points[a].y - points[b].y;
          const dist = Math.hypot(dx, dy);
          if (dist >= LINK) continue;
          ctx.strokeStyle = `rgba(12, 173, 217, ${(0.2 * (1 - dist / LINK)).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(points[a].x, points[a].y);
          ctx.lineTo(points[b].x, points[b].y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(10, 140, 178, 0.5)";
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      /* Stop as soon as everything has come to rest. A field that keeps
         requesting frames behind a static image is a battery drain with
         nothing to show for it. */
      if (moving) frame = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (frame) return;
      frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      pointerX = event.clientX - box.left;
      pointerY = event.clientY - box.top;
      wake();
    };

    const onPointerLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
      wake();
    };

    const onResize = () => {
      build();
      wake();
    };

    build();
    draw();

    /* Listen on the hero, not on this layer.

       The layer is `pointer-events: none` so it can never intercept a click
       meant for a link sitting over it — and that also means it would never
       see a pointer move. The hero above it is the same box, is already
       positioned, and covers the text as well, so the field keeps responding
       while the cursor crosses the headline instead of freezing there. */
    const surface: HTMLElement = host.parentElement ?? host;
    surface.addEventListener("pointermove", onPointerMove);
    surface.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn("pointer-events-none", className ?? "absolute inset-0")}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}

"use client";

import React from "react";

export default function BackgroundEffects() {
  return (
    <>
      {/* Legal document watermark pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] dark:opacity-[0.015]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 28px,
              hsl(var(--foreground) / 0.06) 28px,
              hsl(var(--foreground) / 0.06) 29px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              hsl(var(--foreground) / 0.03) 40px,
              hsl(var(--foreground) / 0.03) 41px
            )
          `,
        }}
      />

      {/* Radial gradient glow - top center */}
      <div
        className="fixed top-[-40vh] left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--accent) / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Bottom right glow */}
      <div
        className="fixed bottom-[-20vh] right-[-10vw] w-[50vw] h-[50vh] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--navy) / 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </>
  );
}

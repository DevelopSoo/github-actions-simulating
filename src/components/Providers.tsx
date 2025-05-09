"use client";

import { LazyMotion } from "motion/react";

const loadFeatures = () => import("../features").then((res) => res.default);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}

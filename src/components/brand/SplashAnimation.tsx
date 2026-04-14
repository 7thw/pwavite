"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useTime,
  useTransform,
  cubicBezier,
  useMotionValueEvent,
} from "motion/react";

import { LogoRingsUnified, LogoTypeRe, LogoTypeAligna } from "@/components/brand/Logo";

interface SplashAnimationProps {
  onComplete?: () => void;
  duration?: number;
  key?: React.Key;
}

export function SplashAnimation({
  onComplete,
  duration = 12000,
}: SplashAnimationProps) {
  const [mounted, setMounted] = useState(false);

  // Master timeline (ms)
  const time = useTime();

  // Animation Constants
  const SPLASH_DURATION = duration;
  const EASING = cubicBezier(0.22, 1, 0.36, 1);

  // Timing Checkpoints (ms)
  // 1. Rings Scale & Rotate (0% -> 80%)
  const T_RINGS_START = 0;
  const T_RINGS_END = SPLASH_DURATION * 0.8;

  // 2. Aligna Slide (20% -> 80%)
  const T_ALIGNA_START = SPLASH_DURATION * 0.2;
  const T_ALIGNA_END = SPLASH_DURATION * 0.8;

  // 3. Re Fade In (40% -> 90%)
  const T_RE_START = SPLASH_DURATION * 0.4;
  const T_RE_END = SPLASH_DURATION * 0.9;

  // 1. Rings Animation
  // Scale: Starts huge (filling viewport), scales down to final size (7)
  const ringScale = useTransform(time, [T_RINGS_START, T_RINGS_END], [15, 7], {
    ease: EASING,
    clamp: true,
  });

  // Rotation: Rotates 180 degrees while scaling
  const ringRotate = useTransform(
    time,
    [T_RINGS_START, T_RINGS_END],
    [180, 0],
    {
      ease: EASING,
      clamp: true,
    },
  );

  // 2. Alignment/Sliding Animation (Opening the logo)
  // Aligna slides out from behind/center of rings
  const alignaX = useTransform(
    time,
    [T_ALIGNA_START, T_ALIGNA_END],
    ["-40%", "0%"],
    {
      ease: EASING,
      clamp: true,
    },
  );

  const alignaOpacity = useTransform(
    time,
    [T_ALIGNA_START, T_RINGS_END], // Fades in quickly during slide start
    [0, 1],
    {
      clamp: true,
    },
  );

  // 3. 'Re' Text Appearance
  // Fades in as they separate
  const reOpacity = useTransform(time, [T_RE_START, T_RE_END], [0, 1], {
    clamp: true,
  });

  // Completion Logic
  const hasCompleted = useRef(false);
  useMotionValueEvent(time, "change", (latest) => {
    if (latest > SPLASH_DURATION && !hasCompleted.current) {
      hasCompleted.current = true;
      if (onComplete) onComplete();
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="h-full w-full flex items-center justify-center overflow-hidden bg-background fixed inset-0 z-9999"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="grid grid-cols-[1fr_5fr] w-full items-center justify-items-center px-10"
        style={{ scale: 0.5, x: 50 } as any} // Adjusting base scale for the logo layout
      >
        {/* Stack Area: Rings + Re */}
        {/* Rings: z-10 */}
        <LogoRingsUnified
          className="col-start-1 row-start-1 z-10 -translate-x-[1%]"
          style={{
            scale: ringScale,
            rotate: ringRotate,
          }}
        />

        {/* Re: z-0 */}
        <LogoTypeRe
          className="col-start-1 row-start-1 w-full h-auto z-0"
          style={{ opacity: reOpacity } as any}
        />

        {/* Aligna Area */}
        <LogoTypeAligna
          className="col-start-2 row-start-1 w-full h-auto"
          style={
            {
              x: alignaX,
              opacity: alignaOpacity,
            } as any
          }
        />
      </motion.div>
    </motion.div>
  );
}

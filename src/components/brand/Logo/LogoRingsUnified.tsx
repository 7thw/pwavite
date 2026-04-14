"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { cubicBezier, type EasingFunction } from "motion";
import {
  motion,
  MotionValue,
  useTime,
  useTransform,
  useReducedMotion,
  type Transition,
} from "motion/react";

/**
 * Logo Ring Unified Component
 *
 * Optimized with useTime and useTransform for high-performance animation
 * without React re-renders.
 */

// ============================================================================
// TYPES
// ============================================================================

export type LogoRingId =
  | "ring-1"
  | "ring-2"
  | "ring-2-2"
  | "ring-3"
  | "ring-4"
  | "ring-4-2"
  | "ring-5"
  | "ring-6"
  | "ring-6-2"
  | "ring-7"
  | "ring-8";

export const LogoVariations = {
  Default: "default",
  Categories: "categories",
  Archangels: "archangels",
} as const;

export type LogoVariation =
  (typeof LogoVariations)[keyof typeof LogoVariations];

export const categoryNames = ["daily", "nightly", "master", "insight"] as const;

export type CategoryName = (typeof categoryNames)[number];

export const ARCHANGEL_NAMES = [
  "ariel",
  "azrael",
  "chamuel",
  "gabriel",
  "haniel",
  "jeremiel",
  "jophiel",
  "metatron",
  "michael",
  "raphael",
  "raquel",
  "raziel",
  "sandolphon",
  "uriel",
  "zadkiel",
] as const;

export type ArchangelName = (typeof ARCHANGEL_NAMES)[number];

interface RingSegment {
  name: string;
  start: number; // Starting angle in degrees
  value: number; // Arc length as percentage (0-100)
  rotate: number; // Base rotation offset
  color: string; // CSS color
}

interface RingDefinition {
  id: LogoRingId;
  zone: number; // 1-8, determines z-index and size
  size: number; // Diameter in viewBox units (0-100)
  strokeWidth: number;
  segments: RingSegment[];
}

interface AnimationConfig {
  start: [number, string]; // [initial, 'endValues']
  value: [number, string]; // [initial, 'endValues']
  rotateZ: [number, number];
  transition: Transition;
}

export interface LogoRingsUnifiedProps {
  variation?: LogoVariation;
  archangel?: ArchangelName;
  category?: CategoryName;
  size?: number;
  className?: string;
  loops?: number;
  speedMultiplier?: number;
  /** Enable Safari-specific optimizations */
  safariOptimized?: boolean;
  /** External MotionValue<number> for time control */
  customTime?: MotionValue<number>;
  /** Start time offset in ms */
  animStart?: number;
  /** Global color override for all rings */
  color?: string;
  /** Custom override for SVG stroke-width */
  strokeWidth?: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SPEED_MULTIPLIER = 2;
const VIEW_BOX_SIZE = 100;
const CENTER = VIEW_BOX_SIZE / 2;

// Zone sizing (8 zones from innermost to outermost)
const FIRST_ARC_SIZE = 26;
const LAST_ARC_SIZE = 100;
const STROKE_WIDTH = 1.6;
const TOTAL_ZONES = 8;

// Calculate equal gaps between zones
const TOTAL_RANGE = LAST_ARC_SIZE - FIRST_ARC_SIZE;
const NUMBER_OF_GAPS = TOTAL_ZONES - 1;
const GAP_SIZE = TOTAL_RANGE / NUMBER_OF_GAPS;

// Generate zone sizes
const ZONE_SIZES: number[] = Array.from(
  { length: TOTAL_ZONES },
  (_, i) => FIRST_ARC_SIZE + GAP_SIZE * i,
);

// Easing
const CUSTOM_EASE: EasingFunction = cubicBezier(0.22, 1, 0.36, 1);

// Master transition configuration
const MASTER_TRANSITION: Transition = {
  duration: 10 / SPEED_MULTIPLIER,
  ease: "linear",
};

// Animation configuration for each ring
const ANIMATION_CONFIG: Record<string, AnimationConfig> = {
  ringOne: {
    start: [-55, "endValues"],
    value: [0, "endValues"],
    rotateZ: [0, 0],
    transition: MASTER_TRANSITION,
  },
  ringTwo: {
    start: [-160, "endValues"],
    value: [0, "endValues"],
    rotateZ: [0, 0],
    transition: MASTER_TRANSITION,
  },
  ringTwoTwo: {
    start: [-16, "endValues"],
    value: [0, "endValues"],
    rotateZ: [0, 0],
    transition: MASTER_TRANSITION,
  },
  ringThree: {
    start: [-62, "endValues"],
    value: [0, "endValues"],
    rotateZ: [0, 0],
    transition: MASTER_TRANSITION,
  },
  ringFour: {
    start: [-127, "endValues"],
    value: [0, "endValues"],
    rotateZ: [0, 0],
    transition: MASTER_TRANSITION,
  },
  ringFourTwo: {
    start: [-45, "endValues"],
    value: [0, "endValues"],
    rotateZ: [0, 0],
    transition: MASTER_TRANSITION,
  },
  ringFive: {
    start: [-56, "endValues"],
    value: [0, "endValues"],
    rotateZ: [0, 0],
    transition: MASTER_TRANSITION,
  },
  ringSix: {
    start: [-59, "endValues"],
    value: [0, "endValues"],
    rotateZ: [0, 0],
    transition: MASTER_TRANSITION,
  },
  ringSixTwo: {
    start: [-59, "endValues"],
    value: [0, "endValues"],
    rotateZ: [0, 0],
    transition: MASTER_TRANSITION,
  },
  ringSeven: {
    start: [-62, "endValues"],
    value: [0, "endValues"],
    rotateZ: [0, 0],
    transition: MASTER_TRANSITION,
  },
  ringEight: {
    start: [-105, "endValues"],
    value: [0, "endValues"],
    rotateZ: [0, 0],
    transition: MASTER_TRANSITION,
  },
};

// Ring definitions with segment data
const RING_DEFINITIONS: RingDefinition[] = [
  // Zone 1 - Innermost
  {
    id: "ring-1",
    zone: 1,
    size: ZONE_SIZES[0],
    strokeWidth: STROKE_WIDTH,
    segments: [
      {
        name: "endValues",
        start: 56,
        value: 70,
        rotate: 0,
        color: "var(--color-digit-one)",
      },
    ],
  },
  // Zone 2
  {
    id: "ring-2",
    zone: 2,
    size: ZONE_SIZES[1],
    strokeWidth: STROKE_WIDTH,
    segments: [
      {
        name: "endValues",
        start: -84,
        value: 10,
        rotate: 0,
        color: "var(--color-digit-two)",
      },
    ],
  },
  {
    id: "ring-2-2",
    zone: 2,
    size: ZONE_SIZES[1],
    strokeWidth: STROKE_WIDTH,
    segments: [
      {
        name: "endValues",
        start: 35,
        value: 60,
        rotate: 0,
        color: "var(--color-digit-two)",
      },
    ],
  },
  // Zone 3
  {
    id: "ring-3",
    zone: 3,
    size: ZONE_SIZES[2],
    strokeWidth: STROKE_WIDTH,
    segments: [
      {
        name: "endValues",
        start: 25,
        value: 80,
        rotate: 0,
        color: "var(--color-digit-three)",
      },
    ],
  },
  // Zone 4
  {
    id: "ring-4",
    zone: 4,
    size: ZONE_SIZES[3],
    strokeWidth: STROKE_WIDTH,
    segments: [
      {
        name: "endValues",
        start: 220,
        value: 10,
        rotate: 0,
        color: "var(--color-digit-four)",
      },
    ],
  },
  {
    id: "ring-4-2",
    zone: 4,
    size: ZONE_SIZES[3],
    strokeWidth: STROKE_WIDTH,
    segments: [
      {
        name: "endValues",
        start: 43,
        value: 46,
        rotate: 0,
        color: "var(--color-digit-four)",
      },
    ],
  },
  // Zone 5
  {
    id: "ring-5",
    zone: 5,
    size: ZONE_SIZES[4],
    strokeWidth: STROKE_WIDTH,
    segments: [
      {
        name: "endValues",
        start: 54,
        value: 41,
        rotate: 0,
        color: "var(--color-digit-five)",
      },
    ],
  },
  // Zone 6
  {
    id: "ring-6",
    zone: 6,
    size: ZONE_SIZES[5],
    strokeWidth: STROKE_WIDTH,
    segments: [
      {
        name: "endValues",
        start: 64,
        value: 5,
        rotate: 0,
        color: "var(--color-digit-six)",
      },
    ],
  },
  {
    id: "ring-6-2",
    zone: 6,
    size: ZONE_SIZES[5],
    strokeWidth: STROKE_WIDTH,
    segments: [
      {
        name: "endValues",
        start: 92,
        value: 18,
        rotate: 0,
        color: "var(--color-digit-six)",
      },
    ],
  },
  // Zone 7
  {
    id: "ring-7",
    zone: 7,
    size: ZONE_SIZES[6],
    strokeWidth: STROKE_WIDTH,
    segments: [
      {
        name: "endValues",
        start: 86,
        value: 12,
        rotate: 0,
        color: "var(--color-digit-seven)",
      },
    ],
  },
  // Zone 8 - Outermost
  {
    id: "ring-8",
    zone: 8,
    size: ZONE_SIZES[7],
    strokeWidth: STROKE_WIDTH,
    segments: [
      {
        name: "endValues",
        start: 105,
        value: 3,
        rotate: 0,
        color: "var(--color-digit-eight)",
      },
    ],
  },
];

// ID mapping from camelCase to kebab-case
const ID_MAP: Record<string, LogoRingId> = {
  ringOne: "ring-1",
  ringTwo: "ring-2",
  ringTwoTwo: "ring-2-2",
  ringThree: "ring-3",
  ringFour: "ring-4",
  ringFourTwo: "ring-4-2",
  ringFive: "ring-5",
  ringSix: "ring-6",
  ringSixTwo: "ring-6-2",
  ringSeven: "ring-7",
  ringEight: "ring-8",
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get color for a ring based on variation
 */
function getRingColor(
  ringId: LogoRingId,
  variation: LogoVariation,
  category: CategoryName,
  archangel: ArchangelName,
  colorOverride?: string,
): string {
  if (colorOverride) return colorOverride;

  if (variation === "default") {
    // Default variation: 8-color fingerprint mapping
    if (ringId === "ring-1") return "var(--color-digit-one)";
    if (ringId === "ring-2" || ringId === "ring-2-2")
      return "var(--color-digit-two)";
    if (ringId === "ring-3") return "var(--color-digit-three)";
    if (ringId === "ring-4" || ringId === "ring-4-2")
      return "var(--color-digit-four)";
    if (ringId === "ring-5") return "var(--color-digit-five)";
    if (ringId === "ring-6" || ringId === "ring-6-2")
      return "var(--color-digit-six)";
    if (ringId === "ring-7") return "var(--color-digit-seven)";
    if (ringId === "ring-8") return "var(--color-digit-eight)";
  } else if (variation === "categories") {
    // Category variation: Single brand color
    return `var(--color-${category})`;
  } else if (variation === "archangels") {
    // Archangel variation
    if (archangel === "raziel") {
      // Raziel Rainbow Exception - specific colors per ring
      if (ringId === "ring-1") return "var(--color-archangel-raziel-ring-one)";
      if (ringId === "ring-2" || ringId === "ring-2-2")
        return "var(--color-archangel-raziel-ring-two)";
      if (ringId === "ring-3")
        return "var(--color-archangel-raziel-ring-three)";
      if (ringId === "ring-4" || ringId === "ring-4-2")
        return "var(--color-archangel-raziel-ring-four)";
      if (ringId === "ring-5") return "var(--color-archangel-raziel-ring-five)";
      if (ringId === "ring-6" || ringId === "ring-6-2")
        return "var(--color-archangel-raziel-ring-six)";
      if (ringId === "ring-7")
        return "var(--color-archangel-raziel-ring-seven)";
      if (ringId === "ring-8")
        return "var(--color-archangel-raziel-ring-eight)";
    } else {
      // Standard archangels use single base color
      return `var(--color-archangel-${archangel}-base)`;
    }
  }

  // Fallback
  return "var(--color-digit-one)";
}

/**
 * Resolve animation value (handles 'endValues' references)
 */
function resolveAnimationValue(
  value: number | string,
  segment: RingSegment,
  prop: "start" | "value",
): number {
  if (value === "endValues") {
    return segment[prop] as number;
  }
  return value as number;
}

// ============================================================================
// COMPONENT
// ============================================================================

// Ring Component Update
const Ring = ({
  ring,
  time,
  ringIndex,
  color,
  safariOptimized,
  speedMultiplier,
  shouldReduceMotion,
  animStart = 0,
  customStrokeWidth,
}: {
  ring: RingDefinition;
  time: MotionValue<number>;
  ringIndex: number;
  color: string;
  safariOptimized?: boolean;
  speedMultiplier: number;
  shouldReduceMotion: boolean;
  animStart?: number;
  customStrokeWidth?: number;
  key?: React.Key;
}) => {
  const configKey =
    Object.keys(ID_MAP).find((key) => ID_MAP[key] === ring.id) || "";
  const animConfig = ANIMATION_CONFIG[configKey];

  if (!animConfig) return null;

  const radius = ring.size / 2;
  // Use first segment for container rotation logic
  const segment = ring.segments[0];

  const animateDuration = shouldReduceMotion ? 0 : 2500 / speedMultiplier;
  const staggerDelay = ringIndex * 150; // ms
  const totalDuration = animateDuration;

  // Calculate relative to animStart
  const startTime = animStart + staggerDelay;
  const endTime = startTime + totalDuration;

  // Resolve Rotation Values
  const startInitial = resolveAnimationValue(
    animConfig.start[0],
    segment,
    "start",
  );
  const startEnd = resolveAnimationValue(animConfig.start[1], segment, "start");
  const rotationInitial = startInitial + segment.rotate;
  const rotationEnd = startEnd + segment.rotate;

  // Resolve Path Length Values
  const valueInitial = resolveAnimationValue(
    animConfig.value[0],
    segment,
    "value",
  );
  const valueEnd = resolveAnimationValue(animConfig.value[1], segment, "value");
  const pathLengthInitial = valueInitial / 100;
  const pathLengthEnd = valueEnd / 100;

  // Use Transforms
  const rotate = useTransform(
    time,
    [startTime, endTime],
    [rotationInitial, rotationEnd],
    { ease: CUSTOM_EASE, clamp: true },
  );

  const opacity = useTransform(time, [startTime, startTime + 800], [0, 1], {
    ease: CUSTOM_EASE,
    clamp: true,
  });

  const scale = useTransform(time, [startTime, endTime], [0.9, 1], {
    ease: CUSTOM_EASE,
    clamp: true,
  });

  const pathLength = useTransform(
    time,
    [startTime, endTime],
    [pathLengthInitial, pathLengthEnd],
    { ease: CUSTOM_EASE, clamp: true },
  );

  return (
    <motion.g
      style={{
        rotate,
        opacity,
        scale,
        transformOrigin: "50% 50%",
        ...(safariOptimized && {
          willChange: "transform, opacity",
        }),
      }}
    >
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth={customStrokeWidth ?? ring.strokeWidth}
        strokeLinecap="round"
        style={{
          pathLength,
        }}
      />
    </motion.g>
  );
};

/**
 * LogoRingsUnified Component
 *
 * Unified logo system with flattened architecture for Safari compatibility.
 * Optimized with performance hooks (useTime, useTransform).
 * Wrapped with motion.create() for easing external animations.
 */
function LogoRingsUnifiedBase({
  variation = "archangels",
  archangel = "raziel",
  category = "daily",
  size,
  className,
  loops = 1,
  speedMultiplier = 1,
  safariOptimized = false,
  customTime,
  animStart = 0,
  color,
  strokeWidth,
  ref,
  ...props
}: LogoRingsUnifiedProps & { ref?: React.Ref<HTMLDivElement> }) {
  const shouldReduceMotion = !!useReducedMotion();
  const widthAdjustment = 1.1;

  // Use passed time or create internal time
  const internalTime = useTime();
  const time = customTime || internalTime;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center justify-center overflow-visible",
        !size && "w-full aspect-[1/1.1]",
        className,
      )}
      style={{
        width: size ? size : undefined,
        height: size ? size * widthAdjustment : undefined,
      }}
      aria-label="Realigna Logo"
      {...props}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
      >
        {RING_DEFINITIONS.slice()
          .sort((a, b) => b.zone - a.zone)
          .map((ring, ringIndex) => (
            <Ring
              key={ring.id}
              ring={ring}
              ringIndex={ringIndex}
              time={time}
              color={getRingColor(
                ring.id,
                variation,
                category,
                archangel,
                color,
              )}
              safariOptimized={safariOptimized}
              speedMultiplier={speedMultiplier}
              shouldReduceMotion={shouldReduceMotion}
              animStart={animStart}
              customStrokeWidth={strokeWidth}
            />
          ))}
      </motion.svg>
    </div>
  );
}

export const LogoRingsUnified = motion.create(LogoRingsUnifiedBase);
export default LogoRingsUnified;

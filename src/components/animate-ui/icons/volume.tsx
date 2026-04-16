"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from "@/components/animate-ui/icons/icon";

type VolumeAnimatedProps = IconProps<keyof typeof animations>;

// SVG paths:
// speaker: speaker cone (always visible)
// wave1: small sound wave  (M16 9a5 5 0 0 1 0 6)
// wave2: large sound wave  (M19.364 18.364a9 9 0 0 0 0-12.728)
// xLine1, xLine2: small X next to speaker (for muted state)

const animations = {
  // MUTED: speaker + X appears, no waves
  muted: {
    speaker: {},
    wave1: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 0, scale: 0 },
    },
    wave2: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 0, scale: 0 },
    },
    xLine1: {
      initial: { rotate: 45, opacity: 1, scale: 1 },
      animate: {
        rotate: 45,
        opacity: 1,
        scale: 1,
      },
    },
    xLine2: {
      initial: { rotate: -45, opacity: 1, scale: 1 },
      animate: {
        rotate: -45,
        opacity: 1,
        scale: 1,
      },
    },
  } satisfies Record<string, Variants>,

  // LOW: speaker + 1 wave pulses, X hidden
  low: {
    speaker: {},
    wave1: {
      initial: { opacity: 1, scale: 1 },
      animate: {
        opacity: 0,
        scale: 0,
        transition: {
          opacity: {
            duration: 0.2,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
            repeatDelay: 0.2,
          },
          scale: {
            duration: 0.2,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
            repeatDelay: 0.2,
          },
        },
      },
    },
    wave2: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 0, scale: 0 },
    },
    xLine1: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 0, scale: 0 },
    },
    xLine2: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 0, scale: 0 },
    },
  } satisfies Record<string, Variants>,

  // HIGH / DEFAULT: speaker + both waves pulse with stagger, X hidden
  // 'default' is required by getVariants as the fallback
  default: {
    speaker: {},
    wave1: {
      initial: { opacity: 1, scale: 1 },
      animate: {
        opacity: 0,
        scale: 0,
        transition: {
          opacity: {
            duration: 0.2,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
            repeatDelay: 0.2,
            delay: 0,
          },
          scale: {
            duration: 0.2,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
            repeatDelay: 0.2,
            delay: 0,
          },
        },
      },
    },
    wave2: {
      initial: { opacity: 1, scale: 1 },
      animate: {
        opacity: 0,
        scale: 0,
        transition: {
          opacity: {
            duration: 0.2,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
            repeatDelay: 0.2,
            delay: 0.2,
          },
          scale: {
            duration: 0.2,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
            repeatDelay: 0.2,
            delay: 0.2,
          },
        },
      },
    },
    xLine1: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 0, scale: 0 },
    },
    xLine2: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 0, scale: 0 },
    },
  } satisfies Record<string, Variants>,

  // Alias: 'high' points to the same animation as 'default'
  high: {
    speaker: {},
    wave1: {
      initial: { opacity: 1, scale: 1 },
      animate: {
        opacity: 0,
        scale: 0,
        transition: {
          opacity: {
            duration: 0.2,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
            repeatDelay: 0.2,
            delay: 0,
          },
          scale: {
            duration: 0.2,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
            repeatDelay: 0.2,
            delay: 0,
          },
        },
      },
    },
    wave2: {
      initial: { opacity: 1, scale: 1 },
      animate: {
        opacity: 0,
        scale: 0,
        transition: {
          opacity: {
            duration: 0.2,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
            repeatDelay: 0.2,
            delay: 0.2,
          },
          scale: {
            duration: 0.2,
            ease: "easeInOut",
            repeat: 1,
            repeatType: "reverse",
            repeatDelay: 0.2,
            delay: 0.2,
          },
        },
      },
    },
    xLine1: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 0, scale: 0 },
    },
    xLine2: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 0, scale: 0 },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: VolumeAnimatedProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Speaker cone */}
      <motion.path
        d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
        fill="currentColor"
        variants={variants.speaker}
        initial="initial"
        animate={controls}
      />
      {/* Small wave */}
      <motion.path
        d="M16 9a5 5 0 0 1 0 6"
        variants={variants.wave1}
        initial="initial"
        animate={controls}
      />
      {/* Large wave */}
      <motion.path
        d="M19.364 18.364a9 9 0 0 0 0-12.728"
        variants={variants.wave2}
        initial="initial"
        animate={controls}
      />
      {/* X line 1 — positioned to the right of the speaker */}
      <motion.line
        x1={19}
        y1={7}
        x2={19}
        y2={17}
        variants={variants.xLine1}
        initial="initial"
        animate={controls}
      />
      {/* X line 2 */}
      <motion.line
        x1={19}
        y1={7}
        x2={19}
        y2={17}
        variants={variants.xLine2}
        initial="initial"
        animate={controls}
      />
    </motion.svg>
  );
}

function VolumeAnimated(props: VolumeAnimatedProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  VolumeAnimated,
  VolumeAnimated as VolumeAnimatedIcon,
  type VolumeAnimatedProps,
  type VolumeAnimatedProps as VolumeAnimatedIconProps,
};

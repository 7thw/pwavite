"use client";

import * as React from "react";
import { motion, useAnimation, type Variants } from "motion/react";

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from "@/components/animate-ui/icons/icon";

type TimerProps = IconProps<keyof typeof animations> & {
  /** When true, nudges the top crossbar down (press haptic feedback). */
  pressed?: boolean;
  /** When false, fades the clock hand out (duration badge is showing). */
  handVisible?: boolean;
};

const animations = {
  default: {
    circle: {},
    line1: {
      initial: {
        rotate: 0,
        opacity: 1,
        transition: {
          opacity: { ease: "easeInOut", duration: 0.3 },
          rotate: { ease: "easeInOut", duration: 0.4 },
        },
      },
      animate: {
        transformOrigin: "bottom left",
        rotate: 360,
        opacity: [1, 1, 0],
        transition: {
          rotate: { ease: "easeInOut", duration: 0.6, delay: 0.15 },
          opacity: { duration: 0.8, delay: 0.15, times: [0, 0.75, 1] },
        },
      },
    },
    /* line2 is driven by its own controls (see pressed prop) */
    line2: {} as Variants,
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, pressed, handVisible = true, ...props }: TimerProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  /* ── line2 (top crossbar) press animation ── */
  const line2Controls = useAnimation();
  React.useEffect(() => {
    line2Controls.start({
      y: pressed ? 2 : 0,
      transition: { ease: pressed ? "easeOut" : "easeIn", duration: 0.1 },
    });
  }, [pressed, line2Controls]);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.circle
        cx={12}
        cy={14}
        r={8}
        variants={variants.circle}
        initial="initial"
        animate={controls}
      />
      {/* Clock hand — spins on activation; hidden while duration badge shows */}
      <motion.g
        animate={{ opacity: handVisible ? 1 : 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        <motion.line
          x1={12}
          x2={12}
          y1={14}
          y2={10}
          variants={variants.line1}
          initial="initial"
          animate={controls}
        />
      </motion.g>
      {/* Top crossbar — pressed down independently */}
      <motion.line
        x1={10}
        x2={14}
        y1={4}
        y2={4}
        strokeWidth={1.5}
        animate={line2Controls}
      />
    </motion.svg>
  );
}

function Timer(props: TimerProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  Timer,
  Timer as TimerIcon,
  type TimerProps,
  type TimerProps as TimerIconProps,
};



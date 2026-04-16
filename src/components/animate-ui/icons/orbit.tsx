'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/components/animate-ui/icons/icon';

type RepeatProps = IconProps<keyof typeof animations> & {
  /** When true (repeatMode === 'none'): arrows collapse and bottom group rotates 180° */
  isNone?: boolean;
};

const animations = {
  default: {
    /* Top arrowhead — nudges right on activation */
    arrowTop: {
      initial: { x: 0 },
      animate: {
        x: [0, 3, 0],
        transition: { ease: 'easeInOut', duration: 0.5 },
      },
    },
    /* Bottom arrowhead — nudges left on activation */
    arrowBottom: {
      initial: { x: 0 },
      animate: {
        x: [0, -3, 0],
        transition: { ease: 'easeInOut', duration: 0.5 },
      },
    },
    pathTop: {},
    pathBottom: {},
  } satisfies Record<string, Variants>,
} as const;

const TRANSITION = { ease: 'easeInOut', duration: 0.35 } as const;

function IconComponent({ size, isNone = true, ...props }: RepeatProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 -2 24 28"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* ── Top arrow group: spreads up when active ── */}
      <motion.g
        animate={{ y: isNone ? 0 : -2 }}
        transition={TRANSITION}
      >
        <motion.path
          d="m17 2 4 4-4 4"
          variants={variants.arrowTop}
          initial="initial"
          animate={controls}
        />
        <motion.path
          d="M3 11v-1a4 4 0 0 1 4-4h14"
          variants={variants.pathTop}
          initial="initial"
          animate={controls}
        />
      </motion.g>

      {/* ── Bottom arrow group: spreads down + rotates 180° when none ── */}
      <motion.g
        animate={{
          y: isNone ? 0 : 2,
          rotate: isNone ? 180 : 0,
        }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        transition={TRANSITION}
      >
        <motion.path
          d="m7 22-4-4 4-4"
          variants={variants.arrowBottom}
          initial="initial"
          animate={controls}
        />
        <motion.path
          d="M21 13v1a4 4 0 0 1-4 4H3"
          variants={variants.pathBottom}
          initial="initial"
          animate={controls}
        />
      </motion.g>
    </motion.svg>
  );
}

function Repeat(props: RepeatProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  Repeat,
  Repeat as RepeatIcon,
  type RepeatProps,
  type RepeatProps as RepeatIconProps,
};

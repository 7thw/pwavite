"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useAudio } from "@/AudioContext";

import {
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from "@/components/animate-ui/icons/icon";

type MenuAudioProps = IconProps<string>;

function IconComponent({ size, ...props }: MenuAudioProps) {
  const { active: isMenuOpen } = useAnimateIconContext();
  const { state } = useAudio();
  const isPlaying = state.isPlaying;

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
      {/* Audio Lines */}
      {/* Outer Left (Line 1) */}
      <motion.line
        x1={2}
        y1={10}
        x2={2}
        y2={13}
        animate={
          isMenuOpen
            ? { opacity: 0, transition: { duration: 0.2 } }
            : isPlaying
              ? {
                  opacity: 1,
                  y1: [10, 5, 8, 6, 10],
                  y2: [13, 18, 15, 17, 13],
                  transition: {
                    duration: 1.5,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }
              : { opacity: 0, y1: 11, y2: 13, transition: { duration: 0.3 } }
        }
      />
      {/* Inner Left (Line 2) */}
      <motion.line
        x1={6}
        y1={6}
        x2={6}
        y2={17}
        animate={
          isMenuOpen
            ? { opacity: 0, transition: { duration: 0.2 } }
            : isPlaying
              ? {
                  opacity: 1,
                  y1: [6, 2, 10, 6],
                  y2: [17, 22, 13, 17],
                  transition: {
                    duration: 1.5,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }
              : { opacity: 1, y1: 8, y2: 16, transition: { duration: 0.3 } }
        }
      />
      {/* Center (Line 3) */}
      <motion.line
        x1={10}
        y1={3}
        x2={10}
        y2={21}
        animate={
          isMenuOpen
            ? { opacity: 0, transition: { duration: 0.2 } }
            : isPlaying
              ? {
                  opacity: 1,
                  y1: [3, 6, 3, 8, 3],
                  y2: [21, 17, 21, 15, 21],
                  transition: {
                    duration: 1.5,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }
              : { opacity: 1, y1: 10, y2: 14, transition: { duration: 0.3 } }
        }
      />
      {/* Inner Right (Line 4) */}
      <motion.line
        x1={14}
        y1={8}
        x2={14}
        y2={15}
        animate={
          isMenuOpen
            ? { opacity: 0, transition: { duration: 0.2 } }
            : isPlaying
              ? {
                  opacity: 1,
                  y1: [8, 4, 7, 2, 8],
                  y2: [15, 19, 16, 22, 15],
                  transition: {
                    duration: 1.5,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }
              : { opacity: 1, y1: 9, y2: 15, transition: { duration: 0.3 } }
        }
      />
      {/* Outer Right (Line 5) */}
      <motion.line
        x1={18}
        y1={5}
        x2={18}
        y2={18}
        animate={
          isMenuOpen
            ? { opacity: 0, transition: { duration: 0.2 } }
            : isPlaying
              ? {
                  opacity: 1,
                  y1: [5, 10, 4, 8, 5],
                  y2: [18, 13, 19, 15, 18],
                  transition: {
                    duration: 1.5,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }
              : { opacity: 0, y1: 11, y2: 13, transition: { duration: 0.3 } }
        }
      />
      {/* Far Right (Line 6) */}
      <motion.line
        x1={22}
        y1={10}
        x2={22}
        y2={13}
        animate={
          isMenuOpen
            ? { opacity: 0, transition: { duration: 0.2 } }
            : isPlaying
              ? {
                  opacity: 1,
                  y1: [10, 8, 5, 10],
                  y2: [13, 15, 18, 13],
                  transition: {
                    duration: 1.5,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }
              : { opacity: 0, y1: 12, y2: 12, transition: { duration: 0.3 } }
        }
      />

      {/* X Lines */}
      {/* X Line 1 */}
      <motion.line
        x1={4}
        y1={4}
        x2={20}
        y2={4}
        animate={
          isMenuOpen
            ? {
                rotate: -45,
                y: 8,
                opacity: 1,
                transformOrigin: "center",
                transition: { type: "spring", stiffness: 200, damping: 20 },
              }
            : { rotate: 0, y: 0, opacity: 0, transformOrigin: "center" }
        }
      />
      {/* X Line 2 */}
      <motion.line
        x1={4}
        y1={20}
        x2={20}
        y2={20}
        animate={
          isMenuOpen
            ? {
                rotate: 45,
                y: -8,
                opacity: 1,
                transformOrigin: "center",
                transition: { type: "spring", stiffness: 200, damping: 20 },
              }
            : { rotate: 0, y: 0, opacity: 0, transformOrigin: "center" }
        }
      />
    </motion.svg>
  );
}

function MenuAudio(props: MenuAudioProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  MenuAudio,
  MenuAudio as MenuAudioIcon,
  type MenuAudioProps,
  type MenuAudioProps as MenuIconProps,
};

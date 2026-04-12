"use client";

import * as motion from "motion/react-client";
import { LogoRingsUnified } from "./LogoRingsUnified";
import { LogoTypeAligna, LogoTypeRe } from "./LogoType";
import { cn } from "@/lib/utils";

export interface LogoTypeInlineProps {
  className?: string;
  onAnimationComplete?: () => void;
}

/**
 * LogoTypeInline Component
 *
 * Replicates the exact proportions and layout of the original LogoTypeInlineReInline
 * but uses the optimized LogoRingsUnified component and cleaner motion logic.
 */
export function LogoTypeInline({
  className,
  onAnimationComplete,
}: LogoTypeInlineProps) {
  return (
    <div
      className={cn("flex items-center justify-center w-fit h-fit", className)}
    >
      <motion.div
        id="logo-container"
        data-component="LogoTypeContainer"
        className="w-full h-fit px-0 overflow-visible flex items-center justify-end"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onAnimationComplete={onAnimationComplete}
        variants={{
          hidden: { scale: 1, x: "0%", opacity: 0 },
          visible: {
            scale: 1,
            x: "0%",
            opacity: 1,
            transition: { duration: 0 },
          },
        }}
      >
        <motion.div
          data-component="LogoReGroup"
          className="relative grid place-items-center w-[14%] h-fit shrink-0 mr-[0%] mb-[0%]"
        >
          <LogoTypeRe className="col-start-1 row-start-1 w-full h-auto text-foreground z-0" />
        </motion.div>

        <motion.div
          data-component="LogoTypeAligna"
          className="flex-1"
          variants={{
            hidden: { opacity: 1, x: 0 },
            visible: {
              opacity: [1, 1, 1],
              x: [0, 0, 0],
              transition: {
                duration: 1,
                times: [0, 0.5, 1],
                ease: "easeOut",
              },
            },
          }}
        >
          <LogoTypeAligna className="w-full h-auto text-foreground" />
        </motion.div>
      </motion.div>
    </div>
  );
}

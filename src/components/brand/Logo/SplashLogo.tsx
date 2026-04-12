"use client";

import * as motion from "motion/react-client";
import { LogoRingsUnified } from "./LogoRingsUnified";
import { LogoTypeAligna, LogoTypeRe } from "./LogoType";
import { cn } from "@/lib/utils";

export interface SplashLogoProps {
  className?: string;
  onAnimationComplete?: () => void;
}

/**
 * SplashLogo Component
 *
 * Replicates the exact proportions and layout of the original SplashLogoReInline
 * but uses the optimized LogoRingsUnified component and cleaner motion logic.
 */
export function SplashLogo({
  className,
  onAnimationComplete,
}: SplashLogoProps) {
  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-center w-screen h-screen",
        className,
      )}
    >
      <motion.div
        id="logo-container"
        data-component="LogoTypeContainer"
        className="w-fit h-fit px-4 overflow-visible flex items-center justify-end"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        onAnimationComplete={onAnimationComplete}
        variants={{
          hidden: { scale: 0.5, x: "8%", opacity: 0 },
          visible: {
            scale: 0.5,
            x: "8%",
            opacity: 1,
            transition: { duration: 0 },
          },
        }}
      >
        <motion.div
          data-component="LogoReGroup"
          className="relative grid place-items-center w-[14%] h-fit shrink-0 mr-[0%] mb-[4%]"
        >
          <LogoTypeRe className="col-start-1 row-start-1 w-full h-auto text-foreground z-0" />
          <LogoRingsUnified className="col-start-1 row-start-1 w-[440%] z-10 -translate-x-[1%]" />
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

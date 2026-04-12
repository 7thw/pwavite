import * as React from "react";
import { type SVGMotionProps, type Variants } from "motion/react";
import * as motion from "motion/react-client";

interface IProps extends SVGMotionProps<SVGSVGElement> {
  // Allow passing variants to the internal paths
  pathVariants?: Variants;
  // Transition props if needed
  pathTransition?: any;
}

const defaultDrawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01 },
    },
  },
};

export const LogoTypeAligna = ({
  pathVariants,
  className,
  ...props
}: IProps & { className?: string }) => {
  const variants = pathVariants || defaultDrawVariants;
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 333 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <motion.g clipPath="url(#clip0_21149_5271)">
        <motion.path
          d="M268.07 70.28C268.07 71.31 267.23 72.15 266.18 72.15H263.98C263.38 72.15 262.82 71.87 262.46 71.4L220.26 15.58C219.17 14.14 216.85 14.9 216.85 16.7L216.85 61.7C216.85 62.74 216 63.57 214.96 63.57H213.7C212.65 63.57 211.81 62.74 211.81 61.7L211.81 4.86C211.81 3.83 212.65 2.99 213.7 2.99H215.91C216.5 2.99 217.06 3.27 217.42 3.74L259.63 59.35C260.72 60.79 263.03 60.03 263.03 58.23L263.03 4.86C263.03 3.83 263.88 2.99 264.92 2.99H266.18C267.23 2.99 268.07 3.83 268.07 4.86L268.07 70.28Z"
          fill="currentColor"
          variants={variants}
        />
        <motion.path
          d="M120.91 61.69C120.91 62.73 120.06 63.56 119.02 63.56H117.75C116.71 63.56 115.86 62.73 115.86 61.69V4.86C115.86 3.83 116.71 2.99 117.75 2.99H119.02C120.06 2.99 120.91 3.83 120.91 4.86V61.69Z"
          fill="currentColor"
          variants={variants}
        />
        <motion.path
          d="M70.14 66.98C70.14 68.01 70.99 68.84 72.03 68.84H97.5C98.55 68.84 99.39 69.68 99.39 70.71V71.19C99.39 72.22 98.55 73.06 97.5 73.06H66.98C65.94 73.06 65.1 72.22 65.09 71.19L64.96 4.85C64.95 3.82 65.8 2.98 66.85 2.98H68.11C69.15 2.98 70 3.81 70 4.85L70.14 66.98Z"
          fill="currentColor"
          variants={variants}
        />
        <motion.path
          d="M5.26 77.78L12.31 59.06L29.25 14.23C29.86 12.61 32.18 12.61 32.79 14.23L54.47 71.91C54.75 72.64 55.46 73.13 56.25 73.13H57.68C59 73.13 59.91 71.82 59.45 70.6L34.29 4.2C34.01 3.47 33.3 2.99 32.52 2.99H29.53C28.74 2.99 28.04 3.47 27.76 4.2L0.27 76.47C-0.2 77.7 0.72 79 2.04 79H3.48C4.27 79 4.98 78.52 5.26 77.78Z"
          fill="currentColor"
          variants={variants}
        />
        <motion.path
          d="M303.75 2.99H300.77C299.98 2.99 299.27 3.47 299 4.2L273.76 70.53C273.3 71.75 274.21 73.06 275.53 73.06H276.96C277.75 73.06 278.45 72.57 278.73 71.84L283.54 59.06L300.48 14.23C301.1 12.61 303.42 12.61 304.03 14.23L327.92 77.78C328.19 78.52 328.9 79 329.69 79H331.14C332.46 79 333.37 77.7 332.91 76.48L305.52 4.2C305.24 3.47 304.54 2.99 303.75 2.99Z"
          fill="currentColor"
          variants={variants}
        />
        <motion.path
          d="M163.93 37.46C163.93 36.43 164.78 35.59 165.82 35.59L202.56 35.59C203.56 35.59 204.39 36.36 204.4 37.34C204.42 38.38 204.39 39.43 204.32 40.47C203.01 60.07 186.51 75.56 166.36 75.56C145.34 75.56 128.31 58.72 128.31 37.94C128.31 17.17 145.34 0.32 166.36 0.32C182.12 0.32 195.64 9.8 201.42 23.3C201.92 24.48 201.01 25.74 199.72 25.74H198.38C197.61 25.74 196.92 25.28 196.6 24.58C191.43 13.16 179.83 5.2 166.36 5.2C148.07 5.2 133.24 19.86 133.24 37.94C133.24 56.03 148.07 70.68 166.36 70.68C183.09 70.68 196.93 58.41 199.16 42.47C199.31 41.39 198.44 40.47 197.34 40.47H165.82C164.78 40.47 163.93 39.63 163.93 38.6V37.46Z"
          fill="currentColor"
          variants={variants}
        />
      </motion.g>
      <defs>
        <clipPath id="clip0_21149_5271">
          <rect width="100%" height="100%" fill="white" />
        </clipPath>
      </defs>
    </motion.svg>
  );
};

export const LogoTypeRe = ({
  pathVariants,
  className,
  ...props
}: IProps & { className?: string }) => {
  const variants = pathVariants || defaultDrawVariants;
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 35 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <motion.path
        d="M25.14 23.02C18.53 23.02 14.59 18.03 14.59 11.52C14.59 5.35 18.48 -0.02 25.1 -0.02C31.57 -0.02 35.52 6.02 34.93 12.18C34.9 12.45 34.8 12.55 34.52 12.55H18.07C17.75 12.55 17.62 12.65 17.66 12.99C18.13 17.13 20.75 20.37 25.27 20.37C27.52 20.37 30.09 19.67 31.14 17.5C31.24 17.3 31.32 17.25 31.53 17.25H33.86C34.27 17.25 34.38 17.41 34.24 17.77C32.85 21.41 28.91 23.02 25.14 23.02ZM17.76 9.49C17.71 9.83 17.84 9.94 18.16 9.94H31.47C31.8 9.94 31.9 9.82 31.88 9.52C31.62 5.79 28.95 2.63 24.97 2.63C20.96 2.63 18.27 5.66 17.76 9.49Z"
        fill="currentColor"
        variants={variants}
      />
      <motion.path
        d="M0.54 22.76C0.22 22.76 0.12 22.65 0.12 22.35V0.65C0.12 0.33 0.24 0.24 0.54 0.24H2.63C2.92 0.24 3.03 0.33 3.04 0.64L3.11 2.69C3.12 3.18 3.13 3.42 3.2 3.49C3.26 3.56 3.33 3.59 3.42 3.57C3.52 3.56 3.69 3.36 4.03 2.96C5.87 0.77 8.76 0.08 11.68 0.03C12 0.02 12.09 0.14 12.09 0.44V2.39C12.09 2.71 11.98 2.8 11.68 2.81C6.01 2.97 3.16 6.43 3.16 11.82C3.16 16.44 3.16 20.99 3.16 22.35C3.16 22.67 3.04 22.76 2.75 22.76H0.54Z"
        fill="currentColor"
        variants={variants}
      />
    </motion.svg>
  );
};

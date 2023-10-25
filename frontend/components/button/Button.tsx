import React from "react";
import { VariantProps, tv } from "tailwind-variants";

export type ButtonVariantType = "contained" | "outlined";

export type ButtonSizeType = "small" | "standard" | "large";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * * - "contained": A button with a solid background color, ideally used for the principal call to action on the page.
   * - "outlined": A button with a border and no background color.
   */
}

export const buttonVariants = tv({
  base: "text-sm font-medium border border-solid bg-transparent items-center justify-center rounded-md border-gray-icon hover:bg-gray-hover-icon transition duration-300 transition-colors focus:outline-none focus:ring-2 focus:ring-pur-200 focus:ring-offset-2 disabled:pointer-events-none",
  variants: {
    variant: {
      contained:
        "animate-gradient bg-gradient-third text-white hover:bg-pur-200",
      outlined:
        "bg-transparent border-2 border-gray-icon hover:bg-gray-hover-icon hover:border-gray-hover-border  text-white",
    },
    size: {
      small: "text-sm px-2 py-1",
      standard: "text-base px-4 py-2",
      large: "text-lg px-6 py-3",
    },
    fullWidth: {
      true: "",
    },
  },
  defaultVariants: {
    variant: "outlined",
    size: "standard",
  },
});

export function Button({
  variant = "outlined",
  size = "standard",
  label,
  children,
  fullWidth,
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size });
  // const style = width ? { width: `${width}px` } : {};

  return (
    <button
      className={`${classes} ${fullWidth ? "w-full" : ""}`}
      // style={style}
      {...props}
    >
      {label || children}
    </button>
  );
}

// import React from "react";
// import { VariantProps, tv } from "tailwind-variants";

// export type ButtonVariantType = "contained" | "outlined";

// export type ButtonSizeType = "small" | "standard" | "large";

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   /**
//    * * - "contained": A button with a solid background color, ideally used for the principal call to action on the page.
//    * - "outlined": A button with a border and no background color.
//    */
// }

// export const buttonVariants = tv({
//   base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pur-200 focus:ring-offset-2 disabled:pointer-events-none",
//   variants: {
//     variant: {
//       contained:
//         "animate-gradient bg-gradient-third text-white hover:bg-pur-200",
//       outlined:
//         "bg-transparent border-2 border-pur-700 hover:bg-pur-100 text-black',",
//     },
//     size: {
//       small: "text-sm px-2 py-1",
//       standard: "text-base px-4 py-2",
//       large: "text-lg px-6 py-3",
//     },
//     fullWidth: {
//       true: "",
//     },
//   },
//   defaultVariants: {
//     variant: "outlined",
//     size: "standard",
//   },
// });

// export function Button({
//   variant = "outlined",
//   size = "standard",
//   label,
//   children,
//   fullWidth,
//   ...props
// }: ButtonProps) {
//   const classes = buttonVariants({ variant, size });
//   // const style = width ? { width: `${width}px` } : {};

//   return (
//     <button
//       className={`${classes} ${fullWidth ? "w-full" : ""}`}
//       // style={style}
//       {...props}
//     >
//       {label || children}
//     </button>
//   );
// }

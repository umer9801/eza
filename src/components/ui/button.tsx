import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-medium cursor-pointer transition-all duration-300 active:translate-y-px focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-primary/35 bg-primary text-primary-foreground shadow-[6px_6px_12px_rgba(84,104,119,0.2),-6px_-6px_12px_rgba(255,255,255,0.8)] hover:shadow-[inset_4px_4px_8px_rgba(84,104,119,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.7)] active:shadow-[inset_6px_6px_12px_rgba(84,104,119,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.5)]",
        destructive:
          "border-destructive/35 bg-destructive text-destructive-foreground shadow-[6px_6px_12px_rgba(84,104,119,0.18),-6px_-6px_12px_rgba(255,255,255,0.5)] hover:shadow-[inset_4px_4px_8px_rgba(84,104,119,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]",
        outline:
          "border-[rgba(84,104,119,0.24)] bg-background text-foreground shadow-[6px_6px_12px_rgba(84,104,119,0.12),-6px_-6px_8px_rgba(255,255,255,0.75)] hover:border-[rgba(84,104,119,0.42)] hover:shadow-[inset_4px_4px_8px_rgba(84,104,119,0.12),inset_-4px_-4px_8px_rgba(255,255,255,0.7)]",
        secondary:
          "border-[rgba(84,104,119,0.2)] bg-secondary text-secondary-foreground shadow-[6px_6px_12px_rgba(84,104,119,0.12),-6px_-6px_12px_rgba(255,255,255,0.7)] hover:border-[rgba(84,104,119,0.4)] hover:shadow-[inset_4px_4px_8px_rgba(84,104,119,0.12),inset_-4px_-4px_8px_rgba(255,255,255,0.7)]",
        ghost:
          "border-[rgba(84,104,119,0.25)] bg-transparent text-foreground shadow-[4px_4px_8px_rgba(84,104,119,0.08),-4px_-4px_8px_rgba(255,255,255,0.55)] hover:border-[rgba(84,104,119,0.5)] hover:shadow-[6px_6px_12px_rgba(84,104,119,0.12),-6px_-6px_12px_rgba(255,255,255,0.7)]",
        link: "text-primary underline-offset-4 hover:underline shadow-none border-none bg-transparent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-11 rounded-full px-8",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

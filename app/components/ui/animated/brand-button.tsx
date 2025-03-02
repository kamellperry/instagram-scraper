
import React from 'react';
import { cn } from '~/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
    "divine-button relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-divine-300 disabled:pointer-events-none hover:cursor-pointer",
    {
        variants: {
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-4 py-1.5 text-xs",
                lg: "h-14 px-8 py-3 text-base",
            },
            variant: {
                default: "animate-divine-pulse",
                subtle: "bg-opacity-80 shadow-sm",
                royal: "bg-gradient-to-br from-divine-200 to-divine-300 text-white shadow-lg",
                // Rainbow colors
                red: "rainbow-red text-white",
                orange: "rainbow-orange",
                yellow: "rainbow-yellow",
                green: "rainbow-green",
                blue: "rainbow-blue text-white",
                indigo: "rainbow-indigo text-white",
                violet: "rainbow-violet text-white",
                // Monochrome
                black: "rainbow-black text-white",
                white: "rainbow-white text-black",
            },
        },
        defaultVariants: {
            size: "default",
            variant: "default",
        },
    }
);

export interface BrandButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const BrandButton = React.forwardRef<HTMLButtonElement, BrandButtonProps>(
    ({ className, size, variant, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ size, variant, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

BrandButton.displayName = "BrandButton";

export { BrandButton, buttonVariants };

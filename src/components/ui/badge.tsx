import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center cursor-pointer rounded-full border px-2.5 h-8 text-sm  transition-colors focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: ' bg-white border-[#CFCFCF]  text-[#606060] hover:bg-black/5',
        secondary:
          ' bg-[#CDE4FF] border-[#A7CFFF] text-[#0075FF] font-bold hover:bg-[#A7CFFF]/80',
        destructive: ' bg-red-500 text-[#606060] hover:bg-red-500/80',
        outline: 'text-stone-950',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

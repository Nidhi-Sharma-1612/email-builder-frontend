import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils"; // Utility function for class names

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-gray-200", // Lighter background
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-blue-500 transition-all duration-300" // Blue indicator for better contrast
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} // Smooth progress animation
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

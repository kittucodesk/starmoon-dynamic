"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  value: number | number[]
}

const Slider = React.forwardRef< 
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, value, ...props }, ref) => {
  // ensure we have an array of values
  const vals = Array.isArray(value) ? value : [value]

  return (
    <SliderPrimitive.Root
      ref={ref}
      value={vals}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>

      {/* render one thumb per value */}
      {vals.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          index={i}
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

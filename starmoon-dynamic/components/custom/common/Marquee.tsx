// components/BrandMarquee.tsx
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const Marquee = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("overflow-hidden relative group", className)}>
    <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap gap-12">
      {children}
      {children}
    </div>
  </div>
)

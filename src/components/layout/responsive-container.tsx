import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
}

export function ResponsiveContainer({ children, className, size = "xl", padding = "md" }: ResponsiveContainerProps) {
  const sizeClasses = {
    sm: "max-w-2xl", // 672px
    md: "max-w-4xl", // 896px
    lg: "max-w-6xl", // 1152px
    xl: "max-w-7xl", // 1280px
    full: "max-w-none", // No max width
  }

  const paddingClasses = {
    none: "",
    sm: "px-4 sm:px-6",
    md: "px-4 sm:px-6 lg:px-8",
    lg: "px-4 sm:px-6 lg:px-8 xl:px-12",
  }

  return <div className={cn("w-full mx-auto", sizeClasses[size], paddingClasses[padding], className)}>{children}</div>
}

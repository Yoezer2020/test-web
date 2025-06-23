import type React from "react"
import { cn } from "@/lib/utils"
import { ResponsiveContainer } from "./responsive-container"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
  background?: "transparent" | "muted" | "card"
}

export function SectionContainer({
  children,
  className,
  size = "xl",
  padding = "lg",
  background = "transparent",
}: SectionContainerProps) {
  const backgroundClasses = {
    transparent: "",
    muted: "bg-muted/50",
    card: "bg-card",
  }

  const sectionPadding = {
    none: "",
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
  }

  return (
    <section className={cn("w-full", backgroundClasses[background], sectionPadding[padding], className)}>
      <ResponsiveContainer size={size} padding="md">
        {children}
      </ResponsiveContainer>
    </section>
  )
}

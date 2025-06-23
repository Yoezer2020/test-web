import type React from "react"
import { cn } from "@/lib/utils"

interface PublicPageContainerProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

export function PublicPageContainer({ children, className, fullWidth = false }: PublicPageContainerProps) {
  return (
    <div className={cn("w-full min-h-screen", !fullWidth && "max-w-screen-2xl mx-auto", className)}>{children}</div>
  )
}

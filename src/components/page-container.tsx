import type React from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn("flex flex-1 flex-col space-y-4 p-4 pt-6", className)}>{children}</div>
}

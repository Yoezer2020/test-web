import type React from "react"

interface BackgroundWrapperProps {
  children: React.ReactNode
  imageUrl?: string
  overlay?: boolean
  overlayOpacity?: number
  className?: string
}

export function BackgroundWrapper({
  children,
  imageUrl = "/placeholder.svg?height=1080&width=1920",
  overlay = true,
  overlayOpacity = 85,
  className = "",
}: BackgroundWrapperProps) {
  return (
    <div className={`min-h-screen relative ${className}`}>
      {/* Background Image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      >
        {/* Conditional Overlay */}
        {overlay && (
          <div
            className="absolute inset-0 bg-white/80 dark:bg-gray-900/85 backdrop-blur-sm"
            style={{ opacity: overlayOpacity / 100 }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

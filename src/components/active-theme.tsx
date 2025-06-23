"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface ThemeConfig {
  activeTheme: string
  setActiveTheme: (theme: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const ThemeConfigContext = createContext<ThemeConfig | undefined>(undefined)

export function ThemeConfigProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState("default")
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("active-theme")
    const savedDarkMode = localStorage.getItem("dark-mode") === "true"

    if (savedTheme) {
      setActiveTheme(savedTheme)
    }
    setIsDarkMode(savedDarkMode)
  }, [])

  // Apply theme changes
  useEffect(() => {
    localStorage.setItem("active-theme", activeTheme)
    document.documentElement.setAttribute("data-theme", activeTheme)
  }, [activeTheme])

  // Apply dark mode changes
  useEffect(() => {
    localStorage.setItem("dark-mode", isDarkMode.toString())
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ThemeConfigContext.Provider
      value={{
        activeTheme,
        setActiveTheme,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeConfigContext.Provider>
  )
}

export function useThemeConfig() {
  const context = useContext(ThemeConfigContext)
  if (context === undefined) {
    throw new Error("useThemeConfig must be used within a ThemeConfigProvider")
  }
  return context
}

// Export the type for external use
export type ThemeContextType = ThemeConfig

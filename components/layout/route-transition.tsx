"use client"

import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [transitioning, setTransitioning] = useState(false)
  const [key, setKey] = useState(pathname)

  useEffect(() => {
    // When pathname changes, trigger a short transition
    if (pathname !== key) {
      setTransitioning(true)
      const id = setTimeout(() => {
        setKey(pathname)
        setTransitioning(false)
      }, 250) // duration matches CSS animation
      return () => clearTimeout(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div
      className={`page-transition ${transitioning ? "page-transition-leave" : "page-transition-enter"}`}
      key={key}
    >
      {children}
    </div>
  )
}

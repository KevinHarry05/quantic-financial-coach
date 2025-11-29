"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              P
            </div>
            Pixil
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Dashboard
            </Link>
            <Link
              href="/mentorship"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition"
            >
              Mentorship
            </Link>
            <Link href="/learn" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Learn
            </Link>
            <Link href="/news" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              News
            </Link>
            <Link href="/simulate" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Simulate
            </Link>
            <Link href="/diversify" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Diversify
            </Link>
            <Link href="/optimize" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Optimize
            </Link>
          </div>

          {/* User Avatar & Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition">
              <span className="text-sm font-semibold text-primary">AB</span>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            <Link href="/dashboard" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded">
              Dashboard
            </Link>
            <Link href="/mentorship" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded">
              Mentorship
            </Link>
            <Link href="/learn" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded">
              Learn
            </Link>
            <Link href="/news" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded">
              News
            </Link>
            <Link href="/simulate" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded">
              Simulate
            </Link>
            <Link href="/diversify" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded">
              Diversify
            </Link>
            <Link href="/optimize" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded">
              Optimize
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

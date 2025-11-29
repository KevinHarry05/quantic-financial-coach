"use client"

import React from 'react'

export default function LoadingOverlay({ message = 'Preparing your dashboard…' }: { message?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="loader w-14 h-14 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <div className="text-sm text-white">{message}</div>
      </div>
    </div>
  )
}

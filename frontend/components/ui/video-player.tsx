"use client"

import React from "react"

interface VideoPlayerProps {
  src: string
  poster?: string
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <video className="w-full h-auto max-h-96 bg-black" controls playsInline poster={poster}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

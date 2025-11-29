"use client"

import React from "react"
import Image from "next/image"

export default function HeroWorkers() {
  return (
    <div className="relative w-full h-full">
      {/* Floating background orbs */}
      <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center float-slow" />

      <div className="absolute right-8 top-10 w-28 h-28 rounded-full bg-success/10 flex items-center justify-center float-medium" />

      <div className="absolute left-1/3 top-12 w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center float-fast" />

      {/* Gig worker benefit card */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative w-72 md:w-80 rounded-2xl bg-gradient-to-br from-primary/20 via-background to-accent/10 border border-border shadow-lg p-5 md:p-6 card-animate hero-delay">
          {/* Badge */}
          <div className="absolute -top-4 left-6 rounded-full bg-primary text-primary-foreground text-xs px-3 py-1 shadow-sm">
            Gig worker gets ahead with Pixil
          </div>

            <div className="flex items-center gap-4 mt-2">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-primary/40 bg-card">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Gig worker using Pixil on a delivery job"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground leading-tight">Ravi · Delivery & ride-share</p>
              <p className="text-xs text-muted-foreground leading-snug">
                Income changes daily. Pixil keeps his bills, EMI and buffer on track.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-lg bg-card/70 px-3 py-2 border border-border/70">
              <span className="text-muted-foreground">Monthly earnings clarity</span>
              <span className="font-semibold text-success">+32%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-card/70 px-3 py-2 border border-border/70">
              <span className="text-muted-foreground">Safety buffer for slow weeks</span>
              <span className="font-semibold text-primary">₹18,500</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-card/70 px-3 py-2 border border-border/70">
              <span className="text-muted-foreground">Money stress</span>
              <span className="font-semibold text-warning">↓ much lower</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

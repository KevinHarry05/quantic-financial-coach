"use client"

import React, { useEffect } from "react"

export default function ChatbaseLoader(): null {
  useEffect(() => {
    try {
      // Only initialize if the global chatbase is not already initialized
      // We guard using typeof window to ensure we run on the client only.
      if (typeof window === "undefined") return

      const shouldInit = !window.chatbase || window.chatbase("getState") !== "initialized"

      if (!shouldInit) return

      if (!window.chatbase || !window.chatbase.q) {
        // Minimal proxy implementation to queue calls until the embed loads
        const handler: any = (...args: any[]) => {
          if (!handler.q) handler.q = []
          handler.q.push(args)
        }

        // Attach typed handler to window.chatbase
        // @ts-ignore - we intentionally attach a runtime proxy
        window.chatbase = handler

        // Create a proxy that returns a queue for property q and functions for other props
        // so user code can call `window.chatbase(...)` safely before the script loads.
        // @ts-ignore
        window.chatbase = new Proxy(window.chatbase, {
          get: (target: any, prop: string | symbol) => {
            if (prop === "q") return target.q
            return (...args: any[]) => (target as any)(prop, ...args)
          },
        })
      }

      const onLoad = () => {
        try {
          if (document.getElementById("n6mIpy0iJO7W78KoK5zAO")) return
          const script = document.createElement("script")
          script.src = "https://www.chatbase.co/embed.min.js"
          script.id = "n6mIpy0iJO7W78KoK5zAO"
          // Keep domain attribute from original snippet; it's harmless
          script.setAttribute("domain", "www.chatbase.co")
          document.body.appendChild(script)
        } catch (e) {
          // Non-fatal; we don't want the embed to crash the app
          // eslint-disable-next-line no-console
          console.warn("Chatbase loader failed to append script:", e)
        }
      }

      if (document.readyState === "complete") {
        onLoad()
      } else {
        window.addEventListener("load", onLoad)
      }

      return () => {
        window.removeEventListener("load", onLoad)
      }
    } catch (err) {
      // Protect against runtime errors — don't block the app
      // eslint-disable-next-line no-console
      console.warn("Chatbase loader error:", err)
    }
  }, [])

  return null
}

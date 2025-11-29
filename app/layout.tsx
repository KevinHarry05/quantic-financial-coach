import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import ChatbaseLoader from "@/components/chatbot/chatbase-loader"
import RouteTransition from "@/components/layout/route-transition"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Pixil – Autonomous Financial Coach",
  description: "Financial coach for gig workers, informal sector workers, and everyday citizens with irregular income",
  generator: "v0.app",
}

// Next 16 requires viewport metadata to be exported separately from `metadata`.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && !localStorage.getItem('shownNewsPopup_v1')) {
                window.pixilShowNewsPopup = true;
              }
            `,
          }}
        />
      </head>
        {/* Suppress hydration warnings on the body tag in dev: some browser extensions (e.g. Grammarly)
          inject attributes client-side that cause hydration mismatches and noise in the console.
          This keeps the console cleaner during development; remove if you prefer full mismatch logs. */}
        <body className="font-sans antialiased" suppressHydrationWarning={true}>
        <RouteTransition>{children}</RouteTransition>
        <ChatbaseLoader />
        <Analytics />
      </body>
    </html>
  )
}

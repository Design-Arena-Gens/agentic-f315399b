import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nature AI Image Generator',
  description: 'Generate beautiful nature-inspired AI images',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

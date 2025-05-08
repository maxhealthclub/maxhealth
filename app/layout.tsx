import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "./contexts/LanguageContext"
import { ThemeProvider } from "./contexts/ThemeContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Max Health Club",
  description: "Your personal fitness companion",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 
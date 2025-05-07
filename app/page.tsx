"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Dumbbell,
  FileText,
  Wallet,
  Home,
  User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./contexts/LanguageContext"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode')
      if (savedMode === null) {
        localStorage.setItem('darkMode', 'true')
        return true
      }
      return savedMode === 'true'
    }
    return true
  })
  const { language, translations } = useLanguage()
  const t = translations[language]

  // Mock data for recent activity
  const recentActivity = {
    lastPT: {
      date: "2 days ago",
      trainer: "Jeroen van Rooien",
      type: "Strength Training"
    },
    lastBarPurchase: {
      date: "3 days ago",
      items: ["Protein Shake", "Energy Bar"],
      total: "€12.50"
    }
  }

  const handleNavigation = (path: string, tabId: string) => {
    router.push(path)
    setActiveTab(tabId)
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-[#101010] text-white' : 'bg-white text-[#101010]'}`}>
      {/* Header with safe area padding for notch */}
      <header className={`pt-12 pb-4 px-5 flex items-center justify-between ${isDarkMode ? 'bg-[#101010]' : 'bg-white'} sticky top-0 z-10`}>
        <h1 className="text-xl font-semibold">{t.welcome}</h1>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="flex-1 px-5 pb-28 overflow-auto">
        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">{t.quickActions}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card 
              className={`${isDarkMode ? 'bg-[#1A1A1A] text-white hover:bg-[#252525]' : 'bg-gray-50 text-[#101010] hover:bg-gray-100'} border-none rounded-xl shadow-lg cursor-pointer transition-colors`}
              onClick={() => router.push('/pt')}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                    <Dumbbell className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <p className="font-medium">{t.bookPT}</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`${isDarkMode ? 'bg-[#1A1A1A] text-white hover:bg-[#252525]' : 'bg-gray-50 text-[#101010] hover:bg-gray-100'} border-none rounded-xl shadow-lg cursor-pointer transition-colors`}
              onClick={() => router.push('/invoices')}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <p className="font-medium">{t.viewInvoices}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">{t.recentActivity}</h2>
          <Card className={`${isDarkMode ? 'bg-[#1A1A1A] text-white' : 'bg-gray-50 text-[#101010]'} border-none rounded-xl shadow-lg`}>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                      <Dumbbell className="h-5 w-5 text-[#D7AD41]" />
                    </div>
                    <div>
                      <p className="font-medium">{t.lastPT}</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {recentActivity.lastPT.date} • {recentActivity.lastPT.trainer}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        {recentActivity.lastPT.type}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-[#D7AD41]"
                    onClick={() => router.push('/pt')}
                  >
                    {t.viewDetails}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                      <Wallet className="h-5 w-5 text-[#D7AD41]" />
                    </div>
                    <div>
                      <p className="font-medium">{t.lastBarPurchase}</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {recentActivity.lastBarPurchase.date}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        {recentActivity.lastBarPurchase.items.join(", ")} • {recentActivity.lastBarPurchase.total}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-[#D7AD41]"
                    onClick={() => router.push('/bar')}
                  >
                    {t.viewDetails}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation - iOS style with safe area padding */}
      <nav className={`fixed bottom-0 w-full ${isDarkMode ? 'bg-[#1A1A1A] border-[#2A2A2A]' : 'bg-white border-gray-200'} border-t pb-8 pt-2 shadow-lg z-20`}>
        <div className="flex justify-around">
          {[
            { id: "home", icon: Home, label: t.home, path: "/" },
            { id: "invoices", icon: FileText, label: t.invoices, path: "/invoices" },
            { id: "bar", icon: Wallet, label: t.bar, path: "/bar" },
            { id: "pt", icon: Dumbbell, label: t.pt, path: "/pt" },
            { id: "profile", icon: User, label: t.profile, path: "/profile" },
          ].map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center py-2 px-5 rounded-lg ${
                activeTab === item.id ? "text-[#D7AD41]" : isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
              onClick={() => handleNavigation(item.path, item.id)}
            >
              <item.icon className={`h-6 w-6 ${activeTab === item.id ? "text-[#D7AD41]" : isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              <span className={`text-xs mt-1 ${activeTab === item.id ? "font-medium" : ""}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
} 
"use client"

import { useState } from "react"
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
import { useLanguage } from "../contexts/LanguageContext"

export default function PTPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("pt")
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

  const handleNavigation = (path: string, tabId: string) => {
    router.push(path)
    setActiveTab(tabId)
  }

  // Mock PT data
  const ptData = {
    sessionsLeft: 2,
    trainer: {
      name: "Jeroen van Rooien",
      tier: "Platinum",
      avatar: "/placeholder.svg",
    },
    tiers: [
      {
        name: "Bronze",
        price: 45,
        description: "Basic personal training package",
        sessions: 4,
      },
      {
        name: "Silver",
        price: 85,
        description: "Standard personal training package",
        sessions: 8,
      },
      {
        name: "Gold",
        price: 160,
        description: "Premium personal training package",
        sessions: 16,
      },
      {
        name: "Platinum",
        price: 300,
        description: "Elite personal training package",
        sessions: 32,
      },
    ],
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-[#101010] text-white' : 'bg-white text-[#101010]'}`}>
      {/* Header with safe area padding for notch */}
      <header className={`pt-12 pb-4 px-5 flex items-center justify-between ${isDarkMode ? 'bg-[#101010]' : 'bg-white'} sticky top-0 z-10`}>
        <h1 className="text-xl font-semibold">{t.personalTraining}</h1>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="flex-1 px-5 pb-28 overflow-auto">
        {/* Current PT Status */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">{t.currentPTStatus}</h2>
          <Card className={`${isDarkMode ? 'bg-[#1A1A1A] text-white' : 'bg-gray-50 text-[#101010]'} border-none rounded-xl shadow-lg`}>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t.sessionsLeft}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>5 sessions</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#D7AD41]">
                    {t.bookSession}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{t.yourTrainer}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>John Doe</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#D7AD41]">
                    {t.contactTrainer}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PT Packages */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">{t.ptPackages}</h2>
          <div className="space-y-4">
            {ptData.tiers.map((tier) => (
              <Card 
                key={tier.name}
                className={`${isDarkMode ? 'bg-[#1A1A1A] text-white hover:bg-[#252525]' : 'bg-gray-50 text-[#101010] hover:bg-gray-100'} border-none rounded-xl shadow-lg cursor-pointer transition-colors`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{tier.name}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {tier.sessions} {t.sessions}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {tier.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{tier.price}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[#D7AD41] mt-2"
                        onClick={() => {/* TODO: Implement purchase flow */}}
                      >
                        {t.purchase}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
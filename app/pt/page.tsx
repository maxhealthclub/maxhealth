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
    <div className="flex flex-col min-h-screen bg-white text-[#101010]">
      {/* Header with safe area padding for notch */}
      <header className="pt-12 pb-4 px-5 flex items-center justify-between bg-white sticky top-0 z-10">
        <h1 className="text-xl font-semibold">{t.personalTraining}</h1>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="flex-1 px-5 pb-28 overflow-auto">
        {/* Current PT Status */}
        <div className="mb-6">
          <Card className="bg-gray-50 border-none rounded-xl shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                    <Dumbbell className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {ptData.sessionsLeft} {t.sessionsLeft}
                    </p>
                    <p className="text-sm text-gray-500">{t.withTrainer} {ptData.trainer.name}</p>
                  </div>
                </div>
                <Button
                  className="bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 font-medium shadow-md"
                  onClick={() => router.push("/pt/schedule")}
                >
                  {t.scheduleSession}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PT Packages */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">{t.ptPackages}</h2>
          <div className="space-y-4">
            {ptData.tiers.map((tier) => (
              <Card key={tier.name} className="bg-gray-50 border-none rounded-xl shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{tier.name}</h3>
                      <p className="text-sm text-gray-500">{tier.description}</p>
                      <p className="text-sm text-gray-500 mt-1">{tier.sessions} {t.sessions}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">€{tier.price}</p>
                      <Button
                        className="mt-2 bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 font-medium shadow-md"
                        onClick={() => router.push(`/pt/purchase/${tier.name.toLowerCase()}`)}
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
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 pb-8 pt-2 shadow-lg z-20">
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
                activeTab === item.id ? "text-[#D7AD41]" : "text-gray-600"
              }`}
              onClick={() => handleNavigation(item.path, item.id)}
            >
              <item.icon className={`h-6 w-6 ${activeTab === item.id ? "text-[#D7AD41]" : "text-gray-600"}`} />
              <span className={`text-xs mt-1 ${activeTab === item.id ? "font-medium" : ""}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
} 
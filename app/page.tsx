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
import { useLanguage } from "./contexts/LanguageContext"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")
  const { language, translations } = useLanguage()
  const t = translations[language]

  const handleNavigation = (path: string, tabId: string) => {
    router.push(path)
    setActiveTab(tabId)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#101010]">
      {/* Header with safe area padding for notch */}
      <header className="pt-12 pb-4 px-5 flex items-center justify-between bg-white sticky top-0 z-10">
        <h1 className="text-xl font-semibold">{t.welcome}</h1>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="flex-1 px-5 pb-28 overflow-auto">
        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">{t.quickActions}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gray-50 border-none rounded-xl shadow-lg cursor-pointer transition-colors hover:bg-gray-100">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                    <Dumbbell className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <p className="font-medium">{t.bookPT}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-none rounded-xl shadow-lg cursor-pointer transition-colors hover:bg-gray-100">
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
          <Card className="bg-gray-50 border-none rounded-xl shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                      <Dumbbell className="h-5 w-5 text-[#D7AD41]" />
                    </div>
                    <div>
                      <p className="font-medium">{t.lastPT}</p>
                      <p className="text-sm text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#D7AD41]">
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
                      <p className="text-sm text-gray-500">3 days ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#D7AD41]">
                    {t.viewDetails}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
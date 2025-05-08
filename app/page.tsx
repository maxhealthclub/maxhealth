"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Dumbbell, FileText, Home, User, Wallet } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { useLanguage } from "./contexts/LanguageContext"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const router = useRouter()
  const { language, translations } = useLanguage()
  const t = translations[language]

  // Mock user data
  const userData = {
    firstName: "Thomas",
    profileImage: "/placeholder.svg?height=40&width=40",
    unpaidBalance: 54.0,
    barCredit: 12.5,
    ptSessionsLeft: 2,
    recentActivity: [
      { id: 1, type: "Bar Purchase", amount: 8.5, date: "Today, 14:30" },
      { id: 2, type: "Invoice #1234", amount: 54.0, status: "Unpaid", date: "Yesterday" },
      { id: 3, type: "PT Session", trainer: "Sarah", date: "2 days ago" },
    ],
  }

  const handleNavigation = (path: string, tabId: string) => {
    setActiveTab(tabId)
    router.push(path)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#101010] text-white">
      {/* Header with safe area padding for notch */}
      <header className="pt-12 pb-4 px-5 flex items-center justify-between bg-[#101010] sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Welcome back, {userData.firstName}!</h1>
        <Avatar className="h-10 w-10 border-2 border-[#D7AD41]">
          <AvatarImage src={userData.profileImage || "/placeholder.svg"} alt={userData.firstName} />
          <AvatarFallback className="bg-[#D7AD41] text-[#101010] font-medium">
            {userData.firstName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="flex-1 px-5 pb-28 overflow-auto">
        {/* Summary Cards */}
        <div className="space-y-4 mb-6">
          <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#D7AD41]/20 p-2.5 rounded-full">
                  <FileText className="h-6 w-6 text-[#D7AD41]" />
                </div>
                <div>
                  <CardDescription className="text-gray-400 text-sm">Unpaid Balance</CardDescription>
                  <CardTitle className="text-xl font-semibold">€{userData.unpaidBalance.toFixed(2)}</CardTitle>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-[#D7AD41] text-[#D7AD41] hover:bg-[#D7AD41] hover:text-[#101010] h-10 px-4 rounded-lg"
                onClick={() => router.push("/invoices")}
              >
                Pay Now
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg">
              <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="bg-[#D7AD41]/20 p-2.5 rounded-full w-fit">
                    <Wallet className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <CardDescription className="text-gray-400 text-sm">Bar Saldo</CardDescription>
                  <CardTitle className="text-xl font-semibold">€{userData.barCredit.toFixed(2)}</CardTitle>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg">
              <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="bg-[#D7AD41]/20 p-2.5 rounded-full w-fit">
                    <Dumbbell className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <CardDescription className="text-gray-400 text-sm">PT Sessions Left</CardDescription>
                  <CardTitle className="text-xl font-semibold">{userData.ptSessionsLeft} sessions</CardTitle>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Action Buttons - iOS style */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            className="h-14 bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 rounded-xl font-medium shadow-md"
            onClick={() => router.push("/invoices")}
          >
            <FileText className="mr-2 h-5 w-5 text-[#101010]" />
            View Invoices
          </Button>
          <Button 
            className="h-14 bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 rounded-xl font-medium shadow-md"
            onClick={() => router.push("/pt")}
          >
            <Dumbbell className="mr-2 h-5 w-5" />
            Buy PT Session
          </Button>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {userData.recentActivity.map((activity) => (
              <Card key={activity.id} className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-md">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-sm text-gray-400">{activity.date}</p>
                    </div>
                    {activity.amount && (
                      <p className={`font-semibold ${activity.status === "Unpaid" ? "text-[#D7AD41]" : "text-white"}`}>
                        €{activity.amount.toFixed(2)}
                      </p>
                    )}
                    {activity.trainer && <p className="text-sm text-gray-400">with {activity.trainer}</p>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation - iOS style with safe area padding */}
      <nav className="fixed bottom-0 w-full bg-[#1A1A1A] border-t border-[#2A2A2A] pb-8 pt-2 shadow-lg z-20">
        <div className="flex justify-around">
          {[
            { id: "home", icon: Home, label: t.home, path: "/" },
            { id: "invoices", icon: FileText, label: t.invoices, path: "/invoices" },
            { id: "bar", icon: CreditCard, label: t.bar, path: "/bar" },
            { id: "pt", icon: Dumbbell, label: t.pt, path: "/pt" },
            { id: "profile", icon: User, label: t.profile, path: "/profile" },
          ].map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center py-2 px-5 rounded-lg ${
                activeTab === item.id ? "text-[#D7AD41]" : "text-gray-400"
              }`}
              onClick={() => handleNavigation(item.path, item.id)}
            >
              <item.icon className={`h-6 w-6 ${activeTab === item.id ? "text-[#D7AD41]" : "text-gray-400"}`} />
              <span className={`text-xs mt-1 ${activeTab === item.id ? "font-medium" : ""}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
} 
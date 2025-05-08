"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CreditCard,
  Dumbbell,
  FileText,
  Home,
  User,
  Edit,
  MessageSquare,
  Bell,
  Globe,
  Moon,
  LogOut,
  ChevronRight,
  Wallet,
  Receipt,
  AlertTriangle,
  Sun,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "../contexts/LanguageContext"
import { useTheme } from "../contexts/ThemeContext"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const router = useRouter()
  const { language, setLanguage, translations } = useLanguage()
  const { isDarkMode, toggleDarkMode } = useTheme()
  const t = translations[language]

  // Mock user data
  const userData = {
    firstName: "Thomas",
    lastName: "Wind",
    email: "thomaswind@example.com",
    phone: "+31 6 12345678",
    address: "Fitness Street 123",
    city: "Amsterdam",
    postalCode: "1234 AB",
    country: "Netherlands",
    membershipType: "Stay Fit",
    membershipPrice: 99.50,
    trainerName: "Jeroen van Rooien",
    trainerTier: "Platinum",
    ptSessions: 2,
    unpaidAmount: 99.50,
    paidCount: 12,
    barBalance: 14.25,
  }

  const handleNavigation = (path: string, tabId: string) => {
    setActiveTab(tabId)
    router.push(path)
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#101010] text-white">
      {/* Header with safe area padding for notch */}
      <header className="pt-12 pb-4 px-5 flex items-center justify-between bg-[#101010] sticky top-0 z-10">
        <h1 className="text-xl font-semibold">{t.profile}</h1>
        <Avatar className="h-10 w-10 border-2 border-[#D7AD41]">
          <AvatarImage src="/placeholder.svg" alt={userData.firstName} />
          <AvatarFallback className="bg-[#D7AD41] text-[#101010] font-medium">
            {userData.firstName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="flex-1 px-5 pb-28 overflow-auto">
        {/* Profile Header */}
        <div className="mb-6">
          <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-[#D7AD41]">
                  <AvatarImage src="/placeholder.svg" alt={userData.firstName} />
                  <AvatarFallback className="bg-[#D7AD41] text-[#101010] text-xl font-medium">
                    {userData.firstName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-semibold">{`${userData.firstName} ${userData.lastName}`}</h2>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#D7AD41]" onClick={handleEditProfile}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">{t.edit}</span>
                    </Button>
                  </div>
                  <p className="text-gray-400">
                    {userData.membershipType} – €{userData.membershipPrice.toFixed(2)}/month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Profile Information</h2>
          <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <CardDescription className="text-gray-400">Email</CardDescription>
                  <CardTitle className="text-lg">{userData.email}</CardTitle>
                </div>
                <div>
                  <CardDescription className="text-gray-400">Phone</CardDescription>
                  <CardTitle className="text-lg">{userData.phone}</CardTitle>
                </div>
                <div>
                  <CardDescription className="text-gray-400">Address</CardDescription>
                  <CardTitle className="text-lg">
                    {`${userData.address}, ${userData.postalCode} ${userData.city}, ${userData.country}`}
                  </CardTitle>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Membership Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Membership</h2>
          <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <CardDescription className="text-gray-400">Membership Type</CardDescription>
                  <CardTitle className="text-lg">{userData.membershipType}</CardTitle>
                </div>
                <div>
                  <CardDescription className="text-gray-400">Monthly Price</CardDescription>
                  <CardTitle className="text-lg">€{userData.membershipPrice.toFixed(2)}</CardTitle>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Personal Trainer */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{t.yourTrainer}</h3>
          <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-[#D7AD41]">
                  <AvatarImage src="/placeholder.svg" alt={userData.trainerName} />
                  <AvatarFallback className="bg-[#D7AD41] text-[#101010] font-medium">
                    {userData.trainerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{userData.trainerName}</p>
                      <Badge className="mt-1 bg-[#1A1A1A] border border-[#D7AD41] text-[#D7AD41] hover:bg-[#1A1A1A] hover:text-[#D7AD41]">
                        {userData.trainerTier} {t.trainer}
                      </Badge>
                    </div>
                    <Button
                      className="bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 font-medium shadow-md"
                      onClick={() => router.push("/pt")}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {t.contact}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PT Sessions Overview */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{t.personalTraining}</h3>
          <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                    <Dumbbell className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {userData.ptSessions} {t.sessionsLeft}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#D7AD41] hover:text-[#D7AD41]/90 hover:bg-[#D7AD41]/10"
                  onClick={() => router.push("/pt")}
                >
                  {t.viewDetails}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Snapshot */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{t.financeOverview}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card
              className="bg-[#1A1A1A] text-white hover:bg-[#252525] border-none rounded-xl shadow-lg cursor-pointer transition-colors"
              onClick={() => router.push("/invoices")}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                    <Receipt className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <p className="text-sm text-gray-400">{t.unpaidInvoices}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-semibold">1</p>
                    <p className="text-sm text-gray-400">(€{userData.unpaidAmount.toFixed(2)})</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-[#1A1A1A] text-white hover:bg-[#252525] border-none rounded-xl shadow-lg cursor-pointer transition-colors"
              onClick={() => router.push("/invoices")}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <p className="text-sm text-gray-400">{t.paidInvoices}</p>
                  <p className="text-xl font-semibold">{userData.paidCount}</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-[#1A1A1A] text-white hover:bg-[#252525] border-none rounded-xl shadow-lg cursor-pointer transition-colors"
              onClick={() => router.push("/bar")}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                    <Wallet className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <p className="text-sm text-gray-400">{t.barBalance}</p>
                  <p className="text-xl font-semibold">€{userData.barBalance.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Settings & Preferences */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Settings & Preferences</h2>
          <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription className="text-gray-400">Language</CardDescription>
                    <CardTitle className="text-lg">{language === "en" ? "English" : "Dutch"}</CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#D7AD41] text-[#D7AD41] hover:bg-[#D7AD41] hover:text-[#101010]"
                    onClick={() => setLanguage(language === "en" ? "nl" : "en")}
                  >
                    {language === "en" ? "Switch to Dutch" : "Switch to English"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription className="text-gray-400">Dark Mode</CardDescription>
                    <CardTitle className="text-lg">{isDarkMode ? "Enabled" : "Disabled"}</CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#D7AD41] text-[#D7AD41] hover:bg-[#D7AD41] hover:text-[#101010]"
                    onClick={toggleDarkMode}
                  >
                    {isDarkMode ? (
                      <Sun className="h-4 w-4 mr-2" />
                    ) : (
                      <Moon className="h-4 w-4 mr-2" />
                    )}
                    {isDarkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation - iOS style with safe area padding */}
      <nav className="fixed bottom-0 w-full bg-[#1A1A1A] border-t border-[#2A2A2A] pb-8 pt-2 shadow-lg z-20">
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
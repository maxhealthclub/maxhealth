"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'english'
    }
    return 'english'
  })
  const router = useRouter()

  const translations = {
    english: {
      profile: "Profile",
      welcome: "Welcome back",
      membership: "Membership",
      yourTrainer: "Your Trainer",
      trainer: "Trainer",
      contact: "Contact",
      personalTraining: "Personal Training",
      sessionsLeft: "PT sessions left",
      financeOverview: "Finance Overview",
      unpaidInvoices: "Unpaid Invoices",
      paidInvoices: "Paid Invoices",
      barBalance: "Bar Balance",
      settings: "Settings & Preferences",
      invoiceReminders: "Invoice Reminders",
      ptSessionAlerts: "PT Session Alerts",
      language: "Language",
      darkMode: "Dark Mode",
      logOut: "Log Out",
      deleteAccount: "Delete Account",
      viewDetails: "View Details",
      home: "Home",
      invoices: "Invoices",
      bar: "Bar",
      pt: "PT",
    },
    dutch: {
      profile: "Profiel",
      welcome: "Welkom terug",
      membership: "Lidmaatschap",
      yourTrainer: "Jouw Trainer",
      trainer: "Trainer",
      contact: "Contact",
      personalTraining: "Persoonlijke Training",
      sessionsLeft: "PT sessies over",
      financeOverview: "Financieel Overzicht",
      unpaidInvoices: "Openstaande Facturen",
      paidInvoices: "Betaalde Facturen",
      barBalance: "Bar Saldo",
      settings: "Instellingen & Voorkeuren",
      invoiceReminders: "Factuurherinneringen",
      ptSessionAlerts: "PT Sessie Meldingen",
      language: "Taal",
      darkMode: "Donkere Modus",
      logOut: "Uitloggen",
      deleteAccount: "Account Verwijderen",
      viewDetails: "Details Bekijken",
      home: "Home",
      invoices: "Facturen",
      bar: "Bar",
      pt: "PT",
    }
  }

  const t = translations[language as keyof typeof translations]

  // Mock user data
  const userData = {
    name: "Thomas Wind",
    profileImage: "/placeholder.svg?height=80&width=80",
    membershipType: "Stay Fit",
    membershipPrice: 99.5,
    trainer: {
      name: "Jeroen van Rooien",
      tier: "Platinum",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    ptSessions: 2,
    finance: {
      unpaidInvoices: {
        count: 1,
        amount: 99.5,
      },
      paidInvoices: 12,
      barBalance: 12.5,
    },
    settings: {
      invoiceReminders: true,
      ptSessionAlerts: true,
      language: "english",
      darkMode: true,
    },
  }

  const handleNavigation = (path: string, tabId: string) => {
    setActiveTab(tabId)
    router.push(path)
  }

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked)
    // Here you would typically also save this preference to localStorage or a backend
    // localStorage.setItem('darkMode', checked.toString())
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    localStorage.setItem('language', value)
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-[#101010] text-white' : 'bg-white text-[#101010]'}`}>
      {/* Header with safe area padding for notch */}
      <header className={`pt-12 pb-4 px-5 flex items-center justify-between ${isDarkMode ? 'bg-[#101010]' : 'bg-white'} sticky top-0 z-10`}>
        <h1 className="text-xl font-semibold">{t.profile}</h1>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="flex-1 px-5 pb-28 overflow-auto">
        {/* Profile Header */}
        <div className="mb-6">
          <Card className={`${isDarkMode ? 'bg-[#1A1A1A] text-white' : 'bg-gray-50 text-[#101010]'} border-none rounded-xl shadow-lg overflow-hidden`}>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-[#D7AD41]">
                  <AvatarImage src={userData.profileImage || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback className="bg-[#D7AD41] text-[#101010] text-xl font-medium">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-semibold">{userData.name}</h2>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#D7AD41]" onClick={handleEditProfile}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit Profile</span>
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

        {/* Assigned Personal Trainer */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{t.yourTrainer}</h3>
          <Card className={`${isDarkMode ? 'bg-[#1A1A1A] text-white' : 'bg-gray-50 text-[#101010]'} border-none rounded-xl shadow-lg`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-[#D7AD41]">
                  <AvatarImage src={userData.trainer.avatar || "/placeholder.svg"} alt={userData.trainer.name} />
                  <AvatarFallback className="bg-[#D7AD41] text-[#101010] font-medium">
                    {userData.trainer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{userData.trainer.name}</p>
                      <Badge className="mt-1 bg-[#1A1A1A] border border-[#D7AD41] text-[#D7AD41] hover:bg-[#1A1A1A] hover:text-[#D7AD41]">
                        {userData.trainer.tier} {t.trainer}
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
          <Card className={`${isDarkMode ? 'bg-[#1A1A1A] text-white' : 'bg-gray-50 text-[#101010]'} border-none rounded-xl shadow-lg`}>
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
                  className="text-gray-400 hover:text-white"
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
              className={`${isDarkMode ? 'bg-[#1A1A1A] text-white hover:bg-[#252525]' : 'bg-gray-50 text-[#101010] hover:bg-gray-100'} border-none rounded-xl shadow-lg cursor-pointer transition-colors`}
              onClick={() => router.push("/invoices")}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                    <Receipt className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <p className="text-sm text-gray-400">{t.unpaidInvoices}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-semibold">{userData.finance.unpaidInvoices.count}</p>
                    <p className="text-sm text-gray-400">(€{userData.finance.unpaidInvoices.amount.toFixed(2)})</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`${isDarkMode ? 'bg-[#1A1A1A] text-white hover:bg-[#252525]' : 'bg-gray-50 text-[#101010] hover:bg-gray-100'} border-none rounded-xl shadow-lg cursor-pointer transition-colors`}
              onClick={() => router.push("/invoices")}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <p className="text-sm text-gray-400">{t.paidInvoices}</p>
                  <p className="text-xl font-semibold">{userData.finance.paidInvoices}</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`${isDarkMode ? 'bg-[#1A1A1A] text-white hover:bg-[#252525]' : 'bg-gray-50 text-[#101010] hover:bg-gray-100'} border-none rounded-xl shadow-lg cursor-pointer transition-colors`}
              onClick={() => router.push("/bar")}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="bg-[#D7AD41]/20 p-2 rounded-full">
                    <Wallet className="h-5 w-5 text-[#D7AD41]" />
                  </div>
                  <p className="text-sm text-gray-400">{t.barBalance}</p>
                  <p className="text-xl font-semibold">€{userData.finance.barBalance.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Settings & Preferences */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{t.settings}</h3>
          <Card className={`${isDarkMode ? 'bg-[#1A1A1A] text-white' : 'bg-gray-50 text-[#101010]'} border-none rounded-xl shadow-lg`}>
            <CardContent className="p-0">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <p>{t.invoiceReminders}</p>
                </div>
                <Switch checked={userData.settings.invoiceReminders} className="data-[state=checked]:bg-[#D7AD41]" />
              </div>
              <Separator className="bg-[#2A2A2A]" />
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <p>{t.ptSessionAlerts}</p>
                </div>
                <Switch checked={userData.settings.ptSessionAlerts} className="data-[state=checked]:bg-[#D7AD41]" />
              </div>
              <Separator className="bg-[#2A2A2A]" />
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <p>{t.language}</p>
                </div>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-32 bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 font-medium shadow-md border-none">
                    <SelectValue placeholder={t.language} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="dutch">Dutch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-[#2A2A2A]" />
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <p>{t.darkMode}</p>
                </div>
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={handleDarkModeToggle}
                  className="data-[state=checked]:bg-[#D7AD41]" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Actions */}
        <div className="mb-6">
          <Button 
            className="w-full bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 font-medium shadow-md"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t.logOut}
          </Button>
          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-xs ${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-600 hover:text-gray-700'}`}
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              {t.deleteAccount}
            </Button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - iOS style with safe area padding */}
      <nav className={`fixed bottom-0 w-full ${isDarkMode ? 'bg-[#1A1A1A] border-[#2A2A2A]' : 'bg-white border-gray-200'} border-t pb-8 pt-2 shadow-lg z-20`}>
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
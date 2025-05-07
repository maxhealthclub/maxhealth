"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Dumbbell, FileText, Home, User, ChevronDown, ChevronRight, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function PTSessionsPage() {
  const [activeTab, setActiveTab] = useState("pt")
  const [expandedTier, setExpandedTier] = useState<string | null>("platinum") // Default expanded tier
  const router = useRouter()

  // Mock user data
  const userData = {
    remainingSessions: 2,
    trainer: {
      name: "Jeroen van Rooien",
      tier: "Platinum",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Elite trainer with 12+ years of experience specializing in strength training, nutrition, and rehabilitation. Certified in sports medicine and functional movement.",
    },
    tiers: [
      {
        id: "platinum",
        name: "Platinum Personal Training",
        icon: "/icons/platinum.png",
        color: "#E5E4E2",
        packages: [
          { sessions: 1, price: 75.0, bonus: 0 },
          { sessions: 10, price: 690.0, bonus: 0 },
          { sessions: 25, price: 1725.0, bonus: 1 },
          { sessions: 50, price: 3450.0, bonus: 3 },
        ],
        description:
          "Elite trainers focused on holistic health and coaching, including physical, emotional, and lifestyle support. Ideal for advanced goals or medical-related training needs.",
      },
      {
        id: "gold",
        name: "Gold Personal Training",
        icon: "🥇",
        color: "#D7AD41",
        packages: [
          { sessions: 1, price: 65.0, bonus: 0 },
          { sessions: 10, price: 590.0, bonus: 0 },
          { sessions: 25, price: 1475.0, bonus: 1 },
          { sessions: 50, price: 2950.0, bonus: 3 },
        ],
        description:
          "Highly experienced trainers with specializations like strength, nutrition, rehabilitation, yoga, etc. Focused on long-term fitness transformation.",
      },
      {
        id: "silver",
        name: "Silver Personal Training",
        icon: "🥈",
        color: "#C0C0C0",
        packages: [
          { sessions: 1, price: 55.0, bonus: 0 },
          { sessions: 3, price: 140.0, bonus: 0, oneTime: true },
          { sessions: 10, price: 490.0, bonus: 0 },
          { sessions: 25, price: 1225.0, bonus: 1 },
        ],
        description:
          "Certified trainers with strong technical knowledge and experience, ideal for building strength and endurance safely.",
      },
      {
        id: "bronze",
        name: "Bronze Personal Training",
        icon: "🟫",
        color: "#CD7F32",
        packages: [
          { sessions: 1, price: 45.0, bonus: 0 },
          { sessions: 3, price: 112.5, bonus: 0, oneTime: true },
          { sessions: 10, price: 390.0, bonus: 0 },
          { sessions: 25, price: 975.0, bonus: 1 },
        ],
        description:
          "Entry-level but passionate trainers focused on strength and conditioning. Great for beginners starting their fitness journey.",
      },
    ],
  }

  const toggleTier = (tierId: string) => {
    setExpandedTier(expandedTier === tierId ? null : tierId)
  }

  const handleNavigation = (path: string, tabId: string) => {
    setActiveTab(tabId)
    router.push(path)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#101010] text-white">
      {/* Header with safe area padding for notch */}
      <header className="pt-12 pb-4 px-5 flex items-center justify-between bg-[#101010] sticky top-0 z-10">
        <div className="flex items-center">
          <Dumbbell className="h-5 w-5 text-[#D7AD41] mr-2" />
          <h1 className="text-xl font-semibold">PT Sessions</h1>
        </div>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="flex-1 px-5 pb-28 overflow-auto">
        {/* Current Session Overview */}
        <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg mb-6 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-[#D7AD41]/10 px-5 py-4 border-b border-[#D7AD41]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    You currently have <span className="text-[#D7AD41]">{userData.remainingSessions} PT sessions</span>{" "}
                    remaining
                  </h2>
                </div>
                <Badge className="bg-[#1A1A1A] border border-[#D7AD41] text-[#D7AD41] hover:bg-[#1A1A1A] hover:text-[#D7AD41]">
                  {userData.trainer.tier}
                </Badge>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-[#D7AD41]">
                  <AvatarImage src={userData.trainer.avatar || "/placeholder.svg"} alt={userData.trainer.name} />
                  <AvatarFallback className="bg-[#D7AD41] text-[#101010] text-lg font-medium">
                    {userData.trainer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold">{userData.trainer.name}</h3>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">{userData.trainer.bio}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  className="bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 font-medium shadow-md"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Trainer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buy More Sessions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Buy More Sessions</h2>

          <div className="space-y-4">
            {userData.tiers.map((tier) => (
              <Card key={tier.id} className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg overflow-hidden">
                <div
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleTier(tier.id)}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{tier.name}</h3>
                  </div>
                  <div>
                    {expandedTier === tier.id ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedTier === tier.id && (
                  <div className="px-4 pb-4 pt-0">
                    <Separator className="mb-4 bg-[#2A2A2A]" />
                    <p className="text-sm text-gray-400 mb-4">{tier.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tier.packages.map((pkg, index) => (
                        <Card key={index} className="bg-[#252525] border-none text-white rounded-lg overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex flex-col h-full">
                              <div className="mb-2">
                                <h4 className="text-lg font-semibold">
                                  {pkg.sessions} {pkg.sessions === 1 ? "Session" : "Sessions"}
                                </h4>
                                {pkg.oneTime && <span className="text-xs text-[#D7AD41]">(one-time offer)</span>}
                              </div>
                              <div className="flex-1">
                                <p className="text-2xl font-bold mb-1">€{pkg.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-400 mb-3">
                                  {pkg.sessions > 1 && `€${(pkg.price / pkg.sessions).toFixed(2)} per session`}
                                </p>
                                {pkg.bonus > 0 && (
                                  <Badge className="bg-[#D7AD41]/20 text-[#D7AD41] hover:bg-[#D7AD41]/20 mb-3">
                                    +{pkg.bonus} Bonus {pkg.bonus === 1 ? "Session" : "Sessions"}
                                  </Badge>
                                )}
                              </div>
                              <Button className="w-full bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 mt-auto">
                                Buy Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation - iOS style with safe area padding */}
      <nav className="fixed bottom-0 w-full bg-[#1A1A1A] border-t border-[#2A2A2A] pb-8 pt-2 shadow-lg z-20">
        <div className="flex justify-around">
          {[
            { id: "home", icon: Home, label: "Home", path: "/" },
            { id: "invoices", icon: FileText, label: "Invoices", path: "/invoices" },
            { id: "bar", icon: CreditCard, label: "Bar", path: "/bar" },
            { id: "pt", icon: Dumbbell, label: "PT", path: "/pt" },
            { id: "profile", icon: User, label: "Profile", path: "/profile" },
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
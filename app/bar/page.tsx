"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Dumbbell, FileText, Home, Plus, User, Check, Coffee, Utensils, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type BarItem = {
  id: string;
  name: string;
  price: number;
  date: string;
  time: string;
  icon: string;
  paid?: boolean;
};

export default function BarPage() {
  const [activeTab, setActiveTab] = useState("bar")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [totalSelected, setTotalSelected] = useState(0)
  const [barBalance, setBarBalance] = useState(14.25)
  const [unpaidItems, setUnpaidItems] = useState<BarItem[]>([
    { id: "u1", name: "Big Smoothie", price: 7.25, date: "April 12, 2025", time: "14:07", icon: "smoothie" },
    { id: "u2", name: "Cappuccino", price: 3.25, date: "April 12, 2025", time: "10:32", icon: "coffee" },
    { id: "u3", name: "Tosti", price: 5.0, date: "April 11, 2025", time: "12:45", icon: "food" },
  ])
  const [recentActivity, setRecentActivity] = useState<BarItem[]>([
    { id: "r1", name: "Small Shake", price: 3.75, date: "April 10, 2025", time: "15:22", icon: "smoothie" },
    { id: "r2", name: "Espresso", price: 2.85, date: "April 9, 2025", time: "09:15", icon: "coffee" },
    { id: "r3", name: "Superhappie", price: 4.0, date: "April 8, 2025", time: "16:30", icon: "smoothie" },
    { id: "r4", name: "Latte Macchiato", price: 3.75, date: "April 7, 2025", time: "11:05", icon: "coffee" },
    { id: "r5", name: "Big Smoothie", price: 7.25, date: "April 6, 2025", time: "13:45", icon: "smoothie" },
    { id: "r6", name: "Cappuccino Oat Milk", price: 4.25, date: "April 5, 2025", time: "10:20", icon: "coffee" },
  ])
  const [animatingIds, setAnimatingIds] = useState<string[]>([])
  const [showWarning, setShowWarning] = useState(false)
  const router = useRouter()

  // Calculate total of selected items
  useEffect(() => {
    const total = unpaidItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0)
    setTotalSelected(total)
  }, [selectedItems, unpaidItems])

  const handleItemSelect = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedItems.length === unpaidItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(unpaidItems.map((item) => item.id))
    }
  }

  const handleNavigation = (path: string, tabId: string) => {
    setActiveTab(tabId)
    router.push(path)
  }

  const handlePayNow = () => {
    if (totalSelected > barBalance) {
      setShowWarning(true)
      return
    }
    setShowWarning(false)
    // Animate out
    setAnimatingIds(selectedItems)
    setTimeout(() => {
      // Move paid items to recent activity
      const paidItems = unpaidItems.filter((item) => selectedItems.includes(item.id)).map((item) => ({
        ...item,
        id: `paid-${item.id}-${Date.now()}`,
      }))
      setRecentActivity((prev) => [
        ...paidItems.map((item) => ({ ...item, paid: true })),
        ...prev,
      ])
      setUnpaidItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)))
      setBarBalance((prev) => prev - totalSelected)
      setSelectedItems([])
      setAnimatingIds([])
    }, 400) // Animation duration
  }

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "coffee":
        return <Coffee className="h-5 w-5 text-[#D7AD41]" />
      case "food":
        return <Utensils className="h-5 w-5 text-[#D7AD41]" />
      case "smoothie":
      default:
        return (
          <div className="h-5 w-5 rounded-full bg-[#D7AD41]/20 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-[#D7AD41]" />
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#101010] text-white">
      {/* Header with safe area padding for notch */}
      <header className="pt-12 pb-4 px-5 flex items-center justify-between bg-[#101010] sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Bar</h1>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="flex-1 px-5 pb-28 overflow-auto">
        {/* Balance Overview */}
        <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg mb-6">
          <CardContent className="p-5">
            <div className="flex flex-col items-center text-center mb-4">
              <p className="text-gray-400 mb-1">Current Balance</p>
              <h2 className="text-3xl font-bold mb-2">€{barBalance.toFixed(2)}</h2>
              <Button className="bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 rounded-lg font-medium w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Money
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Unpaid Consumptions */}
        {unpaidItems.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Unpaid Items</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-gray-400 hover:text-white"
                onClick={handleSelectAll}
              >
                {selectedItems.length === unpaidItems.length ? "Deselect All" : "Select All"}
              </Button>
            </div>

            <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg overflow-hidden">
              <CardContent className="p-0">
                {unpaidItems.map((item, index) => (
                  <div key={item.id}>
                    {index > 0 && <Separator className="bg-[#2A2A2A]" />}
                    <div className={`p-4 flex items-center transition-opacity duration-400 ${animatingIds.includes(item.id) ? 'opacity-0' : 'opacity-100'}`}>
                      <Checkbox
                        id={item.id}
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleItemSelect(item.id)}
                        className="border-[#D7AD41] data-[state=checked]:bg-[#D7AD41] data-[state=checked]:text-[#101010]"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {getIcon(item.icon)}
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className="font-semibold">€{item.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {item.date} – {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Total and Pay Now */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Selected</p>
                <p className="text-xl font-semibold">€{totalSelected.toFixed(2)}</p>
              </div>
              <Button
                className="bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 rounded-lg font-medium px-6"
                disabled={selectedItems.length === 0 || totalSelected > barBalance || animatingIds.length > 0}
                onClick={handlePayNow}
              >
                Pay Now
              </Button>
            </div>
            {showWarning && (
              <div className="mt-2 text-red-500 text-sm text-right">Insufficient balance to pay selected items.</div>
            )}
          </div>
        )}

        {/* Recent Activity */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <Card key={item.id} className={`bg-[#1A1A1A] border-none text-white rounded-xl shadow-md transition-all duration-400 ${item.paid ? 'animate-fade-in' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {getIcon(item.icon)}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <Badge className="bg-[#1A1A1A] border border-green-500 text-green-500 hover:bg-[#1A1A1A] hover:text-green-500">
                      <Check className="h-3 w-3 mr-1" /> Paid
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {item.date} – {item.time}
                      </span>
                    </div>
                    <span className="font-semibold">€{item.price.toFixed(2)}</span>
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
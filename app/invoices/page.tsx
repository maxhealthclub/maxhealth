"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Download,
  Dumbbell,
  FileText,
  Filter,
  Home,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState("invoices")
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null)
  const router = useRouter()

  // Mock user data
  const userData = {
    firstName: "Thomas",
    profileImage: "/placeholder.svg?height=40&width=40",
    currentPlan: "Stay Fit",
    planPrice: 99.5,
    invoices: [
      {
        id: "INV20250301",
        date: "March 01, 2025",
        plan: "Stay Fit",
        amount: 99.5,
        status: "unpaid",
        dueDate: "March 15, 2025",
        items: [{ description: "Monthly Membership", amount: 99.5 }],
      },
      {
        id: "INV20250201",
        date: "February 01, 2025",
        plan: "Stay Fit",
        amount: 99.5,
        status: "paid",
        paidDate: "February 02, 2025",
        paymentMethod: "Credit Card (**** 4242)",
        items: [{ description: "Monthly Membership", amount: 99.5 }],
      },
      {
        id: "INV20250101",
        date: "January 01, 2025",
        plan: "Flex Membership",
        amount: 130.0,
        status: "paid",
        paidDate: "January 03, 2025",
        paymentMethod: "Credit Card (**** 4242)",
        items: [{ description: "Monthly Membership", amount: 130.0 }],
      },
      {
        id: "INV20241201",
        date: "December 01, 2024",
        plan: "Flex Membership",
        amount: 130.0,
        status: "paid",
        paidDate: "December 05, 2024",
        paymentMethod: "Credit Card (**** 4242)",
        items: [{ description: "Monthly Membership", amount: 130.0 }],
      },
    ],
  }

  const toggleInvoiceExpand = (id: string) => {
    if (expandedInvoice === id) {
      setExpandedInvoice(null)
    } else {
      setExpandedInvoice(id)
    }
  }

  const handleNavigation = (path: string, tabId: string) => {
    setActiveTab(tabId)
    router.push(path)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#101010] text-white">
      {/* Header with safe area padding for notch */}
      <header className="pt-12 pb-4 px-5 flex items-center justify-between bg-[#101010] sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Invoices</h1>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
          <Filter className="h-5 w-5 text-white" />
          <span className="sr-only">Filter</span>
        </Button>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="flex-1 px-5 pb-28 overflow-auto">
        {/* Current Plan */}
        <div className="mb-6">
          <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#D7AD41]/10 px-4 py-2 border-b border-[#D7AD41]/20">
              <p className="text-sm font-medium text-[#D7AD41]">Your Current Plan</p>
            </div>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{userData.currentPlan}</h3>
                <p className="text-sm text-gray-400">Billed monthly</p>
              </div>
              <p className="text-xl font-semibold">
                €{userData.planPrice.toFixed(2)}
                <span className="text-sm text-gray-400">/month</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Filter:</p>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-28 bg-[#1A1A1A] border-[#2A2A2A] text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select defaultValue="recent">
            <SelectTrigger className="h-8 w-32 bg-[#1A1A1A] border-[#2A2A2A] text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Invoices List */}
        <div className="space-y-4 mb-6">
          {userData.invoices.map((invoice) => (
            <Card key={invoice.id} className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-md overflow-hidden">
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleInvoiceExpand(invoice.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{invoice.date}</p>
                    {invoice.status === "paid" ? (
                      <Badge className="bg-[#1A1A1A] border border-green-500 text-green-500 hover:bg-[#1A1A1A] hover:text-green-500">
                        <Check className="h-3 w-3 mr-1" /> Paid
                      </Badge>
                    ) : (
                      <Badge className="bg-[#1A1A1A] border border-[#D7AD41] text-[#D7AD41] hover:bg-[#1A1A1A] hover:text-[#D7AD41]">
                        Unpaid
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                      {invoice.id} • {invoice.plan}
                    </p>
                    <p className="font-semibold">€{invoice.amount.toFixed(2)}</p>
                  </div>
                </div>
                <div className="ml-2">
                  {expandedInvoice === invoice.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Expanded Invoice Details */}
              {expandedInvoice === invoice.id && (
                <div className="px-4 pb-4 pt-0 border-t border-[#2A2A2A]">
                  <div className="py-3">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm text-gray-400">Invoice Details</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-[#D7AD41] hover:text-[#D7AD41] hover:bg-[#D7AD41]/10"
                      >
                        <Download className="h-4 w-4 mr-1" /> PDF
                      </Button>
                    </div>

                    {/* Invoice Line Items */}
                    <div className="space-y-2 mb-3">
                      {invoice.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <p>{item.description}</p>
                          <p>€{item.amount.toFixed(2)}</p>
                        </div>
                      ))}
                      <div className="flex justify-between font-semibold pt-2 border-t border-[#2A2A2A]">
                        <p>Total</p>
                        <p>€{invoice.amount.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Payment Info or Pay Button */}
                    {invoice.status === "paid" ? (
                      <div className="bg-[#1A1A1A] rounded-lg p-3 text-sm">
                        <p className="text-green-500 flex items-center mb-1">
                          <Check className="h-4 w-4 mr-1" /> Paid on {invoice.paidDate}
                        </p>
                        <p className="text-gray-400">{invoice.paymentMethod}</p>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <Button className="w-full bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 h-10">
                          Pay Now
                        </Button>
                        <p className="text-xs text-center text-gray-400 mt-2">Due by {invoice.dueDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
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
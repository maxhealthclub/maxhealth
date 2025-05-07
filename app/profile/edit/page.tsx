"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Camera, Calendar, Mail, HomeIcon, CreditCard } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function EditProfilePage() {
  const router = useRouter()

  // Mock user data - expanded with additional fields
  const [userData, setUserData] = useState({
    profileImage: "/placeholder.svg?height=120&width=120",
    firstName: "Thomas",
    middleName: "",
    lastName: "Wind",
    dateOfBirth: "1990-05-15",
    email: "thomaswind@example.com",
    address: {
      street: "Prinsengracht 263",
      city: "Amsterdam",
      postalCode: "1016 GV",
      country: "Netherlands",
    },
    iban: "NL91ABNA0417164300",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setUserData({
        ...userData,
        [parent]: {
          ...(userData[parent as keyof typeof userData] as Record<string, string>),
          [child]: value,
        },
      })
    } else {
      setUserData({
        ...userData,
        [name]: value,
      })
    }
  }

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    router.push("/profile")
  }

  const handleCancel = () => {
    router.push("/profile")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#101010] text-white">
      {/* Header with safe area padding for notch */}
      <header className="pt-12 pb-4 px-5 flex items-center justify-between bg-[#101010] sticky top-0 z-10">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={handleCancel}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-xl font-semibold">Edit Profile</h1>
        </div>
      </header>

      {/* Main Content - Scrollable area */}
      <main className="flex-1 px-5 pb-28 overflow-auto">
        <Card className="bg-[#1A1A1A] border-none text-white rounded-xl shadow-lg mb-6">
          <CardContent className="p-5">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-[#D7AD41]">
                  <AvatarImage src={userData.profileImage || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="bg-[#D7AD41] text-[#101010] text-xl font-medium">
                    {userData.firstName.charAt(0)}
                    {userData.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#D7AD41] border-none text-[#101010] hover:bg-[#D7AD41]/90 hover:text-[#101010]"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Change profile picture</span>
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-2">Tap to change profile picture</p>
            </div>

            <div className="space-y-4">
              {/* Personal Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleInputChange}
                      className="bg-[#252525] border-[#2A2A2A] focus-visible:ring-[#D7AD41]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name (optional)</Label>
                    <Input
                      id="middleName"
                      name="middleName"
                      value={userData.middleName}
                      onChange={handleInputChange}
                      className="bg-[#252525] border-[#2A2A2A] focus-visible:ring-[#D7AD41]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleInputChange}
                      className="bg-[#252525] border-[#2A2A2A] focus-visible:ring-[#D7AD41]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={userData.dateOfBirth}
                      onChange={handleInputChange}
                      className="bg-[#252525] border-[#2A2A2A] focus-visible:ring-[#D7AD41]"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-[#2A2A2A]" />

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Contact Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1">
                      <Mail className="h-4 w-4" /> Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="bg-[#252525] border-[#2A2A2A] focus-visible:ring-[#D7AD41]"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-[#2A2A2A]" />

              {/* Address */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-1">
                  <HomeIcon className="h-4 w-4" /> Address
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Street & Number</Label>
                    <Input
                      id="street"
                      name="address.street"
                      value={userData.address.street}
                      onChange={handleInputChange}
                      className="bg-[#252525] border-[#2A2A2A] focus-visible:ring-[#D7AD41]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="address.postalCode"
                        value={userData.address.postalCode}
                        onChange={handleInputChange}
                        className="bg-[#252525] border-[#2A2A2A] focus-visible:ring-[#D7AD41]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="address.city"
                        value={userData.address.city}
                        onChange={handleInputChange}
                        className="bg-[#252525] border-[#2A2A2A] focus-visible:ring-[#D7AD41]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="address.country"
                      value={userData.address.country}
                      onChange={handleInputChange}
                      className="bg-[#252525] border-[#2A2A2A] focus-visible:ring-[#D7AD41]"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-[#2A2A2A]" />

              {/* Payment Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-1">
                  <CreditCard className="h-4 w-4" /> Payment Information
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="iban">IBAN Number</Label>
                  <Input
                    id="iban"
                    name="iban"
                    value={userData.iban}
                    onChange={handleInputChange}
                    className="bg-[#252525] border-[#2A2A2A] focus-visible:ring-[#D7AD41]"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-5 pt-0">
            <Button
              className="w-[48%] bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90 font-medium shadow-md"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button className="w-[48%] bg-[#D7AD41] text-[#101010] hover:bg-[#D7AD41]/90" onClick={handleSave}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
} 
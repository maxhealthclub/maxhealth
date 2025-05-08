"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'nl'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translations: Record<Language, Record<string, string>>
}

const translations = {
  en: {
    // Home page
    welcome: "Welcome",
    membership: "Membership",
    yourTrainer: "Your Trainer",
    trainer: "Trainer",
    contact: "Contact",
    personalTraining: "Personal Training",
    sessionsLeft: "sessions left",
    financeOverview: "Finance Overview",
    unpaidInvoices: "Unpaid Invoices",
    paidInvoices: "Paid Invoices",
    barBalance: "Bar Balance",
    settings: "Settings",
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
    profile: "Profile",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    name: "Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    city: "City",
    postalCode: "Postal Code",
    country: "Country",
    membershipType: "Membership Type",
    membershipPrice: "Membership Price",
    trainerName: "Trainer Name",
    trainerTier: "Trainer Tier",
    ptSessions: "PT Sessions",
    unpaidAmount: "Unpaid Amount",
    paidCount: "Paid Count",
    barBalanceAmount: "Bar Balance Amount",
    // PT page
    withTrainer: "with trainer",
    scheduleSession: "Schedule Session",
    ptPackages: "PT Packages",
    sessions: "sessions",
    purchase: "Purchase",
    quickActions: "Quick Actions",
    bookPT: "Book PT Session",
    viewInvoices: "View Invoices",
    recentActivity: "Recent Activity",
    lastPT: "Last PT Session",
    lastBarPurchase: "Last Bar Purchase",
    currentPTStatus: "Current PT Status",
    bookSession: "Book Session",
    contactTrainer: "Contact Trainer",
    basicPackage: "Basic Package",
    standardPackage: "Standard Package",
    premiumPackage: "Premium Package"
  },
  nl: {
    // Home page
    welcome: "Welkom",
    membership: "Lidmaatschap",
    yourTrainer: "Jouw Trainer",
    trainer: "Trainer",
    contact: "Contact",
    personalTraining: "Personal Training",
    sessionsLeft: "sessies over",
    financeOverview: "Financieel Overzicht",
    unpaidInvoices: "Openstaande Facturen",
    paidInvoices: "Betaalde Facturen",
    barBalance: "Bar Saldo",
    settings: "Instellingen",
    invoiceReminders: "Factuur Herinneringen",
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
    profile: "Profiel",
    edit: "Bewerken",
    save: "Opslaan",
    cancel: "Annuleren",
    name: "Naam",
    email: "E-mail",
    phone: "Telefoon",
    address: "Adres",
    city: "Stad",
    postalCode: "Postcode",
    country: "Land",
    membershipType: "Type Lidmaatschap",
    membershipPrice: "Prijs Lidmaatschap",
    trainerName: "Naam Trainer",
    trainerTier: "Niveau Trainer",
    ptSessions: "PT Sessies",
    unpaidAmount: "Openstaand Bedrag",
    paidCount: "Aantal Betaald",
    barBalanceAmount: "Bar Saldo Bedrag",
    // PT page
    withTrainer: "met trainer",
    scheduleSession: "Sessie Inplannen",
    ptPackages: "PT Pakketten",
    sessions: "sessies",
    purchase: "Kopen",
    quickActions: "Snelle Acties",
    bookPT: "PT Sessie Boeken",
    viewInvoices: "Facturen Bekijken",
    recentActivity: "Recente Activiteit",
    lastPT: "Laatste PT Sessie",
    lastBarPurchase: "Laatste Bar Aankoop",
    currentPTStatus: "Huidige PT Status",
    bookSession: "Sessie Boeken",
    contactTrainer: "Trainer Contacten",
    basicPackage: "Basis Pakket",
    standardPackage: "Standaard Pakket",
    premiumPackage: "Premium Pakket"
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language
      return savedLang || 'en'
    }
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'english' | 'dutch'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translations: typeof translations
}

const translations = {
  english: {
    // Home page
    welcome: "Welcome to Max Health Club",
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
  },
  dutch: {
    // Home page
    welcome: "Welkom bij Max Health Club",
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
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'english'
    }
    return 'english'
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
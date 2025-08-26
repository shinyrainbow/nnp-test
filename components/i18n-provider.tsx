"use client"

import { ReactNode, useEffect, useState } from "react"
import i18n from "i18next"
import { I18nextProvider, initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      brand: "Naina Hub",
      nav: { features: "Features", pricing: "Pricing", contact: "Contact", dashboard: "Dashboard" },
      dashboard: {
        listing: "Listing",
        contract: "Contract Builder",
        line: "Line Messaging",
        posts: "Smart Post Creator",
        commission: "Commission Tracker",
        consultation: "Consultation",
        website: "Create Own Website",
      },
      auth: { signIn: "Sign In", signUp: "Sign Up" },
    },
  },
  es: {
    translation: {
      brand: "Naina Hub",
      nav: { features: "Funciones", pricing: "Precios", contact: "Contacto", dashboard: "Panel" },
      dashboard: {
        listing: "Listado",
        contract: "Constructor de Contratos",
        line: "Mensajería",
        posts: "Creador de Publicaciones",
        commission: "Seguimiento de Comisiones",
        consultation: "Consultas",
        website: "Crear Sitio Propio",
      },
      auth: { signIn: "Iniciar sesión", signUp: "Crear cuenta" },
    },
  },
}

let initialized = false

export function I18nProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(initialized)

  useEffect(() => {
    if (!initialized) {
      i18n
        .use(initReactI18next)
        .init({
          resources,
          lng: "en",
          fallbackLng: "en",
          interpolation: { escapeValue: false },
        })
        .then(() => {
          initialized = true
          setReady(true)
        })
    }
  }, [])

  if (!ready) return null
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

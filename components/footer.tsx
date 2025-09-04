'use client'
import Link from 'next/link'
import { Building2 } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

export function Footer() {
  const {t} = useLanguage()
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Naina Hub</span>
            </Link>
            <p className="text-gray-400">
              {t("home.banner")}{t("home.subBanner")}
              {/* Professional tools for real estate agents to work faster and more efficiently. */}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/features" className="hover:text-white">{t("features")}</Link></li>
              <li><Link href="/pricing" className="hover:text-white">{t("pricing")}</Link></li>
              <li><Link href="/contact" className="hover:text-white">{t("contact")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Social Media</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/contact" className="hover:text-white"><FaFacebook /></Link></li>
              <li><Link href="/help" className="hover:text-white"><FaTiktok /></Link></li>
              <li><Link href="/docs" className="hover:text-white"><FaInstagram /></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-white">{t("privacyPolicy")}</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white">{t("termsOfService")}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Naina Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

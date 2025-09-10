'use client'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { Footer } from '@/components/footer'
import { Pricing } from 'aws-sdk'
import PricingPage from './pricing/page'

export default function Home() {

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingPage isHome={true}/>
      </main>
      <Footer />
    </div>
  )
}

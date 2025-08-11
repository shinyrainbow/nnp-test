import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Building2, Users, TrendingUp } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Professional Tools for
          <span className="text-primary block">Real Estate Agents</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Streamline your real estate business with our comprehensive suite of tools. 
          Manage listings, create contracts, and boost your productivity with AI-powered features.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" asChild className="text-lg px-8 py-6">
            <Link href="/dashboard">
              View Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
            <Link href="/features">Learn More</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Property Management</h3>
            <p className="text-gray-600">Manage all your listings and properties in one place</p>
          </div>
          <div className="text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Client Relations</h3>
            <p className="text-gray-600">Keep track of clients and their preferences</p>
          </div>
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
            <p className="text-gray-600">Get insights to grow your business</p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

const featureCategories = [
  {
    title: 'Property Management',
    features: [
      'Listing management with rental status tracking',
      'Property photo gallery with AI enhancement',
      'Automated property valuation',
      'Market comparison analysis'
    ]
  },
  {
    title: 'Contract & Documentation',
    features: [
      'Rental contract builder with templates',
      'Digital signature integration',
      'Document storage and management',
      'Legal compliance checking'
    ]
  },
  {
    title: 'Client Management',
    features: [
      'Client database with preferences',
      'Communication history tracking',
      'Automated follow-up reminders',
      'Lead scoring and qualification'
    ]
  },
  {
    title: 'AI-Powered Tools',
    features: [
      'Property description generator',
      'Market trend analysis',
      'Price prediction algorithms',
      'Chatbot for client inquiries'
    ]
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Features</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Real Estate Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover all the powerful features that make NainaPro the ultimate toolkit for real estate professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featureCategories.map((category, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">{category.title}</CardTitle>
                  <CardDescription>
                    Essential tools for {category.title.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'

// const plans = [
//   {
//     name: 'Starter',
//     price: 'ฟรี',
//     period: '/month',
//     description: 'Perfect for new agents getting started',
//     features: [
//       'Up to 10 property listings',
//       'Basic contract templates',
//       'Client management',
//       'Email support',
//       'Mobile app access'
//     ],
//     popular: false
//   },
//   {
//     name: 'Professional',
//     price: '900.-',
//     period: '/month',
//     description: 'For established agents who need more power',
//     features: [
//       'Unlimited property listings',
//       'Advanced contract builder',
//       'AI-powered tools',
//       'Analytics dashboard',
//       'Priority support',
//       'Custom branding',
//       'API access'
//     ],
//     popular: true
//   },
//   {
//     name: 'Enterprise',
//     price: '3,900.-',
//     period: '/month',
//     description: 'For teams and large real estate companies',
//     features: [
//       'Everything in Professional',
//       'Team collaboration tools',
//       'Advanced analytics',
//       'Custom integrations',
//       'Dedicated account manager',
//       'White-label solution',
//       'SLA guarantee'
//     ],
//     popular: false
//   }
// ]



export default function PricingPage() {
  const {t} = useLanguage()
  const plans = t('plans', { returnObjects:true });
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">{t('pricing')}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {/* Choose Your Plan */}
              {t('pricingTitle')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('pricingDescription')}
              {/* Start with a free trial, then choose the plan that fits your business needs */}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary border-2' : 'border'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">All plans include a 14-day free trial</p>
            <p className="text-sm text-gray-500">No credit card required • Cancel anytime</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

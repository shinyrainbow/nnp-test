import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Calculator, MessageSquare, BarChart3, Calendar, MapPin } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Contract Builder',
    description: 'Create professional rental contracts with customizable templates'
  },
  {
    icon: Calculator,
    title: 'Price Calculator',
    description: 'Calculate property values and rental prices with market data'
  },
  {
    icon: MessageSquare,
    title: 'AI Assistant',
    description: 'Get help with property descriptions and client communications'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track your performance and market trends'
  },
  {
    icon: Calendar,
    title: 'Appointment Scheduler',
    description: 'Manage property viewings and client meetings'
  },
  {
    icon: MapPin,
    title: 'Property Mapping',
    description: 'Visualize properties and market areas on interactive maps'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive toolkit helps real estate agents work more efficiently and close more deals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Building2, Users, Calendar } from 'lucide-react'

const monthlyData = [
  { month: 'Jan', revenue: 45000, listings: 12, clients: 8 },
  { month: 'Feb', revenue: 52000, listings: 15, clients: 12 },
  { month: 'Mar', revenue: 48000, listings: 11, clients: 9 },
  { month: 'Apr', revenue: 61000, listings: 18, clients: 15 },
  { month: 'May', revenue: 55000, listings: 16, clients: 13 },
  { month: 'Jun', revenue: 67000, listings: 20, clients: 18 }
]

const topProperties = [
  { address: '123 Main St', views: 245, inquiries: 18, status: 'Available' },
  { address: '456 Oak Ave', views: 189, inquiries: 12, status: 'Rented' },
  { address: '789 Pine Rd', views: 156, inquiries: 9, status: 'Pending' },
  { address: '321 Elm St', views: 134, inquiries: 7, status: 'Available' },
  { address: '654 Maple Dr', views: 98, inquiries: 5, status: 'Available' }
]

export default function AnalyticsPage() {
  const currentMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]
  
  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1)
  const listingsChange = ((currentMonth.listings - previousMonth.listings) / previousMonth.listings * 100).toFixed(1)
  const clientsChange = ((currentMonth.clients - previousMonth.clients) / previousMonth.clients * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your performance and business insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentMonth.revenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {parseFloat(revenueChange) > 0 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={parseFloat(revenueChange) > 0 ? 'text-green-500' : 'text-red-500'}>
                {revenueChange}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonth.listings}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {parseFloat(listingsChange) > 0 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={parseFloat(listingsChange) > 0 ? 'text-green-500' : 'text-red-500'}>
                {listingsChange}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonth.clients}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {parseFloat(clientsChange) > 0 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={parseFloat(clientsChange) > 0 ? 'text-green-500' : 'text-red-500'}>
                {clientsChange}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{data.month}</div>
                      <div className="flex-1">
                        <Progress 
                          value={(data.revenue / 70000) * 100} 
                          className="h-2"
                        />
                      </div>
                      <div className="w-20 text-sm text-right">
                        ${(data.revenue / 1000).toFixed(0)}k
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
                <CardDescription>Your progress towards monthly goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Revenue Goal</span>
                    <span>${currentMonth.revenue.toLocaleString()} / $75,000</span>
                  </div>
                  <Progress value={(currentMonth.revenue / 75000) * 100} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Listings Goal</span>
                    <span>{currentMonth.listings} / 25</span>
                  </div>
                  <Progress value={(currentMonth.listings / 25) * 100} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>New Clients Goal</span>
                    <span>{currentMonth.clients} / 20</span>
                  </div>
                  <Progress value={(currentMonth.clients / 20) * 100} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Properties</CardTitle>
              <CardDescription>Properties with the most views and inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProperties.map((property, index) => (
                  <div key={property.address} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{property.address}</p>
                        <p className="text-sm text-gray-500">
                          {property.views} views • {property.inquiries} inquiries
                        </p>
                      </div>
                    </div>
                    <Badge variant={property.status === 'Available' ? 'default' : 
                                  property.status === 'Rented' ? 'secondary' : 'outline'}>
                      {property.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rates</CardTitle>
                <CardDescription>How well you convert leads to clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lead to Client</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <Progress value={68} />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Viewing to Contract</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <Progress value={45} />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Inquiry to Viewing</span>
                  <span className="text-sm font-medium">72%</span>
                </div>
                <Progress value={72} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Response Time</CardTitle>
                <CardDescription>How quickly you respond to inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">2.3</div>
                    <div className="text-sm text-gray-500">hours average response</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Email inquiries</span>
                      <span>1.8 hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phone calls</span>
                      <span>0.5 hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Website forms</span>
                      <span>3.2 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

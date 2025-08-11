'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, Home, DollarSign, BarChart3, MapPin, Calendar, AlertTriangle } from 'lucide-react'

const marketData = {
  overview: {
    averagePrice: 485000,
    priceChange: 8.5,
    averageRent: 2850,
    rentChange: 12.3,
    daysOnMarket: 28,
    marketChange: -15.2,
    inventoryLevel: 2.8
  },
  neighborhoods: [
    { name: 'Downtown', avgPrice: 650000, change: 12.5, inventory: 45, hotness: 95 },
    { name: 'Midtown', avgPrice: 520000, change: 8.2, inventory: 67, hotness: 78 },
    { name: 'Suburbs North', avgPrice: 420000, change: 5.1, inventory: 89, hotness: 65 },
    { name: 'Suburbs South', avgPrice: 380000, change: 3.8, inventory: 112, hotness: 52 },
    { name: 'Waterfront', avgPrice: 750000, change: 15.2, inventory: 23, hotness: 88 }
  ],
  trends: [
    { month: 'Jan', sales: 145, avgPrice: 465000, inventory: 320 },
    { month: 'Feb', sales: 167, avgPrice: 472000, inventory: 298 },
    { month: 'Mar', sales: 189, avgPrice: 478000, inventory: 275 },
    { month: 'Apr', sales: 203, avgPrice: 485000, inventory: 252 },
    { month: 'May', sales: 198, avgPrice: 492000, inventory: 234 },
    { month: 'Jun', sales: 221, avgPrice: 498000, inventory: 218 }
  ],
  predictions: [
    { metric: 'Price Growth', current: 8.5, predicted: 6.2, confidence: 78 },
    { metric: 'Sales Volume', current: 221, predicted: 235, confidence: 82 },
    { metric: 'Inventory', current: 218, predicted: 195, confidence: 71 },
    { metric: 'Days on Market', current: 28, predicted: 24, confidence: 85 }
  ]
}

export default function MarketPage() {
  const [selectedArea, setSelectedArea] = useState('all')
  const [timeframe, setTimeframe] = useState('6months')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Market Analysis</h1>
          <p className="text-gray-600">Real estate market insights and trends</p>
        </div>
        <div className="flex space-x-4">
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="midtown">Midtown</SelectItem>
              <SelectItem value="suburbs">Suburbs</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${marketData.overview.averagePrice.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+{marketData.overview.priceChange}%</span>
              <span className="ml-1">vs last year</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${marketData.overview.averageRent.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+{marketData.overview.rentChange}%</span>
              <span className="ml-1">vs last year</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days on Market</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketData.overview.daysOnMarket}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">{marketData.overview.marketChange}%</span>
              <span className="ml-1">faster sales</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Level</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketData.overview.inventoryLevel} months</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <AlertTriangle className="mr-1 h-3 w-3 text-orange-500" />
              <span className="text-orange-500">Low inventory</span>
              <span className="ml-1">seller's market</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="neighborhoods" className="space-y-4">
        <TabsList>
          <TabsTrigger value="neighborhoods">Neighborhoods</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="neighborhoods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Neighborhood Analysis</CardTitle>
              <CardDescription>Compare different areas in your market</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.neighborhoods.map((neighborhood, index) => (
                  <div key={neighborhood.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{neighborhood.name}</h3>
                        <p className="text-sm text-gray-500">{neighborhood.inventory} active listings</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-semibold">${neighborhood.avgPrice.toLocaleString()}</p>
                        <div className="flex items-center text-xs">
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                          <span className="text-green-500">+{neighborhood.change}%</span>
                        </div>
                      </div>
                      <div className="w-24">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Hotness</span>
                          <span>{neighborhood.hotness}%</span>
                        </div>
                        <Progress value={neighborhood.hotness} className="h-2" />
                      </div>
                      <Badge variant={neighborhood.hotness > 80 ? 'default' : neighborhood.hotness > 60 ? 'secondary' : 'outline'}>
                        {neighborhood.hotness > 80 ? 'Hot' : neighborhood.hotness > 60 ? 'Warm' : 'Cool'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Volume Trend</CardTitle>
                <CardDescription>Monthly sales over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.trends.map((data, index) => (
                    <div key={data.month} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{data.month}</div>
                      <div className="flex-1">
                        <Progress value={(data.sales / 250) * 100} className="h-3" />
                      </div>
                      <div className="w-16 text-sm text-right">{data.sales}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Trend</CardTitle>
                <CardDescription>Average price movement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.trends.map((data, index) => (
                    <div key={data.month} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{data.month}</div>
                      <div className="flex-1">
                        <Progress value={(data.avgPrice / 550000) * 100} className="h-3" />
                      </div>
                      <div className="w-20 text-sm text-right">
                        ${(data.avgPrice / 1000).toFixed(0)}k
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Market Predictions</CardTitle>
              <CardDescription>Machine learning predictions for the next quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {marketData.predictions.map((prediction, index) => (
                  <div key={prediction.metric} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{prediction.metric}</h3>
                      <Badge variant="outline">{prediction.confidence}% confidence</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current:</span>
                        <span className="font-medium">
                          {typeof prediction.current === 'number' && prediction.current > 1000 
                            ? prediction.current.toLocaleString() 
                            : prediction.current}
                          {prediction.metric.includes('Growth') ? '%' : ''}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Predicted:</span>
                        <span className="font-medium text-primary">
                          {typeof prediction.predicted === 'number' && prediction.predicted > 1000 
                            ? prediction.predicted.toLocaleString() 
                            : prediction.predicted}
                          {prediction.metric.includes('Growth') ? '%' : ''}
                        </span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

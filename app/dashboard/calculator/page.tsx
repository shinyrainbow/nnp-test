'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calculator, DollarSign, Home, TrendingUp } from 'lucide-react'

export default function CalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  
  const [rentalPrice, setRentalPrice] = useState('')
  const [propertyArea, setPropertyArea] = useState('')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [estimatedRent, setEstimatedRent] = useState(0)

  const calculateMortgage = () => {
    const principal = parseFloat(propertyPrice) - parseFloat(downPayment)
    const monthlyRate = parseFloat(interestRate) / 100 / 12
    const numberOfPayments = parseFloat(loanTerm) * 12
    
    if (principal > 0 && monthlyRate > 0 && numberOfPayments > 0) {
      const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                     (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      setMonthlyPayment(Math.round(payment))
    }
  }

  const calculateRentalPrice = () => {
    const basePrice = parseFloat(propertyArea) * 15 // $15 per sq ft base rate
    let locationMultiplier = 1
    let typeMultiplier = 1
    
    switch (location) {
      case 'downtown': locationMultiplier = 1.5; break
      case 'suburbs': locationMultiplier = 1.2; break
      case 'rural': locationMultiplier = 0.8; break
      default: locationMultiplier = 1
    }
    
    switch (propertyType) {
      case 'luxury': typeMultiplier = 1.8; break
      case 'modern': typeMultiplier = 1.3; break
      case 'standard': typeMultiplier = 1; break
      case 'budget': typeMultiplier = 0.7; break
      default: typeMultiplier = 1
    }
    
    const estimated = basePrice * locationMultiplier * typeMultiplier
    setEstimatedRent(Math.round(estimated))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Price Calculator</h1>
        <p className="text-gray-600">Calculate mortgage payments and rental prices</p>
      </div>

      <Tabs defaultValue="mortgage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mortgage">Mortgage Calculator</TabsTrigger>
          <TabsTrigger value="rental">Rental Price Estimator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mortgage">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Mortgage Calculator
                </CardTitle>
                <CardDescription>
                  Calculate monthly mortgage payments based on loan details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="propertyPrice">Property Price ($)</Label>
                  <Input
                    id="propertyPrice"
                    type="number"
                    placeholder="500000"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="downPayment">Down Payment ($)</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    placeholder="100000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    placeholder="3.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="loanTerm">Loan Term (years)</Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    placeholder="30"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                  />
                </div>
                
                <Button onClick={calculateMortgage} className="w-full">
                  Calculate Payment
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Calculation Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-primary/10 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Monthly Payment</p>
                    <p className="text-3xl font-bold text-primary">
                      ${monthlyPayment.toLocaleString()}
                    </p>
                  </div>
                  
                  {monthlyPayment > 0 && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Principal & Interest:</span>
                        <span>${monthlyPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Property Tax (est.):</span>
                        <span>${Math.round(parseFloat(propertyPrice) * 0.012 / 12).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance (est.):</span>
                        <span>${Math.round(parseFloat(propertyPrice) * 0.003 / 12).toLocaleString()}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-semibold">
                        <span>Total Monthly:</span>
                        <span>${(monthlyPayment + Math.round(parseFloat(propertyPrice) * 0.015 / 12)).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="rental">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="mr-2 h-5 w-5" />
                  Rental Price Estimator
                </CardTitle>
                <CardDescription>
                  Estimate rental prices based on property characteristics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="propertyArea">Property Area (sq ft)</Label>
                  <Input
                    id="propertyArea"
                    type="number"
                    placeholder="1200"
                    value={propertyArea}
                    onChange={(e) => setPropertyArea(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="downtown">Downtown</SelectItem>
                      <SelectItem value="suburbs">Suburbs</SelectItem>
                      <SelectItem value="rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={calculateRentalPrice} className="w-full">
                  Estimate Rental Price
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Price Estimation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-primary/10 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Estimated Monthly Rent</p>
                    <p className="text-3xl font-bold text-primary">
                      ${estimatedRent.toLocaleString()}
                    </p>
                  </div>
                  
                  {estimatedRent > 0 && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base Rate (per sq ft):</span>
                        <span>$15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location Factor:</span>
                        <span>{location === 'downtown' ? '1.5x' : location === 'suburbs' ? '1.2x' : '0.8x'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Property Type Factor:</span>
                        <span>
                          {propertyType === 'luxury' ? '1.8x' : 
                           propertyType === 'modern' ? '1.3x' : 
                           propertyType === 'budget' ? '0.7x' : '1.0x'}
                        </span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-semibold">
                        <span>Price Range:</span>
                        <span>${Math.round(estimatedRent * 0.9).toLocaleString()} - ${Math.round(estimatedRent * 1.1).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

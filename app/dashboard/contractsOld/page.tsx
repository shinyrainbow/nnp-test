'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FileText, Download, Plus } from 'lucide-react'

const contractSchema = z.object({
  propertyAddress: z.string().min(5, 'Property address is required'),
  tenantName: z.string().min(2, 'Tenant name is required'),
  tenantEmail: z.string().email('Valid email is required'),
  monthlyRent: z.string().min(1, 'Monthly rent is required'),
  securityDeposit: z.string().min(1, 'Security deposit is required'),
  leaseStartDate: z.string().min(1, 'Lease start date is required'),
  leaseEndDate: z.string().min(1, 'Lease end date is required'),
  contractType: z.string().min(1, 'Contract type is required'),
  specialTerms: z.string().optional()
})

type ContractFormData = z.infer<typeof contractSchema>

const existingContracts = [
  {
    id: 1,
    property: '123 Main Street',
    tenant: 'John Doe',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rent: '$2,500',
    status: 'Active'
  },
  {
    id: 2,
    property: '456 Oak Avenue',
    tenant: 'Jane Smith',
    startDate: '2024-02-15',
    endDate: '2025-02-14',
    rent: '$3,200',
    status: 'Active'
  }
]

export default function ContractsPage() {
  const [showForm, setShowForm] = useState(false)
  
  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      propertyAddress: '',
      tenantName: '',
      tenantEmail: '',
      monthlyRent: '',
      securityDeposit: '',
      leaseStartDate: '',
      leaseEndDate: '',
      contractType: '',
      specialTerms: ''
    }
  })

  const onSubmit = async (data: ContractFormData) => {
    try {
      // Here you would typically send the data to your API
      alert('Contract created successfully!')
      form.reset()
      setShowForm(false)
    } catch (error) {
      console.error('Error creating contract:', error)
      alert('Error creating contract. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contract Builder</h1>
          <p className="text-gray-600">Create and manage rental contracts</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          New Contract
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Rental Contract</CardTitle>
            <CardDescription>
              Fill in the details to generate a professional rental contract
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="propertyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street, City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contractType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select contract type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="residential">Residential Lease</SelectItem>
                            <SelectItem value="commercial">Commercial Lease</SelectItem>
                            <SelectItem value="short-term">Short-term Rental</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tenantName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tenant Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tenantEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tenant Email *</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="monthlyRent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Rent *</FormLabel>
                        <FormControl>
                          <Input placeholder="2500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="securityDeposit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Security Deposit *</FormLabel>
                        <FormControl>
                          <Input placeholder="2500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="leaseStartDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lease Start Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="leaseEndDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lease End Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="specialTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Terms & Conditions</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional terms or conditions..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex space-x-4">
                  <Button type="submit">Generate Contract</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Existing Contracts</CardTitle>
          <CardDescription>Manage your current rental contracts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {existingContracts.map((contract) => (
              <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{contract.property}</h3>
                    <p className="text-sm text-gray-600">
                      {contract.tenant} • {contract.startDate} to {contract.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">{contract.rent}/month</p>
                    <p className="text-sm text-green-600">{contract.status}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

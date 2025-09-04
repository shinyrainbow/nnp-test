'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { DollarSign, Plus, TrendingUp, Calendar, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/contexts/language-context'

const commissionSchema = z.object({
  propertyAddress: z.string().min(5, 'Property address is required'),
  clientName: z.string().min(2, 'Client name is required'),
  salePrice: z.string().min(1, 'Sale price is required'),
  commissionRate: z.string().min(1, 'Commission rate is required'),
  dealType: z.string().min(1, 'Deal type is required'),
  closingDate: z.string().min(1, 'Closing date is required'),
  notes: z.string().optional()
})

type CommissionFormData = z.infer<typeof commissionSchema>

const commissions = [
  {
    id: 1,
    property: '123 Main Street',
    client: 'John Doe',
    salePrice: 485000,
    commissionRate: 3.0,
    commissionAmount: 14550,
    dealType: 'Sale',
    status: 'Paid',
    closingDate: '2024-01-15',
    paidDate: '2024-01-20'
  },
  {
    id: 2,
    property: '456 Oak Avenue',
    client: 'Jane Smith',
    salePrice: 520000,
    commissionRate: 2.5,
    commissionAmount: 13000,
    dealType: 'Sale',
    status: 'Pending',
    closingDate: '2024-02-01',
    paidDate: null
  },
  {
    id: 3,
    property: '789 Pine Road',
    client: 'Mike Johnson',
    salePrice: 2800,
    commissionRate: 8.0,
    commissionAmount: 2688,
    dealType: 'Rental',
    status: 'Paid',
    closingDate: '2024-01-28',
    paidDate: '2024-02-05'
  }
]

const monthlyStats = [
  { month: 'Jan', earned: 17238, pending: 5200, deals: 3 },
  { month: 'Feb', earned: 13000, pending: 8500, deals: 2 },
  { month: 'Mar', earned: 21500, pending: 12000, deals: 4 },
  { month: 'Apr', earned: 18750, pending: 6800, deals: 3 },
  { month: 'May', earned: 25200, pending: 15500, deals: 5 },
  { month: 'Jun', earned: 19800, pending: 9200, deals: 3 }
]

export default function CommissionPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<CommissionFormData>({
    resolver: zodResolver(commissionSchema),
    defaultValues: {
      propertyAddress: '',
      clientName: '',
      salePrice: '',
      commissionRate: '',
      dealType: '',
      closingDate: '',
      notes: ''
    }
  })

  const totalEarned = commissions.filter(c => c.status === 'Paid').reduce((sum, c) => sum + c.commissionAmount, 0)
  const totalPending = commissions.filter(c => c.status === 'Pending').reduce((sum, c) => sum + c.commissionAmount, 0)
  const currentMonth = monthlyStats[monthlyStats.length - 1]

  const onSubmit = async (data: CommissionFormData) => {
    try {
      toast({
        title: "Commission Added",
        description: "New commission record has been added successfully.",
      })
      form.reset()
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add commission. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'Pending': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'Overdue': return <AlertCircle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  const {t} =useLanguage()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("commissionTracker.title")}</h1>
          <p className="text-gray-600">{t("commissionTracker.description")}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("commissionTracker.addButton")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t("commissionTracker.dialogTitle")}</DialogTitle>
              <DialogDescription>{t("commissionTracker.dialogDescription")}</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="propertyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("commissionTracker.labels.propertyAddress")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("commissionTracker.placeholders.propertyAddress")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("commissionTracker.labels.clientName")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("commissionTracker.placeholders.clientName")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("commissionTracker.labels.salePrice")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("commissionTracker.placeholders.salePrice")} type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="commissionRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("commissionTracker.labels.commissionRate")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("commissionTracker.placeholders.commissionRate")} type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dealType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("commissionTracker.labels.dealType")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("commissionTracker.placeholders.dealType")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sale">{t("commissionTracker.dealTypes.sale")}</SelectItem>
                            <SelectItem value="rental">{t("commissionTracker.dealTypes.rental")}</SelectItem>
                            <SelectItem value="lease">{t("commissionTracker.dealTypes.lease")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="closingDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("commissionTracker.labels.closingDate")}</FormLabel>
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
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("commissionTracker.labels.notes")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("commissionTracker.placeholders.notes")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-2">
                  <Button type="submit">{t("commissionTracker.addButton")}</Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    {t("commissionTracker.cancelButton")}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("commissionTracker.cards.totalEarned")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalEarned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{t("commissionTracker.cards.thisYear")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("commissionTracker.cards.pending")}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{t("commissionTracker.cards.awaitingPayment")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("commissionTracker.cards.thisMonth")}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentMonth.earned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {t("commissionTracker.cards.dealsClosed", { count: currentMonth.deals })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("commissionTracker.cards.averageDeal")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(totalEarned / commissions.length).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{t("commissionTracker.cards.perCommission")}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="commissions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="commissions">{t("commissionTracker.tabs.allCommissions")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("commissionTracker.tabs.analytics")}</TabsTrigger>
        </TabsList>

        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("commissionTracker.commissionRecords.title")}</CardTitle>
              <CardDescription>{t("commissionTracker.commissionRecords.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commissions.map((commission) => (
                  <div
                    key={commission.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{commission.property}</h3>
                        <p className="text-sm text-gray-500">
                          {commission.client} • {commission.dealType} • {commission.closingDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-semibold">
                          ${commission.commissionAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {commission.commissionRate}% of ${commission.salePrice.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(commission.status)}
                        <Badge className={getStatusColor(commission.status)}>{commission.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("commissionTracker.analytics.monthlyEarnings.title")}</CardTitle>
                <CardDescription>{t("commissionTracker.analytics.monthlyEarnings.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyStats.map((stat) => (
                    <div key={stat.month} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{stat.month}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{t("commissionTracker.analytics.earned")}</span>
                          <span>${stat.earned.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(stat.earned / 30000) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-16 text-sm text-right">{t("commissionTracker.analytics.deals", { count: stat.deals })}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("commissionTracker.analytics.breakdown.title")}</CardTitle>
                <CardDescription>{t("commissionTracker.analytics.breakdown.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{t("commissionTracker.analytics.breakdown.propertySales")}</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{t("commissionTracker.analytics.breakdown.rentalAgreements")}</span>
                    <span>20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{t("commissionTracker.analytics.breakdown.commercialLeases")}</span>
                    <span>5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "5%" }}></div>
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

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
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Calendar, Plus, Clock, MapPin, User, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/contexts/language-context'

const appointmentSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  clientName: z.string().min(2, 'Client name is required'),
  clientPhone: z.string().min(10, 'Phone number is required'),
  clientEmail: z.string().email('Valid email is required'),
  propertyAddress: z.string().min(5, 'Property address is required'),
  appointmentType: z.string().min(1, 'Appointment type is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.string().min(1, 'Duration is required'),
  notes: z.string().optional()
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

const appointments = [
  {
    id: 1,
    title: 'Property Viewing - Downtown Condo',
    client: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'sarah@example.com',
    property: '123 Main Street, Apt 5B',
    type: 'Property Viewing',
    date: '2024-02-15',
    time: '10:00',
    duration: '1 hour',
    status: 'Confirmed',
    notes: 'First-time buyer, interested in modern amenities'
  },
  {
    id: 2,
    title: 'Contract Signing - Oak Avenue House',
    client: 'Michael Chen',
    phone: '+1 (555) 987-6543',
    email: 'michael@example.com',
    property: '456 Oak Avenue',
    type: 'Contract Signing',
    date: '2024-02-15',
    time: '14:00',
    duration: '2 hours',
    status: 'Confirmed',
    notes: 'Final walkthrough and contract execution'
  },
  {
    id: 3,
    title: 'Initial Consultation',
    client: 'Emma Davis',
    phone: '+1 (555) 456-7890',
    email: 'emma@example.com',
    property: 'TBD',
    type: 'Consultation',
    date: '2024-02-16',
    time: '09:00',
    duration: '1 hour',
    status: 'Pending',
    notes: 'Looking for family home in suburbs'
  },
  {
    id: 4,
    title: 'Property Inspection - Pine Road',
    client: 'David Wilson',
    phone: '+1 (555) 321-0987',
    email: 'david@example.com',
    property: '789 Pine Road',
    type: 'Inspection',
    date: '2024-02-16',
    time: '11:30',
    duration: '1.5 hours',
    status: 'Confirmed',
    notes: 'Pre-purchase inspection with contractor'
  }
]

const todayAppointments = appointments.filter(apt => apt.date === '2024-02-15')
const upcomingAppointments = appointments.filter(apt => apt.date > '2024-02-15')

export default function CalendarPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('2024-02-15')
  const { toast } = useToast()
  
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      title: '',
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      propertyAddress: '',
      appointmentType: '',
      date: '',
      time: '',
      duration: '',
      notes: ''
    }
  })

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      console.log('Appointment data:', data)
      toast({
        title: "Appointment Scheduled",
        description: "New appointment has been added to your calendar.",
      })
      form.reset()
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Property Viewing': return <MapPin className="h-4 w-4" />
      case 'Contract Signing': return <Clock className="h-4 w-4" />
      case 'Consultation': return <User className="h-4 w-4" />
      case 'Inspection': return <Calendar className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  const {t} = useLanguage()
  return (
    <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("calendar.title")}</h1>
        <p className="text-gray-600">{t("calendar.description")}</p>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("calendar.addButton")}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("calendar.dialogTitle")}</DialogTitle>
            <DialogDescription>{t("calendar.dialogDescription")}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("calendar.form.title.label")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("calendar.form.title.placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("calendar.form.clientName.label")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("calendar.form.clientName.placeholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("calendar.form.clientPhone.label")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("calendar.form.clientPhone.placeholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("calendar.form.clientEmail.label")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("calendar.form.clientEmail.placeholder")}
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="appointmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("calendar.form.appointmentType.label")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("calendar.form.appointmentType.placeholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="viewing">{t("calendar.form.appointmentType.viewing")}</SelectItem>
                          <SelectItem value="consultation">{t("calendar.form.appointmentType.consultation")}</SelectItem>
                          <SelectItem value="signing">{t("calendar.form.appointmentType.signing")}</SelectItem>
                          <SelectItem value="inspection">{t("calendar.form.appointmentType.inspection")}</SelectItem>
                          <SelectItem value="meeting">{t("calendar.form.appointmentType.meeting")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
              <FormField
                control={form.control}
                name="propertyAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("calendar.form.propertyAddress.label")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("calendar.form.propertyAddress.placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("calendar.form.date.label")}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("calendar.form.time.label")}</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("calendar.form.duration.label")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("calendar.form.duration.placeholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="30min">{t("calendar.form.duration.30min")}</SelectItem>
                          <SelectItem value="1hour">{t("calendar.form.duration.1hour")}</SelectItem>
                          <SelectItem value="1.5hour">{t("calendar.form.duration.1.5hour")}</SelectItem>
                          <SelectItem value="2hour">{t("calendar.form.duration.2hour")}</SelectItem>
                          <SelectItem value="3hour">{t("calendar.form.duration.3hour")}</SelectItem>
                        </SelectContent>
                      </Select>
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
                    <FormLabel>{t("calendar.form.notes.label")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("calendar.form.notes.placeholder")}
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <div className="flex space-x-2">
                <Button type="submit">{t("calendar.form.submit")}</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t("calendar.form.cancel")}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Today's Schedule */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("calendar.todaysSchedule.title")}</CardTitle>
              <CardDescription>{t("calendar.todaysSchedule.description")}</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  {getTypeIcon(appointment.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{appointment.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {appointment.time} &bull; {appointment.duration}
                      </p>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <User className="h-3 w-3" />
                          <span>{appointment.client}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>{appointment.property}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  {appointment.notes && (
                    <p className="text-xs text-gray-500 mt-2 italic">{appointment.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
  
      {/* Quick Stats & Upcoming */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("calendar.quickStats.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">{t("calendar.quickStats.todaysAppointments")}</span>
              <span className="font-semibold">{todayAppointments.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{t("calendar.quickStats.thisWeek")}</span>
              <span className="font-semibold">{appointments.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{t("calendar.quickStats.confirmed")}</span>
              <span className="font-semibold text-green-600">
                {appointments.filter(a => a.status === 'Confirmed').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">{t("calendar.quickStats.pending")}</span>
              <span className="font-semibold text-yellow-600">
                {appointments.filter(a => a.status === 'Pending').length}
              </span>
            </div>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle>{t("calendar.upcoming.title")}</CardTitle>
            <CardDescription>{t("calendar.upcoming.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-3 p-2 border rounded">
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    {getTypeIcon(appointment.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{appointment.client}</p>
                    <p className="text-xs text-gray-500">{appointment.date} {t("at")} {appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  
    <Tabs defaultValue="list" className="space-y-4">
      <TabsList>
        <TabsTrigger value="list">{t("calendar.tabs.allAppointments")}</TabsTrigger>
        <TabsTrigger value="calendar">{t("calendar.tabs.calendarView")}</TabsTrigger>
      </TabsList>
  
      <TabsContent value="list" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("calendar.allAppointments.title")}</CardTitle>
            <CardDescription>{t("calendar.allAppointments.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getTypeIcon(appointment.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{appointment.title}</h3>
                      <p className="text-sm text-gray-500">
                        {appointment.client} &bull; {appointment.date} {t("at")} {appointment.time}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{appointment.phone}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{appointment.email}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{appointment.duration}</p>
                      <p className="text-xs text-gray-500">{appointment.type}</p>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
  
      <TabsContent value="calendar" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("calendar.calendarView.title")}</CardTitle>
            <CardDescription>{t("calendar.calendarView.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <p>{t("calendar.calendarView.emptyMessage1")}</p>
              <p className="text-sm">{t("calendar.calendarView.emptyMessage2")}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
  
  )
}

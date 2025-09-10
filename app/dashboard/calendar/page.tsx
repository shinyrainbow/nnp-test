"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Calendar,
  Plus,
  MapPin,
  Pen,
  Trash2,
  HandCoins,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";


export function buildAppointmentDate(appt) {
  const datePart = new Date(appt.date); // base date
  const [hours, minutes] = appt.time.split(":").map(Number);

  const appointmentDate = new Date(datePart);
  appointmentDate.setHours(hours, minutes, 0, 0);

  return appointmentDate;
}

export function getUpcomingAppointments(data) {
  const now = new Date();
  return data
    .filter((appt) => buildAppointmentDate(appt) > now)
    .sort(
      (a, b) =>
        buildAppointmentDate(a).getTime() - buildAppointmentDate(b).getTime()
    ); // soonest first
}


export const getTypeColor = (type: string) => {
  switch (type) {
    case "viewing":
      return "bg-green-100 text-green-800";
    case "signing":
      return "bg-yellow-100 text-yellow-800";
    case "inspection":
      return "bg-orange-100 text-orange-800";
    case "transfer":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getTypeIcon = (type: string) => {
  switch (type) {
    case "viewing":
      return <MapPin className="h-4 w-4" />;
    case "signing":
      return <Pen className="h-4 w-4" />;
    case "inspection":
      return <Calendar className="h-4 w-4" />;
    case "transfer":
      return <HandCoins className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};


const appointmentSchema = z.object({
  clientName: z.string().min(2, "Client name is required"),
  clientContact: z.string().optional(),
  appointmentType: z.string().min(1, "Appointment type is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export const formatted = (isoDate) => {
  return new Date(isoDate).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short", // "ม.ค."
    year: "numeric", // Buddhist year (พ.ศ.)
  });
};
export default function CalendarPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([]);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      appointmentType: "",
      clientName: "",
      clientContact: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoadingUser(true);
      setErrorUser(null);
      const res = await fetch("/api/me");

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      const userData = await res.json();

      setUser(userData.data);
    } catch (err: any) {
      setErrorUser(err.message || "Something went wrong");
    } finally {
      setLoadingUser(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();

      setAppointments(data);
      toast({
        title: "Appointment Scheduled",
        description: "Get appointments.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get schedule appointment. Please try again.",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    fetchAppointments();
    fetchUser()
  }, []);


  const onSubmit = async (data: AppointmentFormData) => {
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentType: data.appointmentType,
          clientName: data.clientName,
          clientContact: data.clientContact,
          date: data.date,
          time: data.time,
          notes: data.notes,
        }),
      });

      toast({
        title: "Appointment Scheduled",
        description: "New appointment has been added to your calendar.",
      });
      form.reset();
      setIsDialogOpen(false);
      await fetchAppointments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  function getPreviousAppointments(data: typeof appointments) {
    const now = new Date();
    return data
      .filter((appt) => buildAppointmentDate(appt) <= now)
      .sort(
        (a, b) =>
          buildAppointmentDate(b).getTime() - buildAppointmentDate(a).getTime()
      ); // latest first
  }

  const upcoming = getUpcomingAppointments(appointments);
  const previous = getPreviousAppointments(appointments);
  const removeAppointment = async (idToDelete: string) => {
    try {
      await fetch(`/api/appointments/${idToDelete}`, {
        method: "DELETE",
      });

      toast({
        title: "Remove Appointment",
        description: "Remove appointments.",
      });
      fetchAppointments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get schedule appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const { t } = useLanguage();

  const getAppointmentType = (type: string) => {
    switch (type) {
      case "viewing":
        return t("calendar.form.appointmentType.viewing");
      case "signing":
        return t("calendar.form.appointmentType.signing");
      case "inspection":
        return t("calendar.form.appointmentType.inspection");
      case "transfer":
        return t("calendar.form.appointmentType.transfer");
      case "others":
        return t("calendar.form.appointmentType.others");
    }
  };

  if(!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600">{t("loadingAppointments")}</p>
      </div>
    </div>
    )
  }
  if(!appointments) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600">{t("loadingAppointments")}</p>
      </div>
    </div>
    )
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("calendar.title")}
          </h1>
          <p className="text-gray-600">{t("calendar.description")}</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!user.isPaid}>
              <Plus className="mr-2 h-4 w-4" />
              {t("calendar.addButton")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t("calendar.dialogTitle")}</DialogTitle>
              <DialogDescription>
                {t("calendar.dialogDescription")}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="appointmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("calendar.form.appointmentType.label")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t(
                                "calendar.form.appointmentType.placeholder"
                              )}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="viewing">
                            {t("calendar.form.appointmentType.viewing")}
                          </SelectItem>
                          <SelectItem value="signing">
                            {t("calendar.form.appointmentType.signing")}
                          </SelectItem>
                          <SelectItem value="inspection">
                            {t("calendar.form.appointmentType.inspection")}
                          </SelectItem>
                          <SelectItem value="transfer">
                            {t("calendar.form.appointmentType.transfer")}
                          </SelectItem>
                          <SelectItem value="others">
                            {t("calendar.form.appointmentType.others")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
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
                        <FormLabel>
                          {t("calendar.form.clientName.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "calendar.form.clientName.placeholder"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("calendar.form.clientContact.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "calendar.form.clientContact.placeholder"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                {/* <FormField
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
                /> */}

                <div className="flex space-x-2">
                  <Button type="submit">{t("calendar.form.submit")}</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    {t("calendar.form.cancel")}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> */}
      {/* Today's Schedule */}
      {/* <Card className="lg:col-span-2">
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
      </Card> */}

      {/* Quick Stats & Upcoming */}
      {/* <div className="space-y-6">
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
      </div> */}
      {/* </div> */}

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">
            {t("calendar.tabs.allAppointments")}
          </TabsTrigger>
          <TabsTrigger value="calendar">
            {t("calendar.tabs.calendarView")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("calendar.allAppointments.title")}</CardTitle>
              <CardDescription>
                {t("calendar.allAppointments.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcoming.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getTypeIcon(appointment.appointmentType)}
                      </div>
                      <div>
                        {/* <h3 className="font-semibold">{appointment.title}</h3> */}
                        <p className="text-sm text-gray-500">
                          {appointment.clientName} &bull;{" "}
                          {formatted(appointment.date)} {t("calendar.at")}{" "}
                          {appointment.time}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span className="flex items-center space-x-1">
                            <span>{appointment.clientContact}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge
                        className={getTypeColor(appointment.appointmentType)}
                      >
                        {getAppointmentType(appointment.appointmentType)}
                      </Badge>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="h-3 w-3 p-3"
                        onClick={() => removeAppointment(appointment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
              <CardDescription>
                {t("calendar.calendarView.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previous.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getTypeIcon(appointment.appointmentType)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {appointment.clientName} &bull;{" "}
                          {formatted(appointment.date)} {t("calendar.at")}{" "}
                          {appointment.time}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span className="flex items-center space-x-1">
                            <span>{appointment.clientContact}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge
                        className={getTypeColor(appointment.appointmentType)}
                      >
                        {getAppointmentType(appointment.appointmentType)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

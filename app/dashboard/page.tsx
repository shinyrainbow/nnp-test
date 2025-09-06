"use client";

import { Calendar, FileText, Loader2, MapPin, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

import { TrendingUp } from "lucide-react";
import {
  formatted,
  getAppointmentType,
  getTypeIcon,
  getUpcomingAppointments,
} from "./calendar/page";

const stats = [
  {
    title: "stats.commission",
    type: "totalDeals",
    value: "34",
    change: "+12%",
    icon: Calendar,
    added: "+12,000",
  },
  {
    title: "stats.totalRent",
    type: "totalRentalDeals",
    value: "21",
    change: "+8%",
    icon: FileText,
    added: "2",
  },
  {
    title: "stats.totalSell",
    type: "totalSaleDeals",
    value: "4",
    change: "-3%",
    icon: Users,
    added: "-5",
  },
  {
    title: "stats.totalVisit",
    type: "totalVisit",
    value: "120",
    change: "+5%",
    icon: Calendar,
    added: "20",
  },
];

function capitalizeFirst(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const marketData = {
  overview: {
    averagePrice: 485000,
    priceChange: 8.5,
    averageRent: 2850,
    rentChange: 12.3,
    daysOnMarket: 28,
    marketChange: -15.2,
    inventoryLevel: 2.8,
  },
  neighborhoods: [
    {
      name: "Downtown",
      avgPrice: 650000,
      change: 12.5,
      inventory: 45,
      hotness: 95,
    },
    {
      name: "Midtown",
      avgPrice: 520000,
      change: 8.2,
      inventory: 67,
      hotness: 78,
    },
    {
      name: "Suburbs North",
      avgPrice: 420000,
      change: 5.1,
      inventory: 89,
      hotness: 65,
    },
    {
      name: "Suburbs South",
      avgPrice: 380000,
      change: 3.8,
      inventory: 112,
      hotness: 52,
    },
    {
      name: "Waterfront",
      avgPrice: 750000,
      change: 15.2,
      inventory: 23,
      hotness: 88,
    },
  ],
  trends: [
    { month: "Jan", sales: 145, avgPrice: 465000, inventory: 320 },
    { month: "Feb", sales: 167, avgPrice: 472000, inventory: 298 },
    { month: "Mar", sales: 189, avgPrice: 478000, inventory: 275 },
    { month: "Apr", sales: 203, avgPrice: 485000, inventory: 252 },
    { month: "May", sales: 198, avgPrice: 492000, inventory: 234 },
    { month: "Jun", sales: 221, avgPrice: 498000, inventory: 218 },
  ],
  predictions: [
    { metric: "Price Growth", current: 8.5, predicted: 6.2, confidence: 78 },
    { metric: "Sales Volume", current: 221, predicted: 235, confidence: 82 },
    { metric: "Inventory", current: 218, predicted: 195, confidence: 71 },
    { metric: "Days on Market", current: 28, predicted: 24, confidence: 85 },
  ],
};

export default function Dashboard() {
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/me");
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      setUser(res);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const upcoming = getUpcomingAppointments(appointments);
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

  const [rentalContracts, setRentalContracts] = useState(0);
  const fetchRentalContract = async () => {
    try {
      const res = await fetch("/api/save-rental-contract");
      const data = await res.json();

      if (data.contracts) {
        setRentalContracts(data.contracts.length);
      }
    } catch (error) {}
  };

  const [saleContracts, setSaleContracts] = useState(0);
  const fetchSaleContract = async () => {
    try {
      const res = await fetch("/api/save-purchase-and-sale-contract");
      const data = await res.json();

      if (data.contracts) {
        setSaleContracts(data.contracts.length);
      }
    } catch (error) {}
  };

  const getStatValue = (type) => {
    switch (type) {
      case "totalDeals":
        return 45 
        // || saleContracts + rentalContracts ;
      case "totalRentalDeals":
        return 16
        //  rentalContracts;
      case "totalSaleDeals":
        return 29
        // saleContracts;
      case "totalVisit":
        return 120
        //  appointments.length;
    }
  };

  useEffect(() => {
    fetchUser();
    fetchRentalContract();
    fetchSaleContract();
    fetchAppointments();
  }, []);

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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t("dashboard.title")}
        </h1>
        <p className="text-gray-600">{t("dashboard.welcome")}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {t(stat.title)}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getStatValue(stat.type)}
              </div>
              {/* <p className="text-xs text-green-600">
                {stat.added} {t("stats.changeFromLastMonth")}
              </p> */}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
            <CardDescription>{t("dashboard.latestUpdates")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {t("activity.newListing")}
                  </p>
                  {/* <p className="text-xs text-gray-500">
                    {t("activity.hoursAgo", { count: 2 })} ddd
                  </p> */}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {t("activity.contractSigned")}
                  </p>
                  {/* <p className="text-xs text-gray-500">
                    {t("activity.hoursAgo", { count: 5 })}
                  </p> */}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {t("activity.viewingScheduled")}
                  </p>
                  {/* <p className="text-xs text-gray-500">
                    {t("activity.dayAgo", { count: 1 })}
                  </p> */}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.upcomingTasks")}</CardTitle>
            <CardDescription>{t("dashboard.tasksToDo")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[140px] overflow-y-auto">
              {upcoming.map((task, i) => (
                <div key={i} className="flex items-center space-x-4">
                  {getTypeIcon(task.appointmentType)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {capitalizeFirst(
                        t(getAppointmentType(task.appointmentType))
                      )}{" "}
                      - {formatted(task.date)} - {task.time}
                    </p>
                    <p className="text-xs text-gray-500">{task.clientName}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Location Analysis</CardTitle>
          <CardDescription>
            Compare different areas in your market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketData.neighborhoods.map((neighborhood, index) => (
              <div
                key={neighborhood.name}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{neighborhood.name}</h3>
                    <p className="text-sm text-gray-500">
                      {neighborhood.inventory} active listings
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-semibold">
                      ${neighborhood.avgPrice.toLocaleString()}
                    </p>
                    <div className="flex items-center text-xs">
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500">
                        +{neighborhood.change}%
                      </span>
                    </div>
                  </div>
                  <div className="w-24">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Hotness</span>
                      <span>{neighborhood.hotness}%</span>
                    </div>
                    <Progress value={neighborhood.hotness} className="h-2" />
                  </div>
                  <Badge
                    variant={
                      neighborhood.hotness > 80
                        ? "default"
                        : neighborhood.hotness > 60
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {neighborhood.hotness > 80
                      ? "Hot"
                      : neighborhood.hotness > 60
                      ? "Warm"
                      : "Cool"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* <Tabs defaultValue="location" className="space-y-4">
        <TabsList>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Location Analysis</CardTitle>
              <CardDescription>
                Compare different areas in your market
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.neighborhoods.map((neighborhood, index) => (
                  <div
                    key={neighborhood.name}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{neighborhood.name}</h3>
                        <p className="text-sm text-gray-500">
                          {neighborhood.inventory} active listings
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-semibold">
                          ${neighborhood.avgPrice.toLocaleString()}
                        </p>
                        <div className="flex items-center text-xs">
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                          <span className="text-green-500">
                            +{neighborhood.change}%
                          </span>
                        </div>
                      </div>
                      <div className="w-24">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Hotness</span>
                          <span>{neighborhood.hotness}%</span>
                        </div>
                        <Progress
                          value={neighborhood.hotness}
                          className="h-2"
                        />
                      </div>
                      <Badge
                        variant={
                          neighborhood.hotness > 80
                            ? "default"
                            : neighborhood.hotness > 60
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {neighborhood.hotness > 80
                          ? "Hot"
                          : neighborhood.hotness > 60
                          ? "Warm"
                          : "Cool"}
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
                <CardDescription>
                  Monthly sales over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.trends.map((data, index) => (
                    <div
                      key={data.month}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-12 text-sm font-medium">
                        {data.month}
                      </div>
                      <div className="flex-1">
                        <Progress
                          value={(data.sales / 250) * 100}
                          className="h-3"
                        />
                      </div>
                      <div className="w-16 text-sm text-right">
                        {data.sales}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Trend</CardTitle>
                <CardDescription>
                  Average price movement over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.trends.map((data, index) => (
                    <div
                      key={data.month}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-12 text-sm font-medium">
                        {data.month}
                      </div>
                      <div className="flex-1">
                        <Progress
                          value={(data.avgPrice / 550000) * 100}
                          className="h-3"
                        />
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
              <CardDescription>
                Machine learning predictions for the next quarter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {marketData.predictions.map((prediction, index) => (
                  <div
                    key={prediction.metric}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{prediction.metric}</h3>
                      <Badge variant="outline">
                        {prediction.confidence}% confidence
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current:</span>
                        <span className="font-medium">
                          {typeof prediction.current === "number" &&
                          prediction.current > 1000
                            ? prediction.current.toLocaleString()
                            : prediction.current}
                          {prediction.metric.includes("Growth") ? "%" : ""}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Predicted:</span>
                        <span className="font-medium text-primary">
                          {typeof prediction.predicted === "number" &&
                          prediction.predicted > 1000
                            ? prediction.predicted.toLocaleString()
                            : prediction.predicted}
                          {prediction.metric.includes("Growth") ? "%" : ""}
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
      </Tabs> */}
    </div>
  );
}

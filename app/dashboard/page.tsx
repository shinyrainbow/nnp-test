"use client";

// import { useTranslation } from "react-i18next";
import { Calendar, FileText, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { useEffect, useState } from "react";

const stats = [
  { title: "stats.sales", value: "34.5K", change: "+12%", icon: Calendar },
  { title: "stats.visitors", value: "12.3K", change: "+8%", icon: FileText },
  { title: "stats.orders", value: "1.2K", change: "-3%", icon: Users },
  { title: "stats.revenue", value: "$24.5K", change: "+5%", icon: Calendar },
];

export default function Dashboard() {
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("dashboard.title")}</h1>
        <p className="text-gray-600">{t("dashboard.welcome")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{t(stat.title)}</CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600">
                {t("stats.changeFromLastMonth", { change: stat.change })}
              </p>
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
                  <p className="text-sm font-medium">{t("activity.newListing")}</p>
                  <p className="text-xs text-gray-500">{t("activity.hoursAgo", { count: 2 })}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t("activity.contractSigned")}</p>
                  <p className="text-xs text-gray-500">{t("activity.hoursAgo", { count: 5 })}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t("activity.viewingScheduled")}</p>
                  <p className="text-xs text-gray-500">{t("activity.dayAgo", { count: 1 })}</p>
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
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Calendar className="h-4 w-4 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{t("tasks.viewing")}</p>
                  <p className="text-xs text-gray-500">{t("tasks.today")}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FileText className="h-4 w-4 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{t("tasks.reviewContract")}</p>
                  <p className="text-xs text-gray-500">{t("tasks.tomorrow")}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Users className="h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{t("tasks.followUp")}</p>
                  <p className="text-xs text-gray-500">{t("tasks.friday")}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

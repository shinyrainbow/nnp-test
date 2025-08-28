import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import {
  FileText,
  Calculator,
  MessageSquare,
  BarChart3,
  Calendar,
  MapPin,
  Newspaper,
  TableProperties,
  FileUser,
  MessageSquareText,
  ChartNoAxesCombined,
  Calendar1,
} from "lucide-react";

const features = [
  {
    icon: TableProperties,
    title: "listings",
    description: "listingsDesc",
  },
  {
    icon: MessageSquare,
    title: "lineChatBot",
    description: "lineChatBotDesc",
  },
  {
    icon: MessageSquareText,
    title: "postBuilder",
    description: "postBuilderDesc",
  },
  {
    icon: Newspaper,
    title: "contractBuilder",
    description: "contractBuilderDesc",
  },
  {
    icon: ChartNoAxesCombined,
    title: "propertyAnalytics",
    description: "propertyAnalyticsDesc",
  },
  // {
  //   icon: Calendar,
  //   title: "contractBuilder",
  //   description: "contractBuilderDesc",
  // },
  // {
  //   icon: MapPin,
  //   title: "contractBuilder",
  //   description: "contractBuilderDesc",
  // },
];

export function FeaturesSection() {
  const { t } = useLanguage();
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("home.adTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("home.adDescription")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary/50 transition-colors"
            >
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">
                {t(`${feature.title}`)}
                  </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {t(`${feature.description}`)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

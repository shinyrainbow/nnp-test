"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const featureCategories = [
  {
    title: "features.category.property",
    description: "features.categoryDesc.property",
    features: [
      "features.property.1",
      "features.property.2",
      "features.property.3",
      "features.property.4",
    ],
  },
  {
    title: "features.category.contract",
    description: "features.categoryDesc.contract",
    features: [
      "features.contract.1",
      "features.contract.2",
      "features.contract.3",
      "features.contract.4",
    ],
  },
  {
    title: "features.category.client",
    description: "features.categoryDesc.client",
    features: [
      "features.client.1",
      "features.client.2",
      "features.client.3",
      "features.client.4",
    ],
  },
  {
    title: "features.category.ai",
    description: "features.categoryDesc.ai",
    features: [
      "features.ai.1",
      "features.ai.2",
      "features.ai.3",
      "features.ai.4",
    ],
  },
  {
    title: "features.category.client",
    description: "features.categoryDesc.client",
    features: [
      "features.client.1",
      "features.client.2",
      "features.client.3",
      "features.client.4",
    ],
  },
  {
    title: "features.category.ai",
    description: "features.categoryDesc.ai",
    features: [
      "features.ai.1",
      "features.ai.2",
      "features.ai.3",
      "features.ai.4",
    ],
  },
];

export default function FeaturesPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">{t("features.badge")}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("features.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featureCategories.map((category, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    {t(`${category.title}`)}
                  </CardTitle>
                  <CardDescription>
                    {t(`${category.description}`)}
                  </CardDescription>
                  {/* <CardTitle className="text-2xl text-primary">{category.title}</CardTitle>
                  <CardDescription>
                    Essential tools for {category.title.toLowerCase()}
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{t(`${feature}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

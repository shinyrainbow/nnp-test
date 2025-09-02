"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Facebook, Check, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { Language } from "@/lib/i18n";
import { defaultFields } from "@/app/dashboard/post-builder/page";
import { Property } from "@/app/dashboard/listings/page";

interface CopyButtonsProps {
  property: Property;
  locale: Language;
  size?: "sm" | "default";
  variant?: "default" | "outline";
  template: string;
}

export function CopyButtons({
  property,
  size = "sm",
  variant = "outline",
  template,
}: CopyButtonsProps) {
  const { t, language } = useLanguage();
  const [copiedStates, setCopiedStates] = useState({
    phone: false,
    line: false,
    facebook: false,
    post: false,
  });


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === "th" ? "th-TH" : "en-US").format(
      price
    );
  };

  const getLocalizedPropertyType = (type: string) => {
    const typeMap: Record<string, string> = {
      Condo: t("condo"),
      Apartment: t("apartment"),
      Townhouse: t("townhouse"),
      House: t("house"),
    };
    return typeMap[type] || type;
  };

  const getLocalizedStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      available: t("available"),
      rented: t("rented"),
      sold: t("sold"),
    };
    return statusMap[status] || status;
  };

  const copyToClipboard = async (
    text: string,
    type: keyof typeof copiedStates
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [type]: true }));

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCopyPhone = () => {
    copyToClipboard(property.phone, "phone");
  };

  const handleCopyLineId = () => {
    copyToClipboard(property.lineId, "line");
  };

  const handleCopyFacebookUrl = () => {
    copyToClipboard(property.fbUser, "facebook");
  };

  const generatePost = () => {
    if (!template) return "";

    let post = template;

    const formatProperty = {
      ...Object.assign({}, property),
      ...Object.assign({}, property.project),
    };

    defaultFields.forEach((field) => {
      const value = formatProperty[field.id] || "";

      const emoji = field.emoji || "";

      post = post.replace(new RegExp(`{${field.id}}`, "g"), value);
      post = post.replace(new RegExp(`{emoji:${field.id}}`, "g"), emoji);
    });

    return post;
  };

  const handleCopyToPost = () => {
    const postText = generatePost();
    copyToClipboard(postText, "post");
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <Button
        variant={variant}
        size={size}
        className="bg-transparent"
        onClick={handleCopyPhone}
      >
        {copiedStates.phone ? (
          <Check className="w-4 h-4 mr-1" />
        ) : (
          <Phone className="w-4 h-4 mr-1" />
        )}
      </Button>

      <Button
        variant={variant}
        size={size}
        className="bg-transparent"
        onClick={handleCopyLineId}
      >
        {copiedStates.line ? (
          <Check className="w-4 h-4 mr-1" />
        ) : (
          <MessageCircle className="w-4 h-4 mr-1" />
        )}
      </Button>

      <Button
        variant={variant}
        size={size}
        className="bg-transparent"
        onClick={handleCopyFacebookUrl}
      >
        {copiedStates.facebook ? (
          <Check className="w-4 h-4 mr-1" />
        ) : (
          <Facebook className="w-4 h-4 mr-1" />
        )}
      </Button>

      <Button
        variant={variant}
        size={size}
        className="bg-transparent"
        onClick={handleCopyToPost}
      >
        {copiedStates.post ? (
          <Check className="w-4 h-4 mr-1" />
        ) : (
          <FileText className="w-4 h-4 mr-1" />
        )}
      </Button>

    </div>
  );
}

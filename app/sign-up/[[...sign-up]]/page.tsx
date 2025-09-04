"use client";
import { useLanguage } from "@/contexts/language-context";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("signUpTitle")}
          </h1>
          <p className="text-gray-600 mt-2">{t("signUpDescription")}</p>
        </div>
        <div className="flex justify-center">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: "bg-primary hover:bg-primary/90",
                socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                socialButtonsBlockButtonText: "text-gray-600",
                formFieldInput: "border-gray-200 focus:border-primary",
                footerActionLink: "text-primary hover:text-primary/90",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button"
import { Home, Menu, X } from "lucide-react";
import { Building2 } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs"; // or '@clerk/react'
// import { useSignOut } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const isSignedIn = false
  // const { signOut } = useSignOut();

  const { isLoaded, isSignedIn, user } = useUser();
  console.log(user, 888);
  const { t } = useLanguage();
  const { userId } = useAuth();
  console.log(userId, isSignedIn, 99999);

  // useEffect(() => {
  //   if (isSignedIn && userId) {
  //     fetch("/api/webhook", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         type: "user.signed_in",
  //         data: {
  //           id: user.id,
  //           email: user.primaryEmailAddress?.emailAddress ?? "",
  //           name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
  //         },
  //       }),
  //     }).catch(console.error);
  //   }
  // }, [isSignedIn, userId]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">Naina Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            {t("features")}
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            {t("pricing")}
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            {t("contact")}
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          {isSignedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">{t("dashboard")}</Button>
              </Link>
              <SignOutButton>{t("signOut")}</SignOutButton>
              {/* <Button variant="ghost" size="sm">{t('signOut')}</Button> */}
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="outline">{t("signIn")}</Button>
              </Link>
              <Link href="/sign-up">
                <Button>{t("getStarted")}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background bg-pink">
          <nav className="container py-4 space-y-4">
            <Link
              href="#features"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("features")}
            </Link>
            <Link
              href="/pricing"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("pricing")}
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("contact")}
            </Link>
            <div className="pt-4 space-y-2">
              <LanguageSwitcher />
              {isSignedIn ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full">
                      {t("dashboard")}
                    </Button>
                  </Link>
                  <SignOutButton>Sign Out</SignOutButton>
                </>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="outline" className="w-full">
                      {t("signIn")}
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="w-full">{t("getStarted")}</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

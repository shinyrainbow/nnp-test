"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/contexts/language-context";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo-nainahub.png"
              alt="Company Logo"
              width={30} // set width
              height={30} // set height
              priority // optional: preload for faster load
            />

          <div className="h-[30px] flex items-center justify-center">
            <p className="text-[30px] leading-none font-bold text-primary">
              NainaHub
            </p>
          </div>
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
          {isLoaded && isSignedIn ? (
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
              {isLoaded && isSignedIn ? (
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

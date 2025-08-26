import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { LanguageProvider } from "@/contexts/language-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Naina Hub - Real Estate Agent Tools",
  description:
    "Professional tools for real estate agents to work faster and more efficiently",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <ClerkProvider>
            {children}
            </ClerkProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

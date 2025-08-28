import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import { LanguageProvider } from "@/contexts/language-context";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["thai"],
  weight: ["400", "500", "700"], // choose weights you need
});

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
      <body className={kanit.className}>
        <LanguageProvider>
          <ClerkProvider>
            {children}
            </ClerkProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { getNavigation, getSocialLinks } from "@/lib/data";
import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
} from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ashwin Kumar",
    template: "%s | Ashwin Kumar",
  },
  description: "Developer, designer, and photographer portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = getNavigation();
  const socials = getSocialLinks();

  return (
    <html
      lang="en"
      className={cn(
        GeistMono.variable,
        GeistSans.variable,
        GeistPixelSquare.variable,
        GeistPixelGrid.variable,
        GeistPixelCircle.variable,
        GeistPixelTriangle.variable,
        GeistPixelLine.variable,
      )}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "font-sans antialiased min-h-screen bg-background text-foreground",
        )}
      >
        <div className="flex min-h-screen flex-col items-center font-pixel-circle">
          <Navbar navItems={navItems} />

          <main className="flex-1 w-full">
            <div className="mx-auto w-full border-x  min-h-screen max-w-[90vw] md:max-w-[70vw]">
              {children}
            </div>
          </main>
          <Footer socials={socials} />
        </div>
      </body>
    </html>
  );
}

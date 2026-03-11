import Footer from "@/components/Footer";
import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

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
  return (
    <html
      lang="en"
      className={cn(dmSans.variable, geistSans.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "font-sans antialiased min-h-screen bg-background text-foreground",
        )}
      >
        <div className="flex min-h-screen flex-col items-center ">
          <Navbar />

          <main className="flex-1 w-full">
            <div className="mx-auto w-full border-x border-border/70 min-h-screen max-w-[80vw] p-4">
              {children}
            </div>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}

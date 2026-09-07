import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine,
} from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ashwin Kumar",
    template: "%s | Ashwin Kumar",
  },
  description: "Developer, designer, and photographer portfolio.",
};

/**
 * Document shell only — fonts, globals and providers.
 *
 * The navbar and footer live in app/(site)/layout.tsx so that /admin does not
 * inherit the public site chrome, and does not run the nav/social/footer
 * queries on every admin request.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Toaster />
        <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
      </body>
    </html>
  );
}

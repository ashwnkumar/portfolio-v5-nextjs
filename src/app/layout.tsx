import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GlobalProvider } from "@/contexts/GlobalContext";

export const metadata: Metadata = {
  title: "Ashwin Kumar | Full Stack Developer",
  description: "Developer Portfolio created using Next.js",
  keywords: ["Ashwin Kumar", "Full Stack Developer", "Portfolio", "Next.js"],
  authors: [{ name: "Ashwin Kumar" }],
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Ashwin Kumar | Full Stack Developer",
    description: "Developer Portfolio created using Next.js",
    url: "https://yourdomain.com",
    siteName: "Ashwin Kumar Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashwin Kumar | Full Stack Developer",
    description: "Developer Portfolio created using Next.js",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="flex items-center justify-center scroll-smooth"
    >
      <body
        data-theme="dark"
        className="relative flex min-h-screen w-full max-w-7xl flex-col items-center justify-center  bg-bg text-text font-body p-4 md:p-0"
      >
        <GlobalProvider>
          <header className="sticky top-4 shadow-sm z-50 w-full bg-gray rounded-xl border border-brand/50">
            <Navbar />
          </header>
          <main className="flex-1 w-full flex pt-5 md:pt-10 ">{children}</main>
          <footer className="w-full">
            <div className="container mx-auto">
              <Footer />
            </div>
          </footer>
        </GlobalProvider>
      </body>
    </html>
  );
}

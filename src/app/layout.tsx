import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GlobalProvider } from "@/contexts/GlobalContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Ashwin Kumar | MERN Stack Developer & Web Developer",
  description:
    "Ashwin Kumar is a MERN Stack Developer specializing in building scalable web applications with ReactJS, Node.js, MongoDB, and TailwindCSS.",
  authors: [{ name: "Ashwin Kumar" }],
  metadataBase: new URL("https://ashwinkumar.dev"),
  alternates: {
    canonical: "https://ashwinkumar.dev",
  },
  openGraph: {
    title: "Ashwin Kumar | MERN Stack Developer & Web Developer",
    description:
      "Portfolio of Ashwin Kumar, a full-stack web developer experienced in ReactJS, Node.js, MongoDB, and modern UI design.",
    url: "https://ashwinkumar.dev",
    siteName: "Ashwin Kumar Portfolio",
    type: "website",
    images: ["/assets/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashwin Kumar | MERN Stack Developer",
    description:
      "Explore Ashwin Kumar's portfolio showcasing full-stack web development projects with ReactJS, Node.js, and MongoDB.",
    images: ["/assets/og-image.png"],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ashwin Kumar",
              jobTitle: "MERN Stack Developer",
              email: "ashwin12kumar07@gmail.com",
              url: "https://ashwinkumar.dev",
              sameAs: [
                "https://github.com/ashwnkumar",
                "https://www.linkedin.com/in/ashwin-kumar-221160240",
                "https://www.artstation.com/ashwnkumar",
              ],
            }),
          }}
        />
        <></>
      </head>
      <body
        data-theme="dark"
        className="relative flex min-h-screen w-full max-w-7xl flex-col items-center  justify-center  bg-bg text-text font-body p-4 lg:p-0"
      >
        <GlobalProvider>
          <Toaster
            toastOptions={{
              style: {
                background: "var(--color-bg)",
                color: "var(--color-primary)",
                border: "1px solid var(--color-border)",
              },
            }}
          />
          <header className="sticky top-4 shadow-sm z-50 w-full bg-gray  rounded-xl border border-brand/50 !max-w-7xl">
            <Navbar />
          </header>
          <main className="flex-1 w-full flex items-center justify-center pt-5 lg:pt-10 ">
            {children}
          </main>
          <footer className="w-full lg:max-w-7xl">
            <div className="container mx-auto">
              <Footer />
            </div>
          </footer>
        </GlobalProvider>
      </body>
    </html>
  );
}

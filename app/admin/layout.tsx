import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  // Keep the whole admin tree out of search results.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl min-h-screen border-x border-border px-4 md:px-8 py-6">
      {children}
    </div>
  );
}

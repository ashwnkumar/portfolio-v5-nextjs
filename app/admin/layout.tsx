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
    <div className="mx-auto w-full max-w-5xl p-4 md:p-8">{children}</div>
  );
}

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getSocialLinks, getFooter } from "@/lib/data";
import { NAV_ITEMS } from "@/lib/routes";

/** Public site chrome. Not applied to /admin. */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socials, footerData] = await Promise.all([
    getSocialLinks(),
    getFooter(),
  ]);

  return (
    <div className="flex min-h-screen flex-col items-center font-pixel-square">
      <Navbar navItems={NAV_ITEMS} />

      <main className="flex-1 w-full">
        <div className="mx-auto w-full border-x p-4 md:p-8 min-h-screen max-w-[90vw] md:max-w-[70vw]">
          {children}
        </div>
      </main>

      <Footer
        socials={socials}
        quickLinks={footerData.quickLinks}
        brand={footerData.brand}
      />
    </div>
  );
}

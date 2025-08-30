import { admin } from "@/constants/admin";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Button from "./form/Button";
import GridCard from "./GridCard";
import SocialLinks from "./footer/SocialLinks";
import GridContainer from "./GridContainer";

export default function Footer() {
  return (
    <footer className="py-5 border-t border-brand mt-5">
      <GridContainer>
        {/* Left section */}
        <GridCard className="col-start-1 col-end-13 md:col-start-1 md:col-end-9 row-start-1 row-end-3 !px-8">
          <div className="w-full h-full flex flex-col items-start justify-center gap-3">
            <h2 className="text-3xl md:text-4xl font-medium text-primary">
              Like what you see?
            </h2>
            <p className="text-xl md:text-2xl">
              Or just want to chat? Feel free to reach out to me.
            </p>
          </div>
        </GridCard>

        {/* Social links */}
        <GridCard className="col-start-1 col-end-13 md:col-start-9 md:col-end-13 row-start-3 row-end-5 md:row-start-1 md:row-end-3 !bg-bg !p-0 !shadow-none hover:!scale-100">
          <SocialLinks />
        </GridCard>

        {/* Bottom full-width row */}
        <GridCard className="col-start-1 col-end-13 row-start-5 row-end-6 md:row-start-3 md:row-end-4 hover:!scale-100">
          <div className="w-full h-full flex flex-row items-center justify-between text-secondary text-xs md:text-sm">
            <p>&copy; 2025 Ashwin Kumar. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with{" "}
              <Link
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand font-medium"
              >
                Next.js
              </Link>
            </p>
          </div>
        </GridCard>
      </GridContainer>
    </footer>
  );
}
